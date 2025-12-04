import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import paymentQR from "@/assets/payment-qr.jpeg";

const Payment = () => {
  const { t } = useTranslation();
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { amount, serviceName, provider } = location.state || {};
  
  const [isMobile, setIsMobile] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const upiId = "manjunath.arjun1978-1@oksbi";
  const providerName = provider?.name || "Service Provider";

  useEffect(() => {
    // Detect if user is on mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      setIsMobile(/android|iPad|iPhone|iPod/i.test(userAgent));
    };
    
    checkMobile();
  }, []);

  const handlePayNow = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      `${providerName} ${serviceName} Services`
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent("WorkXpress Booking")}`;

    if (isMobile) {
      // Open UPI app on mobile
      window.location.href = upiUrl;
      setPaymentInitiated(true);
    } else {
      // Show QR code on desktop
      setPaymentInitiated(true);
    }
  };

  const handlePaymentConfirm = async () => {
    setIsProcessing(true);

    try {
      // Create payment record
      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          booking_id: bookingId,
          amount: amount,
          status: "Paid",
        });

      if (paymentError) throw paymentError;

      // Update booking status
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({ status: "Paid" })
        .eq("id", bookingId);

      if (bookingError) throw bookingError;

      // Send SMS notification to provider
      try {
        await supabase.functions.invoke("send-sms-notification", {
          body: {
            phone: provider?.phone || "8904051999",
            message: `✅ New WorkXpress Booking Confirmed! Customer has paid ₹${amount} for ${serviceName}.`,
          },
        });
      } catch (smsError) {
        console.error("SMS notification failed:", smsError);
        // Don't throw error, continue with success flow
      }

      setPaymentSuccess(true);

      toast({
        title: t('payment.paymentSuccess'),
        description: t('payment.bookingConfirmed'),
      });

      // Redirect to booking history
      setTimeout(() => {
        navigate("/booking-history");
      }, 3000);
    } catch (error: any) {
      toast({
        title: t('payment.paymentSuccess'),
        description: error.message || t('booking.bookingError'),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    `${providerName} ${serviceName} Services`
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent("WorkXpress Booking")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Card className="bg-card border shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Payment</CardTitle>
            <p className="text-muted-foreground">
              Service: {serviceName} - ₹{amount}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {paymentSuccess ? (
              <div className="text-center space-y-4 py-8">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-500">
                  ✅ Payment Successful!
                </h3>
                <p className="text-lg font-medium">Booking Confirmed</p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your bookings...
                </p>
              </div>
            ) : !paymentInitiated ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Booking Details:</p>
                  <p className="text-sm text-muted-foreground">
                    Service: {serviceName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Amount: ₹{amount}
                  </p>
                  {provider && (
                    <p className="text-sm text-muted-foreground">
                      Provider: {provider.name}
                    </p>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handlePayNow}
                >
                  Pay ₹{amount} via UPI
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {isMobile ? (
                  <div className="text-center space-y-4">
                    <p className="text-lg font-medium">
                      Complete payment in your UPI app
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Choose PhonePe, Google Pay, or Paytm to complete the payment
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-lg font-medium mb-4">Scan QR Code to Pay</p>
                    <div className="flex justify-center">
                      <img
                        src={paymentQR}
                        alt="Payment QR Code"
                        className="w-64 h-64 object-contain border rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        UPI ID: {upiId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount: ₹{amount}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Scan to pay with any UPI app
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handlePaymentConfirm}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "I've Paid"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;

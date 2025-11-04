import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Smartphone, Laptop, CheckCircle } from "lucide-react";
import QRCode from "react-qr-code";

const Payment = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { amount, serviceName, provider } = location.state || {};
  
  const [isMobile, setIsMobile] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const upiId = "8904051999@ybl";
  const providerName = provider?.name || "Asha";

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

      toast({
        title: "✅ Payment Received Successfully",
        description: "Your booking is confirmed!",
      });

      // Redirect to booking history
      setTimeout(() => {
        navigate("/booking-history");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment. Please try again.",
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/booking/${bookingId}`}>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Payment Card */}
        <Card className="bg-gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Payment</CardTitle>
            <p className="text-muted-foreground">
              Amount: <span className="text-primary font-bold text-xl">₹{amount}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!paymentInitiated ? (
              <>
                {/* Device Type Indicator */}
                <div className="flex items-center justify-center gap-2 p-4 bg-muted/50 rounded-lg">
                  {isMobile ? (
                    <>
                      <Smartphone className="w-6 h-6 text-primary" />
                      <span className="font-medium">Mobile Device Detected</span>
                    </>
                  ) : (
                    <>
                      <Laptop className="w-6 h-6 text-primary" />
                      <span className="font-medium">Desktop Device Detected</span>
                    </>
                  )}
                </div>

                {/* Pay Now Button */}
                <Button
                  onClick={handlePayNow}
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6"
                >
                  Pay ₹{amount} Now
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isMobile
                    ? "You'll be redirected to your UPI app"
                    : "A QR code will be displayed for payment"}
                </p>
              </>
            ) : (
              <>
                {/* Payment Instructions */}
                {isMobile ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-success mx-auto" />
                    <h3 className="text-xl font-semibold">
                      Complete payment in your UPI app
                    </h3>
                    <p className="text-muted-foreground">
                      If your UPI app didn't open automatically, please try again or use another UPI app.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">
                      📱 Scan QR Code to Pay
                    </h3>
                    <div className="bg-white p-6 rounded-lg inline-block">
                      <QRCode value={upiString} size={200} />
                    </div>
                    <p className="text-muted-foreground">
                      Scan this QR with any UPI app (PhonePe / GPay / Paytm) to complete your payment
                    </p>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">UPI ID: {upiId}</p>
                      <p className="text-sm text-muted-foreground">Amount: ₹{amount}</p>
                    </div>
                  </div>
                )}

                {/* Payment Confirmation */}
                <div className="pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    After completing the payment, click the button below:
                  </p>
                  <Button
                    onClick={handlePaymentConfirm}
                    size="lg"
                    className="w-full bg-success text-success-foreground hover:bg-success/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "✅ I've Paid"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;

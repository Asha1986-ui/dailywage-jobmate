import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Phone, Shield } from "lucide-react";

const Auth = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format phone number to E.164 format if needed
      let formattedPhone = phone;
      if (!phone.startsWith('+')) {
        // Assuming Indian numbers, add +91 prefix
        formattedPhone = `+91${phone}`;
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to send OTP. Please try again.";
      
      if (error.message.includes("Invalid phone number")) {
        errorMessage = "Please enter a valid phone number.";
      } else if (error.message.includes("Phone number not authorized")) {
        errorMessage = "This phone number is not authorized. Please contact support.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format phone number to E.164 format if needed
      let formattedPhone = phone;
      if (!phone.startsWith('+')) {
        formattedPhone = `+91${phone}`;
      }

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    } catch (error: any) {
      let errorMessage = "Invalid OTP. Please try again.";
      
      if (error.message.includes("Token has expired")) {
        errorMessage = "OTP has expired. Please request a new one.";
      } else if (error.message.includes("Invalid token")) {
        errorMessage = "Invalid OTP. Please check and try again.";
      }
      
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      let formattedPhone = phone;
      if (!phone.startsWith('+')) {
        formattedPhone = `+91${phone}`;
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      toast({
        title: "OTP Resent!",
        description: "A new verification code has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 'phone' ? "Enter Phone Number" : "Verify OTP"}
          </CardTitle>
          <CardDescription>
            {step === 'phone' 
              ? "We'll send you a verification code via SMS" 
              : `Enter the 6-digit code sent to ${phone}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter phone number with country code (e.g., +919876543210) or without (+91 will be added automatically)
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Sending OTP..."
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Verifying..."
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify & Login
                  </>
                )}
              </Button>
              <div className="text-center space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('phone')}
                  className="text-sm"
                >
                  Change Phone Number
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm"
                >
                  Resend OTP
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
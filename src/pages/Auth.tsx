import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Shield } from "lucide-react";

const Auth = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState("");
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
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: redirectUrl,
        }
      });

      if (error) throw error;

      setStep('otp');
      toast({
        title: "Check your email!",
        description: "We've sent you a login link and verification code.",
      });
    } catch (error: any) {
      let errorMessage = "Failed to send login link. Please try again.";
      
      if (error.message.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message.includes("Email not authorized")) {
        errorMessage = "This email address is not authorized. Please contact support.";
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
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    } catch (error: any) {
      let errorMessage = "Invalid verification code. Please try again.";
      
      if (error.message.includes("Token has expired")) {
        errorMessage = "Verification code has expired. Please request a new one.";
      } else if (error.message.includes("Invalid token")) {
        errorMessage = "Invalid verification code. Please check and try again.";
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
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: redirectUrl,
        }
      });

      if (error) throw error;

      toast({
        title: "Email sent!",
        description: "A new login link and verification code has been sent to your email.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to resend email. Please try again.",
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
            {step === 'email' ? "Enter Email Address" : "Verify Code"}
          </CardTitle>
          <CardDescription>
            {step === 'email' 
              ? "We'll send you a login link and verification code" 
              : `Enter the code sent to ${email} or click the magic link in your email`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll receive both a magic link and a verification code
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Login Link
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
                <p className="text-xs text-muted-foreground">
                  You can also click the magic link in your email to log in instantly
                </p>
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
                  onClick={() => setStep('email')}
                  className="text-sm"
                >
                  Change Email Address
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm"
                >
                  Resend Email
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
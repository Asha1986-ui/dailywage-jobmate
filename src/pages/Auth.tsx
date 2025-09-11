import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Auth = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

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

  // Resend timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) throw error;

      setStep('otp');
      setResendTimer(30); // Start 30-second countdown
      toast({
        title: t('auth.checkEmail'),
        description: t('auth.codeSent'),
      });
    } catch (error: any) {
      let errorMessage = t('auth.sendCodeError');
      
      if (error.message.includes("Invalid email")) {
        errorMessage = t('auth.invalidEmail');
      } else if (error.message.includes("Email not authorized")) {
        errorMessage = t('auth.emailNotAuthorized');
      }
      
      toast({
        title: t('auth.error'),
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
        title: t('auth.welcome'),
        description: t('auth.loginSuccess'),
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: t('auth.verificationFailed'),
        description: t('auth.invalidOtp'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) throw error;

      setResendTimer(30); // Reset countdown
      toast({
        title: t('auth.codeSent'),
        description: t('auth.newCodeSent'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: t('auth.resendFailed'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 'email' ? t('auth.enterEmail') : t('auth.verifyCode')}
          </CardTitle>
          <CardDescription>
            {step === 'email' 
              ? t('auth.codeSendDescription')
              : t('auth.enterCodeDescription').replace('{email}', email)
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.emailAddress')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('auth.emailNote')}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  t('auth.sending')
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {t('auth.sendCode')}
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{t('auth.verificationCode')}</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                      if (value.length <= 6) {
                        setOtp(value);
                      }
                    }}
                    placeholder={t('auth.codePlaceholder')}
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    inputMode="numeric"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('auth.codeNote')}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  t('auth.verifying')
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    {t('auth.verifyLogin')}
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
                  {t('auth.changeEmail')}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={loading || resendTimer > 0}
                  className="text-sm"
                >
                  {resendTimer > 0 ? t('auth.resendTimer').replace('{seconds}', resendTimer.toString()) : t('auth.resendCode')}
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
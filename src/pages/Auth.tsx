import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, MapPin, Briefcase } from "lucide-react";

const Auth = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<'user' | 'worker'>('user');
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      if (!fullName.trim() || !city.trim() || !email.trim() || !password.trim()) {
        toast({
          title: t('auth.fillAllFields'),
          description: t('auth.fillAllFields'),
          variant: "destructive",
        });
        return;
      }

      if (password.length < 6) {
        toast({
          title: t('auth.passwordLength'),
          description: t('auth.passwordLength'),
          variant: "destructive",
        });
        return;
      }

      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: fullName.trim(),
            city: city.trim(),
            role: role,
          }
        }
      });

      if (authError) throw authError;

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        toast({
          title: t('auth.signupSuccess'),
          description: t('auth.signupSuccess'),
        });
        setMode('login');
        return;
      }

      toast({
        title: t('auth.signupSuccess'),
        description: t('auth.signupSuccess'),
      });

      // Redirect to home page
      navigate("/");
    } catch (error: any) {
      let errorMessage = t('auth.authError');
      
      if (error.message.includes("already registered") || error.message.includes("User already registered")) {
        errorMessage = t('auth.authError');
        setMode('login');
      } else if (error.message.includes("Invalid email")) {
        errorMessage = t('auth.authError');
      } else if (error.message.includes("Password")) {
        errorMessage = t('auth.passwordLength');
      }
      
      toast({
        title: t('auth.authError'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Authenticate user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      // Fetch user profile to get role
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", authData.user.id)
        .single();

      const userRole = profileData?.role || 'user';

      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.loginSuccess'),
      });

      // Redirect to home page
      navigate("/");
    } catch (error: any) {
      let errorMessage = t('auth.authError');
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = t('auth.authError');
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = t('auth.authError');
      } else if (error.message.includes("Invalid email")) {
        errorMessage = t('auth.authError');
      }
      
      toast({
        title: t('auth.authError'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-soft border-0 bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? t('auth.loginSubtitle')
              : t('auth.signupSubtitle')
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === 'signup' ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')} *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('auth.fullName')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{t('auth.city')} *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('auth.city')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('auth.selectRole')} *</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as 'user' | 'worker')}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-input hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{t('profile.user')}</p>
                          <p className="text-sm text-muted-foreground">{t('auth.signupSubtitle')}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-input hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="worker" id="worker" />
                    <Label htmlFor="worker" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{t('profile.worker')}</p>
                          <p className="text-sm text-muted-foreground">{t('auth.signupSubtitle')}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">{t('auth.email')} *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.email')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.password')}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('auth.signupButton')}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setMode('login');
                    setFullName("");
                    setCity("");
                    setRole('user');
                    setPassword("");
                  }}
                  className="text-sm"
                >
                  {t('auth.hasAccount')} <span className="font-semibold ml-1">{t('auth.login')}</span>
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t('auth.email')} *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.email')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.password')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('auth.loginButton')}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setMode('signup');
                    setPassword("");
                  }}
                  className="text-sm"
                >
                  {t('auth.noAccount')} <span className="font-semibold ml-1">{t('auth.signup')}</span>
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
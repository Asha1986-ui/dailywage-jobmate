import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, MapPin, Star, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        {/* Navigation */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <LanguageSelector />
          <Link to="/auth">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Work<span className="text-accent">Xpress</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.tagline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/worker-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-lg py-6 px-8 shadow-medium">
                <Users className="mr-3 h-6 w-6" />
                {t('header.findJobs')}
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-6 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-medium">
                <Briefcase className="mr-3 h-6 w-6" />
                {t('header.postJobs')}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.findJobs.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('features.findJobs.description')}
              </p>
            </Card>
            
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.postJobs.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('features.postJobs.description')}
              </p>
            </Card>
            
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.trusted.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('features.trusted.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/worker-dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg py-6 px-8 shadow-medium">
                {t('cta.startFinding')}
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-6 px-8 shadow-medium">
                {t('cta.startHiring')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
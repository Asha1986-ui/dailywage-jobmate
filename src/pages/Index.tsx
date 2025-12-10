import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, MapPin, Star, UserCircle, Clock, Shield, ThumbsUp, ChevronRight, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ServicesSection from "@/components/ServicesSection";
import VoiceSearch from "@/components/VoiceSearch";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { t } = useTranslation();
  const [voiceSearchTerm, setVoiceSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleVoiceResult = (text: string) => {
    setVoiceSearchTerm(text);
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jobCategories = [
    { name: t('home.categories.maid'), icon: "🧹", count: t('home.categories.maidCount') },
    { name: t('home.categories.cook'), icon: "👨‍🍳", count: t('home.categories.cookCount') },
    { name: t('home.categories.electrician'), icon: "⚡", count: t('home.categories.electricianCount') },
    { name: t('home.categories.plumber'), icon: "🔧", count: t('home.categories.plumberCount') },
    { name: t('home.categories.carpenter'), icon: "🔨", count: t('home.categories.carpenterCount') },
    { name: t('home.categories.painter'), icon: "🎨", count: t('home.categories.painterCount') },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setVoiceSearchTerm(categoryName);
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whyChooseUs = [
    { icon: Clock, title: t('home.whyChoose.fastService'), desc: t('home.whyChoose.fastServiceDesc') },
    { icon: Shield, title: t('home.whyChoose.verifiedWorkers'), desc: t('home.whyChoose.verifiedWorkersDesc') },
    { icon: ThumbsUp, title: t('home.whyChoose.qualityAssured'), desc: t('home.whyChoose.qualityAssuredDesc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-gradient-primary py-4 px-4 shadow-elegant sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Work<span className="text-accent">Xpress</span>
          </h1>
          <div className="flex gap-3 items-center">
            <LanguageSwitcher />
            <Link to="/profile">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all hover:scale-105">
                <UserCircle className="h-4 w-4 mr-2" />
                {t('nav.profile')}
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all hover:scale-105">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={`relative overflow-hidden bg-gradient-hero py-24 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 animate-float" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className={`text-6xl md:text-8xl font-bold text-white mb-6 leading-tight animate-slide-up`}>
            Work<span className="text-accent">Xpress</span>
          </h1>
          <p className={`text-xl md:text-3xl text-white/95 mb-4 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in delay-200`}>
            {t('home.subtitle')}
          </p>
          <p className={`text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto animate-fade-in delay-300`}>
            {t('home.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto animate-scale-in delay-500`}>
            <Link to="/jobs" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-lg py-7 px-10 shadow-strong hover-lift font-semibold">
                <Users className="mr-3 h-6 w-6" />
                {t('home.findJobs')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-7 px-10 bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-strong hover-lift font-semibold backdrop-blur-sm">
                <Briefcase className="mr-3 h-6 w-6" />
                {t('home.postJob')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Job Categories Carousel */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t('home.popularCategories')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.browseServices')}
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {jobCategories.map((category, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className="p-8 text-center shadow-elegant hover-lift border-0 bg-gradient-card cursor-pointer group"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.count}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Why Choose WorkXpress */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t('home.whyChooseTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.whyChooseSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="p-10 text-center shadow-elegant hover-lift border-0 bg-gradient-card group">
                <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Search Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t('home.voiceSearchTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              {t('home.voiceSearchSubtitle')}
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-3xl p-12 shadow-elegant hover-glow transition-all">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <VoiceSearch 
                  onVoiceResult={handleVoiceResult}
                  className="relative z-10 scale-150"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {t('home.voiceSearchHint')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection voiceSearchTerm={voiceSearchTerm} />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t('home.ctaSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Link to="/worker-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-lg py-7 px-10 shadow-strong hover-lift font-semibold">
                {t('home.startFindingWork')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-7 px-10 bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-strong hover-lift font-semibold backdrop-blur-sm">
                {t('home.startHiring')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Work<span className="text-accent">Xpress</span>
              </h3>
              <p className="text-background/80 leading-relaxed">
                {t('home.footerDescription')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('home.quickLinks')}</h4>
              <ul className="space-y-3">
                <li><Link to="/jobs" className="text-background/80 hover:text-accent transition-colors">{t('nav.findJobs')}</Link></li>
                <li><Link to="/employer-dashboard" className="text-background/80 hover:text-accent transition-colors">{t('nav.postJob')}</Link></li>
                <li><Link to="/worker-dashboard" className="text-background/80 hover:text-accent transition-colors">{t('nav.dashboard')}</Link></li>
                <li><Link to="/profile" className="text-background/80 hover:text-accent transition-colors">{t('nav.profile')}</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('home.support')}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-background/80 hover:text-accent transition-colors">{t('home.helpCenter')}</a></li>
                <li><a href="#" className="text-background/80 hover:text-accent transition-colors">{t('home.safetyGuidelines')}</a></li>
                <li><a href="#" className="text-background/80 hover:text-accent transition-colors">{t('home.termsOfService')}</a></li>
                <li><a href="#" className="text-background/80 hover:text-accent transition-colors">{t('home.privacyPolicy')}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('home.contactUs')}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-background/80">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>8904051999</span>
                </li>
                <li className="flex items-center gap-3 text-background/80">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>ashamanju0408@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-background/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{t('home.location')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-background/70">
                {t('home.copyright')}
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-background/70 hover:text-accent transition-colors hover:scale-110 transform">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-background/70 hover:text-accent transition-colors hover:scale-110 transform">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-background/70 hover:text-accent transition-colors hover:scale-110 transform">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-background/70 hover:text-accent transition-colors hover:scale-110 transform">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
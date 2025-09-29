import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ServicesSection from "@/components/ServicesSection";
import VoiceSearch from "@/components/VoiceSearch";

const Index = () => {
  const [voiceSearchTerm, setVoiceSearchTerm] = useState("");

  const handleVoiceResult = (text: string) => {
    setVoiceSearchTerm(text);
    // Scroll to services section smoothly
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Work<span className="text-accent">Xpress</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to WorkXpress – Daily Wage Job Platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/jobs" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-lg py-6 px-8 shadow-medium">
                <Users className="mr-3 h-6 w-6" />
                Find Jobs Near You
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-6 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-medium">
                <Briefcase className="mr-3 h-6 w-6" />
                Post Jobs
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
            Our Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Jobs Near You</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover daily wage jobs in your area with our location-based search
              </p>
            </Card>
            
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Post Job Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Employers can quickly post job requirements and find skilled workers
              </p>
            </Card>
            
            <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Platform</h3>
              <p className="text-muted-foreground leading-relaxed">
                Verified profiles and ratings ensure safe and reliable connections
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of workers and employers using WorkXpress to connect and grow
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/worker-dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg py-6 px-8 shadow-medium">
                Start Finding Work
              </Button>
            </Link>
            <Link to="/employer-dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-lg py-6 px-8 shadow-medium">
                Start Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Voice Search Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Voice Search Services
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use voice commands to quickly find the services you need
          </p>
          
          {/* Prominent Voice Input */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                <VoiceSearch 
                  onVoiceResult={handleVoiceResult}
                  className="relative z-10 scale-150"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Click the microphone and say what service you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection voiceSearchTerm={voiceSearchTerm} />
    </div>
  );
};

export default Index;
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowLeft,
  CheckCircle,
  IndianRupee,
} from "lucide-react";

const ServiceDetails = () => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Dummy data for service providers
  const serviceProviders = [
    {
      id: "1",
      name: "Kavitha Ramesh",
      price: 300,
      priceUnit: "hour",
      location: "Koramangala, Bengaluru",
      rating: 4.8,
      reviews: 127,
      availability: "available",
      experience: "5+ years",
      specialties: ["Deep Cleaning", "Kitchen Management"],
      image: "/placeholder.svg",
      estimatedArrival: 25,
      distance: 2.1
    },
    {
      id: "2", 
      name: "Ramesh Kumar",
      price: 280,
      priceUnit: "hour",
      location: "Indiranagar, Bengaluru",
      rating: 4.6,
      reviews: 89,
      availability: "available",
      experience: "3+ years",
      specialties: ["Regular Cleaning", "Laundry"],
      image: "/placeholder.svg",
      estimatedArrival: 15,
      distance: 1.5
    },
    {
      id: "3",
      name: "Sunita Devi", 
      price: 350,
      priceUnit: "hour",
      location: "HSR Layout, Bengaluru",
      rating: 4.9,
      reviews: 203,
      availability: "available",
      experience: "8+ years",
      specialties: ["Premium Service", "Organization"],
      image: "/placeholder.svg",
      estimatedArrival: 35,
      distance: 3.2
    }
  ].sort((a, b) => a.estimatedArrival - b.estimatedArrival);

  const handleBookProvider = (providerId: string, providerName: string) => {
    setSelectedProvider(providerId);
    toast({
      title: t("serviceDetails.bookingConfirmed"),
      description: `${t("serviceDetails.bookingWith")} ${providerName}. ${t("serviceDetails.contactSoon")}`,
    });
  };

  const handleContactProvider = (providerName: string, method: string) => {
    toast({
      title: t("serviceDetails.contactInitiated"),
      description: `${t("serviceDetails.contacting")} ${providerName} ${t("serviceDetails.via")} ${method}`,
    });
  };

  const getAvailabilityBadge = (availability: string, estimatedArrival: number) => {
    if (availability === "available" && estimatedArrival <= 30) {
      return (
        <Badge className="bg-success text-success-foreground animate-pulse">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t("serviceDetails.availableNow")}
        </Badge>
      );
    }
    
    switch (availability) {
      case "available":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t("serviceDetails.available")}
          </Badge>
        );
      case "busy":
        return (
          <Badge variant="secondary" className="bg-warning text-warning-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {t("serviceDetails.busy")}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back")}
          </Button>
        </div>

        {/* Instant Service Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-center mb-6 shadow-glow">
          <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
            {t("serviceDetails.instantService")}
          </h2>
          <p className="text-primary-foreground/90">
            {t("serviceDetails.fastDelivery")}
          </p>
        </div>

        {/* Service Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {serviceKey ? t(`services.${serviceKey}.title`) : t("serviceDetails.serviceTitle")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {serviceKey ? t(`services.${serviceKey}.desc`) : t("serviceDetails.serviceDescription")}
          </p>
        </div>

        {/* Service Providers List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {t("serviceDetails.availableProviders")}
          </h2>
          
          {serviceProviders.map((provider) => (
            <Card key={provider.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Provider Avatar */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg shrink-0">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  {/* Provider Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {getAvailabilityBadge(provider.availability, provider.estimatedArrival)}
                        <Badge variant="outline" className="text-xs font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          {t("serviceDetails.arrivesIn")} {provider.estimatedArrival} {t("serviceDetails.mins")}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span>{provider.rating}</span>
                        <span>({provider.reviews} {t("serviceDetails.reviews")})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xl font-bold text-primary">
                      <IndianRupee className="w-5 h-5" />
                      <span>{provider.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("serviceDetails.per")} {t(`serviceDetails.${provider.priceUnit}`)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Contact Buttons */}
                  <div className="flex gap-2 flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactProvider(provider.name, t("serviceDetails.phone"))}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Phone className="w-4 h-4" />
                      {t("serviceDetails.call")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactProvider(provider.name, t("serviceDetails.message"))}
                      className="flex items-center gap-2 flex-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t("serviceDetails.message")}
                    </Button>
                  </div>
                  
                  {/* Book Button */}
                  <Button
                    onClick={() => handleBookProvider(provider.id, provider.name)}
                    disabled={provider.availability === "busy" || selectedProvider === provider.id}
                    className="sm:w-auto w-full shadow-medium hover:shadow-strong bg-gradient-to-r from-primary to-primary-glow"
                    size="lg"
                  >
                    {selectedProvider === provider.id 
                      ? t("serviceDetails.booked")
                      : provider.availability === "busy"
                      ? t("serviceDetails.unavailable") 
                      : t("serviceDetails.bookInstant")
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("serviceDetails.needHelp")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("serviceDetails.contactSupport")}
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                {t("serviceDetails.contactUs")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetails;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import VoiceSearch from "@/components/VoiceSearch";
import {
  Users,
  Wrench,
  Zap,
  Truck,
  Heart,
  Star,
  Home,
  ChefHat,
  Shirt,
  Baby,
  Shield,
  Droplets,
  Hammer,
  Paintbrush,
  Settings,
  Package,
  Bike,
  Car,
  Utensils,
  Sparkles,
  Brush,
  Scissors,
  Dumbbell,
  PawPrint,
  UserCheck,
  ShoppingCart,
  ArrowUpDown,
  Clock,
  Search,
} from "lucide-react";

const ServicesSection = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const languageLabels = {
    en: "English",
    hi: "हिंदी",
    kn: "ಕನ್ನಡ",
  };

  const serviceCategories = [
    {
      name: "household",
      icon: Home,
      color: "bg-blue-500",
      services: [
        { key: "maid", icon: Brush },
        { key: "cook", icon: ChefHat },
        { key: "laundry", icon: Shirt },
        { key: "babysitting", icon: Baby },
        { key: "elderly", icon: Shield },
      ],
    },
    {
      name: "repair",
      icon: Wrench,
      color: "bg-orange-500",
      services: [
        { key: "plumber", icon: Droplets },
        { key: "electrician", icon: Zap },
        { key: "carpenter", icon: Hammer },
        { key: "painter", icon: Paintbrush },
        { key: "appliance", icon: Settings },
      ],
    },
    {
      name: "emergency",
      icon: Truck,
      color: "bg-red-500",
      services: [
        { key: "delivery", icon: Package },
        { key: "bikemechanic", icon: Bike },
        { key: "towing", icon: Car },
        { key: "watertanker", icon: Droplets },
      ],
    },
    {
      name: "event",
      icon: Star,
      color: "bg-purple-500",
      services: [
        { key: "catering", icon: Utensils },
        { key: "decoration", icon: Sparkles },
        { key: "cleaning", icon: Brush },
      ],
    },
    {
      name: "personal",
      icon: Heart,
      color: "bg-pink-500",
      services: [
        { key: "salon", icon: Scissors },
        { key: "fitness", icon: Dumbbell },
        { key: "petcare", icon: PawPrint },
      ],
    },
    {
      name: "special",
      icon: Users,
      color: "bg-green-500",
      services: [
        { key: "driver", icon: UserCheck },
        { key: "grocery", icon: ShoppingCart },
        { key: "pickdrop", icon: ArrowUpDown },
        { key: "instanthelp", icon: Clock },
      ],
    },
  ];

  const filteredCategories = serviceCategories.map((category) => ({
    ...category,
    services: category.services.filter((service) => {
      const title = t(`services.${service.key}.title`).toLowerCase();
      const desc = t(`services.${service.key}.desc`).toLowerCase();
      return title.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
    }),
  })).filter((category) => category.services.length > 0);

  const handleBookService = (serviceName: string) => {
    toast({
      title: "Service Booking",
      description: `Booking request for ${serviceName} has been received. We'll contact you soon!`,
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Language Switcher and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            {(Object.keys(languageLabels) as Language[]).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang)}
                className="min-w-20"
              >
                {languageLabels[lang]}
              </Button>
            ))}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t("services.title")}
          </h2>

          {/* Search Bar with Voice Input */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("services.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <VoiceSearch 
                onVoiceResult={setSearchTerm}
                className="flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.name} className="animate-fade-in">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-full ${category.color} text-white`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {t(`services.${category.name}`)}
                </h3>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.services.map((service) => (
                  <Card 
                    key={service.key} 
                    className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
                  >
                    <CardHeader className="text-center pb-2">
                      <div className={`inline-flex p-3 rounded-full ${category.color} text-white mb-3 mx-auto`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {t(`services.${service.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {t(`services.${service.key}.desc`)}
                      </CardDescription>
                      <Button 
                        className="w-full shadow-medium group-hover:shadow-lg transition-shadow"
                        onClick={() => handleBookService(t(`services.${service.key}.title`))}
                      >
                        {t("services.bookNow")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No services found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
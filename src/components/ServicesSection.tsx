import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

interface ServicesSectionProps {
  voiceSearchTerm?: string;
}

const ServicesSection = ({ voiceSearchTerm = "" }: ServicesSectionProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Update search term when voice search term changes
  useEffect(() => {
    if (voiceSearchTerm) {
      setSearchTerm(voiceSearchTerm);
    }
  }, [voiceSearchTerm]);

  const services = [
    { key: "maid", title: "Maid Services", desc: "Professional house cleaning and maintenance", icon: Brush },
    { key: "cook", title: "Cook Services", desc: "Home cooking and meal preparation", icon: ChefHat },
    { key: "laundry", title: "Laundry Services", desc: "Washing, drying and ironing services", icon: Shirt },
    { key: "babysitting", title: "Babysitting", desc: "Child care and supervision", icon: Baby },
    { key: "elderly", title: "Elderly Care", desc: "Care and assistance for elderly people", icon: Shield },
    { key: "plumber", title: "Plumber Services", desc: "Water pipe repairs and installations", icon: Droplets },
    { key: "electrician", title: "Electrician", desc: "Electrical repairs and installations", icon: Zap },
    { key: "carpenter", title: "Carpenter", desc: "Wood work and furniture repairs", icon: Hammer },
    { key: "painter", title: "Painter", desc: "House painting and wall decoration", icon: Paintbrush },
    { key: "appliance", title: "Appliance Repair", desc: "Home appliance repairs and maintenance", icon: Settings },
    { key: "delivery", title: "Delivery Services", desc: "Fast and reliable delivery service", icon: Package },
    { key: "bikemechanic", title: "Bike Mechanic", desc: "Motorcycle and bicycle repairs", icon: Bike },
    { key: "towing", title: "Towing Services", desc: "Vehicle towing and roadside assistance", icon: Car },
    { key: "watertanker", title: "Water Tanker", desc: "Water supply and delivery service", icon: Droplets },
    { key: "catering", title: "Catering Services", desc: "Event catering and food service", icon: Utensils },
    { key: "decoration", title: "Event Decoration", desc: "Party and event decoration", icon: Sparkles },
    { key: "cleaning", title: "Event Cleaning", desc: "Post-event cleaning services", icon: Brush },
    { key: "salon", title: "Salon Services", desc: "Hair and beauty services at home", icon: Scissors },
    { key: "fitness", title: "Fitness Trainer", desc: "Personal fitness training", icon: Dumbbell },
    { key: "petcare", title: "Pet Care", desc: "Pet sitting and care services", icon: PawPrint },
    { key: "driver", title: "Driver Services", desc: "Personal and professional driving", icon: UserCheck },
    { key: "grocery", title: "Grocery Shopping", desc: "Grocery shopping and delivery", icon: ShoppingCart },
    { key: "pickdrop", title: "Pick & Drop", desc: "Transportation and delivery service", icon: ArrowUpDown },
    { key: "instanthelp", title: "Instant Help", desc: "Quick assistance for urgent needs", icon: Clock },
  ];

  const filteredServices = services.filter((service) => {
    return service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           service.desc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleBookService = (serviceKey: string) => {
    navigate(`/service/${serviceKey}`);
  };

  return (
    <section id="services-section" className="py-16 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Title and Search */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Available Services
          </h2>

          {/* Text Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.key} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
            >
              <CardHeader className="text-center pb-2">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </CardDescription>
                <Button 
                  className="w-full shadow-medium group-hover:shadow-lg transition-shadow"
                  onClick={() => handleBookService(service.key)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredServices.length === 0 && searchTerm && (
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
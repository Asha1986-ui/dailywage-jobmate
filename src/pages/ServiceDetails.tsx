import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  ArrowLeft,
  IndianRupee,
  Calendar,
} from "lucide-react";

const ServiceDetails = () => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();

  // Service provider details
  const provider = {
    name: "Asha",
    phone: "8904051999",
    rating: 4.8,
    reviews: 127,
    experience: "5+ years",
    location: "Koramangala, Bangalore",
    price: 300,
    priceUnit: "hour",
  };

  const handleCall = () => {
    window.open(`tel:${provider.phone}`);
  };

  const handleBookNow = () => {
    navigate(`/booking/${serviceKey}`, {
      state: {
        serviceName: serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) : "Service",
        provider: provider,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Service Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) + " Service" : "Service Details"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional and verified service provider
          </p>
        </div>

        {/* Provider Card */}
        <Card className="bg-gradient-card border-0 shadow-elegant hover-lift">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{provider.name}</CardTitle>
                <Badge className="bg-success text-success-foreground mb-3">
                  Verified Provider
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="font-semibold">{provider.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({provider.reviews} reviews)
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contact Number */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-semibold text-lg">{provider.phone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{provider.location}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <IndianRupee className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-semibold text-lg">
                  ₹{provider.price}/{provider.priceUnit}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-semibold">{provider.experience}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={handleCall}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleBookNow}
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetails;

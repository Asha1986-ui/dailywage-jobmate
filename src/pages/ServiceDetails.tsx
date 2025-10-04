import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  Search,
  Filter,
} from "lucide-react";

const ServiceDetails = () => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const locations = ["All Locations", "Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "BTM Layout"];
  const priceRanges = ["All Prices", "₹100-₹300", "₹300-₹500", "₹500-₹1000", "Low to High", "High to Low"];
  const availabilityOptions = ["All", "Available Now", "Available Today"];
  const ratingOptions = ["All Ratings", "4★ & above", "3★ & above"];

  // Dynamic skills based on service category
  const getServiceSkills = (serviceKey: string | undefined) => {
    const skillsMap: Record<string, string[]> = {
      plumber: ["Pipe Repair", "Leak Fixing", "Tap Installation", "Drain Cleaning", "Water Heater Repair"],
      maid: ["Deep Cleaning", "Dusting", "Bathroom Cleaning", "Kitchen Cleaning", "Floor Mopping"],
      cook: ["Indian Cuisine", "South Indian", "North Indian", "Vegetarian", "Home Style Cooking"],
      laundry: ["Washing", "Ironing", "Dry Cleaning", "Stain Removal", "Folding"],
      babysitting: ["Child Care", "Playtime", "Feeding", "Homework Help", "Activity Planning"],
      elderly: ["Health Monitoring", "Meal Prep", "Companionship", "Medication Reminders", "Mobility Assistance"],
      electrician: ["Wiring", "Switch Installation", "Appliance Repair", "Safety Checks", "LED Installation"],
      carpenter: ["Furniture Repair", "Woodwork", "Cabinet Installation", "Door Repair", "Custom Carpentry"],
      painter: ["Wall Painting", "Interior Design", "Color Consultation", "Texture Work", "Exterior Painting"],
      appliance: ["AC Repair", "Refrigerator Service", "Washing Machine", "Microwave Repair", "Water Purifier"],
      delivery: ["Fast Delivery", "Package Handling", "Document Delivery", "Grocery Pickup", "Express Service"],
      bikemechanic: ["Engine Repair", "Brake Service", "Tire Change", "Oil Change", "Battery Check"],
      towing: ["Car Towing", "Bike Towing", "Emergency Service", "Breakdown Assistance", "Roadside Help"],
      watertanker: ["Water Supply", "Tank Filling", "Emergency Water", "Quality Water", "Timely Delivery"],
      catering: ["Event Setup", "Food Service", "Kitchen Help", "Serving", "Cleanup"],
      decoration: ["Event Decor", "Flower Arrangement", "Theme Setup", "Lighting", "Stage Decoration"],
      cleaning: ["Post Event Cleanup", "Deep Cleaning", "Waste Management", "Sanitization", "Quick Cleanup"],
      salon: ["Hair Styling", "Facial", "Pedicure", "Manicure", "Makeup"],
      fitness: ["Personal Training", "Yoga", "Weight Training", "Cardio", "Diet Planning"],
      petcare: ["Pet Walking", "Feeding", "Grooming", "Pet Sitting", "Exercise"],
      driver: ["Safe Driving", "Local Routes", "Long Distance", "Vehicle Care", "Punctuality"],
      grocery: ["Fresh Produce", "Quick Shopping", "List Management", "Quality Check", "Fast Delivery"],
      pickdrop: ["Parcel Delivery", "Document Pickup", "Shopping Pickup", "Express Service", "Safe Handling"],
      instanthelp: ["Emergency Service", "Quick Response", "Multi-tasking", "Problem Solving", "24/7 Available"]
    };
    
    return skillsMap[serviceKey || 'default'] || ["Professional Service", "Reliable", "Experienced", "Quality Work", "Customer Focused"];
  };

  const serviceSkills = getServiceSkills(serviceKey);

  // Dummy data for service providers
  const allProviders = [
    {
      id: "1",
      name: "Kavitha Ramesh",
      price: 300,
      priceUnit: "hour",
      location: "Koramangala",
      rating: 4.8,
      reviews: 127,
      availability: "available",
      experience: "5+ years",
      specialties: [serviceSkills[0], serviceSkills[1]],
      image: "/placeholder.svg",
      estimatedArrival: 25,
      distance: 2.1
    },
    {
      id: "2", 
      name: "Ramesh Kumar",
      price: 280,
      priceUnit: "hour",
      location: "Indiranagar",
      rating: 4.6,
      reviews: 89,
      availability: "available",
      experience: "3+ years",
      specialties: [serviceSkills[2], serviceSkills[3]],
      image: "/placeholder.svg",
      estimatedArrival: 15,
      distance: 1.5
    },
    {
      id: "3",
      name: "Sunita Devi", 
      price: 350,
      priceUnit: "hour",
      location: "HSR Layout",
      rating: 4.9,
      reviews: 203,
      availability: "available",
      experience: "8+ years",
      specialties: [serviceSkills[1], serviceSkills[4]],
      image: "/placeholder.svg",
      estimatedArrival: 35,
      distance: 3.2
    },
    {
      id: "4",
      name: "Priya Sharma",
      price: 450,
      priceUnit: "hour",
      location: "Whitefield",
      rating: 4.7,
      reviews: 156,
      availability: "available",
      experience: "6+ years",
      specialties: [serviceSkills[0], serviceSkills[2]],
      image: "/placeholder.svg",
      estimatedArrival: 45,
      distance: 5.0
    },
    {
      id: "5",
      name: "Lakshmi Naidu",
      price: 250,
      priceUnit: "hour",
      location: "Jayanagar",
      rating: 4.3,
      reviews: 78,
      availability: "busy",
      experience: "4+ years",
      specialties: [serviceSkills[3], serviceSkills[1]],
      image: "/placeholder.svg",
      estimatedArrival: 120,
      distance: 4.2
    },
    {
      id: "6",
      name: "Anand Reddy",
      price: 400,
      priceUnit: "hour",
      location: "BTM Layout",
      rating: 3.9,
      reviews: 52,
      availability: "available",
      experience: "2+ years",
      specialties: [serviceSkills[2], serviceSkills[4]],
      image: "/placeholder.svg",
      estimatedArrival: 50,
      distance: 3.8
    },
    {
      id: "7",
      name: "Meena Patel",
      price: 320,
      priceUnit: "hour",
      location: "Koramangala",
      rating: 4.5,
      reviews: 142,
      availability: "available",
      experience: "7+ years",
      specialties: [serviceSkills[0], serviceSkills[3]],
      image: "/placeholder.svg",
      estimatedArrival: 20,
      distance: 1.8
    },
    {
      id: "8",
      name: "Vijay Kumar",
      price: 180,
      priceUnit: "hour",
      location: "Indiranagar",
      rating: 3.8,
      reviews: 45,
      availability: "available",
      experience: "1+ years",
      specialties: [serviceSkills[1], serviceSkills[2]],
      image: "/placeholder.svg",
      estimatedArrival: 60,
      distance: 2.5
    }
  ];

  // Filter and sort providers
  const getFilteredProviders = () => {
    let filtered = [...allProviders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation !== "all" && selectedLocation !== "All Locations") {
      filtered = filtered.filter(provider => 
        provider.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Availability filter
    if (availabilityFilter === "Available Now") {
      filtered = filtered.filter(provider => 
        provider.availability === "available" && provider.estimatedArrival <= 30
      );
    } else if (availabilityFilter === "Available Today") {
      filtered = filtered.filter(provider => 
        provider.availability === "available"
      );
    }

    // Rating filter
    if (ratingFilter === "4★ & above") {
      filtered = filtered.filter(provider => provider.rating >= 4.0);
    } else if (ratingFilter === "3★ & above") {
      filtered = filtered.filter(provider => provider.rating >= 3.0);
    }

    // Price filter
    if (priceFilter === "₹100-₹300") {
      filtered = filtered.filter(provider => provider.price >= 100 && provider.price <= 300);
    } else if (priceFilter === "₹300-₹500") {
      filtered = filtered.filter(provider => provider.price > 300 && provider.price <= 500);
    } else if (priceFilter === "₹500-₹1000") {
      filtered = filtered.filter(provider => provider.price > 500 && provider.price <= 1000);
    } else if (priceFilter === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Default sort by arrival time if no price sorting
    if (!priceFilter.includes("to")) {
      filtered.sort((a, b) => a.estimatedArrival - b.estimatedArrival);
    }

    return filtered;
  };

  const serviceProviders = getFilteredProviders();

  const handleBookProvider = async (providerId: string, providerName: string, providerLocation: string, providerPrice: number) => {
    if (bookingInProgress) return;
    
    setBookingInProgress(true);
    setSelectedProvider(providerId);
    
    try {
      const { error } = await supabase.from("bookings").insert({
        user_name: "Guest User",
        service_id: providerId,
        service_name: `${serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) : "Service"} - ${providerName}`,
        location: providerLocation,
        price: providerPrice,
        status: "Booked",
      });

      if (error) throw error;

      toast({
        title: "✅ Service booked successfully!",
        description: `Booking confirmed with ${providerName}. They will contact you soon.`,
      });

      // Redirect to profile page after 1.5 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
      setSelectedProvider(null);
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleContactProvider = (providerName: string, method: string) => {
    toast({
      title: "Contact Initiated",
      description: `Contacting ${providerName} via ${method}`,
    });
  };

  const getAvailabilityBadge = (availability: string, estimatedArrival: number) => {
    if (availability === "available" && estimatedArrival <= 30) {
      return (
        <Badge className="bg-success text-success-foreground animate-pulse">
          <CheckCircle className="w-3 h-3 mr-1" />
          Available Now
        </Badge>
      );
    }
    
    switch (availability) {
      case "available":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Available
          </Badge>
        );
      case "busy":
        return (
          <Badge variant="secondary" className="bg-warning text-warning-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Busy
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

        {/* Instant Service Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-center mb-6 shadow-glow">
          <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
            Instant Service Available
          </h2>
          <p className="text-primary-foreground/90">
            Fast and reliable service delivered to your location
          </p>
        </div>

        {/* Service Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) + " Services" : "Service Details"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional and verified service providers
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 bg-gradient-card border-0 shadow-soft">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by provider name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6 bg-gradient-card border-0 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location" className="h-10">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">Price</Label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger id="price" className="h-10">
                    <SelectValue placeholder="Select price" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-sm font-medium">Availability</Label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger id="availability" className="h-10">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-medium">Rating</Label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger id="rating" className="h-10">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratingOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Providers List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Available Service Providers
            </h2>
            <Badge variant="secondary" className="text-sm">
              {serviceProviders.length} {serviceProviders.length === 1 ? 'Provider' : 'Providers'} Found
            </Badge>
          </div>
          
          {serviceProviders.length === 0 ? (
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  No providers found matching your criteria. Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            serviceProviders.map((provider) => (
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
                          Arrives in {provider.estimatedArrival} mins
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span>{provider.rating}</span>
                        <span>({provider.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}, Bengaluru</span>
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
                      per {provider.priceUnit}
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
                      onClick={() => handleContactProvider(provider.name, "phone")}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactProvider(provider.name, "message")}
                      className="flex items-center gap-2 flex-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => handleBookProvider(provider.id, provider.name, provider.location, provider.price)}
                    disabled={provider.availability === "busy" || selectedProvider === provider.id || bookingInProgress}
                    className="sm:w-auto w-full shadow-medium hover:shadow-strong bg-gradient-to-r from-primary to-primary-glow"
                    size="lg"
                  >
                    {bookingInProgress && selectedProvider === provider.id
                      ? "Booking..."
                      : selectedProvider === provider.id 
                      ? "Booked"
                      : provider.availability === "busy"
                      ? "Unavailable" 
                      : "Book Instantly"
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Need Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contact our support team for assistance
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetails;
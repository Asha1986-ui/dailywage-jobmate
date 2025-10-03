import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import VoiceSearch from "@/components/VoiceSearch";
import {
  MapPin,
  Clock,
  IndianRupee,
  Search,
  ArrowLeft,
  Briefcase,
  Phone,
  Star,
  Filter
} from "lucide-react";

const Jobs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Job categories
  const jobCategories = [
    { id: "all", name: "All Jobs" },
    { id: "household", name: "Household Services" },
    { id: "repair", name: "Repair & Maintenance" },
    { id: "emergency", name: "Emergency Services" },
    { id: "event", name: "Event Services" },
    { id: "personal", name: "Personal Services" },
  ];

  // Location options
  const locations = [
    "All Locations",
    "Koramangala, Bengaluru",
    "Indiranagar, Bengaluru",
    "HSR Layout, Bengaluru",
    "Whitefield, Bengaluru",
    "Jayanagar, Bengaluru",
    "Marathahalli, Bengaluru",
    "Bangalore Central",
    "Palace Grounds, Bengaluru",
    "JP Nagar, Bengaluru",
  ];

  // Available jobs data organized by categories
  const jobsData = {
    household: [
      {
        id: "h1",
        title: "House Cleaning Assistant",
        company: "Clean Home Services",
        location: "Koramangala, Bengaluru",
        salary: 400,
        type: "Daily",
        rating: 4.2,
        reviews: 18,
        postedTime: "2 hours ago",
        phoneNumber: "+91 9876543210",
        description: "Looking for reliable cleaning staff for residential apartments",
        requirements: ["House cleaning experience", "Own cleaning supplies preferred"],
        available: true
      },
      {
        id: "h2", 
        title: "Part-Time Cook",
        company: "HomeMeals Service",
        location: "Indiranagar, Bengaluru",
        salary: 600,
        type: "Daily",
        rating: 4.5,
        reviews: 32,
        postedTime: "4 hours ago",
        phoneNumber: "+91 9876543211",
        description: "Need experienced cook for preparing daily meals for family of 4",
        requirements: [
          "South Indian cuisine expertise",
          "2+ years experience",
          "Food hygiene certification"
        ],
        available: true
      },
      {
        id: "h3",
        title: "Laundry Assistant",
        company: "Fresh Laundry Co",
        location: "HSR Layout, Bengaluru",
        salary: 350,
        type: "Daily",
        rating: 4.1,
        reviews: 15,
        postedTime: "6 hours ago",
        phoneNumber: "+91 9876543212",
        description: "Washing and ironing services required for laundry business",
        requirements: [
          "Experience with washing machines",
          "Ironing skills required",
          "Attention to detail"
        ],
        available: false
      }
    ],
    repair: [
      {
        id: "r1",
        title: "Plumber Assistant",
        company: "Fix-It Plumbing",
        location: "Whitefield, Bengaluru",
        salary: 500,
        type: "Daily",
        rating: 4.3,
        reviews: 25,
        postedTime: "1 hour ago",
        phoneNumber: "+91 9876543213",
        description: "Assist with plumbing repairs and installations",
        requirements: [
          "Basic plumbing knowledge",
          "Own tools preferred",
          "Physically fit"
        ],
        available: true
      },
      {
        id: "r2",
        title: "Electrician Helper",
        company: "PowerTech Solutions", 
        location: "Jayanagar, Bengaluru",
        salary: 550,
        type: "Daily",
        rating: 4.4,
        reviews: 41,
        postedTime: "3 hours ago",
        phoneNumber: "+91 9876543214",
        description: "Help with electrical installations and repairs",
        requirements: [
          "Understanding of electrical work",
          "Safety conscious",
          "Willing to learn"
        ],
        available: true
      },
      {
        id: "r3",
        title: "Carpenter Assistant",
        company: "WoodCraft Services",
        location: "Marathahalli, Bengaluru", 
        salary: 450,
        type: "Daily",
        rating: 4.0,
        reviews: 12,
        postedTime: "5 hours ago",
        phoneNumber: "+91 9876543215",
        description: "Assist in furniture making and wood repairs",
        requirements: [
          "Basic carpentry skills",
          "Attention to detail",
          "Team player"
        ],
        available: false
      }
    ],
    emergency: [
      {
        id: "e1",
        title: "Delivery Executive",
        company: "QuickDeliver Services",
        location: "Bangalore Central",
        salary: 300,
        type: "Per Delivery",
        rating: 4.2,
        reviews: 89,
        postedTime: "30 minutes ago",
        phoneNumber: "+91 9876543216",
        description: "Fast delivery service for packages and documents",
        requirements: [
          "Own vehicle (bike/scooter)",
          "Smartphone required",
          "Know local routes",
          "Good communication"
        ],
        available: true
      },
      {
        id: "e2",
        title: "Emergency Driver",
        company: "RoadAssist 24/7",
        location: "All Bangalore",
        salary: 800,
        type: "Daily",
        rating: 4.6,
        reviews: 156,
        postedTime: "1 hour ago",
        phoneNumber: "+91 9876543217",
        description: "Provide emergency driving services for urgent trips",
        requirements: [
          "Valid driving license",
          "Clean driving record",
          "Available 24/7",
          "Professional attitude"
        ],
        available: true
      }
    ],
    event: [
      {
        id: "v1",
        title: "Event Setup Assistant",
        company: "PartyPerfect Events",
        location: "Palace Grounds, Bengaluru",
        salary: 600,
        type: "Daily",
        rating: 4.3,
        reviews: 67,
        postedTime: "2 hours ago",
        phoneNumber: "+91 9876543218",
        description: "Help with event setup, decoration, and arrangements",
        requirements: [
          "Event setup experience",
          "Physically active",
          "Team coordination"
        ],
        available: true
      },
      {
        id: "v2",
        title: "Catering Helper",
        company: "Feast Masters Catering",
        location: "JP Nagar, Bengaluru",
        salary: 400,
        type: "Daily", 
        rating: 4.1,
        reviews: 33,
        postedTime: "4 hours ago",
        phoneNumber: "+91 9876543219",
        description: "Assist in food preparation and serving at events",
        requirements: [
          "Food handling experience",
          "Hygiene conscious",
          "Customer service skills"
        ],
        available: false
      }
    ],
    personal: [
      {
        id: "p1",
        title: "Personal Fitness Trainer",
        company: "FitLife Training",
        location: "Koramangala, Bengaluru", 
        salary: 800,
        type: "Daily",
        rating: 4.7,
        reviews: 94,
        postedTime: "3 hours ago",
        phoneNumber: "+91 9876543220",
        description: "Provide personalized fitness training to clients",
        requirements: [
          "Certified fitness trainer",
          "Experience in personal training",
          "Nutrition knowledge"
        ],
        available: true
      },
      {
        id: "p2",
        title: "Pet Care Assistant",
        company: "PawPals Pet Services",
        location: "Indiranagar, Bengaluru",
        salary: 350,
        type: "Daily",
        rating: 4.4,
        reviews: 28,
        postedTime: "5 hours ago",
        phoneNumber: "+91 9876543221",
        description: "Pet walking, feeding, and basic care services", 
        requirements: [
          "Love for animals",
          "Pet handling experience",
          "Reliable and punctual"
        ],
        available: true
      }
    ]
  };

  // Get filtered jobs based on category, search, location, and availability
  const getFilteredJobs = () => {
    let allJobs: any[] = [];
    
    if (selectedCategory === "all") {
      // Combine all jobs from all categories
      Object.values(jobsData).forEach(categoryJobs => {
        allJobs = [...allJobs, ...categoryJobs];
      });
    } else {
      allJobs = jobsData[selectedCategory as keyof typeof jobsData] || [];
    }

    // Filter by search term
    if (searchTerm) {
      allJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation !== "all" && selectedLocation !== "All Locations") {
      allJobs = allJobs.filter(job => job.location === selectedLocation);
    }

    // Filter by availability
    if (showAvailableOnly) {
      allJobs = allJobs.filter(job => job.available);
    }

    // Sort by price
    if (priceSort === "low-to-high") {
      allJobs.sort((a, b) => a.salary - b.salary);
    } else if (priceSort === "high-to-low") {
      allJobs.sort((a, b) => b.salary - a.salary);
    }

    return allJobs;
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    toast({
      title: "Application Sent",
      description: `Applied for ${jobTitle}. Employer will contact you soon.`,
    });
  };

  const handleCall = (jobTitle: string, phoneNumber: string) => {
    // Initiate actual phone call
    window.location.href = `tel:${phoneNumber}`;
    
    toast({
      title: "Calling Employer",
      description: `Calling ${jobTitle} employer at ${phoneNumber}`,
    });
  };

  const handleVoiceResult = (text: string) => {
    setSearchTerm(text);
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-6xl px-4 py-6">
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

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Find Jobs Near You
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover daily wage opportunities in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for jobs, companies, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <VoiceSearch 
              onVoiceResult={handleVoiceResult}
              className="flex-shrink-0"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Filters</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Location Filter */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs text-muted-foreground">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger id="location" className="h-9">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.slice(1).map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Sort */}
                <div className="space-y-2">
                  <Label htmlFor="price-sort" className="text-xs text-muted-foreground">Sort by Price</Label>
                  <Select value={priceSort} onValueChange={setPriceSort}>
                    <SelectTrigger id="price-sort" className="h-9">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="low-to-high">Low to High</SelectItem>
                      <SelectItem value="high-to-low">High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-xs text-muted-foreground">Availability</Label>
                  <div className="flex items-center space-x-2 h-9">
                    <Switch
                      id="availability"
                      checked={showAvailableOnly}
                      onCheckedChange={setShowAvailableOnly}
                    />
                    <Label htmlFor="availability" className="text-sm cursor-pointer">
                      Available Only
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredJobs.length} Jobs Available {selectedCategory !== "all" && `in ${jobCategories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or view all categories.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-base mb-3">{job.company}</CardDescription>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.postedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span>{job.rating}</span>
                          <span>({job.reviews} reviews)</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {job.description}
                      </p>

                      {/* Requirements */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.requirements.map((req: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        <Badge variant={job.available ? "default" : "destructive"} className="text-xs">
                          {job.available ? "Available" : "Not Available"}
                        </Badge>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="text-right sm:text-right">
                      <div className="flex items-center gap-1 text-2xl font-bold text-primary justify-end">
                        <IndianRupee className="w-6 h-6" />
                        <span>{job.salary}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        per day
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Contact Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCall(job.title, job.phoneNumber)}
                        className="flex items-center gap-2 flex-1"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      
                      {/* Apply Button */}
                      <Button
                        onClick={() => handleApply(job.id, job.title)}
                        className="sm:w-auto w-full shadow-medium hover:shadow-strong"
                      >
                        Apply Now
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Need Help Finding the Right Job?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contact our support team for personalized job recommendations
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = 'tel:+918904051999'}
              >
                Get Job Assistance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jobs;
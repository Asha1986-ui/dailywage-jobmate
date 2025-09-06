import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
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
  Star
} from "lucide-react";

const Jobs = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Job categories
  const jobCategories = [
    { id: "all", name: t("worker.allJobTypes") },
    { id: "household", name: t("services.household") },
    { id: "repair", name: t("services.repair") },
    { id: "emergency", name: t("services.emergency") },
    { id: "event", name: t("services.event") },
    { id: "personal", name: t("services.personal") },
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
        requirements: ["Experience in house cleaning", "Own cleaning supplies preferred"]
      },
      {
        id: "h2", 
        title: "Part-time Cook",
        company: "Family Kitchen",
        location: "Indiranagar, Bengaluru",
        salary: 600,
        type: "Daily",
        rating: 4.5,
        reviews: 32,
        postedTime: "4 hours ago",
        phoneNumber: "+91 9876543211",
        description: "Cook South Indian meals for small family",
        requirements: ["South Indian cooking", "Vegetarian meals", "2+ years experience"]
      },
      {
        id: "h3",
        title: "Laundry Assistant", 
        company: "Fresh Clean Laundry",
        location: "HSR Layout, Bengaluru",
        salary: 350,
        type: "Daily",
        rating: 4.1,
        reviews: 15,
        postedTime: "6 hours ago",
        phoneNumber: "+91 9876543212",
        description: "Handle washing, drying and ironing of clothes",
        requirements: ["Machine operation", "Ironing skills", "Quality focus"]
      }
    ],
    repair: [
      {
        id: "r1",
        title: "Plumber Assistant",
        company: "Fix-It Solutions",
        location: "Whitefield, Bengaluru",
        salary: 500,
        type: "Daily",
        rating: 4.3,
        reviews: 25,
        postedTime: "1 hour ago",
        phoneNumber: "+91 9876543213",
        description: "Assist senior plumber with residential repairs and installations",
        requirements: ["Basic plumbing knowledge", "Tool handling", "Physical fitness"]
      },
      {
        id: "r2",
        title: "Electrician Helper",
        company: "PowerTech Services", 
        location: "Jayanagar, Bengaluru",
        salary: 550,
        type: "Daily",
        rating: 4.4,
        reviews: 41,
        postedTime: "3 hours ago",
        phoneNumber: "+91 9876543214",
        description: "Support electrician with wiring and appliance installations",
        requirements: ["Electrical basics", "Safety awareness", "Tool familiarity"]
      },
      {
        id: "r3",
        title: "Carpenter Assistant",
        company: "Wood Craft Co.",
        location: "Marathahalli, Bengaluru", 
        salary: 450,
        type: "Daily",
        rating: 4.0,
        reviews: 12,
        postedTime: "5 hours ago",
        phoneNumber: "+91 9876543215",
        description: "Help with furniture repair and woodwork projects",
        requirements: ["Basic carpentry", "Measuring skills", "Hand tools experience"]
      }
    ],
    emergency: [
      {
        id: "e1",
        title: "Delivery Executive",
        company: "Quick Delivery",
        location: "Bangalore Central",
        salary: 300,
        type: "Per delivery",
        rating: 4.2,
        reviews: 89,
        postedTime: "30 minutes ago",
        phoneNumber: "+91 9876543216",
        description: "Fast delivery of packages and documents across the city",
        requirements: ["Own vehicle", "License", "Mobile phone", "Local area knowledge"]
      },
      {
        id: "e2",
        title: "Emergency Driver",
        company: "City Cabs",
        location: "All Bangalore",
        salary: 800,
        type: "Daily",
        rating: 4.6,
        reviews: 156,
        postedTime: "1 hour ago",
        phoneNumber: "+91 9876543217",
        description: "Emergency and on-demand driving services",
        requirements: ["Valid driving license", "Clean record", "Vehicle available", "24/7 availability"]
      }
    ],
    event: [
      {
        id: "v1",
        title: "Event Setup Assistant",
        company: "Grand Events",
        location: "Palace Grounds, Bengaluru",
        salary: 600,
        type: "Daily",
        rating: 4.3,
        reviews: 67,
        postedTime: "2 hours ago",
        phoneNumber: "+91 9876543218",
        description: "Setup and manage wedding and corporate events",
        requirements: ["Physical fitness", "Team work", "Event experience preferred"]
      },
      {
        id: "v2",
        title: "Catering Helper",
        company: "Tasty Bites Catering",
        location: "JP Nagar, Bengaluru",
        salary: 400,
        type: "Daily", 
        rating: 4.1,
        reviews: 33,
        postedTime: "4 hours ago",
        phoneNumber: "+91 9876543219",
        description: "Assist in food preparation and serving at events",
        requirements: ["Food handling", "Serving experience", "Hygiene awareness"]
      }
    ],
    personal: [
      {
        id: "p1",
        title: "Personal Fitness Trainer",
        company: "FitLife Gym",
        location: "Koramangala, Bengaluru", 
        salary: 800,
        type: "Daily",
        rating: 4.7,
        reviews: 94,
        postedTime: "3 hours ago",
        phoneNumber: "+91 9876543220",
        description: "Provide personal training sessions at home and gym",
        requirements: ["Fitness certification", "Training experience", "Nutrition knowledge"]
      },
      {
        id: "p2",
        title: "Pet Care Assistant",
        company: "Happy Paws",
        location: "Indiranagar, Bengaluru",
        salary: 350,
        type: "Daily",
        rating: 4.4,
        reviews: 28,
        postedTime: "5 hours ago",
        phoneNumber: "+91 9876543221",
        description: "Take care of pets including walking, feeding and grooming", 
        requirements: ["Love for animals", "Basic pet care", "Reliable schedule"]
      }
    ]
  };

  // Get filtered jobs based on category and search
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

    return allJobs;
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    toast({
      title: t("worker.applicationSent"),
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            {t("worker.title")}
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
                placeholder={t("worker.searchPlaceholder")}
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
        </div>

        {/* Jobs Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredJobs.length} {t("worker.availableJobs")} {selectedCategory !== "all" && `in ${jobCategories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or browse all categories.</p>
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
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="text-right sm:text-right">
                      <div className="flex items-center gap-1 text-2xl font-bold text-primary justify-end">
                        <IndianRupee className="w-6 h-6" />
                        <span>{job.salary}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("worker.perDay")}
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
                      {t("worker.call")}
                    </Button>
                    
                    {/* Apply Button */}
                    <Button
                      onClick={() => handleApply(job.id, job.title)}
                      className="sm:w-auto w-full shadow-medium hover:shadow-strong"
                    >
                      {t("worker.applyNow")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Need Help Finding the Right Job?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contact our support team for personalized job recommendations
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
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
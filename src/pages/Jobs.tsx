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
  const { t, language } = useLanguage();
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
        title: t("jobs.household.houseCleaningAssistant.title"),
        company: t("jobs.household.houseCleaningAssistant.company"),
        location: t("jobs.locations.koramangala"),
        salary: 400,
        type: t("jobs.types.daily"),
        rating: 4.2,
        reviews: 18,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "2"),
        phoneNumber: "+91 9876543210",
        description: t("jobs.household.houseCleaningAssistant.description"),
        requirements: [
          t("jobs.household.houseCleaningAssistant.req1"),
          t("jobs.household.houseCleaningAssistant.req2")
        ]
      },
      {
        id: "h2", 
        title: t("jobs.household.partTimeCook.title"),
        company: t("jobs.household.partTimeCook.company"),
        location: t("jobs.locations.indiranagar"),
        salary: 600,
        type: t("jobs.types.daily"),
        rating: 4.5,
        reviews: 32,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "4"),
        phoneNumber: "+91 9876543211",
        description: t("jobs.household.partTimeCook.description"),
        requirements: [
          t("jobs.household.partTimeCook.req1"),
          t("jobs.household.partTimeCook.req2"),
          t("jobs.household.partTimeCook.req3")
        ]
      },
      {
        id: "h3",
        title: t("jobs.household.laundryAssistant.title"),
        company: t("jobs.household.laundryAssistant.company"),
        location: t("jobs.locations.hsrLayout"),
        salary: 350,
        type: t("jobs.types.daily"),
        rating: 4.1,
        reviews: 15,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "6"),
        phoneNumber: "+91 9876543212",
        description: t("jobs.household.laundryAssistant.description"),
        requirements: [
          t("jobs.household.laundryAssistant.req1"),
          t("jobs.household.laundryAssistant.req2"),
          t("jobs.household.laundryAssistant.req3")
        ]
      }
    ],
    repair: [
      {
        id: "r1",
        title: t("jobs.repair.plumberAssistant.title"),
        company: t("jobs.repair.plumberAssistant.company"),
        location: t("jobs.locations.whitefield"),
        salary: 500,
        type: t("jobs.types.daily"),
        rating: 4.3,
        reviews: 25,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "1"),
        phoneNumber: "+91 9876543213",
        description: t("jobs.repair.plumberAssistant.description"),
        requirements: [
          t("jobs.repair.plumberAssistant.req1"),
          t("jobs.repair.plumberAssistant.req2"),
          t("jobs.repair.plumberAssistant.req3")
        ]
      },
      {
        id: "r2",
        title: t("jobs.repair.electricianHelper.title"),
        company: t("jobs.repair.electricianHelper.company"), 
        location: t("jobs.locations.jayanagar"),
        salary: 550,
        type: t("jobs.types.daily"),
        rating: 4.4,
        reviews: 41,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "3"),
        phoneNumber: "+91 9876543214",
        description: t("jobs.repair.electricianHelper.description"),
        requirements: [
          t("jobs.repair.electricianHelper.req1"),
          t("jobs.repair.electricianHelper.req2"),
          t("jobs.repair.electricianHelper.req3")
        ]
      },
      {
        id: "r3",
        title: t("jobs.repair.carpenterAssistant.title"),
        company: t("jobs.repair.carpenterAssistant.company"),
        location: t("jobs.locations.marathahalli"), 
        salary: 450,
        type: t("jobs.types.daily"),
        rating: 4.0,
        reviews: 12,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "5"),
        phoneNumber: "+91 9876543215",
        description: t("jobs.repair.carpenterAssistant.description"),
        requirements: [
          t("jobs.repair.carpenterAssistant.req1"),
          t("jobs.repair.carpenterAssistant.req2"),
          t("jobs.repair.carpenterAssistant.req3")
        ]
      }
    ],
    emergency: [
      {
        id: "e1",
        title: t("jobs.emergency.deliveryExecutive.title"),
        company: t("jobs.emergency.deliveryExecutive.company"),
        location: t("jobs.locations.bangaloreCentral"),
        salary: 300,
        type: t("jobs.types.perDelivery"),
        rating: 4.2,
        reviews: 89,
        postedTime: t("jobs.time.minutesAgo").replace("{{minutes}}", "30"),
        phoneNumber: "+91 9876543216",
        description: t("jobs.emergency.deliveryExecutive.description"),
        requirements: [
          t("jobs.emergency.deliveryExecutive.req1"),
          t("jobs.emergency.deliveryExecutive.req2"),
          t("jobs.emergency.deliveryExecutive.req3"),
          t("jobs.emergency.deliveryExecutive.req4")
        ]
      },
      {
        id: "e2",
        title: t("jobs.emergency.emergencyDriver.title"),
        company: t("jobs.emergency.emergencyDriver.company"),
        location: t("jobs.locations.allBangalore"),
        salary: 800,
        type: t("jobs.types.daily"),
        rating: 4.6,
        reviews: 156,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "1"),
        phoneNumber: "+91 9876543217",
        description: t("jobs.emergency.emergencyDriver.description"),
        requirements: [
          t("jobs.emergency.emergencyDriver.req1"),
          t("jobs.emergency.emergencyDriver.req2"),
          t("jobs.emergency.emergencyDriver.req3"),
          t("jobs.emergency.emergencyDriver.req4")
        ]
      }
    ],
    event: [
      {
        id: "v1",
        title: t("jobs.event.eventSetupAssistant.title"),
        company: t("jobs.event.eventSetupAssistant.company"),
        location: t("jobs.locations.palaceGrounds"),
        salary: 600,
        type: t("jobs.types.daily"),
        rating: 4.3,
        reviews: 67,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "2"),
        phoneNumber: "+91 9876543218",
        description: t("jobs.event.eventSetupAssistant.description"),
        requirements: [
          t("jobs.event.eventSetupAssistant.req1"),
          t("jobs.event.eventSetupAssistant.req2"),
          t("jobs.event.eventSetupAssistant.req3")
        ]
      },
      {
        id: "v2",
        title: t("jobs.event.cateringHelper.title"),
        company: t("jobs.event.cateringHelper.company"),
        location: t("jobs.locations.jpNagar"),
        salary: 400,
        type: t("jobs.types.daily"), 
        rating: 4.1,
        reviews: 33,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "4"),
        phoneNumber: "+91 9876543219",
        description: t("jobs.event.cateringHelper.description"),
        requirements: [
          t("jobs.event.cateringHelper.req1"),
          t("jobs.event.cateringHelper.req2"),
          t("jobs.event.cateringHelper.req3")
        ]
      }
    ],
    personal: [
      {
        id: "p1",
        title: t("jobs.personal.personalFitnessTrainer.title"),
        company: t("jobs.personal.personalFitnessTrainer.company"),
        location: t("jobs.locations.koramangala"), 
        salary: 800,
        type: t("jobs.types.daily"),
        rating: 4.7,
        reviews: 94,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "3"),
        phoneNumber: "+91 9876543220",
        description: t("jobs.personal.personalFitnessTrainer.description"),
        requirements: [
          t("jobs.personal.personalFitnessTrainer.req1"),
          t("jobs.personal.personalFitnessTrainer.req2"),
          t("jobs.personal.personalFitnessTrainer.req3")
        ]
      },
      {
        id: "p2",
        title: t("jobs.personal.petCareAssistant.title"),
        company: t("jobs.personal.petCareAssistant.company"),
        location: t("jobs.locations.indiranagar"),
        salary: 350,
        type: t("jobs.types.daily"),
        rating: 4.4,
        reviews: 28,
        postedTime: t("jobs.time.hoursAgo").replace("{{hours}}", "5"),
        phoneNumber: "+91 9876543221",
        description: t("jobs.personal.petCareAssistant.description"), 
        requirements: [
          t("jobs.personal.petCareAssistant.req1"),
          t("jobs.personal.petCareAssistant.req2"),
          t("jobs.personal.petCareAssistant.req3")
        ]
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
            {t("jobs.subtitle")}
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
                <h3 className="text-lg font-semibold mb-2">{t("jobs.noJobsFound")}</h3>
                <p className="text-muted-foreground">{t("jobs.noJobsMessage")}</p>
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
                          <span>({job.reviews} {t("jobs.reviews")})</span>
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
                {t("jobs.helpTitle")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("jobs.helpDescription")}
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = 'tel:+918904051999'}
              >
                {t("jobs.getAssistance")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jobs;
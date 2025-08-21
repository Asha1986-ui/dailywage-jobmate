import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MapPin, DollarSign, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const jobTypes = ["Construction", "Plumbing", "Electrical", "Painting", "Carpentry", "Masonry"];

// Mock posted jobs data
const mockPostedJobs = [
  {
    id: 1,
    title: "Construction Helper",
    location: "Koramangala, Bangalore",
    payment: "₹800/day",
    jobType: "Construction",
    description: "Need 2 helpers for concrete work. Experience preferred.",
    status: "Active",
    applications: 12,
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Painter",
    location: "Indiranagar, Bangalore",
    payment: "₹700/day",
    jobType: "Painting",
    description: "Interior painting work for 3BHK apartment.",
    status: "Filled",
    applications: 8,
    postedDate: "2024-01-10"
  }
];

const EmployerDashboard = () => {
  const { t } = useLanguage();
  const [showJobForm, setShowJobForm] = useState(false);
  const [postedJobs, setPostedJobs] = useState(mockPostedJobs);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    payment: "",
    jobType: "",
    contact: "",
    requirements: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just show success message
    alert(t('employer.jobPosted'));
    
    // Add to posted jobs (mock)
    const newJob = {
      id: postedJobs.length + 1,
      title: formData.title,
      location: formData.location,
      payment: formData.payment,
      jobType: formData.jobType,
      description: formData.description,
      status: "Active",
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    
    setPostedJobs(prev => [newJob, ...prev]);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      payment: "",
      jobType: "",
      contact: "",
      requirements: ""
    });
    
    setShowJobForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary py-6 px-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="text-2xl font-bold text-white">
              Work<span className="text-accent">Link</span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Profile
              </Button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t('employer.title')}
          </h1>
          <p className="text-white/90 text-lg">
            Post jobs and find skilled workers
          </p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={() => setShowJobForm(!showJobForm)}
            size="lg" 
            className="shadow-medium"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {showJobForm ? t('employer.cancel') : t('employer.postNew')}
          </Button>
          
          <Button variant="outline" size="lg" className="shadow-soft">
            <Eye className="mr-2 h-5 w-5" />
            {t('employer.viewApplications')}
          </Button>
        </div>

        {/* Job Posting Form */}
        {showJobForm && (
          <Card className="p-6 mb-8 shadow-medium bg-gradient-card border-0">
            <h2 className="text-2xl font-bold mb-6">{t('employer.postNew')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('employer.jobTitle')}</label>
                  <Input
                    placeholder="e.g., Construction Helper"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className="shadow-soft"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('employer.jobType')}</label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                    <SelectTrigger className="shadow-soft">
                      <SelectValue placeholder={`Select ${t('employer.jobType')}`} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg z-50">
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('employer.jobDescription')}</label>
                <Textarea
                  placeholder="Describe the work that needs to be done..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                  rows={4}
                  className="shadow-soft"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('employer.location')}</label>
                  <Input
                    placeholder="e.g., Koramangala, Bangalore"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                    className="shadow-soft"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('employer.payment')}</label>
                  <Input
                    placeholder="e.g., ₹800"
                    value={formData.payment}
                    onChange={(e) => handleInputChange("payment", e.target.value)}
                    required
                    className="shadow-soft"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('employer.contact')}</label>
                <Input
                  placeholder="Your phone number"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  required
                  className="shadow-soft"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('employer.requirements')}</label>
                <Textarea
                  placeholder="Any specific skills or experience required..."
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  rows={3}
                  className="shadow-soft"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg" className="shadow-medium">
                  {t('employer.postJob')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowJobForm(false)}
                  className="shadow-soft"
                >
                  {t('employer.cancel')}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Posted Jobs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('employer.postedJobs')}</h2>
          
          <div className="grid gap-6">
            {postedJobs.map((job) => (
              <Card key={job.id} className="p-6 shadow-soft bg-gradient-card border-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.payment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                          {job.status === "Active" ? t('employer.active') : job.status}
                        </Badge>
                        <Badge variant="outline">
                          {job.jobType}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-4">{job.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Posted: {job.postedDate}</span>
                      <span className="font-medium text-primary">{job.applications} {t('employer.applications')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:w-40">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="mr-1 h-4 w-4" />
                      {t('employer.viewApplications')}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-1 h-4 w-4" />
                      {t('employer.edit')}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
                      <Trash2 className="mr-1 h-4 w-4" />
                      {t('employer.delete')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
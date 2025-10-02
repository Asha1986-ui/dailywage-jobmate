import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, DollarSign, Search, Filter, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: 'Construction Helper',
    employer: 'BuildRight Constructions',
    location: 'Koramangala, Bangalore',
    distance: '2.3 km',
    payment: '₹800/day',
    jobType: 'Construction',
    description: 'Need 2 helpers for concrete work and material handling',
    contact: '+91 98765 43210',
    postedHours: 2
  },
  {
    id: 2,
    title: 'Plumber Assistant',
    employer: 'Quick Fix Services',
    location: 'Whitefield, Bangalore',
    distance: '5.1 km',
    payment: '₹600/day',
    jobType: 'Plumbing',
    description: 'Assist with plumbing repairs and installations',
    contact: '+91 87654 32109',
    postedHours: 4
  },
  {
    id: 3,
    title: 'Painter',
    employer: 'Home Makeover',
    location: 'Indiranagar, Bangalore',
    distance: '3.7 km',
    payment: '₹700/day',
    jobType: 'Painting',
    description: 'Interior wall painting for residential apartment',
    contact: '+91 76543 21098',
    postedHours: 6
  },
  {
    id: 4,
    title: 'Electrician Helper',
    employer: 'Power Tech Solutions',
    location: 'HSR Layout, Bangalore',
    distance: '4.2 km',
    payment: '₹650/day',
    jobType: 'Electrical',
    description: 'Assist with electrical wiring and fixture installation',
    contact: '+91 65432 10987',
    postedHours: 24
  }
];

const jobTypes = ['Construction', 'Plumbing', 'Electrical', 'Painting', 'Carpentry', 'Masonry'];

const WorkerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  // Helper function to format posted time
  const formatPostedTime = (hours: number) => {
    if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      return days === 1 ? `1 day ago` : `${days} days ago`;
    }
  };

  const handleSearch = () => {
    let filtered = mockJobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.employer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedJobType !== "All") {
      filtered = filtered.filter(job => job.jobType === selectedJobType);
    }
    
    setFilteredJobs(filtered);
  };

  const handleApply = (jobId: number) => {
    alert('Application sent successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary py-6 px-4 shadow-medium">
        <div className="container mx-auto">
          <div className="mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-white">
              Work<span className="text-accent">Xpress</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/worker-booking-history">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Job History
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Profile
              </Button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Worker Dashboard
          </h1>
          <p className="text-white/90 text-lg">
            Find daily wage jobs near you
          </p>
        </div>
      </header>

      {/* Search & Filter Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <Input
                placeholder="Search jobs, employers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg shadow-soft"
              />
            </div>
            
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger className="md:w-48 h-12 shadow-soft">
                <SelectValue placeholder="All Job Types" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="All">All Job Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch} className="h-12 px-6 shadow-soft">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Available Jobs ({filteredJobs.length})
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-6 shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-muted-foreground font-medium">{job.employer}</p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {job.jobType}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                        <span className="text-primary font-medium">({job.distance})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatPostedTime(job.postedHours)}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-4">{job.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <DollarSign className="h-5 w-5" />
                        {job.payment}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {job.contact}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:w-32">
                    <Button 
                      onClick={() => handleApply(job.id)}
                      className="w-full shadow-soft"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`tel:${job.contact}`, '_self')}
                    >
                      <Phone className="mr-1 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerDashboard;
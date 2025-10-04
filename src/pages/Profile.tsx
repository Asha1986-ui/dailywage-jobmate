import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, User, Briefcase, MapPin, Plus, Clock, ArrowLeft, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Booking {
  id: string;
  user_name: string;
  service_id: string;
  service_name: string;
  location: string;
  price: number;
  status: string;
  created_at: string;
}

// Mock worker jobs
const mockWorkerJobs = [
  {
    id: 1,
    serviceType: "Construction Work",
    customerName: "Rajesh Kumar",
    date: "2024-01-15",
    time: "09:00 AM - 05:00 PM",
    payment: "₹800",
    status: "Completed"
  },
  {
    id: 2,
    serviceType: "Plumbing Repair",
    customerName: "Anitha Reddy",
    date: "2024-01-18",
    time: "02:00 PM - 04:00 PM",
    payment: "₹600",
    status: "Completed"
  },
  {
    id: 3,
    serviceType: "Electrical Installation",
    customerName: "Priya Sharma",
    date: "2024-01-22",
    time: "11:00 AM - 02:00 PM",
    payment: "₹650",
    status: "Pending"
  }
];

const Profile = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [myServices, setMyServices] = useState([
    {
      id: 1,
      name: "Plumbing Services",
      price: "₹500/hour",
      location: "Koramangala, Bengaluru",
      available: true,
      description: "Expert plumbing services for residential and commercial properties"
    }
  ]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      setUserBookings(data || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load booking history");
    } finally {
      setLoadingBookings(false);
    }
  };

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    location: "",
    available: true,
    description: ""
  });

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newService.name || !newService.price || !newService.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const service = {
      id: myServices.length + 1,
      name: newService.name,
      price: newService.price,
      location: newService.location,
      available: newService.available,
      description: newService.description
    };

    setMyServices([...myServices, service]);
    setNewService({ name: "", price: "", location: "", available: true, description: "" });
    setShowServiceForm(false);
    toast.success("Service posted successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Profile
          </h1>
          <p className="text-white/90 text-lg">
            Manage your services and bookings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="user">User (Customer)</TabsTrigger>
              <TabsTrigger value="worker">Worker (Service Provider)</TabsTrigger>
            </TabsList>

            {/* User Tab */}
            <TabsContent value="user" className="space-y-8">
              {/* Find & Book Services Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Find & Book Services</h2>
                <Card className="p-6 shadow-soft bg-gradient-card border-0">
                  <p className="text-muted-foreground mb-4">
                    Browse and book professional services in your area
                  </p>
                  <Link to="/">
                    <Button className="w-full md:w-auto">
                      Browse Services
                    </Button>
                  </Link>
                </Card>
              </div>

              {/* User Booking History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Booking History</h2>
                  <Link to="/booking-history">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>

                {loadingBookings ? (
                  <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </Card>
                ) : userBookings.length === 0 ? (
                  <Card className="p-8 text-center shadow-soft bg-gradient-card border-0">
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Link to="/">
                      <Button size="sm">Browse Services</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {userBookings.map((booking) => (
                      <Card key={booking.id} className="p-4 shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">
                                  {booking.service_name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <Badge className="bg-success text-success-foreground">
                                {booking.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(booking.created_at), "MMM dd, yyyy 'at' hh:mm a")}</span>
                              </div>
                              <div className="flex items-center gap-2 font-semibold text-primary">
                                <IndianRupee className="h-4 w-4" />
                                <span>₹{booking.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Worker Tab */}
            <TabsContent value="worker" className="space-y-8">
              {/* Post Service Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">My Services</h2>
                  <Button onClick={() => setShowServiceForm(!showServiceForm)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Service
                  </Button>
                </div>

                {/* Service Form */}
                {showServiceForm && (
                  <Card className="p-6 shadow-soft bg-gradient-card border-0 mb-6">
                    <form onSubmit={handleSubmitService} className="space-y-4">
                      <div>
                        <Label htmlFor="serviceName">Service Name *</Label>
                        <Input
                          id="serviceName"
                          placeholder="e.g., Cook, Plumber, Maid"
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="price">Price per hour/day *</Label>
                        <Input
                          id="price"
                          placeholder="e.g., ₹500/hour"
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Koramangala, Bengaluru"
                          value={newService.location}
                          onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="availability"
                          checked={newService.available}
                          onCheckedChange={(checked) => setNewService({ ...newService, available: checked })}
                        />
                        <Label htmlFor="availability">Available</Label>
                      </div>

                      <div>
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of your service"
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">Submit Service</Button>
                        <Button type="button" variant="outline" onClick={() => setShowServiceForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}

                {/* My Services List */}
                <div className="grid gap-4">
                  {myServices.map((service) => (
                    <Card key={service.id} className="p-6 shadow-soft bg-gradient-card border-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {service.name}
                              </h3>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                <span className="font-medium">{service.price}</span>
                              </div>
                            </div>
                            <Badge className={service.available ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"}>
                              {service.available ? "Available" : "Not Available"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{service.location}</span>
                          </div>

                          {service.description && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {service.description}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 md:w-32">
                          <Button variant="outline" size="sm" className="w-full">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Worker Booking History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Job History</h2>
                  <Link to="/worker-booking-history">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4">
                  {mockWorkerJobs.map((job) => (
                    <Card key={job.id} className="p-4 shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">
                                {job.serviceType}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>Customer: {job.customerName}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{job.time}</span>
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-primary">
                              <DollarSign className="h-4 w-4" />
                              {job.payment}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Profile;
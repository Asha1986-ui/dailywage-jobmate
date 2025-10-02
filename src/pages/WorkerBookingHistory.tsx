import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, User, Briefcase, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock worker job history data
const mockJobHistory = [
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
    serviceType: "Painting Work",
    customerName: "Venkatesh M.",
    date: "2024-01-20",
    time: "08:00 AM - 06:00 PM",
    payment: "₹1,200",
    status: "Completed"
  },
  {
    id: 4,
    serviceType: "Electrical Installation",
    customerName: "Priya Sharma",
    date: "2024-01-22",
    time: "11:00 AM - 02:00 PM",
    payment: "₹650",
    status: "Pending"
  },
  {
    id: 5,
    serviceType: "Construction Helper",
    customerName: "Mohan Rao",
    date: "2024-01-19",
    time: "07:00 AM - 04:00 PM",
    payment: "₹750",
    status: "Completed"
  },
  {
    id: 6,
    serviceType: "Carpentry Work",
    customerName: "Deepak Singh",
    date: "2024-01-12",
    time: "10:00 AM - 05:00 PM",
    payment: "₹900",
    status: "Completed"
  }
];

const WorkerBookingHistory = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalEarnings = mockJobHistory
    .filter(job => job.status === "Completed")
    .reduce((sum, job) => sum + parseInt(job.payment.replace(/[₹,]/g, "")), 0);

  const completedJobs = mockJobHistory.filter(job => job.status === "Completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary py-6 px-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/worker-dashboard">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Job History
          </h1>
          <p className="text-white/90 text-lg">
            View all your completed and pending jobs
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-6 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 shadow-soft bg-gradient-card border-0">
              <div className="text-sm text-muted-foreground mb-1">Total Jobs</div>
              <div className="text-2xl font-bold">{mockJobHistory.length}</div>
            </Card>
            <Card className="p-4 shadow-soft bg-gradient-card border-0">
              <div className="text-sm text-muted-foreground mb-1">Completed</div>
              <div className="text-2xl font-bold text-green-600">{completedJobs}</div>
            </Card>
            <Card className="p-4 shadow-soft bg-gradient-card border-0">
              <div className="text-sm text-muted-foreground mb-1">Total Earnings</div>
              <div className="text-2xl font-bold text-primary">₹{totalEarnings.toLocaleString()}</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Job History List */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Recent Jobs
            </h2>
          </div>

          <div className="grid gap-6">
            {mockJobHistory.map((job) => (
              <Card key={job.id} className="p-6 shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {job.serviceType}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span className="font-medium">Customer: {job.customerName}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{job.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <DollarSign className="h-5 w-5" />
                      {job.status === "Completed" ? "Received: " : "Expected: "}
                      {job.payment}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:w-32">
                    {job.status === "Completed" && (
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    )}
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

export default WorkerBookingHistory;

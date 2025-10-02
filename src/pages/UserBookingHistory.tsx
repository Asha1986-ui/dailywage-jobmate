import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, User, Briefcase, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    serviceName: "Maid Services",
    providerName: "Kavitha R.",
    date: "2024-01-15",
    time: "09:00 AM",
    price: "₹600",
    status: "Completed"
  },
  {
    id: 2,
    serviceName: "Plumber Services",
    providerName: "Ramesh Kumar",
    date: "2024-01-18",
    time: "02:00 PM",
    price: "₹850",
    status: "Completed"
  },
  {
    id: 3,
    serviceName: "Cook Services",
    providerName: "Lakshmi S.",
    date: "2024-01-20",
    time: "06:00 PM",
    price: "₹700",
    status: "Pending"
  },
  {
    id: 4,
    serviceName: "Electrician Services",
    providerName: "Suresh Babu",
    date: "2024-01-22",
    time: "11:00 AM",
    price: "₹950",
    status: "Completed"
  },
  {
    id: 5,
    serviceName: "Carpenter Services",
    providerName: "Manjunath",
    date: "2024-01-25",
    time: "03:00 PM",
    price: "₹1,200",
    status: "Cancelled"
  }
];

const UserBookingHistory = () => {
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
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Booking History
          </h1>
          <p className="text-white/90 text-lg">
            View all your past service bookings
          </p>
        </div>
      </header>

      {/* Bookings List */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Total Bookings: {mockBookings.length}
            </h2>
          </div>

          <div className="grid gap-6">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="p-6 shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {booking.serviceName}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{booking.providerName}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <DollarSign className="h-5 w-5" />
                        {booking.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:w-32">
                    {booking.status === "Completed" && (
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    )}
                    {booking.status === "Pending" && (
                      <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                        Cancel
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

export default UserBookingHistory;

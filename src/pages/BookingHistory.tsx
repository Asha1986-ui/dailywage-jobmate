import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, MapPin, IndianRupee, CheckCircle } from "lucide-react";
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

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch booking history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-5xl px-4 py-6">
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

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Booking History
          </h1>
          <p className="text-muted-foreground text-lg">
            View all your service bookings
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Bookings Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven't made any bookings yet. Start exploring services!
              </p>
              <Link to="/">
                <Button>Explore Services</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-xl">{booking.service_name}</CardTitle>
                    <Badge className="bg-success text-success-foreground w-fit">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">
                        ₹{booking.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {format(new Date(booking.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      Booked by: <span className="font-medium text-foreground">{booking.user_name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;

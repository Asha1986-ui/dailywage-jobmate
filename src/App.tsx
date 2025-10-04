import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Auth from "./pages/Auth";
import ServiceDetails from "./pages/ServiceDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserBookingHistory from "./pages/UserBookingHistory";
import WorkerBookingHistory from "./pages/WorkerBookingHistory";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/service/:serviceKey" element={<ServiceDetails />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/user-booking-history" element={<UserBookingHistory />} />
          <Route path="/worker-booking-history" element={<WorkerBookingHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

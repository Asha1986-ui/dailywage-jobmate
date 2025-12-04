import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Star,
  MapPin,
  Phone,
  ArrowLeft,
  IndianRupee,
  Calendar,
  Search,
  Filter,
  X,
} from "lucide-react";
import DiabetesMealPlan from "@/components/DiabetesMealPlan";

const ServiceDetails = () => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();

  // Provider data by service type
  const providersByService: Record<string, Array<{
    name: string;
    phone: string;
    rating: number;
    reviews: number;
    experience: string;
    location: string;
    price: number;
    priceUnit: string;
    verified?: boolean;
  }>> = {
    cook: [
      {
        name: "Asha",
        phone: "8904051999",
        rating: 4.9,
        reviews: 156,
        experience: "6+ years",
        location: "Bengaluru",
        price: 1,
        priceUnit: "day",
        verified: true,
      },
      {
        name: "Kavitha",
        phone: "9876543210",
        rating: 4.6,
        reviews: 89,
        experience: "4 years",
        location: "Koramangala, Bengaluru",
        price: 550,
        priceUnit: "day",
      },
      {
        name: "Ramesh",
        phone: "9988776655",
        rating: 4.7,
        reviews: 102,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 600,
        priceUnit: "day",
      },
      {
        name: "Priya",
        phone: "9123456789",
        rating: 4.5,
        reviews: 76,
        experience: "3 years",
        location: "Whitefield, Bengaluru",
        price: 520,
        priceUnit: "day",
      },
      {
        name: "Manjunath",
        phone: "9876012345",
        rating: 4.8,
        reviews: 118,
        experience: "7 years",
        location: "BTM Layout, Bengaluru",
        price: 580,
        priceUnit: "day",
      },
    ],
    maid: [
      {
        name: "Lakshmi",
        phone: "9845123456",
        rating: 4.7,
        reviews: 134,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 400,
        priceUnit: "day",
      },
      {
        name: "Sunitha",
        phone: "9876234567",
        rating: 4.6,
        reviews: 98,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 380,
        priceUnit: "day",
      },
      {
        name: "Renuka",
        phone: "9123567890",
        rating: 4.8,
        reviews: 156,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 450,
        priceUnit: "day",
      },
      {
        name: "Geetha",
        phone: "9988123456",
        rating: 4.5,
        reviews: 87,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 370,
        priceUnit: "day",
      },
      {
        name: "Suma",
        phone: "9765432109",
        rating: 4.9,
        reviews: 201,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 480,
        priceUnit: "day",
      },
    ],
    plumber: [
      {
        name: "Kumar",
        phone: "9845678901",
        rating: 4.6,
        reviews: 112,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 350,
        priceUnit: "hour",
      },
      {
        name: "Ravi",
        phone: "9876345678",
        rating: 4.8,
        reviews: 145,
        experience: "9 years",
        location: "Indiranagar, Bengaluru",
        price: 400,
        priceUnit: "hour",
      },
      {
        name: "Suresh",
        phone: "9123678901",
        rating: 4.7,
        reviews: 128,
        experience: "6 years",
        location: "Whitefield, Bengaluru",
        price: 320,
        priceUnit: "hour",
      },
      {
        name: "Prakash",
        phone: "9988234567",
        rating: 4.5,
        reviews: 93,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 300,
        priceUnit: "hour",
      },
      {
        name: "Venkatesh",
        phone: "9765123456",
        rating: 4.9,
        reviews: 178,
        experience: "11 years",
        location: "Jayanagar, Bengaluru",
        price: 450,
        priceUnit: "hour",
      },
    ],
    electrician: [
      {
        name: "Rajesh",
        phone: "9845234567",
        rating: 4.7,
        reviews: 156,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 380,
        priceUnit: "hour",
      },
      {
        name: "Mohan",
        phone: "9876456789",
        rating: 4.6,
        reviews: 121,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 350,
        priceUnit: "hour",
      },
      {
        name: "Dinesh",
        phone: "9123789012",
        rating: 4.8,
        reviews: 167,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 420,
        priceUnit: "hour",
      },
      {
        name: "Naveen",
        phone: "9988345678",
        rating: 4.5,
        reviews: 98,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 330,
        priceUnit: "hour",
      },
      {
        name: "Arun",
        phone: "9765234567",
        rating: 4.9,
        reviews: 189,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 480,
        priceUnit: "hour",
      },
    ],
    carpenter: [
      {
        name: "Shankar",
        phone: "9845345678",
        rating: 4.6,
        reviews: 134,
        experience: "9 years",
        location: "Koramangala, Bengaluru",
        price: 400,
        priceUnit: "hour",
      },
      {
        name: "Nagaraj",
        phone: "9876567890",
        rating: 4.7,
        reviews: 145,
        experience: "7 years",
        location: "Indiranagar, Bengaluru",
        price: 380,
        priceUnit: "hour",
      },
      {
        name: "Krishnan",
        phone: "9123890123",
        rating: 4.8,
        reviews: 167,
        experience: "11 years",
        location: "Whitefield, Bengaluru",
        price: 450,
        priceUnit: "hour",
      },
      {
        name: "Murthy",
        phone: "9988456789",
        rating: 4.5,
        reviews: 101,
        experience: "6 years",
        location: "BTM Layout, Bengaluru",
        price: 360,
        priceUnit: "hour",
      },
      {
        name: "Srinivas",
        phone: "9765345678",
        rating: 4.9,
        reviews: 198,
        experience: "13 years",
        location: "Jayanagar, Bengaluru",
        price: 500,
        priceUnit: "hour",
      },
    ],
    painter: [
      {
        name: "Basavaraj",
        phone: "9845456789",
        rating: 4.6,
        reviews: 112,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 320,
        priceUnit: "hour",
      },
      {
        name: "Shivu",
        phone: "9876678901",
        rating: 4.7,
        reviews: 128,
        experience: "8 years",
        location: "Indiranagar, Bengaluru",
        price: 350,
        priceUnit: "hour",
      },
      {
        name: "Ganesh",
        phone: "9123901234",
        rating: 4.8,
        reviews: 145,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 400,
        priceUnit: "hour",
      },
      {
        name: "Raju",
        phone: "9988567890",
        rating: 4.5,
        reviews: 89,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 300,
        priceUnit: "hour",
      },
      {
        name: "Mahesh",
        phone: "9765456789",
        rating: 4.9,
        reviews: 176,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 450,
        priceUnit: "hour",
      },
    ],
    laundry: [
      {
        name: "CleanPro Services",
        phone: "9845567890",
        rating: 4.7,
        reviews: 234,
        experience: "6 years",
        location: "Koramangala, Bengaluru",
        price: 80,
        priceUnit: "kg",
      },
      {
        name: "FreshWash",
        phone: "9876789012",
        rating: 4.6,
        reviews: 189,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 70,
        priceUnit: "kg",
      },
      {
        name: "QuickClean Laundry",
        phone: "9123012345",
        rating: 4.8,
        reviews: 267,
        experience: "8 years",
        location: "Whitefield, Bengaluru",
        price: 90,
        priceUnit: "kg",
      },
      {
        name: "SparkleWash",
        phone: "9988678901",
        rating: 4.5,
        reviews: 156,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 65,
        priceUnit: "kg",
      },
      {
        name: "PremiumClean",
        phone: "9765567890",
        rating: 4.9,
        reviews: 312,
        experience: "10 years",
        location: "Jayanagar, Bengaluru",
        price: 100,
        priceUnit: "kg",
      },
    ],
    babysitting: [
      {
        name: "Meena",
        phone: "9845678912",
        rating: 4.8,
        reviews: 145,
        experience: "6 years",
        location: "Koramangala, Bengaluru",
        price: 250,
        priceUnit: "hour",
      },
      {
        name: "Saroja",
        phone: "9876890123",
        rating: 4.7,
        reviews: 123,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 230,
        priceUnit: "hour",
      },
      {
        name: "Deepa",
        phone: "9123123456",
        rating: 4.9,
        reviews: 178,
        experience: "8 years",
        location: "Whitefield, Bengaluru",
        price: 280,
        priceUnit: "hour",
      },
      {
        name: "Pushpa",
        phone: "9988789012",
        rating: 4.6,
        reviews: 98,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 220,
        priceUnit: "hour",
      },
      {
        name: "Savitha",
        phone: "9765678901",
        rating: 4.8,
        reviews: 167,
        experience: "7 years",
        location: "Jayanagar, Bengaluru",
        price: 260,
        priceUnit: "hour",
      },
    ],
    elderly: [
      {
        name: "Shantha",
        phone: "9845789023",
        rating: 4.9,
        reviews: 156,
        experience: "10 years",
        location: "Koramangala, Bengaluru",
        price: 450,
        priceUnit: "day",
      },
      {
        name: "Parvathi",
        phone: "9876901234",
        rating: 4.8,
        reviews: 134,
        experience: "8 years",
        location: "Indiranagar, Bengaluru",
        price: 420,
        priceUnit: "day",
      },
      {
        name: "Kamalamma",
        phone: "9123234567",
        rating: 4.7,
        reviews: 112,
        experience: "7 years",
        location: "Whitefield, Bengaluru",
        price: 400,
        priceUnit: "day",
      },
      {
        name: "Rukmini",
        phone: "9988890123",
        rating: 4.8,
        reviews: 145,
        experience: "9 years",
        location: "BTM Layout, Bengaluru",
        price: 430,
        priceUnit: "day",
      },
      {
        name: "Lalitha",
        phone: "9765789012",
        rating: 4.9,
        reviews: 189,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 480,
        priceUnit: "day",
      },
    ],
    appliance: [
      {
        name: "TechFix Services",
        phone: "9845890134",
        rating: 4.7,
        reviews: 178,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 300,
        priceUnit: "visit",
      },
      {
        name: "HomeRepair Pro",
        phone: "9876012345",
        rating: 4.6,
        reviews: 145,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 280,
        priceUnit: "visit",
      },
      {
        name: "QuickFix Appliances",
        phone: "9123345678",
        rating: 4.8,
        reviews: 198,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 350,
        priceUnit: "visit",
      },
      {
        name: "ApplianceCare",
        phone: "9988901234",
        rating: 4.5,
        reviews: 123,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 260,
        priceUnit: "visit",
      },
      {
        name: "ExpertRepair",
        phone: "9765890123",
        rating: 4.9,
        reviews: 223,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 400,
        priceUnit: "visit",
      },
    ],
    delivery: [
      {
        name: "FastDeliver",
        phone: "9845901245",
        rating: 4.6,
        reviews: 267,
        experience: "5 years",
        location: "Koramangala, Bengaluru",
        price: 50,
        priceUnit: "delivery",
      },
      {
        name: "QuickShip",
        phone: "9876123456",
        rating: 4.7,
        reviews: 234,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 60,
        priceUnit: "delivery",
      },
      {
        name: "SwiftCourier",
        phone: "9123456789",
        rating: 4.8,
        reviews: 312,
        experience: "8 years",
        location: "Whitefield, Bengaluru",
        price: 70,
        priceUnit: "delivery",
      },
      {
        name: "ExpressRun",
        phone: "9988012345",
        rating: 4.5,
        reviews: 189,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 45,
        priceUnit: "delivery",
      },
      {
        name: "RapidMove",
        phone: "9765901234",
        rating: 4.9,
        reviews: 356,
        experience: "10 years",
        location: "Jayanagar, Bengaluru",
        price: 80,
        priceUnit: "delivery",
      },
    ],
    bikemechanic: [
      {
        name: "Vijay Mechanics",
        phone: "9845012356",
        rating: 4.7,
        reviews: 156,
        experience: "9 years",
        location: "Koramangala, Bengaluru",
        price: 200,
        priceUnit: "service",
      },
      {
        name: "BikeDoctor",
        phone: "9876234567",
        rating: 4.6,
        reviews: 134,
        experience: "7 years",
        location: "Indiranagar, Bengaluru",
        price: 180,
        priceUnit: "service",
      },
      {
        name: "TwoWheeler Care",
        phone: "9123567890",
        rating: 4.8,
        reviews: 189,
        experience: "11 years",
        location: "Whitefield, Bengaluru",
        price: 250,
        priceUnit: "service",
      },
      {
        name: "SpeedFix Bikes",
        phone: "9988123456",
        rating: 4.5,
        reviews: 112,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 160,
        priceUnit: "service",
      },
      {
        name: "ProBike Service",
        phone: "9765012345",
        rating: 4.9,
        reviews: 223,
        experience: "13 years",
        location: "Jayanagar, Bengaluru",
        price: 280,
        priceUnit: "service",
      },
    ],
    towing: [
      {
        name: "24x7 Towing",
        phone: "9845123467",
        rating: 4.7,
        reviews: 198,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 1500,
        priceUnit: "service",
      },
      {
        name: "RoadRescue",
        phone: "9876345678",
        rating: 4.6,
        reviews: 167,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 1400,
        priceUnit: "service",
      },
      {
        name: "QuickTow Services",
        phone: "9123678901",
        rating: 4.8,
        reviews: 234,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 1700,
        priceUnit: "service",
      },
      {
        name: "Emergency Towing",
        phone: "9988234567",
        rating: 4.5,
        reviews: 145,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 1300,
        priceUnit: "service",
      },
      {
        name: "SafeTow",
        phone: "9765123456",
        rating: 4.9,
        reviews: 278,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 1800,
        priceUnit: "service",
      },
    ],
    watertanker: [
      {
        name: "AquaSupply",
        phone: "9845234578",
        rating: 4.6,
        reviews: 156,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 800,
        priceUnit: "tanker",
      },
      {
        name: "FreshWater Services",
        phone: "9876456789",
        rating: 4.7,
        reviews: 178,
        experience: "8 years",
        location: "Indiranagar, Bengaluru",
        price: 850,
        priceUnit: "tanker",
      },
      {
        name: "CleanWater Tankers",
        phone: "9123789012",
        rating: 4.8,
        reviews: 201,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 950,
        priceUnit: "tanker",
      },
      {
        name: "QuickWater",
        phone: "9988345678",
        rating: 4.5,
        reviews: 134,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 750,
        priceUnit: "tanker",
      },
      {
        name: "PureWater Supply",
        phone: "9765234567",
        rating: 4.9,
        reviews: 245,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 1000,
        priceUnit: "tanker",
      },
    ],
    catering: [
      {
        name: "Tasty Bites Catering",
        phone: "9845345689",
        rating: 4.8,
        reviews: 234,
        experience: "9 years",
        location: "Koramangala, Bengaluru",
        price: 250,
        priceUnit: "person",
      },
      {
        name: "Royal Feast",
        phone: "9876567890",
        rating: 4.7,
        reviews: 198,
        experience: "7 years",
        location: "Indiranagar, Bengaluru",
        price: 230,
        priceUnit: "person",
      },
      {
        name: "DelightCaters",
        phone: "9123890123",
        rating: 4.9,
        reviews: 278,
        experience: "11 years",
        location: "Whitefield, Bengaluru",
        price: 300,
        priceUnit: "person",
      },
      {
        name: "FoodFiesta",
        phone: "9988456789",
        rating: 4.6,
        reviews: 167,
        experience: "6 years",
        location: "BTM Layout, Bengaluru",
        price: 220,
        priceUnit: "person",
      },
      {
        name: "GourmetCatering",
        phone: "9765345678",
        rating: 4.8,
        reviews: 256,
        experience: "10 years",
        location: "Jayanagar, Bengaluru",
        price: 280,
        priceUnit: "person",
      },
    ],
    decoration: [
      {
        name: "EventDecor Pro",
        phone: "9845456790",
        rating: 4.7,
        reviews: 189,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 15000,
        priceUnit: "event",
      },
      {
        name: "PartyDecor",
        phone: "9876678901",
        rating: 4.6,
        reviews: 156,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 12000,
        priceUnit: "event",
      },
      {
        name: "CelebrationThemes",
        phone: "9123901234",
        rating: 4.8,
        reviews: 223,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 18000,
        priceUnit: "event",
      },
      {
        name: "FestiveDecor",
        phone: "9988567890",
        rating: 4.5,
        reviews: 134,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 10000,
        priceUnit: "event",
      },
      {
        name: "DreamDecor",
        phone: "9765456789",
        rating: 4.9,
        reviews: 267,
        experience: "12 years",
        location: "Jayanagar, Bengaluru",
        price: 20000,
        priceUnit: "event",
      },
    ],
    cleaning: [
      {
        name: "SparkleClean",
        phone: "9845567901",
        rating: 4.7,
        reviews: 178,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 5000,
        priceUnit: "event",
      },
      {
        name: "DeepClean Services",
        phone: "9876789012",
        rating: 4.6,
        reviews: 145,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 4500,
        priceUnit: "event",
      },
      {
        name: "ProfessionalClean",
        phone: "9123012345",
        rating: 4.8,
        reviews: 201,
        experience: "9 years",
        location: "Whitefield, Bengaluru",
        price: 6000,
        priceUnit: "event",
      },
      {
        name: "QuickClean Team",
        phone: "9988678901",
        rating: 4.5,
        reviews: 123,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 4000,
        priceUnit: "event",
      },
      {
        name: "EliteCleaners",
        phone: "9765567890",
        rating: 4.9,
        reviews: 234,
        experience: "11 years",
        location: "Jayanagar, Bengaluru",
        price: 7000,
        priceUnit: "event",
      },
    ],
    salon: [
      {
        name: "StyleHub",
        phone: "9845678923",
        rating: 4.8,
        reviews: 267,
        experience: "8 years",
        location: "Koramangala, Bengaluru",
        price: 800,
        priceUnit: "session",
      },
      {
        name: "GlamourSalon",
        phone: "9876890134",
        rating: 4.7,
        reviews: 223,
        experience: "7 years",
        location: "Indiranagar, Bengaluru",
        price: 750,
        priceUnit: "session",
      },
      {
        name: "BeautyParlour",
        phone: "9123123467",
        rating: 4.9,
        reviews: 312,
        experience: "10 years",
        location: "Whitefield, Bengaluru",
        price: 900,
        priceUnit: "session",
      },
      {
        name: "TrendyLooks",
        phone: "9988789023",
        rating: 4.6,
        reviews: 189,
        experience: "6 years",
        location: "BTM Layout, Bengaluru",
        price: 700,
        priceUnit: "session",
      },
      {
        name: "EliteSalon",
        phone: "9765678912",
        rating: 4.8,
        reviews: 278,
        experience: "9 years",
        location: "Jayanagar, Bengaluru",
        price: 850,
        priceUnit: "session",
      },
    ],
    fitness: [
      {
        name: "FitCoach Ravi",
        phone: "9845789034",
        rating: 4.8,
        reviews: 156,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 1500,
        priceUnit: "month",
      },
      {
        name: "PowerFit Suresh",
        phone: "9876901245",
        rating: 4.7,
        reviews: 134,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 1400,
        priceUnit: "month",
      },
      {
        name: "ProTrainer Anil",
        phone: "9123234578",
        rating: 4.9,
        reviews: 189,
        experience: "9 years",
        location: "Whitefield, Bengaluru",
        price: 1800,
        priceUnit: "month",
      },
      {
        name: "BodyFit Manoj",
        phone: "9988890134",
        rating: 4.6,
        reviews: 112,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 1300,
        priceUnit: "month",
      },
      {
        name: "EliteFitness Kiran",
        phone: "9765789023",
        rating: 4.8,
        reviews: 178,
        experience: "8 years",
        location: "Jayanagar, Bengaluru",
        price: 1600,
        priceUnit: "month",
      },
    ],
    petcare: [
      {
        name: "PawsCare",
        phone: "9845890145",
        rating: 4.8,
        reviews: 198,
        experience: "6 years",
        location: "Koramangala, Bengaluru",
        price: 400,
        priceUnit: "day",
      },
      {
        name: "HappyPets",
        phone: "9876012356",
        rating: 4.7,
        reviews: 167,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 380,
        priceUnit: "day",
      },
      {
        name: "PetLove Services",
        phone: "9123345689",
        rating: 4.9,
        reviews: 223,
        experience: "8 years",
        location: "Whitefield, Bengaluru",
        price: 450,
        priceUnit: "day",
      },
      {
        name: "FurryFriends",
        phone: "9988901245",
        rating: 4.6,
        reviews: 145,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 360,
        priceUnit: "day",
      },
      {
        name: "PetParadise",
        phone: "9765890134",
        rating: 4.8,
        reviews: 189,
        experience: "7 years",
        location: "Jayanagar, Bengaluru",
        price: 420,
        priceUnit: "day",
      },
    ],
    driver: [
      {
        name: "Sunil Kumar",
        phone: "9845901256",
        rating: 4.7,
        reviews: 178,
        experience: "10 years",
        location: "Koramangala, Bengaluru",
        price: 15000,
        priceUnit: "month",
      },
      {
        name: "Prakash",
        phone: "9876123467",
        rating: 4.6,
        reviews: 156,
        experience: "8 years",
        location: "Indiranagar, Bengaluru",
        price: 14000,
        priceUnit: "month",
      },
      {
        name: "Manjunath",
        phone: "9123456790",
        rating: 4.8,
        reviews: 201,
        experience: "12 years",
        location: "Whitefield, Bengaluru",
        price: 16000,
        priceUnit: "month",
      },
      {
        name: "Ravi",
        phone: "9988012356",
        rating: 4.5,
        reviews: 134,
        experience: "7 years",
        location: "BTM Layout, Bengaluru",
        price: 13000,
        priceUnit: "month",
      },
      {
        name: "Anand",
        phone: "9765901245",
        rating: 4.9,
        reviews: 234,
        experience: "15 years",
        location: "Jayanagar, Bengaluru",
        price: 18000,
        priceUnit: "month",
      },
    ],
    grocery: [
      {
        name: "ShopAssist",
        phone: "9845012367",
        rating: 4.7,
        reviews: 245,
        experience: "5 years",
        location: "Koramangala, Bengaluru",
        price: 150,
        priceUnit: "trip",
      },
      {
        name: "GroceryHelper",
        phone: "9876234578",
        rating: 4.6,
        reviews: 198,
        experience: "4 years",
        location: "Indiranagar, Bengaluru",
        price: 130,
        priceUnit: "trip",
      },
      {
        name: "QuickGrocery",
        phone: "9123567901",
        rating: 4.8,
        reviews: 289,
        experience: "7 years",
        location: "Whitefield, Bengaluru",
        price: 180,
        priceUnit: "trip",
      },
      {
        name: "ShopEasy",
        phone: "9988123467",
        rating: 4.5,
        reviews: 167,
        experience: "3 years",
        location: "BTM Layout, Bengaluru",
        price: 120,
        priceUnit: "trip",
      },
      {
        name: "PremiumGrocery",
        phone: "9765012356",
        rating: 4.9,
        reviews: 312,
        experience: "8 years",
        location: "Jayanagar, Bengaluru",
        price: 200,
        priceUnit: "trip",
      },
    ],
    pickdrop: [
      {
        name: "SafeRide",
        phone: "9845123478",
        rating: 4.7,
        reviews: 234,
        experience: "6 years",
        location: "Koramangala, Bengaluru",
        price: 200,
        priceUnit: "trip",
      },
      {
        name: "QuickPickup",
        phone: "9876345689",
        rating: 4.6,
        reviews: 189,
        experience: "5 years",
        location: "Indiranagar, Bengaluru",
        price: 180,
        priceUnit: "trip",
      },
      {
        name: "ReliableTransport",
        phone: "9123678912",
        rating: 4.8,
        reviews: 267,
        experience: "8 years",
        location: "Whitefield, Bengaluru",
        price: 250,
        priceUnit: "trip",
      },
      {
        name: "SwiftPickDrop",
        phone: "9988234578",
        rating: 4.5,
        reviews: 156,
        experience: "4 years",
        location: "BTM Layout, Bengaluru",
        price: 160,
        priceUnit: "trip",
      },
      {
        name: "ComfortRide",
        phone: "9765123467",
        rating: 4.9,
        reviews: 298,
        experience: "9 years",
        location: "Jayanagar, Bengaluru",
        price: 280,
        priceUnit: "trip",
      },
    ],
    instanthelp: [
      {
        name: "QuickHelp Services",
        phone: "9845234589",
        rating: 4.8,
        reviews: 312,
        experience: "7 years",
        location: "Koramangala, Bengaluru",
        price: 300,
        priceUnit: "hour",
      },
      {
        name: "FastAssist",
        phone: "9876456790",
        rating: 4.7,
        reviews: 267,
        experience: "6 years",
        location: "Indiranagar, Bengaluru",
        price: 280,
        priceUnit: "hour",
      },
      {
        name: "EmergencyHelp",
        phone: "9123789023",
        rating: 4.9,
        reviews: 356,
        experience: "9 years",
        location: "Whitefield, Bengaluru",
        price: 350,
        priceUnit: "hour",
      },
      {
        name: "ReadyHelp",
        phone: "9988345689",
        rating: 4.6,
        reviews: 223,
        experience: "5 years",
        location: "BTM Layout, Bengaluru",
        price: 260,
        priceUnit: "hour",
      },
      {
        name: "24x7 Assist",
        phone: "9765234578",
        rating: 4.8,
        reviews: 289,
        experience: "8 years",
        location: "Jayanagar, Bengaluru",
        price: 320,
        priceUnit: "hour",
      },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);

  // Get providers for the current service, or use default
  const providers = providersByService[serviceKey || ""] || providersByService.default;

  // Get unique locations for filter
  const uniqueLocations = Array.from(new Set(providers.map(p => p.location)));

  // Get max price for slider
  const maxProviderPrice = Math.max(...providers.map(p => p.price));

  // Filter providers based on search and filters
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "all" || provider.location === locationFilter;
    const matchesRating = provider.rating >= minRating;
    const matchesPrice = provider.price <= maxPrice;

    return matchesSearch && matchesLocation && matchesRating && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("all");
    setMinRating(0);
    setMaxPrice(100000);
  };

  const hasActiveFilters = searchTerm || locationFilter !== "all" || minRating > 0 || maxPrice < 100000;

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleBookNow = (provider: typeof providers[0]) => {
    navigate(`/booking/${serviceKey}`, {
      state: {
        serviceName: serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) : "Service",
        provider: provider,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-2xl px-4 py-6">
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

        {/* Service Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) + " Service" : "Service Details"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {providers.length > 1 ? "Choose from our verified service providers" : "Professional and verified service provider"}
          </p>
        </div>

        {/* Diabetes Meal Plan - Only for Cook Service */}
        {serviceKey === "cook" && <DiabetesMealPlan />}

        {/* Search and Filter Section */}
        {providers.length > 1 && (
          <Card className="mb-6 bg-gradient-card border-0 shadow-medium">
            <CardContent className="pt-6">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Filter Toggle Button */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-2 text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Filter Controls */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  {/* Location Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger id="location" className="bg-background">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="all">All Locations</SelectItem>
                        {uniqueLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="rating">Minimum Rating</Label>
                    <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
                      <SelectTrigger id="rating" className="bg-background">
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.7">4.7+ Stars</SelectItem>
                        <SelectItem value="4.8">4.8+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Max Price: ₹{maxPrice === 100000 ? "Any" : maxPrice}
                    </Label>
                    <Slider
                      id="price"
                      min={0}
                      max={maxProviderPrice > 0 ? maxProviderPrice * 1.2 : 10000}
                      step={10}
                      value={[maxPrice]}
                      onValueChange={(values) => setMaxPrice(values[0])}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Showing {filteredProviders.length} of {providers.length} provider{providers.length !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results Message */}
        {filteredProviders.length === 0 && (
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Provider Cards - Full Width Rectangular Layout */}
        <div className="space-y-4">
          {filteredProviders.map((provider, index) => (
            <Card 
              key={index}
              className={`bg-card border shadow-sm hover:shadow-md transition-all ${
                provider.verified ? "ring-2 ring-primary/50" : ""
              }`}
            >
              <CardContent className="p-4">
                {/* Desktop: Horizontal Layout | Mobile: Vertical Layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Side: Provider Details */}
                  <div className="flex-1 space-y-2">
                    {/* Provider Name and Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg">
                        {provider.name}
                      </h3>
                      {provider.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ⭐ Verified
                        </Badge>
                      )}
                    </div>

                    {/* Info Row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{provider.rating}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-1 font-semibold text-primary">
                        <span>₹{provider.price}/{provider.priceUnit}</span>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{provider.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex gap-2 md:flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 md:flex-none md:w-24 h-9"
                      onClick={() => handleCall(provider.phone)}
                    >
                      <Phone className="w-4 h-4 md:mr-1" />
                      <span className="hidden md:inline">Call</span>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 md:flex-none md:w-28 h-9 bg-primary hover:bg-primary/90"
                      onClick={() => handleBookNow(provider)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

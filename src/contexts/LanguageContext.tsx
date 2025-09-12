import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'kn' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.findJobs': 'Find Jobs',
    'header.postJobs': 'Post Jobs',
    
    // Hero Section
    'hero.tagline': 'Connecting daily wage workers with job opportunities near them',
    
    // How WorkXpress Works
    'features.title': 'How WorkXpress Works',
    'features.findJobs.title': 'Find Jobs Nearby',
    'features.findJobs.description': 'Discover daily wage opportunities in your area. Location-based matching ensures you find work close to home.',
    'features.postJobs.title': 'Easy Job Posting',
    'features.postJobs.description': 'Employers can quickly post jobs with details, location, and payment information. Simple and efficient.',
    'features.trusted.title': 'Trusted Platform',
    'features.trusted.description': 'Built for reliability and trust. Connect with verified employers and skilled workers in your community.',
    
    // Ready Section
    'cta.title': 'Ready to Get Started?',
    'cta.description': 'Join thousands of workers and employers already using WorkXpress to build better opportunities.',
    'cta.startFinding': 'Start Finding Work',
    'cta.startHiring': 'Start Hiring',
    
    // Worker Dashboard
    'worker.title': 'Find Jobs Near You',
    'worker.searchPlaceholder': 'Search for jobs...',
    'worker.allJobTypes': 'All Job Types',
    'worker.applyNow': 'Apply Now',
    'worker.call': 'Call',
    'worker.perDay': 'per day',
    'worker.applicationSent': 'Application sent successfully!',
    'worker.profile': 'Profile',
    'worker.search': 'Search',
    'worker.moreFilters': 'More Filters',
    'worker.availableJobs': 'Available Jobs',
    'worker.hoursAgo': 'hours ago',
    'worker.dayAgo': 'day ago',
    'worker.daysAgo': 'days ago',
    
    // Job Types
    'jobTypes.construction': 'Construction',
    'jobTypes.plumbing': 'Plumbing',
    'jobTypes.electrical': 'Electrical',
    'jobTypes.painting': 'Painting',
    'jobTypes.carpentry': 'Carpentry',
    'jobTypes.masonry': 'Masonry',
    
    // Job Titles
    'jobs.constructionHelper': 'Construction Helper',
    'jobs.plumberAssistant': 'Plumber Assistant',
    'jobs.painter': 'Painter',
    'jobs.electricianHelper': 'Electrician Helper',
    
    // Job Descriptions
    'jobs.constructionHelperDesc': 'Need 2 helpers for concrete work. Experience preferred.',
    'jobs.plumberAssistantDesc': 'Assist senior plumber with residential repairs.',
    'jobs.painterDesc': 'Interior painting work for 3BHK apartment.',
    'jobs.electricianHelperDesc': 'Support electrician with wiring and installations.',
    
    // Employer Names
    'employers.buildRight': 'BuildRight Construction',
    'employers.quickFix': 'Quick Fix Solutions',
    'employers.homeMakeover': 'Home Makeover',
    'employers.powerTech': 'PowerTech Services',
    
    // Employer Dashboard
    'employer.title': 'Employer Dashboard',
    'employer.postNew': 'Post New Job',
    'employer.jobTitle': 'Job Title',
    'employer.jobDescription': 'Job Description',
    'employer.location': 'Location',
    'employer.payment': 'Payment per Day',
    'employer.jobType': 'Job Type',
    'employer.contact': 'Contact Number',
    'employer.requirements': 'Requirements',
    'employer.postJob': 'Post Job',
    'employer.cancel': 'Cancel',
    'employer.postedJobs': 'Your Posted Jobs',
    'employer.applications': 'Applications',
    'employer.viewApplications': 'View Applications',
    'employer.edit': 'Edit',
    'employer.delete': 'Delete',
    'employer.active': 'Active',
    'employer.jobPosted': 'Job posted successfully!',
    
    // Services
    'services.title': 'Our Services',
    'services.searchPlaceholder': 'Search for services...',
    'services.bookNow': 'Book Now',
    
    // Service Details
    'serviceDetails.serviceTitle': 'Service Details',
    'serviceDetails.serviceDescription': 'Choose from our verified service providers',
    'serviceDetails.availableProviders': 'Available Service Providers',
    'serviceDetails.reviews': 'reviews',
    'serviceDetails.per': 'per',
    'serviceDetails.hour': 'hour',
    'serviceDetails.day': 'day',
    'serviceDetails.available': 'Available',
    'serviceDetails.availableNow': 'Available Now',
    'serviceDetails.busy': 'Busy',
    'serviceDetails.unavailable': 'Not Available',
    'serviceDetails.call': 'Call',
    'serviceDetails.message': 'Message',
    'serviceDetails.bookNow': 'Book Now',
    'serviceDetails.bookInstant': 'Book Instantly',
    'serviceDetails.booked': 'Booked',
    'serviceDetails.phone': 'phone',
    'serviceDetails.needHelp': 'Need Help?',
    'serviceDetails.contactSupport': 'Our customer support team is here to assist you',
    'serviceDetails.contactUs': 'Contact Us',
    'serviceDetails.bookingConfirmed': 'Booking Confirmed!',
    'serviceDetails.bookingWith': 'Your booking with',
    'serviceDetails.contactSoon': 'They will contact you soon.',
    'serviceDetails.contactInitiated': 'Contact Initiated',
    'serviceDetails.contacting': 'Contacting',
    'serviceDetails.via': 'via',
    'serviceDetails.arrivesIn': 'Arrives in',
    'serviceDetails.mins': 'mins',
    'serviceDetails.instantService': 'Get Service in 30 Minutes',
    'serviceDetails.fastDelivery': 'Quick response guaranteed',
    
    // Common
    'common.back': 'Back',
    
    // Voice Search
    'voiceSearch.title': 'Tap and Speak to Find a Service',
    'voiceSearch.subtitle': 'Speak your service request in your preferred language',
    'voiceSearch.searchAlternative': 'Or search manually below',
    
    // Service Categories
    'services.household': 'Household Services',
    'services.repair': 'Repair & Maintenance',
    'services.emergency': 'Quick Emergency Services',
    'services.event': 'Event Support',
    'services.personal': 'Personal Services',
    'services.special': 'Special Anytime Anywhere',
    
    // Household Services
    'services.maid.title': 'Maid Services',
    'services.maid.desc': 'Professional home cleaning',
    'services.cook.title': 'Cook Services',
    'services.cook.desc': 'On-demand home cooking',
    'services.laundry.title': 'Laundry & Ironing',
    'services.laundry.desc': 'Wash and iron clothes',
    'services.babysitting.title': 'Baby Sitting',
    'services.babysitting.desc': 'Trusted babysitters',
    'services.elderly.title': 'Elderly Care',
    'services.elderly.desc': 'Caretakers for seniors',
    
    // Repair & Maintenance
    'services.plumber.title': 'Plumber',
    'services.plumber.desc': 'Quick plumbing solutions',
    'services.electrician.title': 'Electrician',
    'services.electrician.desc': 'Skilled electricians',
    'services.carpenter.title': 'Carpenter',
    'services.carpenter.desc': 'Furniture repair and woodwork',
    'services.painter.title': 'Painter',
    'services.painter.desc': 'Professional painting service',
    'services.appliance.title': 'Appliance Repair',
    'services.appliance.desc': 'AC, fridge, washing machine repair',
    
    // Emergency Services
    'services.delivery.title': 'Instant Delivery Boy',
    'services.delivery.desc': 'Get anything delivered',
    'services.bikemechanic.title': 'Bike Mechanic',
    'services.bikemechanic.desc': 'On-the-spot bike repair',
    'services.towing.title': 'Car Towing',
    'services.towing.desc': 'Fast and reliable towing',
    'services.watertanker.title': 'Water Tanker',
    'services.watertanker.desc': 'Emergency water booking',
    
    // Event Support
    'services.catering.title': 'Catering Assistants',
    'services.catering.desc': 'Helpers for catering',
    'services.decoration.title': 'Decoration Helpers',
    'services.decoration.desc': 'Support for event decorations',
    'services.cleaning.title': 'Cleaning Crew',
    'services.cleaning.desc': 'Post-event clean-up',
    
    // Personal Services
    'services.salon.title': 'Home Salon',
    'services.salon.desc': 'Beauty services at home',
    'services.fitness.title': 'Fitness Trainer',
    'services.fitness.desc': 'Personal trainer at home',
    'services.petcare.title': 'Pet Care',
    'services.petcare.desc': 'Pet walking and care',
    
    // Special Services
    'services.driver.title': 'On-Demand Driver',
    'services.driver.desc': 'Hire a driver anytime',
    'services.grocery.title': 'Grocery Runner',
    'services.grocery.desc': 'Quick grocery delivery',
    'services.pickdrop.title': 'Pick & Drop Service',
    'services.pickdrop.desc': 'For parcels or essentials',
    'services.instanthelp.title': 'Instant Home Help',
    'services.instanthelp.desc': 'Any service in 10 minutes',
    
    auth: {
      loginTitle: "Login to Your Account",
      signupTitle: "Create New Account", 
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Login",
      signupButton: "Sign Up",
      forgotPassword: "Forgot Password?",
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: "Already have an account? Login",
      resetPassword: "Reset Password",
      resetButton: "Send Reset Link",
      backToLogin: "Back to Login"
    },
    jobs: {
      subtitle: "Discover daily wage opportunities in your area",
      noJobsFound: "No Jobs Found",
      noJobsMessage: "Try adjusting your search criteria or browse all categories.",
      reviews: "reviews",
      helpTitle: "Need Help Finding the Right Job?",
      helpDescription: "Contact our support team for personalized job recommendations",
      getAssistance: "Get Job Assistance",
      types: {
        daily: "Daily",
        perDelivery: "Per delivery"
      },
      time: {
        hoursAgo: "{{hours}} hours ago",
        minutesAgo: "{{minutes}} minutes ago"
      },
      locations: {
        koramangala: "Koramangala, Bengaluru",
        indiranagar: "Indiranagar, Bengaluru",
        hsrLayout: "HSR Layout, Bengaluru",
        whitefield: "Whitefield, Bengaluru",
        jayanagar: "Jayanagar, Bengaluru",
        marathahalli: "Marathahalli, Bengaluru",
        bangaloreCentral: "Bangalore Central",
        allBangalore: "All Bangalore",
        palaceGrounds: "Palace Grounds, Bengaluru",
        jpNagar: "JP Nagar, Bengaluru"
      },
      household: {
        houseCleaningAssistant: {
          title: "House Cleaning Assistant",
          company: "Clean Home Services",
          description: "Looking for reliable cleaning staff for residential apartments",
          req1: "Experience in house cleaning",
          req2: "Own cleaning supplies preferred"
        },
        partTimeCook: {
          title: "Part-time Cook",
          company: "Family Kitchen",
          description: "Cook South Indian meals for small family",
          req1: "South Indian cooking",
          req2: "Vegetarian meals",
          req3: "2+ years experience"
        },
        laundryAssistant: {
          title: "Laundry Assistant",
          company: "Fresh Clean Laundry",
          description: "Handle washing, drying and ironing of clothes",
          req1: "Machine operation",
          req2: "Ironing skills",
          req3: "Quality focus"
        }
      },
      repair: {
        plumberAssistant: {
          title: "Plumber Assistant",
          company: "Fix-It Solutions",
          description: "Assist senior plumber with residential repairs and installations",
          req1: "Basic plumbing knowledge",
          req2: "Tool handling",
          req3: "Physical fitness"
        },
        electricianHelper: {
          title: "Electrician Helper",
          company: "PowerTech Services",
          description: "Support electrician with wiring and appliance installations",
          req1: "Electrical basics",
          req2: "Safety awareness",
          req3: "Tool familiarity"
        },
        carpenterAssistant: {
          title: "Carpenter Assistant",
          company: "Wood Craft Co.",
          description: "Help with furniture repair and woodwork projects",
          req1: "Basic carpentry",
          req2: "Measuring skills",
          req3: "Hand tools experience"
        }
      },
      emergency: {
        deliveryExecutive: {
          title: "Delivery Executive",
          company: "Quick Delivery",
          description: "Fast delivery of packages and documents across the city",
          req1: "Own vehicle",
          req2: "License",
          req3: "Mobile phone",
          req4: "Local area knowledge"
        },
        emergencyDriver: {
          title: "Emergency Driver",
          company: "City Cabs",
          description: "Emergency and on-demand driving services",
          req1: "Valid driving license",
          req2: "Clean record",
          req3: "Vehicle available",
          req4: "24/7 availability"
        }
      },
      event: {
        eventSetupAssistant: {
          title: "Event Setup Assistant",
          company: "Grand Events",
          description: "Setup and manage wedding and corporate events",
          req1: "Physical fitness",
          req2: "Team work",
          req3: "Event experience preferred"
        },
        cateringHelper: {
          title: "Catering Helper",
          company: "Tasty Bites Catering",
          description: "Assist in food preparation and serving at events",
          req1: "Food handling",
          req2: "Serving experience",
          req3: "Hygiene awareness"
        }
      },
      personal: {
        personalFitnessTrainer: {
          title: "Personal Fitness Trainer",
          company: "FitLife Gym",
          description: "Provide personal training sessions at home and gym",
          req1: "Fitness certification",
          req2: "Training experience",
          req3: "Nutrition knowledge"
        },
        petCareAssistant: {
          title: "Pet Care Assistant",
          company: "Happy Paws",
          description: "Take care of pets including walking, feeding and grooming",
          req1: "Love for animals",
          req2: "Basic pet care",
          req3: "Reliable schedule"
        }
      }
    },

    // Common
    'common.back': 'ಹಿಂದೆ',
      loginTitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಆಗಿ",
      signupTitle: "ಹೊಸ ಖಾತೆ ರಚಿಸಿ", 
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
      loginButton: "ಲಾಗಿನ್",
      signupButton: "ಸೈನ್ ಅಪ್",
      forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
      switchToSignup: "ಖಾತೆ ಇಲ್ಲವೇ? ಸೈನ್ ಅಪ್ ಮಾಡಿ",
      switchToLogin: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಮಾಡಿ",
      resetPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
      resetButton: "ರೀಸೆಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಿ",
      backToLogin: "ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ"
    },
    jobs: {
      subtitle: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ದೈನಂದಿನ ವೇತನದ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
      noJobsFound: "ಯಾವುದೇ ಕೆಲಸ ಸಿಗಲಿಲ್ಲ",
      noJobsMessage: "ನಿಮ್ಮ ಹುಡುಕಾಟ ಮಾನದಂಡಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಎಲ್ಲಾ ವರ್ಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
      reviews: "ವಿಮರ್ಶೆಗಳು",
      helpTitle: "ಸರಿಯಾದ ಕೆಲಸವನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಹಾಯ ಬೇಕೇ?",
      helpDescription: "ವೈಯಕ್ತಿಕ ಕೆಲಸದ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ",
      getAssistance: "ಕೆಲಸದ ಸಹಾಯ ಪಡೆಯಿರಿ",
      types: { daily: "ದೈನಂದಿನ", perDelivery: "ಪ್ರತಿ ವಿತರಣೆಗೆ" },
      time: { hoursAgo: "{{hours}} ಗಂಟೆಗಳ ಹಿಂದೆ", minutesAgo: "{{minutes}} ನಿಮಿಷಗಳ ಹಿಂದೆ" },
      locations: {
        koramangala: "ಕೋರಮಂಗಲ, ಬೆಂಗಳೂರು", indiranagar: "ಇಂದಿರಾನಗರ, ಬೆಂಗಳೂರು",
        hsrLayout: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್, ಬೆಂಗಳೂರು", whitefield: "ವೈಟ್‌ಫೀಲ್ಡ್, ಬೆಂಗಳೂರು",
        jayanagar: "ಜಯನಗರ, ಬೆಂಗಳೂರು", marathahalli: "ಮರಾಠಹಳ್ಳಿ, ಬೆಂಗಳೂರು",
        bangaloreCentral: "ಬೆಂಗಳೂರು ಸೆಂಟ್ರಲ್", allBangalore: "ಎಲ್ಲಾ ಬೆಂಗಳೂರು",
        palaceGrounds: "ಪ್ಯಾಲೇಸ್ ಗ್ರೌಂಡ್ಸ್, ಬೆಂಗಳೂರು", jpNagar: "ಜೆ.ಪಿ. ನಗರ, ಬೆಂಗಳೂರು"
      },
      household: {
        houseCleaningAssistant: { title: "ಮನೆ ಶುಚಿಗೊಳಿಸುವ ಸಹಾಯಕ", company: "ಕ್ಲೀನ್ ಹೋಮ್ ಸರ್ವೀಸಸ್", description: "ವಸತಿ ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳಿಗಾಗಿ ವಿಶ್ವಾಸಯೋಗ್ಯ ಶುಚಿಗೊಳಿಸುವ ಸಿಬ್ಬಂದಿಯನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇವೆ", req1: "ಮನೆ ಶುಚಿಗೊಳಿಸುವ ಅನುಭವ", req2: "ಸ್ವಂತ ಶುಚಿಗೊಳಿಸುವ ಸಾಮಗ್ರಿಗಳು ಆದ್ಯತೆ" },
        partTimeCook: { title: "ಅರ್ಧಾವಧಿ ಅಡುಗೆಯವರು", company: "ಫ್ಯಾಮಿಲಿ ಕಿಚನ್", description: "ಸಣ್ಣ ಕುಟುಂಬಕ್ಕೆ ದಕ್ಷಿಣ ಭಾರತೀಯ ಊಟ ಬಿಸಿ ಮಾಡಿ", req1: "ದಕ್ಷಿಣ ಭಾರತೀಯ ಅಡುಗೆ", req2: "ಸಸ್ಯಾಹಾರಿ ಊಟ", req3: "2+ ವರ್ಷಗಳ ಅನುಭವ" },
        laundryAssistant: { title: "ಲಾಂಡ್ರಿ ಸಹಾಯಕ", company: "ಫ್ರೆಶ್ ಕ್ಲೀನ್ ಲಾಂಡ್ರಿ", description: "ಬಟ್ಟೆಗಳನ್ನು ತೊಳೆಯುವುದು, ಒಣಗಿಸುವುದು ಮತ್ತು ಇಸ್ತ್ರಿ ಮಾಡುವುದು", req1: "ಯಂತ್ರ ಕಾರ್ಯಾಚರಣೆ", req2: "ಇಸ್ತ್ರಿ ಕೌಶಲ್ಯ", req3: "ಗುಣಮಟ್ಟದ ಗಮನ" }
      },
      repair: {
        plumberAssistant: { title: "ಪ್ಲಂಬರ್ ಸಹಾಯಕ", company: "ಫಿಕ್ಸ್-ಇಟ್ ಸೊಲ್ಯೂಷನ್ಸ್", description: "ವಸತಿ ದುರಸ್ತಿ ಮತ್ತು ಸ್ಥಾಪನೆಗಳಲ್ಲಿ ಹಿರಿಯ ಪ್ಲಂಬರ್‌ಗೆ ಸಹಾಯ ಮಾಡಿ", req1: "ಮೂಲಭೂತ ಪ್ಲಂಬಿಂಗ್ ಜ್ಞಾನ", req2: "ಉಪಕರಣ ನಿರ್ವಹಣೆ", req3: "ದೈಹಿಕ ಸಾಮರ್ಥ್ಯ" },
        electricianHelper: { title: "ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ ಸಹಾಯಕ", company: "ಪವರ್‌ಟೆಕ್ ಸರ್ವೀಸಸ್", description: "ವೈರಿಂಗ್ ಮತ್ತು ಉಪಕರಣ ಸ್ಥಾಪನೆಗಳೊಂದಿಗೆ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್‌ಗೆ ಬೆಂಬಲ", req1: "ವಿದ್ಯುತ್ ಮೂಲಭೂತ ತತ್ವಗಳು", req2: "ಸುರಕ್ಷತಾ ಅರಿವು", req3: "ಉಪಕರಣ ಪರಿಚಯ" },
        carpenterAssistant: { title: "ಬಡಗಿ ಸಹಾಯಕ", company: "ವುಡ್ ಕ್ರಾಫ್ಟ್ ಕಂಪನಿ", description: "ಪೀಠೋಪಕರಣ ದುರಸ್ತಿ ಮತ್ತು ಮರದ ಕೆಲಸದ ಯೋಜನೆಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಿ", req1: "ಮೂಲಭೂತ ಬಡಗಿತನ", req2: "ಅಳತೆ ಕೌಶಲ್ಯ", req3: "ಕೈ ಉಪಕರಣಗಳ ಅನುಭವ" }
      },
      emergency: {
        deliveryExecutive: { title: "ವಿತರಣಾ ಕಾರ್ಯನಿರ್ವಾಹಕ", company: "ಕ್ವಿಕ್ ಡೆಲಿವರಿ", description: "ನಗರದಾದ್ಯಂತ ಪ್ಯಾಕೆಟ್‌ಗಳು ಮತ್ತು ದಾಖಲೆಗಳ ವೇಗದ ವಿತರಣೆ", req1: "ಸ್ವಂತ ವಾಹನ", req2: "ಪರವಾನಗಿ", req3: "ಮೊಬೈಲ್ ಫೋನ್", req4: "ಸ್ಥಳೀಯ ಪ್ರದೇಶ ಜ್ಞಾನ" },
        emergencyDriver: { title: "ತುರ್ತು ಚಾಲಕ", company: "ಸಿಟಿ ಕ್ಯಾಬ್ಸ್", description: "ತುರ್ತು ಮತ್ತು ಆನ್-ಡಿಮಾಂಡ್ ಚಾಲನಾ ಸೇವೆಗಳು", req1: "ಮಾನ್ಯ ಚಾಲನಾ ಪರವಾನಗಿ", req2: "ಶುಭ್ರ ದಾಖಲೆ", req3: "ವಾಹನ ಲಭ್ಯ", req4: "24/7 ಲಭ್ಯತೆ" }
      },
      event: {
        eventSetupAssistant: { title: "ಈವೆಂಟ್ ಸೆಟಪ್ ಸಹಾಯಕ", company: "ಗ್ರಾಂಡ್ ಇವೆಂಟ್ಸ್", description: "ವಿವಾಹ ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ಇವೆಂಟ್‌ಗಳನ್ನು ಸೆಟಪ್ ಮತ್ತು ನಿರ್ವಹಿಸಿ", req1: "ದೈಹಿಕ ಸಾಮರ್ಥ್ಯ", req2: "ತಂಡದ ಕೆಲಸ", req3: "ಈವೆಂಟ್ ಅನುಭವ ಆದ್ಯತೆ" },
        cateringHelper: { title: "ಕ್ಯಾಟರಿಂಗ್ ಸಹಾಯಕ", company: "ಟೇಸ್ಟಿ ಬೈಟ್ಸ್ ಕ್ಯಾಟರಿಂಗ್", description: "ಈವೆಂಟ್‌ಗಳಲ್ಲಿ ಆಹಾರ ತಯಾರಿಕೆ ಮತ್ತು ಬಡಿಸುವಲ್ಲಿ ಸಹಾಯ ಮಾಡಿ", req1: "ಆಹಾರ ನಿರ್ವಹಣೆ", req2: "ಬಡಿಸುವ ಅನುಭವ", req3: "ನೈರ್ಮಲ್ಯ ಅರಿವು" }
      },
      personal: {
        personalFitnessTrainer: { title: "ವೈಯಕ್ತಿಕ ಫಿಟ್‌ನೆಸ್ ತರಬೇತುದಾರ", company: "ಫಿಟ್‌ಲೈಫ್ ಜಿಮ್", description: "ಮನೆ ಮತ್ತು ಜಿಮ್‌ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಸೆಷನ್‌ಗಳನ್ನು ಒದಗಿಸಿ", req1: "ಫಿಟ್‌ನೆಸ್ ಪ್ರಮಾಣೀಕರಣ", req2: "ತರಬೇತಿ ಅನುಭವ", req3: "ಪೋಷಣೆ ಜ್ಞಾನ" },
        petCareAssistant: { title: "ಸಾಕು ಪ್ರಾಣಿ ಆರೈಕೆ ಸಹಾಯಕ", company: "ಹ್ಯಾಪಿ ಪಾಸ್", description: "ನಡಿಗೆ, ಆಹಾರ ಮತ್ತು ಗ್ರೂಮಿಂಗ್ ಸೇರಿದಂತೆ ಸಾಕುಪ್ರಾಣಿಗಳನ್ನು ನೋಡಿಕೊಳ್ಳಿ", req1: "ಪ್ರಾಣಿಗಳ ಪ್ರೀತಿ", req2: "ಮೂಲಭೂತ ಪೆಟ್ ಕೇರ್", req3: "ವಿಶ್ವಾಸಯೋಗ್ಯ ವೇಳಾಪಟ್ಟಿ" }
      }
    },

    // Auth translations
    'auth.enterEmail': 'Enter Email Address',
    'auth.verifyCode': 'Verify Code',
    'auth.codeSendDescription': "We'll send you a 6-digit verification code",
    'auth.enterCodeDescription': 'Enter the 6-digit code sent to {email}',
    'auth.emailAddress': 'Email Address',
    'auth.emailPlaceholder': 'Enter your email address',
    'auth.emailNote': "You'll receive a 6-digit verification code via email",
    'auth.sending': 'Sending...',
    'auth.sendCode': 'Send Verification Code',
    'auth.verificationCode': 'Verification Code',
    'auth.codePlaceholder': 'Enter 6-digit code',
    'auth.codeNote': 'Enter the 6-digit code from your email to continue',
    'auth.verifying': 'Verifying...',
    'auth.verifyLogin': 'Verify & Login',
    'auth.changeEmail': 'Change Email Address',
    'auth.resendCode': 'Resend Code',
    'auth.resendTimer': 'Resend Code ({seconds}s)',
    'auth.checkEmail': 'Check your email!',
    'auth.codeSent': "We've sent you a 6-digit verification code.",
    'auth.welcome': 'Welcome!',
    'auth.loginSuccess': 'You have successfully logged in.',
    'auth.error': 'Error',
    'auth.sendCodeError': 'Failed to send verification code. Please try again.',
    'auth.invalidEmail': 'Please enter a valid email address.',
    'auth.emailNotAuthorized': 'This email address is not authorized. Please contact support.',
    'auth.verificationFailed': 'Verification Failed',
    'auth.invalidOtp': 'Invalid or expired OTP. Please try again.',
    'auth.newCodeSent': 'A new 6-digit verification code has been sent to your email.',
    'auth.resendFailed': 'Failed to resend verification code. Please try again.'
  },
  kn: {
    // Header
    'header.findJobs': 'ಕೆಲಸ ಹುಡುಕಿ',
    'header.postJobs': 'ಕೆಲಸ ಪ್ರಕಟಿಸಿ',
    
    // Hero Section
    'hero.tagline': 'ದೈನಂದಿನ ಕೂಲಿ ಕಾರ್ಮಿಕರನ್ನು ಅವರ ಹತ್ತಿರದ ಉದ್ಯೋಗ ಅವಕಾಶಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    
    // How WorkXpress Works
    'features.title': 'ವರ್ಕ್‌ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'features.findJobs.title': 'ಹತ್ತಿರದ ಕೆಲಸ ಹುಡುಕಿ',
    'features.findJobs.description': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ದೈನಂದಿನ ಕೂಲಿ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ. ಸ್ಥಳ-ಆಧಾರಿತ ಹೊಂದಾಣಿಕೆಯು ಮನೆಯ ಹತ್ತಿರ ಕೆಲಸ ಕಂಡುಕೊಳ್ಳಲು ಖಾತ್ರಿ ನೀಡುತ್ತದೆ.',
    'features.postJobs.title': 'ಸುಲಭ ಕೆಲಸ ಪ್ರಕಟಣೆ',
    'features.postJobs.description': 'ಉದ್ಯೋಗದಾತರು ವಿವರಗಳು, ಸ್ಥಳ ಮತ್ತು ಪಾವತಿ ಮಾಹಿತಿಯೊಂದಿಗೆ ತ್ವರಿತವಾಗಿ ಕೆಲಸಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಬಹುದು. ಸರಳ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ.',
    'features.trusted.title': 'ವಿಶ್ವಾಸಾರ್ಹ ವೇದಿಕೆ',
    'features.trusted.description': 'ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ನಂಬಿಕೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ಪರಿಶೀಲಿತ ಉದ್ಯೋಗದಾತರು ಮತ್ತು ನುರಿತ ಕಾರ್ಮಿಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
    
    // Ready Section
    'cta.title': 'ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧವೇ?',
    'cta.description': 'ಉತ್ತಮ ಅವಕಾಶಗಳನ್ನು ನಿರ್ಮಿಸಲು ಈಗಾಗಲೇ ವರ್ಕ್‌ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಳಸುತ್ತಿರುವ ಸಾವಿರಾರು ಕಾರ್ಮಿಕರು ಮತ್ತು ಉದ್ಯೋಗದಾತರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.',
    'cta.startFinding': 'ಕೆಲಸ ಹುಡುಕುವಿಕೆ ಪ್ರಾರಂಭಿಸಿ',
    'cta.startHiring': 'ನೇಮಕಾತಿ ಪ್ರಾರಂಭಿಸಿ',
    
    // Worker Dashboard
    'worker.title': 'ನಿಮ್ಮ ಹತ್ತಿರದ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ',
    'worker.searchPlaceholder': 'ಕೆಲಸಗಳಿಗಾಗಿ ಹುಡುಕಿ...',
    'worker.allJobTypes': 'ಎಲ್ಲಾ ಕೆಲಸ ಪ್ರಕಾರಗಳು',
    'worker.applyNow': 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'worker.call': 'ಕರೆ ಮಾಡಿ',
    'worker.perDay': 'ದಿನಕ್ಕೆ',
    'worker.applicationSent': 'ಅರ್ಜಿ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!',
    'worker.profile': 'ಪ್ರೊಫೈಲ್',
    'worker.search': 'ಹುಡುಕಿ',
    'worker.moreFilters': 'ಹೆಚ್ಚಿನ ಫಿಲ್ಟರ್‌ಗಳು',
    'worker.availableJobs': 'ಲಭ್ಯವಿರುವ ಕೆಲಸಗಳು',
    'worker.hoursAgo': 'ಗಂಟೆಗಳ ಹಿಂದೆ',
    'worker.dayAgo': 'ದಿನ ಹಿಂದೆ',
    'worker.daysAgo': 'ದಿನಗಳ ಹಿಂದೆ',
    
    // Job Types
    'jobTypes.construction': 'ನಿರ್ಮಾಣ',
    'jobTypes.plumbing': 'ಪ್ಲಂಬಿಂಗ್',
    'jobTypes.electrical': 'ವಿದ್ಯುತ್',
    'jobTypes.painting': 'ಚಿತ್ರಕಲೆ',
    'jobTypes.carpentry': 'ಬಡಗಿ ಕೆಲಸ',
    'jobTypes.masonry': 'ಕಲ್ಲು ಕೆಲಸ',
    
    // Job Titles
    'jobs.constructionHelper': 'ನಿರ್ಮಾಣ ಸಹಾಯಕ',
    'jobs.plumberAssistant': 'ಪ್ಲಂಬರ್ ಸಹಾಯಕ',
    'jobs.painter': 'ಪೇಂಟರ್',
    'jobs.electricianHelper': 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ ಸಹಾಯಕ',
    
    // Job Descriptions
    'jobs.constructionHelperDesc': 'ಕಾಂಕ್ರೀಟ್ ಕೆಲಸಕ್ಕೆ 2 ಸಹಾಯಕರ ಅವಶ್ಯಕತೆ. ಅನುಭವ ಆದ್ಯತೆ.',
    'jobs.plumberAssistantDesc': 'ವಸತಿ ದುರಸ್ತಿಗಾಗಿ ಹಿರಿಯ ಪ್ಲಂಬರ್‌ಗೆ ಸಹಾಯ ಮಾಡಿ.',
    'jobs.painterDesc': '3BHK ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗೆ ಒಳಾಂಗಣ ಪೇಂಟಿಂಗ್ ಕೆಲಸ.',
    'jobs.electricianHelperDesc': 'ವೈರಿಂಗ್ ಮತ್ತು ಇನ್‌ಸ್ಟಾಲೇಶನ್‌ಗಳಲ್ಲಿ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್‌ಗೆ ಬೆಂಬಲ.',
    
    // Employer Names
    'employers.buildRight': 'ಬಿಲ್ಡ್‌ರೈಟ್ ಕನ್‌ಸ್ಟ್ರಕ್ಷನ್',
    'employers.quickFix': 'ಕ್ವಿಕ್ ಫಿಕ್ಸ್ ಸೊಲ್ಯೂಷನ್ಸ್',
    'employers.homeMakeover': 'ಹೋಮ್ ಮೇಕ್‌ಓವರ್',
    'employers.powerTech': 'ಪವರ್‌ಟೆಕ್ ಸರ್ವಿಸಸ್',
    
    // Employer Dashboard
    'employer.title': 'ಉದ್ಯೋಗದಾತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'employer.postNew': 'ಹೊಸ ಕೆಲಸ ಪೋಸ್ಟ್ ಮಾಡಿ',
    'employer.jobTitle': 'ಕೆಲಸದ ಶೀರ್ಷಿಕೆ',
    'employer.jobDescription': 'ಕೆಲಸದ ವಿವರಣೆ',
    'employer.location': 'ಸ್ಥಳ',
    'employer.payment': 'ದಿನಕ್ಕೆ ಪಾವತಿ',
    'employer.jobType': 'ಕೆಲಸದ ಪ್ರಕಾರ',
    'employer.contact': 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ',
    'employer.requirements': 'ಅವಶ್ಯಕತೆಗಳು',
    'employer.postJob': 'ಕೆಲಸ ಪೋಸ್ಟ್ ಮಾಡಿ',
    'employer.cancel': 'ರದ್ದುಮಾಡಿ',
    'employer.postedJobs': 'ನಿಮ್ಮ ಪೋಸ್ಟ್ ಮಾಡಿದ ಕೆಲಸಗಳು',
    'employer.applications': 'ಅರ್ಜಿಗಳು',
    'employer.viewApplications': 'ಅರ್ಜಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'employer.edit': 'ಸಂಪಾದಿಸಿ',
    'employer.delete': 'ಅಳಿಸಿ',
    'employer.active': 'ಸಕ್ರಿಯ',
    'employer.jobPosted': 'ಕೆಲಸ ಯಶಸ್ವಿಯಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ!',
    
    // Services
    'services.title': 'ನಮ್ಮ ಸೇವೆಗಳು',
    'services.searchPlaceholder': 'ಸೇವೆಗಳಿಗಾಗಿ ಹುಡುಕಿ...',
    'services.bookNow': 'ಈಗ ಬುಕ್ ಮಾಡಿ',
    
    // Service Details
    'serviceDetails.serviceTitle': 'ಸೇವೆಯ ವಿವರಗಳು',
    'serviceDetails.serviceDescription': 'ನಮ್ಮ ಪರಿಶೀಲಿತ ಸೇವಾ ಪೂರೈಕೆದಾರರಿಂದ ಆಯ್ಕೆ ಮಾಡಿ',
    'serviceDetails.availableProviders': 'ಲಭ್ಯವಿರುವ ಸೇವಾ ಪೂರೈಕೆದಾರರು',
    'serviceDetails.reviews': 'ಪರಿಶೀಲನೆಗಳು',
    'serviceDetails.per': 'ಪ್ರತಿ',
    'serviceDetails.hour': 'ಗಂಟೆ',
    'serviceDetails.day': 'ದಿನ',
    'serviceDetails.available': 'ಲಭ್ಯ',
    'serviceDetails.availableNow': 'ಈಗ ಲಭ್ಯ',
    'serviceDetails.busy': 'ಕಾರ್ಯನಿರತ',
    'serviceDetails.unavailable': 'ಲಭ್ಯವಿಲ್ಲ',
    'serviceDetails.call': 'ಕಾಲ್ ಮಾಡಿ',
    'serviceDetails.message': 'ಸಂದೇಶ',
    'serviceDetails.bookNow': 'ಈಗ ಬುಕ್ ಮಾಡಿ',
    'serviceDetails.bookInstant': 'ತಕ್ಷಣ ಬುಕ್ ಮಾಡಿ',
    'serviceDetails.booked': 'ಬುಕ್ ಆಗಿದೆ',
    'serviceDetails.phone': 'ಫೋನ್',
    'serviceDetails.needHelp': 'ಸಹಾಯ ಬೇಕೇ?',
    'serviceDetails.contactSupport': 'ನಮ್ಮ ಗ್ರಾಹಕ ಬೆಂಬಲ ತಂಡವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದೆ',
    'serviceDetails.contactUs': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'serviceDetails.bookingConfirmed': 'ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಲಾಗಿದೆ!',
    'serviceDetails.bookingWith': 'ನಿಮ್ಮ ಬುಕಿಂಗ್ ಇವರೊಂದಿಗೆ',
    'serviceDetails.contactSoon': 'ಅವರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',
    'serviceDetails.contactInitiated': 'ಸಂಪರ್ಕ ಆರಂಭಿಸಲಾಗಿದೆ',
    'serviceDetails.contacting': 'ಸಂಪರ್ಕಿಸುತ್ತಿದ್ದೇವೆ',
    'serviceDetails.via': 'ಮೂಲಕ',
    'serviceDetails.arrivesIn': 'ರಲ್ಲಿ ಆಗಮಿಸುತ್ತಾರೆ',
    'serviceDetails.mins': 'ನಿಮಿಷಗಳು',
    'serviceDetails.instantService': '30 ನಿಮಿಷಗಳಲ್ಲಿ ಸೇವೆ ಪಡೆಯಿರಿ',
    'serviceDetails.fastDelivery': 'ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆಯ ಖಾತ್ರಿ',
    
    // Common
    'common.back': 'ಹಿಂದೆ',
    
    // Voice Search
    'voiceSearch.title': 'ಸೇವೆಯನ್ನು ಹುಡುಕಲು ತಟ್ಟಿ ಮತ್ತು ಮಾತನಾಡಿ',
    'voiceSearch.subtitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಸೇವೆಯ ವಿನಂತಿಯನ್ನು ಮಾತನಾಡಿ',
    'voiceSearch.searchAlternative': 'ಅಥವಾ ಕೆಳಗೆ ಹಸ್ತಚಾಲಿತವಾಗಿ ಹುಡುಕಿ',
    'services.household': 'ಮನೆಯ ಸೇವೆಗಳು',
    'services.repair': 'ದುರಸ್ತಿ ಮತ್ತು ನಿರ್ವಹಣೆ',
    'services.emergency': 'ತ್ವರಿತ ತುರ್ತು ಸೇವೆಗಳು',
    'services.event': 'ಕಾರ್ಯಕ್ರಮ ಬೆಂಬಲ',
    'services.personal': 'ವೈಯಕ್ತಿಕ ಸೇವೆಗಳು',
    'services.special': 'ವಿಶೇಷ ಯಾವಾಗ ವೇಳೆ ಎಲ್ಲಿಯಾದರೂ',
    
    // Household Services
    'services.maid.title': 'ಮನೆಕೆಲಸಗಾರ ಸೇವೆಗಳು',
    'services.maid.desc': 'ವೃತ್ತಿಪರ ಮನೆ ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ',
    'services.cook.title': 'ಅಡುಗೆಯವರ ಸೇವೆಗಳು',
    'services.cook.desc': 'ಮನೆಯಲ್ಲಿ ಅಡುಗೆ ಸೇವೆ',
    'services.laundry.title': 'ಲಾಂಡ್ರಿ ಮತ್ತು ಇಸ್ತ್ರಿ',
    'services.laundry.desc': 'ಬಟ್ಟೆ ಒಗೆಯುವಿಕೆ ಮತ್ತು ಇಸ್ತ್ರಿ',
    'services.babysitting.title': 'ಮಗು ನೋಡಿಕೊಳ್ಳುವಿಕೆ',
    'services.babysitting.desc': 'ವಿಶ್ವಾಸಾರ್ಹ ಮಗು ನೋಡಿಕೊಳ್ಳುವವರು',
    'services.elderly.title': 'ವೃದ್ಧರ ಆರೈಕೆ',
    'services.elderly.desc': 'ವರಿಷ್ಠರಿಗೆ ಆರೈಕೆದಾರರು',
    
    // Repair & Maintenance
    'services.plumber.title': 'ಪ್ಲಂಬರ್',
    'services.plumber.desc': 'ತ್ವರಿತ ಪ್ಲಂಬಿಂಗ್ ಪರಿಹಾರಗಳು',
    'services.electrician.title': 'ವಿದ್ಯುತ್ ಕಾರ್ಮಿಕ',
    'services.electrician.desc': 'ನುರಿತ ವಿದ್ಯುತ್ ಕಾರ್ಮಿಕರು',
    'services.carpenter.title': 'ಬಡಗಿ',
    'services.carpenter.desc': 'ಪೀಠೋಪಕರಣ ದುರಸ್ತಿ ಮತ್ತು ಮರದ ಕೆಲಸ',
    'services.painter.title': 'ಚಿತ್ರಕಾರ',
    'services.painter.desc': 'ವೃತ್ತಿಪರ ಚಿತ್ರಿಸುವ ಸೇವೆ',
    'services.appliance.title': 'ಯಂತ್ರ ದುರಸ್ತಿ',
    'services.appliance.desc': 'ಎಸಿ, ಫ್ರಿಜ್, ವಾಶಿಂಗ್ ಮೆಷಿನ್ ದುರಸ್ತಿ',
    
    // Emergency Services
    'services.delivery.title': 'ತ್ವರಿತ ಡೆಲಿವರಿ ಬಾಯ್',
    'services.delivery.desc': 'ಏನಾದರೂ ತಲುಪಿಸಿ',
    'services.bikemechanic.title': 'ಬೈಕ್ ಮೆಕಾನಿಕ್',
    'services.bikemechanic.desc': 'ಸ್ಥಳದಲ್ಲೇ ಬೈಕ್ ದುರಸ್ತಿ',
    'services.towing.title': 'ಕಾರ್ ಟೋಯಿಂಗ್',
    'services.towing.desc': 'ವೇಗದ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಟೋಯಿಂಗ್',
    'services.watertanker.title': 'ವಾಟರ್ ಟ್ಯಾಂಕರ್',
    'services.watertanker.desc': 'ತುರ್ತು ನೀರಿನ ಬುಕಿಂಗ್',
    
    // Event Support
    'services.catering.title': 'ಅಡುಗೆ ಸಹಾಯಕರು',
    'services.catering.desc': 'ಅಡುಗೆಗೆ ಸಹಾಯಕರು',
    'services.decoration.title': 'ಅಲಂಕಾರ ಸಹಾಯಕರು',
    'services.decoration.desc': 'ಕಾರ್ಯಕ್ರಮ ಅಲಂಕಾರಕ್ಕೆ ಬೆಂಬಲ',
    'services.cleaning.title': 'ಸ್ವಚ್ಛಗೊಳಿಸುವ ತಂಡ',
    'services.cleaning.desc': 'ಕಾರ್ಯಕ್ರಮದ ನಂತರ ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ',
    
    // Personal Services
    'services.salon.title': 'ಮನೆಯಲ್ಲಿ ಸಲೂನ್',
    'services.salon.desc': 'ಮನೆಯಲ್ಲಿ ಸೌಂದರ್ಯ ಸೇವೆಗಳು',
    'services.fitness.title': 'ಫಿಟ್ನೆಸ್ ತರಬೇತುದಾರ',
    'services.fitness.desc': 'ಮನೆಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರ',
    'services.petcare.title': 'ಪೆಟ್ ಕೇರ್',
    'services.petcare.desc': 'ಪೆಟ್ ವಾಕಿಂಗ್ ಮತ್ತು ಆರೈಕೆ',
    
    // Special Services
    'services.driver.title': 'ಆನ್-ಡಿಮಾಂಡ್ ಡ್ರೈವರ್',
    'services.driver.desc': 'ಯಾವಾಗ ವೇಳೆ ಡ್ರೈವರ್ ಬಾಡಿಗೆಗೆ',
    'services.grocery.title': 'ಗ್ರೋಸರಿ ರನ್ನರ್',
    'services.grocery.desc': 'ತ್ವರಿತ ಗ್ರೋಸರಿ ಡೆಲಿವರಿ',
    'services.pickdrop.title': 'ಪಿಕ್ ಮತ್ತು ಡ್ರಾಪ್ ಸೇವೆ',
    'services.pickdrop.desc': 'ಪಾರ್ಸೆಲ್ ಅಥವಾ ಅವಶ್ಯಕ ವಸ್ತುಗಳಿಗೆ',
    'services.instanthelp.title': 'ತ್ವರಿತ ಮನೆ ಸಹಾಯ',
    'services.instanthelp.desc': '10 ನಿಮಿಷದಲ್ಲಿ ಯಾವುದೇ ಸೇವೆ',
    
    // Voice Search
    'auth.enterCodeDescription': '{email} ಗೆ ಕಳುಹಿಸಿದ 6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ',
    'auth.emailAddress': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'auth.emailPlaceholder': 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
    'auth.emailNote': 'ನಿಮಗೆ ಇಮೇಲ್ ಮೂಲಕ 6-ಅಂಕಿಯ ಪರಿಶೀಲನೆ ಕೋಡ್ ಸಿಗುತ್ತದೆ',
    'auth.sending': 'ಕಳುಹಿಸುತ್ತಿದೆ...',
    'auth.sendCode': 'ಪರಿಶೀಲನೆ ಕೋಡ್ ಕಳುಹಿಸಿ',
    'auth.verificationCode': 'ಪರಿಶೀಲನೆ ಕೋಡ್',
    'auth.codePlaceholder': '6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ',
    'auth.codeNote': 'ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್‌ನಿಂದ 6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ',
    'auth.verifying': 'ಪರಿಶೀಲಿಸುತ್ತಿದೆ...',
    'auth.verifyLogin': 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಲಾಗಿನ್ ಆಗಿ',
    'auth.changeEmail': 'ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ಬದಲಾಯಿಸಿ',
    'auth.resendCode': 'ಕೋಡ್ ಮತ್ತೆ ಕಳುಹಿಸಿ',
    'auth.resendTimer': 'ಕೋಡ್ ಮತ್ತೆ ಕಳುಹಿಸಿ ({seconds}s)',
    'auth.checkEmail': 'ನಿಮ್ಮ ಇಮೇಲ್ ಪರಿಶೀಲಿಸಿ!',
    'auth.codeSent': 'ನಾವು ನಿಮಗೆ 6-ಅಂಕಿಯ ಪರಿಶೀಲನೆ ಕೋಡ್ ಕಳುಹಿಸಿದ್ದೇವೆ.',
    'auth.welcome': 'ಸ್ವಾಗತ!',
    'auth.loginSuccess': 'ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ.',
    'auth.error': 'ದೋಷ',
    'auth.sendCodeError': 'ಪರಿಶೀಲನೆ ಕೋಡ್ ಕಳುಹಿಸುವಲ್ಲಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'auth.invalidEmail': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
    'auth.emailNotAuthorized': 'ಈ ಇಮೇಲ್ ವಿಳಾಸವು ಅಧಿಕೃತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    'auth.verificationFailed': 'ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ',
    'auth.invalidOtp': 'ಅಮಾನ್ಯ ಅಥವಾ ಅವಧಿ ಮೀರಿದ OTP. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'auth.newCodeSent': 'ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಹೊಸ 6-ಅಂಕಿಯ ಪರಿಶೀಲನೆ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿದೆ.',
    'auth.resendFailed': 'ಪರಿಶೀಲನೆ ಕೋಡ್ ಮತ್ತೆ ಕಳುಹಿಸುವಲ್ಲಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
  },
  hi: {
    // Header
    'header.findJobs': 'नौकरी खोजें',
    'header.postJobs': 'नौकरी पोस्ट करें',
    
    // Hero Section
    'hero.tagline': 'दैनिक वेतन श्रमिकों को उनके नज़दीकी नौकरी के अवसरों से जोड़ना',
    
    // How WorkXpress Works
    'features.title': 'वर्कएक्सप्रेस कैसे काम करता है',
    'features.findJobs.title': 'पास के काम खोजें',
    'features.findJobs.description': 'अपने क्षेत्र में दैनिक मजदूरी के अवसर खोजें। स्थान-आधारित मिलान यह सुनिश्चित करता है कि आपको घर के पास काम मिले।',
    'features.postJobs.title': 'आसान नौकरी पोस्टिंग',
    'features.postJobs.description': 'नियोक्ता विवरण, स्थान और भुगतान की जानकारी के साथ जल्दी से नौकरियां पोस्ट कर सकते हैं। सरल और कुशल।',
    'features.trusted.title': 'विश्वसनीय मंच',
    'features.trusted.description': 'विश्वसनीयता और विश्वास के लिए बनाया गया। अपने समुदाय में सत्यापित नियोक्ताओं और कुशल श्रमिकों से जुड़ें।',
    
    // Ready Section
    'cta.title': 'शुरू करने के लिए तैयार?',
    'cta.description': 'बेहतर अवसर बनाने के लिए पहले से ही वर्कएक्सप्रेस का उपयोग कर रहे हजारों श्रमिकों और नियोक्ताओं के साथ जुड़ें।',
    'cta.startFinding': 'काम खोजना शुरू करें',
    'cta.startHiring': 'भर्ती शुरू करें',
    
    // Worker Dashboard
    'worker.title': 'अपने पास की नौकरियां खोजें',
    'worker.searchPlaceholder': 'नौकरियों के लिए खोजें...',
    'worker.allJobTypes': 'सभी नौकरी प्रकार',
    'worker.applyNow': 'अभी आवेदन करें',
    'worker.call': 'कॉल करें',
    'worker.perDay': 'प्रति दिन',
    'worker.applicationSent': 'आवेदन सफलतापूर्वक भेजा गया!',
    'worker.profile': 'प्रोफाइल',
    'worker.search': 'खोजें',
    'worker.moreFilters': 'अधिक फ़िल्टर',
    'worker.availableJobs': 'उपलब्ध नौकरियां',
    'worker.hoursAgo': 'घंटे पहले',
    'worker.dayAgo': 'दिन पहले',
    'worker.daysAgo': 'दिन पहले',
    
    // Job Types
    'jobTypes.construction': 'निर्माण',
    'jobTypes.plumbing': 'प्लंबिंग',
    'jobTypes.electrical': 'इलेक्ट्रिकल',
    'jobTypes.painting': 'पेंटिंग',
    'jobTypes.carpentry': 'बढ़ईगीरी',
    'jobTypes.masonry': 'राजमिस्त्री',
    
    // Job Titles
    'jobs.constructionHelper': 'निर्माण सहायक',
    'jobs.plumberAssistant': 'प्लंबर सहायक',
    'jobs.painter': 'पेंटर',
    'jobs.electricianHelper': 'इलेक्ट्रिशियन सहायक',
    
    // Job Descriptions
    'jobs.constructionHelperDesc': 'कंक्रीट कार्य के लिए 2 सहायकों की आवश्यकता। अनुभव प्राथमिकता।',
    'jobs.plumberAssistantDesc': 'आवासीय मरम्मत के लिए वरिष्ठ प्लंबर की सहायता करें।',
    'jobs.painterDesc': '3BHK अपार्टमेंट के लिए इंटीरियर पेंटिंग कार्य।',
    'jobs.electricianHelperDesc': 'वायरिंग और इंस्टॉलेशन के साथ इलेक्ट्रिशियन का समर्थन करें।',
    
    // Employer Names
    'employers.buildRight': 'बिल्डराइट कंस्ट्रक्शन',
    'employers.quickFix': 'क्विक फिक्स सॉल्यूशंस',
    'employers.homeMakeover': 'होम मेकओवर',
    'employers.powerTech': 'पावरटेक सर्विसेज',
    
    // Employer Dashboard
    'employer.title': 'नियोक्ता डैशबोर्ड',
    'employer.postNew': 'नई नौकरी पोस्ट करें',
    'employer.jobTitle': 'नौकरी का शीर्षक',
    'employer.jobDescription': 'नौकरी का विवरण',
    'employer.location': 'स्थान',
    'employer.payment': 'प्रति दिन भुगतान',
    'employer.jobType': 'नौकरी का प्रकार',
    'employer.contact': 'संपर्क नंबर',
    'employer.requirements': 'आवश्यकताएं',
    'employer.postJob': 'नौकरी पोस्ट करें',
    'employer.cancel': 'रद्द करें',
    'employer.postedJobs': 'आपकी पोस्ट की गई नौकरियां',
    'employer.applications': 'आवेदन',
    'employer.viewApplications': 'आवेदन देखें',
    'employer.edit': 'संपादित करें',
    'employer.delete': 'मिटाएं',
    'employer.active': 'सक्रिय',
    'employer.jobPosted': 'नौकरी सफलतापूर्वक पोस्ट की गई!',
    
    // Services
    'services.title': 'हमारी सेवाएं',
    'services.searchPlaceholder': 'सेवाओं के लिए खोजें...',
    'services.bookNow': 'अभी बुक करें',
    
    // Service Details
    'serviceDetails.serviceTitle': 'सेवा विवरण',
    'serviceDetails.serviceDescription': 'हमारे सत्यापित सेवा प्रदाताओं में से चुनें',
    'serviceDetails.availableProviders': 'उपलब्ध सेवा प्रदाता',
    'serviceDetails.reviews': 'समीक्षाएं',
    'serviceDetails.per': 'प्रति',
    'serviceDetails.hour': 'घंटा',
    'serviceDetails.day': 'दिन',
    'serviceDetails.available': 'उपलब्ध',
    'serviceDetails.availableNow': 'अभी उपलब्ध',
    'serviceDetails.busy': 'व्यस्त',
    'serviceDetails.unavailable': 'उपलब्ध नहीं',
    'serviceDetails.call': 'कॉल करें',
    'serviceDetails.message': 'संदेश',
    'serviceDetails.bookNow': 'अभी बुक करें',
    'serviceDetails.bookInstant': 'तुरंत बुक करें',
    'serviceDetails.booked': 'बुक किया गया',
    'serviceDetails.phone': 'फोन',
    'serviceDetails.needHelp': 'मदद चाहिए?',
    'serviceDetails.contactSupport': 'हमारी ग्राहक सहायता टीम आपकी सहायता के लिए यहां है',
    'serviceDetails.contactUs': 'हमसे संपर्क करें',
    'serviceDetails.bookingConfirmed': 'बुकिंग पुष्टि!',
    'serviceDetails.bookingWith': 'आपकी बुकिंग इनके साथ',
    'serviceDetails.contactSoon': 'वे जल्द ही आपसे संपर्क करेंगे।',
    'serviceDetails.contactInitiated': 'संपर्क शुरू किया गया',
    'serviceDetails.contacting': 'संपर्क कर रहे हैं',
    'serviceDetails.via': 'के माध्यम से',
    'serviceDetails.arrivesIn': 'में पहुंचेगा',
    'serviceDetails.mins': 'मिनट',
    'serviceDetails.instantService': '30 मिनट में सेवा पाएं',
    'serviceDetails.fastDelivery': 'त्वरित प्रतिक्रिया की गारंटी',
    
    // Common
    'common.back': 'वापस',
    
    // Voice Search
    'voiceSearch.title': 'सेवा खोजने के लिए टैप करें और बोलें',
    'voiceSearch.subtitle': 'अपनी पसंदीदा भाषा में अपना सेवा अनुरोध बोलें',
    'voiceSearch.searchAlternative': 'या नीचे मैन्युअल रूप से खोजें',
    
    // Service Categories
    'services.household': 'घरेलू सेवाएं',
    'services.repair': 'मरम्मत और रखरखाव',
    'services.emergency': 'त्वरित आपातकालीन सेवाएं',
    'services.event': 'इवेंट सपोर्ट',
    'services.personal': 'व्यक्तिगत सेवाएं',
    'services.special': 'विशेष कभी भी कहीं भी',
    
    // Household Services
    'services.maid.title': 'नौकरानी सेवाएं',
    'services.maid.desc': 'पेशेवर घर की सफाई',
    'services.cook.title': 'रसोइया सेवाएं',
    'services.cook.desc': 'घर पर खाना बनाने की सेवा',
    'services.laundry.title': 'लॉन्ड्री और इस्त्री',
    'services.laundry.desc': 'कपड़े धोना और इस्त्री करना',
    'services.babysitting.title': 'बेबी सिटिंग',
    'services.babysitting.desc': 'विश्वसनीय बेबी सिटर',
    'services.elderly.title': 'बुजुर्गों की देखभाल',
    'services.elderly.desc': 'बुजुर्गों के लिए देखभालकर्ता',
    
    // Repair & Maintenance
    'services.plumber.title': 'प्लंबर',
    'services.plumber.desc': 'त्वरित प्लंबिंग समाधान',
    'services.electrician.title': 'इलेक्ट्रीशियन',
    'services.electrician.desc': 'कुशल इलेक्ट्रीशियन',
    'services.carpenter.title': 'बढ़ई',
    'services.carpenter.desc': 'फर्नीचर मरम्मत और लकड़ी का काम',
    'services.painter.title': 'पेंटर',
    'services.painter.desc': 'पेशेवर पेंटिंग सेवा',
    'services.appliance.title': 'उपकरण मरम्मत',
    'services.appliance.desc': 'एसी, फ्रिज, वॉशिंग मशीन मरम्मत',
    
    // Emergency Services
    'services.delivery.title': 'तुरंत डिलीवरी बॉय',
    'services.delivery.desc': 'कुछ भी डिलीवर कराएं',
    'services.bikemechanic.title': 'बाइक मैकेनिक',
    'services.bikemechanic.desc': 'तुरंत बाइक मरम्मत',
    'services.towing.title': 'कार टोइंग',
    'services.towing.desc': 'तेज और विश्वसनीय टोइंग',
    'services.watertanker.title': 'वाटर टैंकर',
    'services.watertanker.desc': 'आपातकालीन पानी बुकिंग',
    
    // Event Support
    'services.catering.title': 'कैटरिंग असिस्टेंट',
    'services.catering.desc': 'कैटरिंग के लिए सहायक',
    'services.decoration.title': 'डेकोरेशन हेल्पर',
    'services.decoration.desc': 'इवेंट सजावट के लिए सहायता',
    'services.cleaning.title': 'सफाई दल',
    'services.cleaning.desc': 'इवेंट के बाद सफाई',
    
    // Personal Services
    'services.salon.title': 'होम सैलून',
    'services.salon.desc': 'घर पर ब्यूटी सेवाएं',
    'services.fitness.title': 'फिटनेस ट्रेनर',
    'services.fitness.desc': 'घर पर व्यक्तिगत ट्रेनर',
    'services.petcare.title': 'पेट केयर',
    'services.petcare.desc': 'पेट वॉकिंग और देखभाल',
    
    // Special Services
    'services.driver.title': 'ऑन-डिमांड ड्राइवर',
    'services.driver.desc': 'कभी भी ड्राइवर किराए पर लें',
    'services.grocery.title': 'ग्रॉसरी रनर',
    'services.grocery.desc': 'त्वरित ग्रॉसरी डिलीवरी',
    'services.pickdrop.title': 'पिक एंड ड्रॉप सेवा',
    'services.pickdrop.desc': 'पार्सल या जरूरी सामान के लिए',
    'services.instanthelp.title': 'तुरंत होम हेल्प',
    'services.instanthelp.desc': '10 मिनट में कोई भी सेवा',
    
    // Auth translations
    'auth.enterEmail': 'ईमेल एड्रेस दर्ज करें',
    'auth.verifyCode': 'कोड सत्यापित करें',
    'auth.codeSendDescription': 'हम आपको 6-अंकीय सत्यापन कोड भेजेंगे',
    'auth.enterCodeDescription': '{email} पर भेजा गया 6-अंकीय कोड दर्ज करें',
    'auth.emailAddress': 'ईमेल एड्रेस',
    'auth.emailPlaceholder': 'अपना ईमेल एड्रेस दर्ज करें',
    'auth.emailNote': 'आपको ईमेल द्वारा 6-अंकीय सत्यापन कोड मिलेगा',
    'auth.sending': 'भेजा जा रहा है...',
    'auth.sendCode': 'सत्यापन कोड भेजें',
    'auth.verificationCode': 'सत्यापन कोड',
    'auth.codePlaceholder': '6-अंकीय कोड दर्ज करें',
    'auth.codeNote': 'जारी रखने के लिए अपने ईमेल से 6-अंकीय कोड दर्ज करें',
    'auth.verifying': 'सत्यापित कर रहे हैं...',
    'auth.verifyLogin': 'सत्यापित करें और लॉगिन करें',
    'auth.changeEmail': 'ईमेल एड्रेस बदलें',
    'auth.resendCode': 'कोड फिर से भेजें',
    'auth.resendTimer': 'कोड फिर से भेजें ({seconds}s)',
    'auth.checkEmail': 'अपना ईमेल चेक करें!',
    'auth.codeSent': 'हमने आपको 6-अंकीय सत्यापन कोड भेजा है।',
    'auth.welcome': 'स्वागत है!',
    'auth.loginSuccess': 'आपने सफलतापूर्वक लॉगिन किया है।',
    'auth.error': 'त्रुटि',
    'auth.sendCodeError': 'सत्यापन कोड भेजने में विफल। कृपया पुनः प्रयास करें।',
    'auth.invalidEmail': 'कृपया एक मान्य ईमेल पता दर्ज करें।',
    'auth.emailNotAuthorized': 'यह ईमेल पता अधिकृत नहीं है। कृपया सहायता से संपर्क करें।',
    'auth.verificationFailed': 'सत्यापन विफल',
    'auth.invalidOtp': 'अमान्य या समाप्त OTP। कृपया पुनः प्रयास करें।',
    'auth.newCodeSent': 'आपके ईमेल पर एक नया 6-अंकीय सत्यापन कोड भेजा गया है।',
    'auth.resendFailed': 'सत्यापन कोड फिर से भेजने में विफल। कृपया पुनः प्रयास करें।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
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
    
    // Job Types
    'jobTypes.construction': 'Construction',
    'jobTypes.plumbing': 'Plumbing',
    'jobTypes.electrical': 'Electrical',
    'jobTypes.painting': 'Painting',
    'jobTypes.carpentry': 'Carpentry',
    'jobTypes.masonry': 'Masonry',
    
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
    'services.household': 'Household Services',
    'services.repair': 'Repair & Maintenance',
    'services.emergency': 'Quick Emergency Services',
    'services.event': 'Event Support',
    'services.personal': 'Personal Services',
    'services.special': 'Special Anytime Anywhere',
    
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
    
    // Auth
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
    
    // Jobs
    jobs: {
      subtitle: "Discover daily wage opportunities in your area",
      noJobsFound: "No Jobs Found",
      noJobsMessage: "Try adjusting your search criteria or browse all categories.",
      reviews: "reviews",
      helpTitle: "Need Help Finding the Right Job?",
      helpDescription: "Contact our support team for personalized job recommendations",
      getAssistance: "Get Job Assistance"
    }
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
    
    // Job Types
    'jobTypes.construction': 'ನಿರ್ಮಾಣ',
    'jobTypes.plumbing': 'ಪ್ಲಂಬಿಂಗ್',
    'jobTypes.electrical': 'ವಿದ್ಯುತ್',
    'jobTypes.painting': 'ಚಿತ್ರಕಲೆ',
    'jobTypes.carpentry': 'ಬಡಗಿ ಕೆಲಸ',
    'jobTypes.masonry': 'ಕಲ್ಲು ಕೆಲಸ',
    
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
    'services.household': 'ಮನೆಯ ಸೇವೆಗಳು',
    'services.repair': 'ದುರಸ್ತಿ ಮತ್ತು ನಿರ್ವಹಣೆ',
    'services.emergency': 'ತ್ವರಿತ ತುರ್ತು ಸೇವೆಗಳು',
    'services.event': 'ಕಾರ್ಯಕ್ರಮ ಬೆಂಬಲ',
    'services.personal': 'ವೈಯಕ್ತಿಕ ಸೇವೆಗಳು',
    'services.special': 'ವಿಶೇಷ ಯಾವಾಗ ವೇಳೆ ಎಲ್ಲಿಯಾದರೂ',
    
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
    
    // Auth
    auth: {
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
    
    // Jobs
    jobs: {
      subtitle: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ದೈನಂದಿನ ವೇತನದ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
      noJobsFound: "ಯಾವುದೇ ಕೆಲಸ ಸಿಗಲಿಲ್ಲ",
      noJobsMessage: "ನಿಮ್ಮ ಹುಡುಕಾಟ ಮಾನದಂಡಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಎಲ್ಲಾ ವರ್ಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
      reviews: "ವಿಮರ್ಶೆಗಳು",
      helpTitle: "ಸರಿಯಾದ ಕೆಲಸವನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಹಾಯ ಬೇಕೇ?",
      helpDescription: "ವೈಯಕ್ತಿಕ ಕೆಲಸದ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ",
      getAssistance: "ಕೆಲಸದ ಸಹಾಯ ಪಡೆಯಿರಿ"
    }
  },
  hi: {
    // Header
    'header.findJobs': 'नौकरी खोजें',
    'header.postJobs': 'नौकरी पोस्ट करें',
    
    // Hero Section
    'hero.tagline': 'दैनिक वेतन श्रमिकों को उनके नज़दीकी नौकरी के अवसरों से जोड़ना',
    
    // How WorkXpress Works
    'features.title': 'WorkXpress कैसे काम करता है',
    'features.findJobs.title': 'नज़दीकी नौकरियां खोजें',
    'features.findJobs.description': 'अपने क्षेत्र में दैनिक मजदूरी के अवसर खोजें। स्थान-आधारित मैचिंग सुनिश्चित करती है कि आपको घर के पास काम मिले।',
    'features.postJobs.title': 'आसान नौकरी पोस्टिंग',
    'features.postJobs.description': 'नियोक्ता विवरण, स्थान और भुगतान जानकारी के साथ तुरंत नौकरियां पोस्ट कर सकते हैं। सरल और कुशल।',
    'features.trusted.title': 'विश्वसनीय प्लेटफ़ॉर्म',
    'features.trusted.description': 'विश्वसनीयता और भरोसे के लिए बनाया गया। अपने समुदाय में सत्यापित नियोक्ताओं और कुशल श्रमिकों से जुड़ें।',
    
    // Ready Section
    'cta.title': 'शुरू करने के लिए तैयार हैं?',
    'cta.description': 'बेहतर अवसर बनाने के लिए पहले से ही WorkXpress का उपयोग कर रहे हजारों श्रमिकों और नियोक्ताओं से जुड़ें।',
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
    'worker.profile': 'प्रोफ़ाइल',
    'worker.search': 'खोजें',
    'worker.moreFilters': 'अधिक फ़िल्टर',
    'worker.availableJobs': 'उपलब्ध नौकरियां',
    
    // Job Types
    'jobTypes.construction': 'निर्माण',
    'jobTypes.plumbing': 'प्लंबिंग',
    'jobTypes.electrical': 'इलेक्ट्रिकल',
    'jobTypes.painting': 'पेंटिंग',
    'jobTypes.carpentry': 'बढ़ईगिरी',
    'jobTypes.masonry': 'राजमिस्त्री',
    
    // Employer Dashboard
    'employer.title': 'नियोक्ता डैशबोर्ड',
    'employer.postNew': 'नई नौकरी पोस्ट करें',
    'employer.jobTitle': 'नौकरी का शीर्षक',
    'employer.jobDescription': 'नौकरी विवरण',
    'employer.location': 'स्थान',
    'employer.payment': 'प्रति दिन भुगतान',
    'employer.jobType': 'नौकरी प्रकार',
    'employer.contact': 'संपर्क नंबर',
    'employer.requirements': 'आवश्यकताएं',
    'employer.postJob': 'नौकरी पोस्ट करें',
    'employer.cancel': 'रद्द करें',
    'employer.postedJobs': 'आपकी पोस्ट की गई नौकरियां',
    'employer.applications': 'आवेदन',
    'employer.viewApplications': 'आवेदन देखें',
    'employer.edit': 'संपादित करें',
    'employer.delete': 'हटाएं',
    'employer.active': 'सक्रिय',
    'employer.jobPosted': 'नौकरी सफलतापूर्वक पोस्ट की गई!',
    
    // Services
    'services.title': 'हमारी सेवाएं',
    'services.searchPlaceholder': 'सेवाओं के लिए खोजें...',
    'services.bookNow': 'अभी बुक करें',
    'services.household': 'घरेलू सेवाएं',
    'services.repair': 'मरम्मत और रखरखाव',
    'services.emergency': 'त्वरित आपातकालीन सेवाएं',
    'services.event': 'इवेंट सपोर्ट',
    'services.personal': 'व्यक्तिगत सेवाएं',
    'services.special': 'विशेष कभी भी कहीं भी',
    
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
    'serviceDetails.contactSupport': 'हमारी ग्राहक सहायता टीम आपकी सहायता के लिए यहाँ है',
    'serviceDetails.contactUs': 'हमसे संपर्क करें',
    'serviceDetails.bookingConfirmed': 'बुकिंग की पुष्टि!',
    'serviceDetails.bookingWith': 'आपकी बुकिंग के साथ',
    'serviceDetails.contactSoon': 'वे जल्द ही आपसे संपर्क करेंगे।',
    'serviceDetails.contactInitiated': 'संपर्क शुरू',
    'serviceDetails.contacting': 'संपर्क कर रहे हैं',
    'serviceDetails.via': 'के माध्यम से',
    'serviceDetails.arrivesIn': 'में पहुंचता है',
    'serviceDetails.mins': 'मिनट',
    'serviceDetails.instantService': '30 मिनट में सेवा प्राप्त करें',
    'serviceDetails.fastDelivery': 'त्वरित प्रतिक्रिया की गारंटी',
    
    // Common
    'common.back': 'वापस',
    
    // Voice Search
    'voiceSearch.title': 'सेवा खोजने के लिए टैप करें और बोलें',
    'voiceSearch.subtitle': 'अपनी पसंदीदा भाषा में अपना सेवा अनुरोध बोलें',
    'voiceSearch.searchAlternative': 'या नीचे मैन्युअल रूप से खोजें',
    
    // Auth
    auth: {
      loginTitle: "अपने खाते में लॉगिन करें",
      signupTitle: "नया खाता बनाएं", 
      email: "ईमेल पता",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      loginButton: "लॉगिन",
      signupButton: "साइन अप",
      forgotPassword: "पासवर्ड भूल गए?",
      switchToSignup: "खाता नहीं है? साइन अप करें",
      switchToLogin: "पहले से ही खाता है? लॉगिन करें",
      resetPassword: "पासवर्ड रीसेट करें",
      resetButton: "रीसेट लिंक भेजें",
      backToLogin: "लॉगिन पर वापस जाएं"
    },
    
    // Jobs
    jobs: {
      subtitle: "अपने क्षेत्र में दैनिक मजदूरी के अवसरों की खोज करें",
      noJobsFound: "कोई नौकरी नहीं मिली",
      noJobsMessage: "अपने खोज मानदंडों को समायोजित करने का प्रयास करें या सभी श्रेणियों को देखें।",
      reviews: "समीक्षाएं",
      helpTitle: "सही नौकरी ढूंढने में मदद चाहिए?",
      helpDescription: "व्यक्तिगत नौकरी सिफारिशों के लिए हमारी सहायता टीम से संपर्क करें",
      getAssistance: "नौकरी सहायता प्राप्त करें"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
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
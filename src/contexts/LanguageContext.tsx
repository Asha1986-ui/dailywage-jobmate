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
    'services.instanthelp.desc': 'Any service in 10 minutes'
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
    
    // Service Categories
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
    'services.instanthelp.desc': '10 ನಿಮಿಷದಲ್ಲಿ ಯಾವುದೇ ಸೇವೆ'
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
    'services.instanthelp.desc': '10 मिनट में कोई भी सेवा'
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
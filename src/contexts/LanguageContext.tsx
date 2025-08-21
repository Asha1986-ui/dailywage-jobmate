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
    
    // How WorkLink Works
    'features.title': 'How WorkLink Works',
    'features.findJobs.title': 'Find Jobs Nearby',
    'features.findJobs.description': 'Discover daily wage opportunities in your area. Location-based matching ensures you find work close to home.',
    'features.postJobs.title': 'Easy Job Posting',
    'features.postJobs.description': 'Employers can quickly post jobs with details, location, and payment information. Simple and efficient.',
    'features.trusted.title': 'Trusted Platform',
    'features.trusted.description': 'Built for reliability and trust. Connect with verified employers and skilled workers in your community.',
    
    // Ready Section
    'cta.title': 'Ready to Get Started?',
    'cta.description': 'Join thousands of workers and employers already using WorkLink to build better opportunities.',
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
    'employer.jobPosted': 'Job posted successfully!'
  },
  kn: {
    // Header
    'header.findJobs': 'ಕೆಲಸ ಹುಡುಕಿ',
    'header.postJobs': 'ಕೆಲಸ ಪ್ರಕಟಿಸಿ',
    
    // Hero Section
    'hero.tagline': 'ದೈನಂದಿನ ಕೂಲಿ ಕಾರ್ಮಿಕರನ್ನು ಅವರ ಹತ್ತಿರದ ಉದ್ಯೋಗ ಅವಕಾಶಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    
    // How WorkLink Works
    'features.title': 'ವರ್ಕ್‌ಲಿಂಕ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'features.findJobs.title': 'ಹತ್ತಿರದ ಕೆಲಸ ಹುಡುಕಿ',
    'features.findJobs.description': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ದೈನಂದಿನ ಕೂಲಿ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ. ಸ್ಥಳ-ಆಧಾರಿತ ಹೊಂದಾಣಿಕೆಯು ಮನೆಯ ಹತ್ತಿರ ಕೆಲಸ ಕಂಡುಕೊಳ್ಳಲು ಖಾತ್ರಿ ನೀಡುತ್ತದೆ.',
    'features.postJobs.title': 'ಸುಲಭ ಕೆಲಸ ಪ್ರಕಟಣೆ',
    'features.postJobs.description': 'ಉದ್ಯೋಗದಾತರು ವಿವರಗಳು, ಸ್ಥಳ ಮತ್ತು ಪಾವತಿ ಮಾಹಿತಿಯೊಂದಿಗೆ ತ್ವರಿತವಾಗಿ ಕೆಲಸಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಬಹುದು. ಸರಳ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ.',
    'features.trusted.title': 'ವಿಶ್ವಾಸಾರ್ಹ ವೇದಿಕೆ',
    'features.trusted.description': 'ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ನಂಬಿಕೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ಪರಿಶೀಲಿತ ಉದ್ಯೋಗದಾತರು ಮತ್ತು ನುರಿತ ಕಾರ್ಮಿಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
    
    // Ready Section
    'cta.title': 'ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧವೇ?',
    'cta.description': 'ಉತ್ತಮ ಅವಕಾಶಗಳನ್ನು ನಿರ್ಮಿಸಲು ಈಗಾಗಲೇ ವರ್ಕ್‌ಲಿಂಕ್ ಬಳಸುತ್ತಿರುವ ಸಾವಿರಾರು ಕಾರ್ಮಿಕರು ಮತ್ತು ಉದ್ಯೋಗದಾತರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.',
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
    'employer.jobPosted': 'ಕೆಲಸ ಯಶಸ್ವಿಯಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ!'
  },
  hi: {
    // Header
    'header.findJobs': 'नौकरी खोजें',
    'header.postJobs': 'नौकरी पोस्ट करें',
    
    // Hero Section
    'hero.tagline': 'दैनिक वेतन श्रमिकों को उनके नज़दीकी नौकरी के अवसरों से जोड़ना',
    
    // How WorkLink Works
    'features.title': 'वर्कलिंक कैसे काम करता है',
    'features.findJobs.title': 'पास के काम खोजें',
    'features.findJobs.description': 'अपने क्षेत्र में दैनिक मजदूरी के अवसर खोजें। स्थान-आधारित मिलान यह सुनिश्चित करता है कि आपको घर के पास काम मिले।',
    'features.postJobs.title': 'आसान नौकरी पोस्टिंग',
    'features.postJobs.description': 'नियोक्ता विवरण, स्थान और भुगतान की जानकारी के साथ जल्दी से नौकरियां पोस्ट कर सकते हैं। सरल और कुशल।',
    'features.trusted.title': 'विश्वसनीय मंच',
    'features.trusted.description': 'विश्वसनीयता और विश्वास के लिए बनाया गया। अपने समुदाय में सत्यापित नियोक्ताओं और कुशल श्रमिकों से जुड़ें।',
    
    // Ready Section
    'cta.title': 'शुरू करने के लिए तैयार?',
    'cta.description': 'बेहतर अवसर बनाने के लिए पहले से ही वर्कलिंक का उपयोग कर रहे हजारों श्रमिकों और नियोक्ताओं के साथ जुड़ें।',
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
    'employer.jobPosted': 'नौकरी सफलतापूर्वक पोस्ट की गई!'
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
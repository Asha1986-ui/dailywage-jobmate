import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Extend Window interface for Speech Recognition APIs
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceSearchProps {
  onVoiceResult: (text: string) => void;
  className?: string;
}

const VoiceSearch = ({ onVoiceResult, className = "" }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState("en-US");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const voiceLanguages = [
    { code: "en-US", label: "English" },
    { code: "hi-IN", label: "हिंदी" },
    { code: "kn-IN", label: "ಕನ್ನಡ" },
  ];

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = voiceLanguage;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak your service request now",
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onVoiceResult(transcript);
      setIsListening(false);
      toast({
        title: "Voice Captured",
        description: `Searching for: "${transcript}"`,
      });
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Please try again or check your microphone permissions.",
        variant: "destructive",
      });
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
        <SelectTrigger className="w-24 h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {voiceLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        size="sm"
        onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
        className={`h-10 px-3 ${isListening ? 'bg-destructive/10 text-destructive border-destructive' : ''}`}
        title={isListening ? "Stop listening" : "Start voice search"}
      >
        {isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default VoiceSearch;
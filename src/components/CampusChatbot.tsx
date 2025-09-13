import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, GraduationCap } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { QuickActions } from "./QuickActions";

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

export const CampusChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Hi! I'm your Campus Assistant. I can help you with schedules, facilities, dining, library services, and procedures. What would you like to know?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const mockResponses: Record<string, string> = {
    "schedule": "📅 **Class Schedules**\n\nYour classes today:\n• Computer Science 101 - 9:00 AM (Room 204)\n• Mathematics 201 - 11:00 AM (Room 156)\n• Physics Lab - 2:00 PM (Science Building)\n\nNeed help with a specific class or want to see your full semester schedule?",
    "library": "📚 **Library Services**\n\nMain Library Hours:\n• Monday-Friday: 7:00 AM - 11:00 PM\n• Saturday: 9:00 AM - 9:00 PM\n• Sunday: 10:00 AM - 10:00 PM\n\nServices Available:\n• Study rooms (reserve online)\n• Computer lab access\n• Research assistance\n• Printing & copying\n• Book lending & returns",
    "dining": "🍽️ **Dining Information**\n\nDining Hall Hours:\n• Breakfast: 7:00 AM - 10:00 AM\n• Lunch: 11:00 AM - 3:00 PM\n• Dinner: 5:00 PM - 9:00 PM\n\nToday's Menu Highlights:\n• Grilled chicken with vegetables\n• Vegetarian pasta\n• Fresh salad bar\n• Pizza station",
    "map": "🗺️ **Campus Locations**\n\nKey Buildings:\n• Library: Central Campus, Building A\n• Student Center: Near main entrance\n• Dining Hall: South Campus\n• Gym: West Campus\n• Admin Building: North Campus\n\nNeed directions to a specific location? Just ask!",
    "office": "🏢 **Faculty Office Hours**\n\nCommon Office Hours:\n• Prof. Smith (CS): Mon/Wed 2-4 PM, Room 305\n• Prof. Johnson (Math): Tue/Thu 1-3 PM, Room 201\n• Prof. Davis (Physics): Mon/Fri 10-12 PM, Room 401\n\nNeed to contact a specific professor? I can help you find their information.",
    "help": "❓ **Academic Support Services**\n\nAvailable Resources:\n• Tutoring Center: Free peer tutoring\n• Writing Center: Essay and paper help\n• Career Services: Resume and job search\n• Counseling Services: Mental health support\n• IT Help Desk: Technical assistance\n\nAll services are free for students. Would you like contact information for any of these?"
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("schedule") || message.includes("class")) {
      return mockResponses.schedule;
    } else if (message.includes("library") || message.includes("book")) {
      return mockResponses.library;
    } else if (message.includes("dining") || message.includes("food") || message.includes("eat")) {
      return mockResponses.dining;
    } else if (message.includes("map") || message.includes("where") || message.includes("location")) {
      return mockResponses.map;
    } else if (message.includes("office") || message.includes("professor") || message.includes("faculty")) {
      return mockResponses.office;
    } else if (message.includes("help") || message.includes("support") || message.includes("academic")) {
      return mockResponses.help;
    } else {
      return "I can help you with:\n• Class schedules and academic calendar\n• Campus facilities and locations\n• Dining hall hours and menus\n• Library services and hours\n• Faculty office hours\n• Academic support services\n\nWhat specific information would you like to know?";
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: textToSend,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        message: getBotResponse(textToSend),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Campus Information Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuickActions onActionClick={handleSendMessage} />
          
          <Card>
            <ScrollArea className="h-96" ref={scrollAreaRef}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                />
              ))}
            </ScrollArea>
          </Card>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about schedules, facilities, dining, library services..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 p-4 ${isBot ? 'bg-muted/50' : ''}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
          {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium">
          {isBot ? 'Campus Assistant' : 'You'}
        </div>
        <div className="text-sm text-foreground whitespace-pre-wrap">
          {message}
        </div>
        <div className="text-xs text-muted-foreground">
          {timestamp}
        </div>
      </div>
    </div>
  );
};
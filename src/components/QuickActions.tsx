import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Utensils, BookOpen, Clock, HelpCircle } from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions = [
    { icon: Calendar, label: "Class Schedules", query: "Show me my class schedule" },
    { icon: MapPin, label: "Campus Map", query: "Where is the library?" },
    { icon: Utensils, label: "Dining Hours", query: "What are the dining hall hours?" },
    { icon: BookOpen, label: "Library Services", query: "What library services are available?" },
    { icon: Clock, label: "Office Hours", query: "When are faculty office hours?" },
    { icon: HelpCircle, label: "General Help", query: "How can I get academic support?" },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 h-auto p-3 text-xs"
            onClick={() => onActionClick(action.query)}
          >
            <action.icon className="h-4 w-4" />
            <span className="text-left">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
import { CampusChatbot } from "@/components/CampusChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Campus Information System</h1>
          <p className="text-xl text-muted-foreground">Get instant answers about schedules, facilities, dining, and more</p>
        </div>
        <CampusChatbot />
      </div>
    </div>
  );
};

export default Index;

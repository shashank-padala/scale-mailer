
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BrandSetup = () => {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("");
  const [dailyEmailGoal, setDailyEmailGoal] = useState<number | "">("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brandName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a brand name",
        variant: "destructive",
      });
      return;
    }
    
    if (!dailyEmailGoal || dailyEmailGoal < 100) {
      toast({
        title: "Error",
        description: "Please enter a daily email goal of at least 100",
        variant: "destructive",
      });
      return;
    }
    
    setShowRecommendation(true);
  };
  
  // Calculate recommended resources based on daily email goal
  const calculateResources = () => {
    if (!dailyEmailGoal) return { domains: 0, inboxes: 0 };
    
    // Simple calculation: 1 inbox per 50 emails/day, 1 domain per 2 inboxes
    const inboxes = Math.ceil(Number(dailyEmailGoal) / 50);
    const domains = Math.ceil(inboxes / 2);
    
    return { domains, inboxes };
  };
  
  const { domains, inboxes } = calculateResources();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Brand Setup</h1>
        <p className="text-muted-foreground mt-2">
          Create a new brand to manage your email campaigns
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>New Brand Information</CardTitle>
          <CardDescription>
            Enter your brand details and email sending goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="brand-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                placeholder="e.g., Acme Inc."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dailyEmailGoal">Daily Email Goal</Label>
              <Input
                id="dailyEmailGoal"
                type="number"
                placeholder="e.g., 5000"
                min={100}
                value={dailyEmailGoal}
                onChange={(e) => setDailyEmailGoal(e.target.value ? Number(e.target.value) : "")}
              />
              <p className="text-xs text-muted-foreground">
                How many emails do you want to send per day?
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="brand-form">
            Calculate Requirements
          </Button>
        </CardFooter>
      </Card>
      
      {showRecommendation && (
        <Card className="mt-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              To safely send <strong>{dailyEmailGoal.toLocaleString()}</strong> emails/day for <strong>{brandName}</strong>, we recommend:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span><strong>{domains}</strong> domains</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span><strong>{inboxes}</strong> inboxes</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="default">
              View Domain Suggestions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default BrandSetup;

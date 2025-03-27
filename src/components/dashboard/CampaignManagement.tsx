
import { useState } from "react";
import { 
  PlusCircle, 
  MessageSquare, 
  CalendarClock, 
  AlarmClock, 
  Copy, 
  Trash, 
  SendHorizonal, 
  ChevronDown, 
  ChevronUp, 
  RotateCw 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface EmailStep {
  id: string;
  type: "email" | "if_condition" | "delay";
  title: string;
  content?: string;
  condition?: string;
  days?: number;
  expanded: boolean;
}

const CampaignManagement = () => {
  const { toast } = useToast();
  const [campaignName, setCampaignName] = useState("SaaS Agencies Campaign");
  const [emailSteps, setEmailSteps] = useState<EmailStep[]>([
    {
      id: "1",
      type: "email",
      title: "First Email",
      content: "Hi {first_name},\n\nI noticed {company} has been scaling its marketing efforts recently. Many agencies like yours struggle with cold email infrastructure as they grow.\n\nWe've helped agencies like yours set up reliable cold email systems that can handle 10,000+ emails per day without the headaches of managing dozens of inboxes manually.\n\nWould you be open to a quick call to see if we might be a good fit?\n\nBest,\n{sender_name}",
      expanded: true
    },
    {
      id: "2",
      type: "delay",
      title: "Wait 3 Days",
      days: 3,
      expanded: false
    },
    {
      id: "3",
      type: "email",
      title: "Follow-up Email",
      content: "Hi {first_name},\n\nJust following up on my previous email. I'd love to show you how we've helped agencies like {company} set up scalable cold email infrastructure without the technical headaches.\n\nHow does your calendar look next week for a quick 15-minute call?\n\nBest,\n{sender_name}",
      expanded: false
    },
    {
      id: "4",
      type: "if_condition",
      title: "If Replied",
      condition: "replied",
      expanded: false
    },
    {
      id: "5",
      type: "email",
      title: "Reply to Response",
      content: "Hi {first_name},\n\nThanks for getting back to me! I'd be happy to share more details about our platform.\n\nHere's my calendar link to book a time that works for you: {calendly_link}\n\nLooking forward to our conversation!\n\nBest,\n{sender_name}",
      expanded: false
    }
  ]);
  
  const [selectedTone, setSelectedTone] = useState("friendly");
  
  const handleGenerateWithAI = () => {
    toast({
      title: "Generating Email Sequence",
      description: "Creating AI-optimized emails for your campaign...",
    });
    
    // Simulate AI generation
    setTimeout(() => {
      toast({
        title: "Email Sequence Generated",
        description: "Your AI-generated email sequence is ready to use.",
      });
    }, 2000);
  };
  
  const toggleExpand = (id: string) => {
    setEmailSteps(steps => 
      steps.map(step => 
        step.id === id 
          ? { ...step, expanded: !step.expanded } 
          : step
      )
    );
  };
  
  const handleAddEmailStep = () => {
    const newId = String(emailSteps.length + 1);
    setEmailSteps([...emailSteps, {
      id: newId,
      type: "email",
      title: "New Email",
      content: "",
      expanded: true
    }]);
  };
  
  const handleAddDelayStep = () => {
    const newId = String(emailSteps.length + 1);
    setEmailSteps([...emailSteps, {
      id: newId,
      type: "delay",
      title: "Wait Days",
      days: 2,
      expanded: true
    }]);
  };
  
  const handleAddConditionStep = () => {
    const newId = String(emailSteps.length + 1);
    setEmailSteps([...emailSteps, {
      id: newId,
      type: "if_condition",
      title: "If Condition",
      condition: "replied",
      expanded: true
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your email campaigns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RotateCw className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <SendHorizonal className="mr-2 h-4 w-4" />
            Launch Campaign
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Email Workflow</CardTitle>
              <CardDescription>
                Design your email sequence and automation steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input 
                  id="campaign-name" 
                  value={campaignName} 
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="space-y-4">
                {emailSteps.map((step, index) => (
                  <Card key={step.id} className="border border-muted">
                    <CardHeader className="p-3 cursor-pointer" onClick={() => toggleExpand(step.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {step.type === "email" && <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />}
                          {step.type === "delay" && <CalendarClock className="h-4 w-4 mr-2 text-amber-500" />}
                          {step.type === "if_condition" && <RotateCw className="h-4 w-4 mr-2 text-purple-500" />}
                          <span className="font-medium">
                            {index + 1}. {step.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                          {step.expanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {step.expanded && (
                      <CardContent className="p-3 pt-0">
                        {step.type === "email" && (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor={`title-${step.id}`}>Email Title</Label>
                              <Input 
                                id={`title-${step.id}`} 
                                value={step.title}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`content-${step.id}`}>Email Content</Label>
                              <Textarea 
                                id={`content-${step.id}`} 
                                value={step.content}
                                rows={8}
                                className="mt-1"
                              />
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Available variables: {"{first_name}"}, {"{company}"}, {"{sender_name}"}, {"{calendly_link}"}
                            </div>
                          </div>
                        )}
                        
                        {step.type === "delay" && (
                          <div>
                            <Label htmlFor={`delay-${step.id}`}>Wait Time (days)</Label>
                            <Input 
                              id={`delay-${step.id}`} 
                              type="number"
                              value={step.days}
                              min={1}
                              max={30}
                              className="mt-1 w-24"
                            />
                          </div>
                        )}
                        
                        {step.type === "if_condition" && (
                          <div>
                            <Label htmlFor={`condition-${step.id}`}>Condition</Label>
                            <Select defaultValue={step.condition}>
                              <SelectTrigger id={`condition-${step.id}`} className="mt-1">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="replied">If Replied</SelectItem>
                                <SelectItem value="opened">If Opened</SelectItem>
                                <SelectItem value="clicked">If Clicked Link</SelectItem>
                                <SelectItem value="not_replied">If Not Replied</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
                
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={handleAddEmailStep}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleAddDelayStep}>
                    <CalendarClock className="h-4 w-4 mr-1" />
                    Add Delay
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleAddConditionStep}>
                    <RotateCw className="h-4 w-4 mr-1" />
                    Add Condition
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Email Assistant</CardTitle>
                <CardDescription>
                  Use AI to generate email content for your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">What are you selling?</Label>
                  <Textarea 
                    id="ai-prompt" 
                    placeholder="Write a cold email for a SaaS agency targeting realtors..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Email Tone</Label>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full" onClick={handleGenerateWithAI}>
                  Generate with AI
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Send Settings</CardTitle>
                <CardDescription>
                  Configure your campaign sending options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule Type</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Send Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time-zone">Time Zone</Label>
                  <Select defaultValue="gmt">
                    <SelectTrigger id="time-zone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                      <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Batch Size</Label>
                  <Input 
                    id="batch-size" 
                    type="number"
                    defaultValue="50"
                    min={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of emails to send in each batch
                  </p>
                </div>
                
                <div className="pt-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <AlarmClock className="mr-2 h-4 w-4" />
                        Set Sending Window
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sending Window</SheetTitle>
                        <SheetDescription>
                          Set the hours when your emails will be sent
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Select defaultValue="9">
                              <SelectTrigger id="start-time">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({length: 24}, (_, i) => (
                                  <SelectItem key={i} value={String(i)}>
                                    {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i-12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end-time">End Time</Label>
                            <Select defaultValue="17">
                              <SelectTrigger id="end-time">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({length: 24}, (_, i) => (
                                  <SelectItem key={i} value={String(i)}>
                                    {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i-12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Active Days</Label>
                          <div className="flex flex-wrap gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                              <Button 
                                key={day} 
                                variant="outline" 
                                className="flex-1 bg-secondary"
                              >
                                {day}
                              </Button>
                            ))}
                            {['Sat', 'Sun'].map(day => (
                              <Button 
                                key={day} 
                                variant="outline" 
                                className="flex-1"
                              >
                                {day}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button>Save Settings</Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;

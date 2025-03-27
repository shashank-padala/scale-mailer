
import { useState } from "react";
import { 
  Mail, 
  Plus, 
  MailQuestion, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
  Calendar,
  Send,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: "draft" | "active" | "paused" | "completed";
  sentEmails: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  lastUpdated: string;
}

interface EmailStep {
  id: string;
  type: "email" | "condition" | "delay";
  subject?: string;
  body?: string;
  delayDays?: number;
  condition?: string;
}

const CampaignManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "SaaS Founders Outreach",
      brand: "TechCorp",
      status: "active",
      sentEmails: 1250,
      openRate: 42.5,
      clickRate: 12.8,
      replyRate: 8.3,
      lastUpdated: "2023-04-15",
    },
    {
      id: "2",
      name: "Real Estate Agents Q2",
      brand: "PropTech Solutions",
      status: "paused",
      sentEmails: 720,
      openRate: 31.2,
      clickRate: 9.5,
      replyRate: 5.2,
      lastUpdated: "2023-04-12",
    },
    {
      id: "3",
      name: "Healthcare Decision Makers",
      brand: "MedTech Innovations",
      status: "draft",
      sentEmails: 0,
      openRate: 0,
      clickRate: 0,
      replyRate: 0,
      lastUpdated: "2023-04-17",
    },
    {
      id: "4",
      name: "E-commerce Store Owners",
      brand: "ShopBoost",
      status: "completed",
      sentEmails: 3480,
      openRate: 38.9,
      clickRate: 15.2,
      replyRate: 7.6,
      lastUpdated: "2023-04-05",
    },
  ]);

  const [emailSteps, setEmailSteps] = useState<EmailStep[]>([
    {
      id: "step1",
      type: "email",
      subject: "Would love to connect about {company}'s growth strategy",
      body: "Hi {first_name},\n\nI noticed that {company} has been making waves in the {industry} space. I wanted to reach out because we've helped similar companies increase their lead generation by 35% within 60 days.\n\nWould you be open to a 15-minute call to discuss how we might be able to help?\n\nBest regards,\nYour Name",
    },
    {
      id: "step2",
      type: "delay",
      delayDays: 3,
    },
    {
      id: "step3",
      type: "email",
      subject: "Following up: {company}'s growth strategy",
      body: "Hi {first_name},\n\nI wanted to follow up on my previous email. I understand you're probably busy, so I'll keep this brief.\n\nWe've recently helped a company in the {industry} industry achieve a 42% increase in qualified meetings by implementing our solution. I'd love to share some insights that might be valuable for {company}.\n\nHow does your calendar look next Tuesday or Wednesday for a quick call?\n\nBest regards,\nYour Name",
    },
    {
      id: "step4",
      type: "condition",
      condition: "if_replied",
    },
    {
      id: "step5",
      type: "email",
      subject: "One last thought for {company}",
      body: "Hi {first_name},\n\nThis will be my last email for now. I wanted to share a quick case study that might be relevant to {company}.\n\n[Case Study Link]\n\nIf you ever want to discuss strategies to improve your outbound results, my inbox is always open.\n\nAll the best,\nYour Name",
    },
  ]);

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "Your new campaign has been created successfully.",
    });
    setShowNewCampaign(false);
  };

  const handleSaveWorkflow = () => {
    toast({
      title: "Workflow Saved",
      description: "Your email workflow has been saved successfully.",
    });
  };

  const renderCampaignsList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Campaigns</h2>
          <p className="text-muted-foreground">Manage your email sequences and automations</p>
        </div>
        <Button onClick={() => setShowNewCampaign(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="techcorp">TechCorp</SelectItem>
              <SelectItem value="proptech">PropTech Solutions</SelectItem>
              <SelectItem value="medtech">MedTech Innovations</SelectItem>
              <SelectItem value="shopboost">ShopBoost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input 
          placeholder="Search campaigns..."
          className="w-[300px]"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Reply Rate</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} onClick={() => setSelectedCampaign(campaign.id)} className="cursor-pointer">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.brand}</TableCell>
                  <TableCell>
                    {campaign.status === "active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                    {campaign.status === "paused" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Paused
                      </span>
                    )}
                    {campaign.status === "draft" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Draft
                      </span>
                    )}
                    {campaign.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Completed
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{campaign.sentEmails.toLocaleString()}</TableCell>
                  <TableCell>{campaign.openRate}%</TableCell>
                  <TableCell>{campaign.clickRate}%</TableCell>
                  <TableCell>{campaign.replyRate}%</TableCell>
                  <TableCell>{campaign.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderNewCampaign = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>
              Set up a new email sequence for your leads
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowNewCampaign(false)}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="campaign-name">
            Campaign Name
          </label>
          <Input
            id="campaign-name"
            placeholder="e.g., Q2 SaaS Founders Outreach"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="campaign-brand">
            Brand
          </label>
          <Select>
            <SelectTrigger id="campaign-brand">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="techcorp">TechCorp</SelectItem>
              <SelectItem value="proptech">PropTech Solutions</SelectItem>
              <SelectItem value="medtech">MedTech Innovations</SelectItem>
              <SelectItem value="shopboost">ShopBoost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="campaign-target">
            Target Audience
          </label>
          <Select>
            <SelectTrigger id="campaign-target">
              <SelectValue placeholder="Select lead list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas-founders">SaaS Founders</SelectItem>
              <SelectItem value="real-estate">Real Estate Agents</SelectItem>
              <SelectItem value="healthcare">Healthcare Executives</SelectItem>
              <SelectItem value="ecommerce">E-commerce Store Owners</SelectItem>
              <SelectItem value="new-list">+ Create New List</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="campaign-goal">
            Campaign Goal
          </label>
          <Select>
            <SelectTrigger id="campaign-goal">
              <SelectValue placeholder="Select primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meetings">Book Meetings</SelectItem>
              <SelectItem value="demo">Request Demo</SelectItem>
              <SelectItem value="signup">Free Signup</SelectItem>
              <SelectItem value="download">Resource Download</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
          Cancel
        </Button>
        <Button onClick={handleCreateCampaign}>Continue to Email Setup</Button>
      </CardFooter>
    </Card>
  );
  
  const renderAIWorkflowBuilder = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Workflow Builder</h2>
          <p className="text-muted-foreground">Design your cold email sequence with AI assistance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Settings
          </Button>
          <Button onClick={handleSaveWorkflow}>
            Save Workflow
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Email Steps</CardTitle>
              <CardDescription>Drag and drop elements to build your sequence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Add Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Add Delay
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MailQuestion className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium">AI Email Writer</h3>
                <Input placeholder="Write a cold email for..." />
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="founder">Founder</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Generate Email</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Workflow Canvas</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Email Step 1 */}
            <Card>
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">Step 1: Initial Email</CardTitle>
                  <CardDescription>Sent immediately when campaign starts</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Subject:</span>
                    <span className="text-sm">{emailSteps[0].subject}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Body:</span>
                    <div className="mt-1 text-sm whitespace-pre-line border p-3 rounded-md bg-muted/50">
                      {emailSteps[0].body}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Wait Step */}
            <div className="flex items-center gap-2 py-2 px-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">Wait 3 days</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Email Step 2 */}
            <Card>
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">Step 2: Follow-up Email</CardTitle>
                  <CardDescription>Sent 3 days after initial email if no reply</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Subject:</span>
                    <span className="text-sm">{emailSteps[2].subject}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Body:</span>
                    <div className="mt-1 text-sm whitespace-pre-line border p-3 rounded-md bg-muted/50">
                      {emailSteps[2].body}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Conditional Branch */}
            <div className="flex items-center">
              <div className="flex-1 border-b border-dashed border-muted-foreground/30"></div>
              <div className="mx-4 bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                IF REPLIED
              </div>
              <div className="flex-1 border-b border-dashed border-muted-foreground/30"></div>
            </div>
            
            {/* Conditional Paths */}
            <div className="grid grid-cols-2 gap-4">
              {/* Yes Branch */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium">If Yes</span>
                </div>
                <Card className="border-green-200">
                  <CardContent className="p-3">
                    <div className="text-xs text-muted-foreground mb-2">Action</div>
                    <div className="text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Send calendar booking link
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* No Branch */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm font-medium">If No</span>
                </div>
                <Card className="border-red-200">
                  <CardContent className="p-3">
                    <div className="text-xs text-muted-foreground mb-2">Action</div>
                    <div className="text-sm flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Send final follow-up email
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Final Email */}
            <Card>
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">Step 3: Final Email</CardTitle>
                  <CardDescription>Last attempt if no response to previous emails</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Subject:</span>
                    <span className="text-sm">{emailSteps[4].subject}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Body:</span>
                    <div className="mt-1 text-sm whitespace-pre-line border p-3 rounded-md bg-muted/50">
                      {emailSteps[4].body}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* End of Sequence */}
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">End of Sequence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
        <p className="text-muted-foreground mt-1">
          Create and manage email campaigns with AI-powered workflows
        </p>
      </div>
      
      <Tabs defaultValue="campaigns" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaigns">
            <Mail className="h-4 w-4 mr-2" />
            My Campaigns
          </TabsTrigger>
          <TabsTrigger value="builder">
            <ArrowRight className="h-4 w-4 mr-2" />
            Workflow Builder
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="mt-6">
          {showNewCampaign ? renderNewCampaign() : renderCampaignsList()}
        </TabsContent>
        
        <TabsContent value="builder" className="mt-6">
          {renderAIWorkflowBuilder()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignManagement;

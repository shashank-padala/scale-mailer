
import { useState } from "react";
import { Upload, Download, Filter, Info, MoreHorizontal, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  source: string;
  status: "not_sent" | "sent" | "replied";
}

const LeadFinder = () => {
  const { toast } = useToast();
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      title: "Marketing Director",
      company: "Global Solutions Inc.",
      source: "CSV Import",
      status: "not_sent",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@techinnovate.co",
      title: "CTO",
      company: "TechInnovate",
      source: "API",
      status: "sent",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "m.chen@cloudserve.net",
      title: "IT Director",
      company: "CloudServe",
      source: "API",
      status: "replied",
    },
    {
      id: "4",
      name: "Jennifer Wu",
      email: "jen.wu@digitalflow.io",
      title: "CEO",
      company: "Digital Flow",
      source: "CSV Import",
      status: "not_sent",
    },
    {
      id: "5",
      name: "Robert Garcia",
      email: "r.garcia@nexustech.com",
      title: "Sales Manager",
      company: "Nexus Technologies",
      source: "API",
      status: "sent",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (fileUploaded) {
      toast({
        title: "CSV Upload Started",
        description: `Processing "${fileUploaded.name}" - this may take a moment.`,
      });
      // Mocking successful upload after a delay
      setTimeout(() => {
        toast({
          title: "Upload Complete",
          description: "Successfully imported 250 leads from your CSV.",
        });
        setFileUploaded(null);
      }, 2000);
    } else {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please select a CSV or Excel file first.",
      });
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Leads Added to Cart",
      description: "150 leads added to your cart. Proceed to checkout.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Finder</h1>
        <p className="text-muted-foreground mt-1">
          Import or purchase targeted leads for your campaigns
        </p>
      </div>
      
      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Leads</TabsTrigger>
          <TabsTrigger value="marketplace">Lead Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV or Excel File</CardTitle>
              <CardDescription>
                Import your own leads from a CSV or Excel file. Make sure your file includes email addresses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Drag and drop your file here</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports .CSV, .XLS, .XLSX (max 10MB)
                  </p>
                  <div className="mt-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xls,.xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
                    >
                      Select File
                    </Label>
                  </div>
                  {fileUploaded && (
                    <div className="mt-2 text-sm flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{fileUploaded.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Required fields: Email, Name, Company</span>
                  </div>
                </div>
                <Button onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Leads
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketplace" className="mt-4">
          <div className="grid gap-6 md:grid-cols-6">
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Search Filters</CardTitle>
                  <CardDescription>
                    Find leads that match your target criteria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="software">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software & Technology</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select defaultValue="usa">
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Select defaultValue="cto">
                      <SelectTrigger id="job-title">
                        <SelectValue placeholder="Select job title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ceo">CEO/Founder</SelectItem>
                        <SelectItem value="cto">CTO/CIO</SelectItem>
                        <SelectItem value="vp">VP Engineering</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="company-size">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">1-50 employees</SelectItem>
                        <SelectItem value="medium">51-200 employees</SelectItem>
                        <SelectItem value="large">201-1000 employees</SelectItem>
                        <SelectItem value="enterprise">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="aws" />
                        <label
                          htmlFor="aws"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AWS
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="salesforce" />
                        <label
                          htmlFor="salesforce"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Salesforce
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hubspot" />
                        <label
                          htmlFor="hubspot"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          HubSpot
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Price per Lead</span>
                      <span className="text-sm font-medium text-muted-foreground">₹25</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Available Leads</span>
                      <span className="text-sm font-medium text-muted-foreground">1,500</span>
                    </div>
                    <Button className="w-full mt-4" onClick={handleAddToCart}>
                      Add to Cart (₹3,750)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Lead Pool</CardTitle>
                    <div className="flex gap-2">
                      <Input
                        type="search"
                        placeholder="Search leads..."
                        className="w-[300px]"
                      />
                      <Button variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    View and manage all your available leads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map(lead => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.title}</TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>
                            {lead.status === "not_sent" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Not Sent
                              </span>
                            )}
                            {lead.status === "sent" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Sent
                              </span>
                            )}
                            {lead.status === "replied" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Replied
                              </span>
                            )}
                          </TableCell>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadFinder;


import { useState } from "react";
import { Upload, Download, Filter, Info, MoreHorizontal, Check, AlertCircle, X, ListFilter, Plus } from "lucide-react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Lead {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  source: string;
  status: "not_sent" | "sent" | "replied";
  selected?: boolean;
}

const LeadFinder = () => {
  const { toast } = useToast();
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      title: "Marketing Director",
      company: "Global Solutions Inc.",
      source: "CSV Import",
      status: "not_sent",
      selected: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@techinnovate.co",
      title: "CTO",
      company: "TechInnovate",
      source: "API",
      status: "sent",
      selected: false,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "m.chen@cloudserve.net",
      title: "IT Director",
      company: "CloudServe",
      source: "API",
      status: "replied",
      selected: false,
    },
    {
      id: "4",
      name: "Jennifer Wu",
      email: "jen.wu@digitalflow.io",
      title: "CEO",
      company: "Digital Flow",
      source: "CSV Import",
      status: "not_sent",
      selected: false,
    },
    {
      id: "5",
      name: "Robert Garcia",
      email: "r.garcia@nexustech.com",
      title: "Sales Manager",
      company: "Nexus Technologies",
      source: "API",
      status: "sent",
      selected: false,
    },
    {
      id: "6",
      name: "Tom Wolfe",
      email: "tom@sitekick.com",
      title: "Chief Executive Officer",
      company: "SiteKick",
      source: "Lead Finder",
      status: "not_sent",
      selected: false,
    },
    {
      id: "7",
      name: "Alexandra Chen",
      email: "alex@metaverse.io",
      title: "CTO",
      company: "Metaverse Solutions",
      source: "Lead Finder",
      status: "not_sent",
      selected: false,
    },
    {
      id: "8",
      name: "David Kim",
      email: "david@appsync.co",
      title: "Founder",
      company: "AppSync",
      source: "Lead Finder",
      status: "not_sent",
      selected: false,
    },
  ]);

  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [expandedFilters, setExpandedFilters] = useState({
    jobTitles: true,
    location: true,
    industry: true,
    employeeRange: true,
    revenue: false,
    domains: false,
  });

  // Select lead handling
  const toggleLeadSelection = (id: string) => {
    setLeads(
      leads.map(lead => 
        lead.id === id ? { ...lead, selected: !lead.selected } : lead
      )
    );
    
    const lead = leads.find(l => l.id === id);
    if (lead) {
      if (lead.selected) {
        setSelectedLeads(selectedLeads.filter(l => l.id !== id));
      } else {
        setSelectedLeads([...selectedLeads, { ...lead, selected: true }]);
      }
    }
  };

  const handleSelectAll = (selected: boolean) => {
    setLeads(leads.map(lead => ({ ...lead, selected })));
    if (selected) {
      setSelectedLeads([...leads].map(lead => ({ ...lead, selected: true })));
    } else {
      setSelectedLeads([]);
    }
  };

  // File upload handling
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
        setUploadMethod(null);
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

  // Cart functionality
  const addToCart = () => {
    const count = selectedLeads.length;
    if (count > 0) {
      toast({
        title: "Leads Added to Cart",
        description: `${count} leads added to your cart. Total cost: ${count * 2}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "No Leads Selected",
        description: "Please select at least one lead to add to your cart.",
      });
    }
  };

  // Render upload options selection screen
  const renderUploadOptions = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <Card 
        className={`cursor-pointer hover:border-primary transition-colors ${uploadMethod === 'csv' ? 'border-primary bg-muted/50' : ''}`}
        onClick={() => setUploadMethod('csv')}
      >
        <CardHeader className="p-4">
          <div className="flex justify-center mb-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-center">Upload CSV</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-center text-sm text-muted-foreground">
            Import leads from a CSV or Excel file
          </p>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer hover:border-primary transition-colors ${uploadMethod === 'finder' ? 'border-primary bg-muted/50' : ''}`}
        onClick={() => setUploadMethod('finder')}
      >
        <CardHeader className="p-4">
          <div className="flex justify-center mb-2">
            <Filter className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-center">Use Lead Finder</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-center text-sm text-muted-foreground">
            Search for leads using our database
          </p>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer hover:border-primary transition-colors ${uploadMethod === 'manual' ? 'border-primary bg-muted/50' : ''}`}
        onClick={() => setUploadMethod('manual')}
      >
        <CardHeader className="p-4">
          <div className="flex justify-center mb-2">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-center">Enter Manually</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-center text-sm text-muted-foreground">
            Add individual contacts manually
          </p>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer hover:border-primary transition-colors ${uploadMethod === 'sheets' ? 'border-primary bg-muted/50' : ''}`}
        onClick={() => setUploadMethod('sheets')}
      >
        <CardHeader className="p-4">
          <div className="flex justify-center mb-2">
            <svg className="h-10 w-10 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="8" y1="13" x2="16" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="8" y1="17" x2="16" y2="17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10 9 9 9 8 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <CardTitle className="text-center">Google Sheets</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-center text-sm text-muted-foreground">
            Connect a Google Sheet with lead data
          </p>
        </CardContent>
      </Card>

      {uploadMethod && (
        <div className="col-span-full flex justify-center mt-4">
          <Button onClick={() => {
            if (uploadMethod === 'csv') {
              document.getElementById('file-upload')?.click();
            }
          }}>
            Proceed with {uploadMethod === 'csv' ? 'CSV Upload' : 
              uploadMethod === 'finder' ? 'Lead Finder' : 
              uploadMethod === 'manual' ? 'Manual Entry' : 'Google Sheets'}
          </Button>
        </div>
      )}
    </div>
  );

  // Render CSV upload interface
  const renderCsvUpload = () => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Upload CSV or Excel File</CardTitle>
            <CardDescription>
              Import your own leads from a CSV or Excel file. Make sure your file includes email addresses.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setUploadMethod(null)}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
        </div>
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
  );

  // Render lead finder interface
  const renderLeadFinder = () => (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lead Finder - Create New Audience</h2>
        <Button variant="outline" size="sm" onClick={() => setUploadMethod(null)}>
          <X className="h-4 w-4 mr-2" /> Back to Options
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Filters</span>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <MoreHorizontal className="h-3.5 w-3.5 mr-1" />
                  Save Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Job Titles Filter */}
              <Collapsible open={expandedFilters.jobTitles} onOpenChange={() => setExpandedFilters({...expandedFilters, jobTitles: !expandedFilters.jobTitles})}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="job-title" className="text-sm font-medium">Job Titles</Label>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {expandedFilters.jobTitles ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ceo" />
                    <label htmlFor="ceo" className="text-sm">CEO/Founder</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cto" />
                    <label htmlFor="cto" className="text-sm">CTO/CIO</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vp" />
                    <label htmlFor="vp" className="text-sm">VP Engineering</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="director" />
                    <label htmlFor="director" className="text-sm">Director</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="manager" />
                    <label htmlFor="manager" className="text-sm">Manager</label>
                  </div>
                  <Input className="h-8 mt-2" placeholder="Add custom title..." />
                </CollapsibleContent>
              </Collapsible>
              
              <Separator />
              
              {/* Location Filter */}
              <Collapsible open={expandedFilters.location} onOpenChange={() => setExpandedFilters({...expandedFilters, location: !expandedFilters.location})}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {expandedFilters.location ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 mt-2">
                  <Select defaultValue="usa">
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="h-8" placeholder="State/Province" />
                  <Input className="h-8" placeholder="City" />
                </CollapsibleContent>
              </Collapsible>
              
              <Separator />
              
              {/* Industry Filter */}
              <Collapsible open={expandedFilters.industry} onOpenChange={() => setExpandedFilters({...expandedFilters, industry: !expandedFilters.industry})}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {expandedFilters.industry ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="saas" />
                    <label htmlFor="saas" className="text-sm">SaaS</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="finance" />
                    <label htmlFor="finance" className="text-sm">Finance & Banking</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="healthcare" />
                    <label htmlFor="healthcare" className="text-sm">Healthcare</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ecommerce" />
                    <label htmlFor="ecommerce" className="text-sm">E-commerce & Retail</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="agency" />
                    <label htmlFor="agency" className="text-sm">Agencies</label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Separator />
              
              {/* Employee Range Filter */}
              <Collapsible open={expandedFilters.employeeRange} onOpenChange={() => setExpandedFilters({...expandedFilters, employeeRange: !expandedFilters.employeeRange})}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="employee-range" className="text-sm font-medium">Employee Range</Label>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {expandedFilters.employeeRange ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1-10" />
                    <label htmlFor="1-10" className="text-sm">1-10 employees</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="11-50" />
                    <label htmlFor="11-50" className="text-sm">11-50 employees</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="51-200" />
                    <label htmlFor="51-200" className="text-sm">51-200 employees</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="201-1000" />
                    <label htmlFor="201-1000" className="text-sm">201-1000 employees</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1000+" />
                    <label htmlFor="1000+" className="text-sm">1000+ employees</label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Separator />
              
              {/* Keyword Filter */}
              <div className="space-y-2">
                <Label htmlFor="keyword" className="text-sm font-medium">Keyword Filter</Label>
                <Input 
                  id="keyword" 
                  className="h-8" 
                  placeholder="Search by keywords..." 
                />
                <p className="text-xs text-muted-foreground">
                  Match words in titles, bios, company pages
                </p>
              </div>
              
              <Separator />
              
              {/* Apply Filters Button */}
              <div className="pt-2">
                <Button className="w-full">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" className="w-full mt-2">
                  Reset Filters
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
                </div>
              </div>
              <CardDescription>
                Found: 258 leads matching your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox 
                        id="select-all" 
                        onCheckedChange={(checked) => {
                          handleSelectAll(checked === true);
                        }}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map(lead => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox 
                          id={`select-${lead.id}`} 
                          checked={lead.selected}
                          onCheckedChange={() => toggleLeadSelection(lead.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.title}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">$1.5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing 8 of 258 leads
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Selected: {selectedLeads.length} | Total: ${selectedLeads.length * 25}
                  </span>
                  <Button onClick={addToCart}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Render manual entry interface
  const renderManualEntry = () => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manually Enter Leads</CardTitle>
            <CardDescription>
              Add individual leads manually to your campaign
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setUploadMethod(null)}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@company.com" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="Marketing Director" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
            <Input id="linkedin" placeholder="https://linkedin.com/in/johnsmith" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input id="notes" placeholder="Any additional information" />
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button onClick={() => {
              toast({
                title: "Lead Added",
                description: "The lead has been added to your campaign.",
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            <Button variant="secondary">
              Add Multiple
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render Google Sheets interface
  const renderGoogleSheets = () => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Connect Google Sheets</CardTitle>
            <CardDescription>
              Import leads directly from a Google Sheet
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setUploadMethod(null)}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-6 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
          <svg className="h-12 w-12 text-muted-foreground mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="13" x2="16" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="17" x2="16" y2="17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="10" y1="9" x2="8" y2="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="font-medium mb-2">Connect to Google Sheets</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Directly import leads from your Google Sheets document
          </p>
          <Button onClick={() => {
            toast({
              title: "Google Authentication Required",
              description: "You'll be redirected to authenticate with Google.",
            });
          }}>
            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Connect with Google
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Or paste your Google Sheet URL</h3>
          <div className="flex gap-2">
            <Input placeholder="https://docs.google.com/spreadsheets/d/..." className="flex-1" />
            <Button variant="outline">Connect</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your Google Sheet must have a header row with column names matching our expected fields (Name, Email, etc.)
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Sync Options</h3>
          <div className="flex items-center space-x-2">
            <Checkbox id="auto-sync" />
            <label htmlFor="auto-sync" className="text-sm">
              Auto-sync daily (keep leads updated)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="one-time" />
            <label htmlFor="one-time" className="text-sm">
              One-time import only
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Finder</h1>
        <p className="text-muted-foreground mt-1">
          Import or purchase targeted leads for your campaigns
        </p>
      </div>
      
      {!uploadMethod && renderUploadOptions()}
      
      {uploadMethod === 'csv' && renderCsvUpload()}
      {uploadMethod === 'finder' && renderLeadFinder()}
      {uploadMethod === 'manual' && renderManualEntry()}
      {uploadMethod === 'sheets' && renderGoogleSheets()}
    </div>
  );
};

export default LeadFinder;

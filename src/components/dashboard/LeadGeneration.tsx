
import { useState } from "react";
import { Search, Download, Filter, Mail, Target, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  status: "replied" | "booked" | "no_response";
  date: string;
}

const leadData = [
  { brand: "Acme Inc", replied: 42, booked: 18, pending: 125 },
  { brand: "Widget Co", replied: 28, booked: 12, pending: 98 },
  { brand: "TechStart", replied: 35, booked: 15, pending: 110 },
  { brand: "DataFlow", replied: 22, booked: 8, pending: 75 },
  { brand: "SaaSly", replied: 18, booked: 5, pending: 60 },
];

const LeadGeneration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "replied" | "booked" | "no_response">("all");
  
  // Mock lead data
  const [leads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      company: "Company Inc.",
      source: "hello@getacme.co",
      status: "replied",
      date: "2023-04-30"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      company: "TechCorp",
      source: "sales@acmehq.com",
      status: "booked",
      date: "2023-04-29"
    },
    {
      id: "3",
      name: "Michael Williams",
      email: "michael@startupxyz.com",
      company: "StartupXYZ",
      source: "hello@tryacme.io",
      status: "no_response",
      date: "2023-04-28"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@enterpriseco.com",
      company: "Enterprise Co",
      source: "info@joinacme.com",
      status: "replied",
      date: "2023-04-27"
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@consulting.com",
      company: "Consulting Ltd",
      source: "sales@joinacme.com",
      status: "booked",
      date: "2023-04-26"
    },
    {
      id: "6",
      name: "Jessica Wilson",
      email: "jessica@innovate.io",
      company: "Innovate.io",
      source: "hello@getacme.co",
      status: "no_response",
      date: "2023-04-25"
    },
    {
      id: "7",
      name: "Andrew Thompson",
      email: "andrew@globalfirm.com",
      company: "Global Firm",
      source: "contact@tryacme.io",
      status: "replied",
      date: "2023-04-24"
    },
    {
      id: "8",
      name: "Laura Miller",
      email: "laura@nextstep.co",
      company: "NextStep Co",
      source: "sales@acmehq.com",
      status: "no_response",
      date: "2023-04-23"
    },
  ]);
  
  const filteredLeads = leads
    .filter(lead => 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(lead => filter === "all" || lead.status === filter);
  
  const statusCount = {
    all: leads.length,
    replied: leads.filter(l => l.status === "replied").length,
    booked: leads.filter(l => l.status === "booked").length,
    no_response: leads.filter(l => l.status === "no_response").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Generation</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage leads from your email campaigns
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={`cursor-pointer ${filter === "all" ? "bg-secondary" : ""}`} onClick={() => setFilter("all")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.all}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "replied" ? "bg-secondary" : ""}`} onClick={() => setFilter("replied")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.replied}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "booked" ? "bg-secondary" : ""}`} onClick={() => setFilter("booked")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.booked}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "no_response" ? "bg-secondary" : ""}`} onClick={() => setFilter("no_response")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">No Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.no_response}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Leads by Brand</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer 
              config={{
                replied: { color: "#3B82F6" },
                booked: { color: "#10B981" },
                pending: { color: "#94A3B8" },
              }}
            >
              <BarChart
                data={leadData}
                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="brand" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ dy: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="replied" name="Replied" stackId="a" fill="#3B82F6" />
                <Bar dataKey="booked" name="Booked" stackId="a" fill="#10B981" />
                <Bar dataKey="pending" name="No Response" stackId="a" fill="#94A3B8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lead Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Total Emails Sent</span>
                </div>
                <span className="font-bold">31,602</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Total Leads</span>
                </div>
                <span className="font-bold">162</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Conversion Rate</span>
                </div>
                <span className="font-bold">0.51%</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <div className="text-sm font-medium mb-2">Lead Quality</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Replied</span>
                    <span>42 (26%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "26%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Booked</span>
                    <span>18 (11%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "11%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>No Response</span>
                    <span>102 (63%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-gray-500" style={{ width: "63%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <br />
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Lead Details</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    {lead.status === "replied" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Replied
                      </span>
                    )}
                    {lead.status === "booked" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Booked
                      </span>
                    )}
                    {lead.status === "no_response" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        No Response
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadGeneration;

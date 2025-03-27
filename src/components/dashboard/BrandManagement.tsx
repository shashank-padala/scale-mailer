
import { useState } from "react";
import { Search, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Brand {
  id: string;
  name: string;
  emailsSent: number;
  leadsGenerated: number;
  callsBooked: number;
  salesClosed: number;
  domainsUsed: number;
  domainCosts: number;
  costPerLead: number;
  revenuePerLead: number;
  status: "active" | "paused" | "completed";
}

const BrandManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Mock brand data
  const [brands] = useState<Brand[]>([
    {
      id: "1",
      name: "Acme Inc.",
      emailsSent: 12500,
      leadsGenerated: 175,
      callsBooked: 42,
      salesClosed: 12,
      domainsUsed: 5,
      domainCosts: 25000,
      costPerLead: 142.85,
      revenuePerLead: 857.14,
      status: "active"
    },
    {
      id: "2",
      name: "TechGlobal",
      emailsSent: 8700,
      leadsGenerated: 103,
      callsBooked: 28,
      salesClosed: 8,
      domainsUsed: 3,
      domainCosts: 15000,
      costPerLead: 145.63,
      revenuePerLead: 776.69,
      status: "active"
    },
    {
      id: "3",
      name: "CloudSystems",
      emailsSent: 21000,
      leadsGenerated: 245,
      callsBooked: 87,
      salesClosed: 32,
      domainsUsed: 8,
      domainCosts: 40000,
      costPerLead: 163.26,
      revenuePerLead: 1306.12,
      status: "active"
    },
    {
      id: "4",
      name: "Digital Partners",
      emailsSent: 5200,
      leadsGenerated: 43,
      callsBooked: 12,
      salesClosed: 3,
      domainsUsed: 2,
      domainCosts: 10000,
      costPerLead: 232.55,
      revenuePerLead: 697.67,
      status: "paused"
    },
    {
      id: "5",
      name: "AlphaBrandings",
      emailsSent: 32000,
      leadsGenerated: 310,
      callsBooked: 98,
      salesClosed: 41,
      domainsUsed: 12,
      domainCosts: 60000,
      costPerLead: 193.54,
      revenuePerLead: 1322.58,
      status: "completed"
    },
    {
      id: "6",
      name: "Innovate Ltd",
      emailsSent: 18500,
      leadsGenerated: 205,
      callsBooked: 65,
      salesClosed: 22,
      domainsUsed: 7,
      domainCosts: 35000,
      costPerLead: 170.73,
      revenuePerLead: 1073.17,
      status: "active"
    },
  ]);
  
  const filteredBrands = brands
    .filter(brand => 
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(brand => 
      statusFilter === "all" || brand.status === statusFilter);
  
  // Calculate summary metrics
  const totalBrands = brands.length;
  const totalEmailsSent = brands.reduce((sum, brand) => sum + brand.emailsSent, 0);
  const totalRevenue = brands.reduce((sum, brand) => sum + (brand.revenuePerLead * brand.leadsGenerated), 0);
  const avgCostPerLead = brands.reduce((sum, brand) => sum + brand.costPerLead, 0) / brands.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Management</h1>
          <p className="text-muted-foreground mt-1">
            Track performance and ROI across all your agency brands
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBrands}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmailsSent.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cost Per Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgCostPerLead.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Brand Performance</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search brands..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Emails Sent</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Calls Booked</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Domains</TableHead>
                <TableHead>Domain Costs</TableHead>
                <TableHead>Cost/Lead</TableHead>
                <TableHead>Revenue/Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map(brand => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.emailsSent.toLocaleString()}</TableCell>
                  <TableCell>{brand.leadsGenerated}</TableCell>
                  <TableCell>{brand.callsBooked}</TableCell>
                  <TableCell>{brand.salesClosed}</TableCell>
                  <TableCell>{brand.domainsUsed}</TableCell>
                  <TableCell>₹{brand.domainCosts.toLocaleString()}</TableCell>
                  <TableCell>₹{brand.costPerLead.toFixed(2)}</TableCell>
                  <TableCell>₹{brand.revenuePerLead.toFixed(2)}</TableCell>
                  <TableCell>
                    {brand.status === "active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                    {brand.status === "paused" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Paused
                      </span>
                    )}
                    {brand.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Completed
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                      {brand.status === "active" ? (
                        <Button variant="ghost" size="sm">Pause</Button>
                      ) : (
                        <Button variant="ghost" size="sm">Resume</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandManagement;

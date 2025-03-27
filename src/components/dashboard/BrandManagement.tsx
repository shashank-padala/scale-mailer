
import { useState } from "react";
import { Edit, MoreHorizontal, PauseCircle, PlayCircle, Plus, Download, BarChart, DollarSign, UserRound, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("30days");
  
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      emailsSent: 15280,
      leadsGenerated: 427,
      callsBooked: 183,
      salesClosed: 52,
      domainsUsed: 12,
      domainCosts: 28800,
      costPerLead: 67.45,
      revenuePerLead: 357.28,
      status: "active",
    },
    {
      id: "2",
      name: "PropTech Innovations",
      emailsSent: 7320,
      leadsGenerated: 196,
      callsBooked: 78,
      salesClosed: 23,
      domainsUsed: 8,
      domainCosts: 16200,
      costPerLead: 82.65,
      revenuePerLead: 298.45,
      status: "active",
    },
    {
      id: "3",
      name: "MedTech Solutions",
      emailsSent: 3620,
      leadsGenerated: 108,
      callsBooked: 42,
      salesClosed: 12,
      domainsUsed: 5,
      domainCosts: 9000,
      costPerLead: 83.33,
      revenuePerLead: 412.50,
      status: "paused",
    },
    {
      id: "4",
      name: "E-commerce Accelerator",
      emailsSent: 22450,
      leadsGenerated: 635,
      callsBooked: 278,
      salesClosed: 86,
      domainsUsed: 15,
      domainCosts: 36000,
      costPerLead: 56.69,
      revenuePerLead: 285.33,
      status: "active",
    },
    {
      id: "5",
      name: "FinTech Ventures",
      emailsSent: 5780,
      leadsGenerated: 148,
      callsBooked: 56,
      salesClosed: 18,
      domainsUsed: 6,
      domainCosts: 12600,
      costPerLead: 85.14,
      revenuePerLead: 325.78,
      status: "completed",
    },
  ]);
  
  // Calculate summary metrics
  const totalBrands = brands.length;
  const totalEmails = brands.reduce((sum, brand) => sum + brand.emailsSent, 0);
  const totalRevenue = brands.reduce((sum, brand) => sum + (brand.revenuePerLead * brand.leadsGenerated), 0);
  const avgCostPerLead = brands.reduce((sum, brand) => sum + brand.costPerLead, 0) / totalBrands;
  
  const handleStatusChange = (brandId: string, newStatus: "active" | "paused" | "completed") => {
    setBrands(brands.map(brand => 
      brand.id === brandId ? { ...brand, status: newStatus } : brand
    ));
    
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      toast({
        title: `Brand ${newStatus === "active" ? "Activated" : newStatus === "paused" ? "Paused" : "Completed"}`,
        description: `${brand.name} has been ${newStatus === "active" ? "activated" : newStatus === "paused" ? "paused" : "marked as completed"}.`,
      });
    }
  };
  
  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your brand data is being exported to CSV.",
    });
  };
  
  const handleAddBrand = () => {
    toast({
      title: "Add New Brand",
      description: "Create a new brand for your campaigns.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage your brands and track their performance metrics
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBrands}</div>
            <p className="text-xs text-muted-foreground">
              {brands.filter(b => b.status === "active").length} active brands
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmails.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all brands and campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-muted-foreground">
              From converted leads
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cost Per Lead</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgCostPerLead.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Includes domain costs
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="flex flex-col gap-4 md:flex-row">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Input placeholder="Search brands..." className="w-[250px]" />
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddBrand}>
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </div>
      
      {/* Brands Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead className="text-right">Emails Sent</TableHead>
                <TableHead className="text-right">Leads Generated</TableHead>
                <TableHead className="text-right">Calls Booked</TableHead>
                <TableHead className="text-right">Sales Closed</TableHead>
                <TableHead className="text-right">Domains Used</TableHead>
                <TableHead className="text-right">Domain Costs</TableHead>
                <TableHead className="text-right">Cost per Lead</TableHead>
                <TableHead className="text-right">Revenue per Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="text-right">{brand.emailsSent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{brand.leadsGenerated.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{brand.callsBooked.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{brand.salesClosed.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{brand.domainsUsed}</TableCell>
                  <TableCell className="text-right">${brand.domainCosts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${brand.costPerLead.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${brand.revenuePerLead.toFixed(2)}</TableCell>
                  <TableCell>
                    {brand.status === "active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                    {brand.status === "paused" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Paused
                      </span>
                    )}
                    {brand.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Completed
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      {brand.status === "active" ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleStatusChange(brand.id, "paused")}
                        >
                          <PauseCircle className="h-4 w-4" />
                        </Button>
                      ) : brand.status === "paused" ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleStatusChange(brand.id, "active")}
                        >
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

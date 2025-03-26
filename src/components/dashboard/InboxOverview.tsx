
import { useState } from "react";
import { Search, RefreshCw, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Inbox {
  id: string;
  email: string;
  domain: string;
  status: "warming" | "active" | "paused";
  nextAvailableDate: string;
  health: "good" | "warning" | "critical";
}

const InboxOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "warming" | "active" | "paused">("all");
  
  // Mock inbox data
  const [inboxes] = useState<Inbox[]>([
    {
      id: "1",
      email: "hello@getacme.co",
      domain: "getacme.co",
      status: "warming",
      nextAvailableDate: "2023-05-15",
      health: "good"
    },
    {
      id: "2",
      email: "support@getacme.co",
      domain: "getacme.co",
      status: "warming",
      nextAvailableDate: "2023-05-18",
      health: "good"
    },
    {
      id: "3",
      email: "sales@acmehq.com",
      domain: "acmehq.com",
      status: "active",
      nextAvailableDate: "",
      health: "good"
    },
    {
      id: "4",
      email: "hello@acmehq.com",
      domain: "acmehq.com",
      status: "active",
      nextAvailableDate: "",
      health: "warning"
    },
    {
      id: "5",
      email: "contact@tryacme.io",
      domain: "tryacme.io",
      status: "active",
      nextAvailableDate: "",
      health: "good"
    },
    {
      id: "6",
      email: "hello@tryacme.io",
      domain: "tryacme.io",
      status: "paused",
      nextAvailableDate: "",
      health: "critical"
    },
    {
      id: "7",
      email: "info@joinacme.com",
      domain: "joinacme.com",
      status: "active",
      nextAvailableDate: "",
      health: "good"
    },
    {
      id: "8",
      email: "sales@joinacme.com",
      domain: "joinacme.com",
      status: "active",
      nextAvailableDate: "",
      health: "good"
    },
  ]);
  
  const filteredInboxes = inboxes
    .filter(inbox => inbox.email.includes(searchQuery) || inbox.domain.includes(searchQuery))
    .filter(inbox => filter === "all" || inbox.status === filter);
  
  const statusCount = {
    all: inboxes.length,
    warming: inboxes.filter(i => i.status === "warming").length,
    active: inboxes.filter(i => i.status === "active").length,
    paused: inboxes.filter(i => i.status === "paused").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all your email inboxes
          </p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className={`cursor-pointer ${filter === "all" ? "bg-secondary" : ""}`} onClick={() => setFilter("all")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Inboxes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.all}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "warming" ? "bg-secondary" : ""}`} onClick={() => setFilter("warming")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warming Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.warming}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "active" ? "bg-secondary" : ""}`} onClick={() => setFilter("active")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.active}</div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${filter === "paused" ? "bg-secondary" : ""}`} onClick={() => setFilter("paused")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paused</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCount.paused}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Email Inboxes</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inboxes..."
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
                <TableHead>Inbox</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Available</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInboxes.map(inbox => (
                <TableRow key={inbox.id}>
                  <TableCell className="font-medium">{inbox.email}</TableCell>
                  <TableCell>{inbox.domain}</TableCell>
                  <TableCell>
                    {inbox.status === "warming" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Warming Up
                      </span>
                    )}
                    {inbox.status === "active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                    {inbox.status === "paused" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Paused
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {inbox.nextAvailableDate ? new Date(inbox.nextAvailableDate).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        inbox.health === "good" ? "bg-green-500" :
                        inbox.health === "warning" ? "bg-amber-500" : "bg-red-500"
                      }`}></div>
                      <span className="capitalize">{inbox.health}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
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

export default InboxOverview;

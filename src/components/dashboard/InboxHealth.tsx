
import { useState } from "react";
import { BarChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Ban } from "lucide-react";

// Mock data for the charts
const deliveryData = [
  { date: "April 24", inbox: 95, spam: 4, bounced: 1 },
  { date: "April 25", inbox: 93, spam: 5, bounced: 2 },
  { date: "April 26", inbox: 91, spam: 6, bounced: 3 },
  { date: "April 27", inbox: 94, spam: 4, bounced: 2 },
  { date: "April 28", inbox: 96, spam: 3, bounced: 1 },
  { date: "April 29", inbox: 92, spam: 6, bounced: 2 },
  { date: "April 30", inbox: 90, spam: 8, bounced: 2 },
];

const engagementData = [
  { date: "April 24", open: 42, click: 12, reply: 5 },
  { date: "April 25", open: 38, click: 10, reply: 4 },
  { date: "April 26", open: 45, click: 15, reply: 6 },
  { date: "April 27", open: 40, click: 13, reply: 4 },
  { date: "April 28", open: 43, click: 14, reply: 7 },
  { date: "April 29", open: 41, click: 11, reply: 5 },
  { date: "April 30", open: 39, click: 10, reply: 4 },
];

interface InboxDetail {
  id: string;
  email: string;
  domain: string;
  deliveryRate: number;
  spamRate: number;
  blacklistStatus: "clear" | "warning" | "listed";
  openRate: number;
  clickRate: number;
  replyRate: number;
}

const InboxHealth = () => {
  const [selectedInbox, setSelectedInbox] = useState<string | null>(null);
  
  // Mock inbox data
  const [inboxes] = useState<InboxDetail[]>([
    {
      id: "1",
      email: "hello@getacme.co",
      domain: "getacme.co",
      deliveryRate: 92,
      spamRate: 5,
      blacklistStatus: "clear",
      openRate: 42,
      clickRate: 12,
      replyRate: 5,
    },
    {
      id: "2",
      email: "sales@acmehq.com",
      domain: "acmehq.com",
      deliveryRate: 95,
      spamRate: 3,
      blacklistStatus: "clear",
      openRate: 38,
      clickRate: 10,
      replyRate: 4,
    },
    {
      id: "3",
      email: "hello@acmehq.com",
      domain: "acmehq.com",
      deliveryRate: 88,
      spamRate: 9,
      blacklistStatus: "warning",
      openRate: 35,
      clickRate: 8,
      replyRate: 3,
    },
    {
      id: "4",
      email: "contact@tryacme.io",
      domain: "tryacme.io",
      deliveryRate: 90,
      spamRate: 6,
      blacklistStatus: "clear",
      openRate: 40,
      clickRate: 11,
      replyRate: 4,
    },
    {
      id: "5",
      email: "hello@tryacme.io",
      domain: "tryacme.io",
      deliveryRate: 75,
      spamRate: 15,
      blacklistStatus: "listed",
      openRate: 30,
      clickRate: 7,
      replyRate: 2,
    },
  ]);
  
  const selectedInboxDetails = inboxes.find(inbox => inbox.id === selectedInbox) || inboxes[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox Health</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze inbox deliverability performance
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">92.4%</div>
              <span className="flex items-center text-green-600 ml-2">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                1.2%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spam Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">5.8%</div>
              <span className="flex items-center text-red-600 ml-2">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                0.5%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blacklist Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">2</div>
              <span className="flex items-center text-amber-600 ml-2">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Attention needed
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Healthy Inboxes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">18/20</div>
              <span className="flex items-center text-green-600 ml-2">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                90%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Inbox Health Details</CardTitle>
            <CardDescription>
              Select an inbox to view detailed health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inbox</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Spam Rate</TableHead>
                  <TableHead>Blacklist Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inboxes.map(inbox => (
                  <TableRow 
                    key={inbox.id} 
                    className={selectedInbox === inbox.id ? "bg-muted" : ""}
                  >
                    <TableCell className="font-medium">{inbox.email}</TableCell>
                    <TableCell>{inbox.domain}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`h-2 w-24 rounded-full bg-gray-200`}>
                          <div 
                            className={`h-2 rounded-full ${
                              inbox.deliveryRate > 90 ? "bg-green-500" :
                              inbox.deliveryRate > 80 ? "bg-amber-500" : "bg-red-500"
                            }`} 
                            style={{width: `${inbox.deliveryRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2">{inbox.deliveryRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`${
                        inbox.spamRate < 5 ? "text-green-600" :
                        inbox.spamRate < 10 ? "text-amber-600" : "text-red-600"
                      }`}>{inbox.spamRate}%</span>
                    </TableCell>
                    <TableCell>
                      {inbox.blacklistStatus === "clear" && (
                        <span className="inline-flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Clear
                        </span>
                      )}
                      {inbox.blacklistStatus === "warning" && (
                        <span className="inline-flex items-center text-amber-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Warning
                        </span>
                      )}
                      {inbox.blacklistStatus === "listed" && (
                        <span className="inline-flex items-center text-red-600">
                          <Ban className="h-4 w-4 mr-1" />
                          Listed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedInbox(inbox.id)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {selectedInboxDetails && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Deliverability Metrics</CardTitle>
              <CardDescription>
                7-day trend for {selectedInboxDetails.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="h-80">
                  <ChartContainer 
                    config={{
                      inbox: { color: "#10B981" },
                      spam: { color: "#F59E0B" },
                      bounced: { color: "#EF4444" }
                    }}
                  >
                    <BarChart
                      data={deliveryData}
                      stackOffset="expand"
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                      <Bar dataKey="inbox" name="Inbox" stackId="a" fill="#10B981" />
                      <Bar dataKey="spam" name="Spam Folder" stackId="a" fill="#F59E0B" />
                      <Bar dataKey="bounced" name="Bounced" stackId="a" fill="#EF4444" />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="stats">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Delivery Rate</h4>
                      <div className="flex items-center">
                        <div className="h-4 w-full rounded-full bg-gray-200">
                          <div 
                            className={`h-4 rounded-full ${
                              selectedInboxDetails.deliveryRate > 90 ? "bg-green-500" :
                              selectedInboxDetails.deliveryRate > 80 ? "bg-amber-500" : "bg-red-500"
                            }`} 
                            style={{width: `${selectedInboxDetails.deliveryRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2 min-w-16 text-right">{selectedInboxDetails.deliveryRate}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Spam Folder Rate</h4>
                      <div className="flex items-center">
                        <div className="h-4 w-full rounded-full bg-gray-200">
                          <div 
                            className={`h-4 rounded-full ${
                              selectedInboxDetails.spamRate < 5 ? "bg-green-500" :
                              selectedInboxDetails.spamRate < 10 ? "bg-amber-500" : "bg-red-500"
                            }`} 
                            style={{width: `${selectedInboxDetails.spamRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2 min-w-16 text-right">{selectedInboxDetails.spamRate}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Blacklist Status</h4>
                      <div className="flex items-center">
                        {selectedInboxDetails.blacklistStatus === "clear" && (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            Not listed on any blacklists
                          </span>
                        )}
                        {selectedInboxDetails.blacklistStatus === "warning" && (
                          <span className="inline-flex items-center text-amber-600">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Warning: Listed on minor blacklists
                          </span>
                        )}
                        {selectedInboxDetails.blacklistStatus === "listed" && (
                          <span className="inline-flex items-center text-red-600">
                            <Ban className="h-5 w-5 mr-2" />
                            Critical: Listed on major blacklists
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>
                7-day trend for {selectedInboxDetails.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="h-80">
                  <ChartContainer 
                    config={{
                      open: { color: "#3B82F6" },
                      click: { color: "#8B5CF6" },
                      reply: { color: "#EC4899" }
                    }}
                  >
                    <AreaChart
                      data={engagementData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReply" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="open" 
                        name="Open Rate" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorOpen)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="click" 
                        name="Click Rate" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#colorClick)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="reply" 
                        name="Reply Rate" 
                        stroke="#EC4899" 
                        fillOpacity={1} 
                        fill="url(#colorReply)" 
                      />
                    </AreaChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="stats">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Open Rate</h4>
                      <div className="flex items-center">
                        <div className="h-4 w-full rounded-full bg-gray-200">
                          <div 
                            className="h-4 rounded-full bg-blue-500" 
                            style={{width: `${selectedInboxDetails.openRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2 min-w-16 text-right">{selectedInboxDetails.openRate}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Click Rate</h4>
                      <div className="flex items-center">
                        <div className="h-4 w-full rounded-full bg-gray-200">
                          <div 
                            className="h-4 rounded-full bg-purple-500" 
                            style={{width: `${selectedInboxDetails.clickRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2 min-w-16 text-right">{selectedInboxDetails.clickRate}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Reply Rate</h4>
                      <div className="flex items-center">
                        <div className="h-4 w-full rounded-full bg-gray-200">
                          <div 
                            className="h-4 rounded-full bg-pink-500" 
                            style={{width: `${selectedInboxDetails.replyRate}%`}}
                          ></div>
                        </div>
                        <span className="ml-2 min-w-16 text-right">{selectedInboxDetails.replyRate}%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InboxHealth;

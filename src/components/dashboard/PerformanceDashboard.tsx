
import { BarChart3, LineChart, Mail, Target, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar, BarChart as RechartsBarChart } from "recharts";

const performanceData = [
  { day: "Mon", emails: 4500, leads: 24 },
  { day: "Tue", emails: 5200, leads: 28 },
  { day: "Wed", emails: 4800, leads: 26 },
  { day: "Thu", emails: 6100, leads: 32 },
  { day: "Fri", emails: 5800, leads: 30 },
  { day: "Sat", emails: 2300, leads: 12 },
  { day: "Sun", emails: 1900, leads: 10 },
];

const inboxAlerts = [
  { inbox: "sales@domain1.com", domain: "domain1.com", issue: "High spam placement (12%)" },
  { inbox: "hello@domain7.co", domain: "domain7.co", issue: "Blacklist warning: Spamhaus" },
  { inbox: "contact@domain12.io", domain: "domain12.io", issue: "Low delivery rate (78%)" },
];

const PerformanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent (7d)</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31,602</div>
            <p className="text-xs text-muted-foreground">+12.5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">162</div>
            <p className="text-xs text-muted-foreground">+8.2% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.7%</div>
            <p className="text-xs text-muted-foreground">+3.1% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Spam Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground">-0.5% from last week</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Email Performance vs Leads</CardTitle>
            <CardDescription>7-day trend of emails sent and leads generated</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer 
              config={{
                emails: { color: "#4C6FFF" },
                leads: { color: "#10B981" }
              }}
            >
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4C6FFF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4C6FFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="emails" 
                  stroke="#4C6FFF" 
                  fillOpacity={1} 
                  fill="url(#colorEmails)" 
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#10B981" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inbox Health Alerts</CardTitle>
            <CardDescription>Inboxes requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inbox</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Issue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inboxAlerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{alert.inbox}</TableCell>
                    <TableCell>{alert.domain}</TableCell>
                    <TableCell className="text-orange-500">{alert.issue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;


import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Users, MessageSquare, ArrowUpRight, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Track your bot's performance and user engagement metrics
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Messages" 
            value="8,942" 
            change="+16.2%"
            description="vs. previous period"
            icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
            trend="up"
          />
          <MetricCard 
            title="Active Users" 
            value="2,420" 
            change="+5.4%"
            description="vs. previous period"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend="up"
          />
          <MetricCard 
            title="Response Rate" 
            value="94.3%" 
            change="-1.2%"
            description="vs. previous period"
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            trend="down"
          />
          <MetricCard 
            title="Avg. Response Time" 
            value="24s" 
            change="-18.5%"
            description="vs. previous period"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            trend="up"
          />
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base">Message Activity</CardTitle>
                    <CardDescription>Daily message volume over time</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={messageActivityData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="received" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="sent" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base">User Activity</CardTitle>
                    <CardDescription>Active users by time of day</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={userActivityData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="users" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base">Message Categories</CardTitle>
                    <CardDescription>Distribution by type</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={messageCategoriesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {messageCategoriesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base">Response Times</CardTitle>
                    <CardDescription>Average by hour</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={responseTimeData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="seconds" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base">User Satisfaction</CardTitle>
                    <CardDescription>Based on feedback</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={satisfactionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {satisfactionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[index % SATISFACTION_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Message Analytics</CardTitle>
                <CardDescription>
                  Detailed analysis of message patterns and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Detailed message analytics will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>
                  User engagement and demographic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">User analytics will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  System performance and response time analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Performance metrics will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

const MetricCard = ({ title, value, change, description, icon, trend }: MetricCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
        <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {change}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const SATISFACTION_COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];

const messageActivityData = [
  { name: 'Mon', received: 40, sent: 24 },
  { name: 'Tue', received: 30, sent: 13 },
  { name: 'Wed', received: 20, sent: 18 },
  { name: 'Thu', received: 27, sent: 23 },
  { name: 'Fri', received: 18, sent: 12 },
  { name: 'Sat', received: 23, sent: 19 },
  { name: 'Sun', received: 34, sent: 32 },
];

const userActivityData = [
  { hour: '00-03', users: 120 },
  { hour: '04-07', users: 80 },
  { hour: '08-11', users: 420 },
  { hour: '12-15', users: 580 },
  { hour: '16-19', users: 620 },
  { hour: '20-23', users: 380 },
];

const messageCategoriesData = [
  { name: 'Inquiries', value: 400 },
  { name: 'Support', value: 300 },
  { name: 'Feedback', value: 200 },
  { name: 'Orders', value: 120 },
  { name: 'Other', value: 80 },
];

const responseTimeData = [
  { hour: '00-03', seconds: 18 },
  { hour: '04-07', seconds: 15 },
  { hour: '08-11', seconds: 28 },
  { hour: '12-15', seconds: 32 },
  { hour: '16-19', seconds: 26 },
  { hour: '20-23', seconds: 22 },
];

const satisfactionData = [
  { name: 'Very Satisfied', value: 40 },
  { name: 'Satisfied', value: 30 },
  { name: 'Neutral', value: 15 },
  { name: 'Unsatisfied', value: 10 },
  { name: 'Very Unsatisfied', value: 5 },
];

export default Analytics;

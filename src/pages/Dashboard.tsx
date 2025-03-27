
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle2, ChevronRight, BrainCircuit, Calendar, MessageSquare, Check, Bot, Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRScanner from "@/components/QRScanner";
import { PageTransition } from "@/lib/animations";
import DashboardLayout from "@/components/DashboardLayout";
import { UserService, UserBot } from "@/services/user.service";
import { WhatsAppService } from "@/services/whatsapp.service";

// Sample chat data - in a real app, this would come from an API
const recentChats = [
  {
    id: "1",
    name: "John Smith",
    lastMessage: "I need help with my order",
    time: "2m ago",
    unread: 2,
    messages: [
      {
        id: "1-1",
        content: "Hello, I need help with my order #12345",
        sender: "contact",
        timestamp: "10:30 AM"
      },
      {
        id: "1-2",
        content: "What seems to be the issue with your order?",
        sender: "user",
        timestamp: "10:32 AM",
        status: "read"
      },
      {
        id: "1-3",
        content: "I ordered the wrong size and would like to change it",
        sender: "contact",
        timestamp: "10:33 AM"
      },
      {
        id: "1-4",
        content: "I need help with my order",
        sender: "contact",
        timestamp: "10:35 AM"
      }
    ]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    lastMessage: "Thank you for the information",
    time: "1h ago",
    unread: 0,
    messages: [
      {
        id: "2-1",
        content: "Hi, I'm looking for information about your premium plan",
        sender: "contact",
        timestamp: "Yesterday"
      },
      {
        id: "2-2",
        content: "Our premium plan includes 24/7 support, unlimited messages, and priority feature access.",
        sender: "user",
        timestamp: "Yesterday",
        status: "read"
      },
      {
        id: "2-3",
        content: "That sounds great! Can you send me a detailed pricing sheet?",
        sender: "contact",
        timestamp: "Yesterday"
      },
      {
        id: "2-4",
        content: "Of course! I'll send it right away. Anything else you'd like to know?",
        sender: "user",
        timestamp: "Yesterday",
        status: "read"
      },
      {
        id: "2-5",
        content: "Thank you for the information",
        sender: "contact",
        timestamp: "1h ago"
      }
    ]
  },
  {
    id: "3",
    name: "Michael Brown",
    lastMessage: "When will my order arrive?",
    time: "3h ago",
    unread: 1,
    messages: [
      {
        id: "3-1",
        content: "I placed an order yesterday, #54321",
        sender: "contact",
        timestamp: "Yesterday"
      },
      {
        id: "3-2",
        content: "I can see your order has been processed. It should ship today.",
        sender: "user",
        timestamp: "Yesterday",
        status: "read"
      },
      {
        id: "3-3",
        content: "When will my order arrive?",
        sender: "contact",
        timestamp: "3h ago"
      }
    ]
  },
  {
    id: "4",
    name: "Emily Davis",
    lastMessage: "I'd like to schedule a call",
    time: "1d ago",
    unread: 0,
    messages: [
      {
        id: "4-1",
        content: "I'd like to schedule a call to discuss your services",
        sender: "contact",
        timestamp: "1d ago"
      }
    ]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [userBots, setUserBots] = useState<UserBot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadBots = async () => {
      try {
        setIsLoading(true);
        const bots = await UserService.getUserBots();
        setUserBots(bots);
        
        // Check if any WhatsApp bot is connected
        const whatsappBot = bots.find(bot => bot.type === 'whatsapp');
        if (whatsappBot) {
          setIsConnected(whatsappBot.isConnected);
        }
      } catch (error) {
        console.error("Error loading bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBots();
  }, []);
  
  return (
    <DashboardLayout title="Dashboard">
      <PageTransition>
        <div className="min-h-screen bg-background">
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Content */}
            <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
              {isConnected ? (
                <ConnectedDashboard userBots={userBots} />
              ) : (
                <ConnectionSetup userBots={userBots} onConnect={() => setIsConnected(true)} />
              )}
            </main>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

interface ConnectionSetupProps {
  userBots: UserBot[];
  onConnect: () => void;
}

const ConnectionSetup = ({ userBots, onConnect }: ConnectionSetupProps) => {
  const navigate = useNavigate();
  const whatsappBot = userBots.find(bot => bot.type === 'whatsapp');
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Connect Your WhatsApp</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          To start using BotNexa, connect your WhatsApp account by scanning the QR code or entering a pairing code.
        </p>
      </div>
      
      {whatsappBot ? (
        <QRScanner botId={whatsappBot.id} onConnected={onConnect} />
      ) : (
        <Card className="text-center p-6 space-y-4">
          <div className="flex flex-col items-center">
            <Bot className="h-12 w-12 text-muted-foreground mb-2" />
            <h2 className="text-lg font-medium">No WhatsApp Bot Setup</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              You need to create a WhatsApp bot before you can connect to WhatsApp.
            </p>
            <Button 
              className="bg-botnexa-500 hover:bg-botnexa-600"
              onClick={() => navigate('/bot-management')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create WhatsApp Bot
            </Button>
          </div>
        </Card>
      )}
      
      <div className="mt-6 md:mt-8 text-center text-xs sm:text-sm text-muted-foreground">
        <p>
          Having trouble connecting? Check our{" "}
          <a href="#" className="text-botnexa-600 hover:text-botnexa-700 transition-colors">
            troubleshooting guide
          </a>{" "}
          or{" "}
          <a href="#" className="text-botnexa-600 hover:text-botnexa-700 transition-colors">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

interface ConnectedDashboardProps {
  userBots: UserBot[];
}

const ConnectedDashboard = ({ userBots }: ConnectedDashboardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your WhatsApp bot today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Connected
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/bot-management')}
          >
            <Bot className="mr-1 h-4 w-4" />
            Manage Bots
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Bot Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Total Messages" 
              value="2,384" 
              change="+12.5%"
              description="vs. last week"
              positive
            />
            <MetricCard 
              title="Active Users" 
              value="1,429" 
              change="+4.3%"
              description="vs. last week"
              positive
            />
            <MetricCard 
              title="Response Rate" 
              value="93.2%" 
              change="-0.8%"
              description="vs. last week"
              positive={false}
            />
            <MetricCard 
              title="Avg. Response Time" 
              value="28s" 
              change="-13.2%"
              description="vs. last week"
              positive={true}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>Latest chat messages</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-muted-foreground"
                  onClick={() => navigate('/conversations')}
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-0">
                    {recentChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="w-full text-left px-4 py-3 border-b hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => navigate(`/conversations?chat=${chat.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage 
                              src={`https://i.pravatar.cc/150?u=${chat.id}`} 
                              alt={chat.name} 
                            />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`font-medium truncate ${chat.unread > 0 ? "font-semibold" : ""}`}>
                                {chat.name}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {chat.time}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className={`text-sm text-muted-foreground truncate ${chat.unread > 0 ? "text-foreground font-medium" : ""}`}>
                                {chat.lastMessage}
                              </p>
                              {chat.unread > 0 ? (
                                <Badge className="ml-2 bg-botnexa-500 hover:bg-botnexa-600">
                                  {chat.unread}
                                </Badge>
                              ) : (
                                chat.messages.length > 0 && 
                                chat.messages[chat.messages.length - 1].sender === "user" && 
                                chat.messages[chat.messages.length - 1].status === "read" && (
                                  <div className="flex ml-2">
                                    <Check className="h-3 w-3 text-botnexa-500" />
                                    <Check className="h-3 w-3 -ml-1 text-botnexa-500" />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Scheduled tasks and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4">
                    <ReminderItem 
                      title="Team Meeting" 
                      date="Today, 2:00 PM" 
                      description="Discuss project progress"
                    />
                    <ReminderItem 
                      title="Follow up with Client" 
                      date="Tomorrow, 10:00 AM" 
                      description="Send proposal updates"
                    />
                    <ReminderItem 
                      title="RAG Setup" 
                      date="Tomorrow, 9:00 AM" 
                      description="Continue with the RAG configuration"
                    />
                    <ReminderItem 
                      title="Weekly Report" 
                      date="Friday, 4:00 PM" 
                      description="Prepare analytics summary"
                    />
                    <ReminderItem 
                      title="Team Lunch" 
                      date="Friday, 12:30 PM" 
                      description="Company cafeteria"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => navigate('/features')}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-botnexa-100 h-10 w-10 rounded-full flex items-center justify-center dark:bg-botnexa-950/30">
                    <BrainCircuit className="h-5 w-5 text-botnexa-600 dark:text-botnexa-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Explore More Features</h3>
                    <p className="text-sm text-muted-foreground">Configure AI Agent, RAG, and Reminders</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => navigate('/bot-management')}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-botnexa-100 h-10 w-10 rounded-full flex items-center justify-center dark:bg-botnexa-950/30">
                    <Bot className="h-5 w-5 text-botnexa-600 dark:text-botnexa-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Manage Your Bots</h3>
                    <p className="text-sm text-muted-foreground">Create, configure and control your bots</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Detailed insights and statistics about your WhatsApp bot performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Advanced analytics charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Bot Configuration</CardTitle>
              <CardDescription>
                Manage your WhatsApp bot settings and integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="botName" className="text-sm font-medium">Bot Name</label>
                    <Input id="botName" defaultValue="BotNexa Assistant" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">Primary Language</label>
                    <Input id="language" defaultValue="English" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">AI Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure how your AI agent interacts with users
                  </p>
                  
                  <div className="pt-2">
                    <div className="space-y-2">
                      <label htmlFor="personality" className="text-sm font-medium">Bot Personality</label>
                      <Input id="personality" defaultValue="Helpful, professional, and friendly" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Button className="bg-botnexa-500 hover:bg-botnexa-600">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  positive: boolean;
}

const MetricCard = ({ title, value, change, description, positive }: MetricCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          <span className={`text-xs font-medium ${positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {change}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
);

interface ReminderItemProps {
  title: string;
  date: string;
  description: string;
}

const ReminderItem = ({ title, date, description }: ReminderItemProps) => (
  <div className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0 border-border">
    <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-botnexa-100 flex items-center justify-center dark:bg-botnexa-950/30">
      <Calendar className="h-4 w-4 text-botnexa-600 dark:text-botnexa-400" />
    </div>
    <div className="flex-1 space-y-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center">
        <Badge variant="outline" className="text-xs bg-botnexa-50 text-botnexa-700 border-botnexa-200 dark:bg-botnexa-950/30 dark:text-botnexa-300 dark:border-botnexa-800">
          {date}
        </Badge>
      </div>
    </div>
  </div>
);

export default Dashboard;

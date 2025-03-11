
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BrainCircuit, 
  Calendar, 
  Database, 
  MessageSquare, 
  FileSearch, 
  AlertCircle,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/lib/animations";

const Features = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ai-agent");

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">BotNexa Features</h1>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-none lg:flex">
            <TabsTrigger value="ai-agent" className="gap-2">
              <BrainCircuit className="h-4 w-4" />
              <span className="hidden sm:inline">AI Agent</span>
            </TabsTrigger>
            <TabsTrigger value="rag" className="gap-2">
              <FileSearch className="h-4 w-4" />
              <span className="hidden sm:inline">RAG</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Reminders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-agent" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-botnexa-500" />
                    AI Agent Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your AI assistant's personality and capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Personality Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Define how your AI agent should interact with users, from formal to casual communication styles.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Knowledge Base</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect custom knowledge sources to enhance your AI's responses with domain-specific information.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Configure Agent
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-botnexa-500" />
                    Response Templates
                  </CardTitle>
                  <CardDescription>
                    Create and manage pre-defined response templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">FAQ Responses</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up automated responses for frequently asked questions to maintain consistency.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Custom Flows</h3>
                    <p className="text-sm text-muted-foreground">
                      Design conversation flows for complex multi-step interactions and customer journeys.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Manage Templates
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rag" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-botnexa-500" />
                    Knowledge Database
                  </CardTitle>
                  <CardDescription>
                    Manage your RAG knowledge database
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Document Import</h3>
                    <p className="text-sm text-muted-foreground">
                      Import documents, websites, and other data sources to build your knowledge base.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Vector Database</h3>
                    <p className="text-sm text-muted-foreground">
                      View and manage your vector embeddings for efficient information retrieval.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Manage Database
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-botnexa-500" />
                    Retrieval Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how information is retrieved and presented
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Search Parameters</h3>
                    <p className="text-sm text-muted-foreground">
                      Adjust semantic search parameters like relevance threshold and context window.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Citation Style</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how sources are cited and referenced in AI responses to users.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Configure Retrieval
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-botnexa-500" />
                    Reminder Management
                  </CardTitle>
                  <CardDescription>
                    Create and manage automated reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Scheduled Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up time-based reminders that will be sent automatically to your contacts.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Recurring Events</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure recurring reminders for regular events, meetings, or follow-ups.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Manage Reminders
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-botnexa-500" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how reminders are delivered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Delivery Channels</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose where notifications are sent: WhatsApp, email, or both.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Confirmation Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how users can confirm, reschedule, or cancel scheduled reminders.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                    Configure Notifications
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Features;

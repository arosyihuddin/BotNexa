
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, MessageSquare, UploadCloud, Database, Upload } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const AISettings = () => {
  const [activeTab, setActiveTab] = useState("personality");

  return (
    <DashboardLayout title="AI Settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">AI Agent Configuration</h2>
            <p className="text-muted-foreground">
              Configure your AI assistant's personality, knowledge base, and behavior.
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 md:w-fit">
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-botnexa-500" />
                  Personality Settings
                </CardTitle>
                <CardDescription>
                  Define how your AI agent should interact with users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input id="botName" placeholder="BotNexa Assistant" />
                  <p className="text-xs text-muted-foreground">
                    This name will be displayed to users when the bot introduces itself.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personality">Personality Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50">Professional</Button>
                    <Button variant="outline">Friendly</Button>
                    <Button variant="outline">Casual</Button>
                    <Button variant="outline">Technical</Button>
                    <Button variant="outline">Supportive</Button>
                    <Button variant="outline">Custom</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promptTemplate">Custom Prompt Template</Label>
                  <Textarea 
                    id="promptTemplate" 
                    placeholder="You are a helpful assistant named BotNexa..." 
                    className="min-h-32"
                  />
                  <p className="text-xs text-muted-foreground">
                    This template determines the core personality and capabilities of your bot.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-botnexa-500" />
                  Knowledge Sources
                </CardTitle>
                <CardDescription>
                  Configure the information your AI can access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="webAccess">Web Access</Label>
                    <Switch id="webAccess" checked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Allow your AI to search the web for up-to-date information.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Uploaded Documents</Label>
                  <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2 bg-muted/30">
                    <div className="rounded-full bg-muted p-2">
                      <UploadCloud className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Drag & drop files or click to browse</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Connected Sources</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-botnexa-500" />
                        <span className="text-sm">Product Knowledge Base</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-botnexa-500" />
                        <span className="text-sm">FAQs</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="behavior" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-botnexa-500" />
                  Response Behavior
                </CardTitle>
                <CardDescription>
                  Configure how your AI responds to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="responseLength">Response Length</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline">Concise</Button>
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50">Balanced</Button>
                    <Button variant="outline">Detailed</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="greetingMessage">Greeting Message</Label>
                  <Textarea 
                    id="greetingMessage" 
                    placeholder="Hello! I'm your BotNexa Assistant. How can I help you today?" 
                    className="min-h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useEmojis">Use Emojis</Label>
                    <Switch id="useEmojis" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="citeSources">Cite Sources</Label>
                    <Switch id="citeSources" checked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When enabled, your AI will include references to information sources.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-botnexa-500" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription>
                  Fine-tune technical parameters for your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">Standard</Button>
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50">Advanced</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="temperature" 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="70"
                      className="w-full"
                    />
                    <span className="w-12 text-center text-sm">0.7</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Controls randomness: Lower values for more focused responses, higher for more creative ones.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Response Length</Label>
                  <Input id="maxTokens" type="number" defaultValue="2048" />
                  <p className="text-xs text-muted-foreground">
                    Maximum length of responses in tokens (approximately 4 characters per token).
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debugging">Enable Debugging</Label>
                    <Switch id="debugging" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Log detailed information about AI responses for troubleshooting.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AISettings;

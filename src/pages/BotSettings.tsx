import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BrainCircuit, MessageSquare, UploadCloud, Database, Upload,
  File, Trash2, Globe, FileText, X, Plus, ExternalLink, ChevronLeft
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserService } from "@/services/user.service";
import { useToast } from "@/hooks/use-toast";
import { BotInfo } from "@/types/app-types";

interface UploadedDocument {
  id: string;
  name: string;
  type: "file" | "text";
  content?: string;
  size?: string;
  date: string;
}

interface ConnectedSource {
  id: string;
  name: string;
  type: "website" | "database";
  url?: string;
}

const BotSettings = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bot, setBot] = useState<BotInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personality");
  const [showTextInput, setShowTextInput] = useState(false);
  const [newDocumentText, setNewDocumentText] = useState("");
  const [newDocumentName, setNewDocumentName] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: "1",
      name: "Product Manual.pdf",
      type: "file",
      size: "2.4 MB",
      date: "2023-12-10"
    },
    {
      id: "2",
      name: "FAQ Content",
      type: "text",
      content: "Frequently asked questions about our services...",
      date: "2023-12-15"
    }
  ]);
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([
    {
      id: "1",
      name: "Product Knowledge Base",
      type: "website",
      url: "https://docs.example.com"
    },
    {
      id: "2",
      name: "FAQs",
      type: "database"
    }
  ]);

  useEffect(() => {
    const loadBot = async () => {
      if (!botId) {
        navigate('/bots');
        return;
      }

      setIsLoading(true);
      try {
        // This is a placeholder for fetching the specific bot
        // In a real app, you'd fetch from the API
        const userBots = await UserService.getUserBots();
        const foundBot = userBots.find(b => b.id === botId);

        if (foundBot) {
          setBot(foundBot);
        } else {
          toast({
            title: "Error",
            description: "Bot not found",
            variant: "destructive",
          });
          navigate('/bots');
        }
      } catch (error) {
        console.error("Error loading bot:", error);
        toast({
          title: "Error",
          description: "Could not load bot details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBot();
  }, [botId, navigate, toast]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDocs = Array.from(files).map((file, index) => ({
        id: Date.now() + index.toString(),
        name: file.name,
        type: "file" as const,
        size: formatFileSize(file.size),
        date: new Date().toISOString().split('T')[0]
      }));

      setDocuments([...documents, ...newDocs]);

      // Reset the input
      e.target.value = '';
    }
  };

  const handleAddTextDocument = () => {
    if (newDocumentName.trim() && newDocumentText.trim()) {
      const newDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: newDocumentName,
        type: "text",
        content: newDocumentText,
        date: new Date().toISOString().split('T')[0]
      };

      setDocuments([...documents, newDoc]);
      setNewDocumentName("");
      setNewDocumentText("");
      setShowTextInput(false);
    }
  };

  const handleAddWebsite = () => {
    if (newWebsiteUrl.trim()) {
      const newSource: ConnectedSource = {
        id: Date.now().toString(),
        name: new URL(newWebsiteUrl).hostname,
        type: "website",
        url: newWebsiteUrl
      };

      setConnectedSources([...connectedSources, newSource]);
      setNewWebsiteUrl("");
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleRemoveSource = (id: string) => {
    setConnectedSources(connectedSources.filter(source => source.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleBack = () => {
    navigate('/bots');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Bot Settings" showBackButton onBack={handleBack}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-botnexa-500 border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`${bot?.name || 'Bot'} Settings`} showBackButton onBack={handleBack}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{bot?.name || 'Bot'} Settings</h2>
            <p className="text-muted-foreground">
              Configure your bot's personality, knowledge base, and behavior.
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 md:w-fit">
            <TabsTrigger value="personality" className="data-[state=active]:bg-botnexa-500 data-[state=active]:text-white dark:data-[state=active]:bg-botnexa-600">Personality</TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-botnexa-500 data-[state=active]:text-white dark:data-[state=active]:bg-botnexa-600">Knowledge Base</TabsTrigger>
            <TabsTrigger value="behavior" className="data-[state=active]:bg-botnexa-500 data-[state=active]:text-white dark:data-[state=active]:bg-botnexa-600">Behavior</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-botnexa-500 data-[state=active]:text-white dark:data-[state=active]:bg-botnexa-600">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-botnexa-500" />
                  Personality Settings
                </CardTitle>
                <CardDescription>
                  Define how your bot should interact with users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input id="botName" placeholder="BotNexa Assistant" defaultValue={bot?.name} />
                  <p className="text-xs text-muted-foreground">
                    This name will be displayed to users when the bot introduces itself.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personality">Personality Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50 dark:border-botnexa-700 dark:bg-botnexa-950/50 dark:text-botnexa-300">Professional</Button>
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
                <Button className="bg-botnexa-500 hover:bg-botnexa-600 text-white">Save Settings</Button>
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
              <CardContent className="space-y-6">
                {/* Web Access Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="webAccess" className="text-base font-medium">Web Access</Label>
                    <Switch id="webAccess" checked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow your AI to search the web for up-to-date information.
                  </p>
                </div>

                <Separator />

                {/* Document Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Document Management</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTextInput(true)}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Add Text</span>
                      </Button>
                      <label htmlFor="file-upload">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          asChild
                        >
                          <div>
                            <Upload className="h-4 w-4" />
                            <span>Upload Files</span>
                            <input
                              id="file-upload"
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        </Button>
                      </label>
                    </div>
                  </div>

                  {showTextInput && (
                    <Card className="p-4 bg-muted/30 border-dashed">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Add Text Document</h4>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setShowTextInput(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="docName">Document Name</Label>
                          <Input
                            id="docName"
                            value={newDocumentName}
                            onChange={(e) => setNewDocumentName(e.target.value)}
                            placeholder="E.g., Product Instructions"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="docContent">Content</Label>
                          <Textarea
                            id="docContent"
                            value={newDocumentText}
                            onChange={(e) => setNewDocumentText(e.target.value)}
                            placeholder="Enter document content here..."
                            className="min-h-[150px]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="default"
                            className="bg-botnexa-500 hover:bg-botnexa-600 text-white"
                            onClick={handleAddTextDocument}
                          >
                            Add Document
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Document List */}
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>

                    {documents.length === 0 ? (
                      <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2 bg-muted/30">
                        <div className="rounded-full bg-muted p-2">
                          <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                        <p className="text-xs text-muted-foreground">Drag & drop files or use the buttons above</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between bg-card p-3 rounded-lg border">
                            <div className="flex items-center gap-2 overflow-hidden">
                              {doc.type === "file" ? (
                                <File className="h-4 w-4 text-botnexa-500 shrink-0" />
                              ) : (
                                <FileText className="h-4 w-4 text-botnexa-500 shrink-0" />
                              )}
                              <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{doc.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {doc.type === "file" ? `${doc.size}` : "Text document"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {doc.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)} className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Connected Sources Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Connected Sources</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="https://example.com"
                        value={newWebsiteUrl}
                        onChange={(e) => setNewWebsiteUrl(e.target.value)}
                        className="w-48 h-8 text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddWebsite}
                        className="flex items-center gap-1 h-8"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {connectedSources.map((source) => (
                      <div key={source.id} className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          {source.type === "website" ? (
                            <Globe className="h-4 w-4 text-botnexa-500" />
                          ) : (
                            <Database className="h-4 w-4 text-botnexa-500" />
                          )}
                          <div>
                            <span className="text-sm">{source.name}</span>
                            {source.url && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="truncate max-w-[180px]">{source.url}</span>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0" asChild>
                                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSource(source.id)}
                          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-botnexa-500 hover:bg-botnexa-600 text-white">Save Settings</Button>
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
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50 dark:border-botnexa-700 dark:bg-botnexa-950/50 dark:text-botnexa-300">Balanced</Button>
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
                <Button className="bg-botnexa-500 hover:bg-botnexa-600 text-white">Save Settings</Button>
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
                    <Button variant="outline" className="border-botnexa-200 bg-botnexa-50 dark:border-botnexa-700 dark:bg-botnexa-950/50 dark:text-botnexa-300">Advanced</Button>
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
                <Button className="bg-botnexa-500 hover:bg-botnexa-600 text-white">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BotSettings;

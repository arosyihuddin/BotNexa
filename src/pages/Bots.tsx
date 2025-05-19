
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Bot,
  Settings,
  Pencil,
  Trash2,
  Loader2,
  Power,
} from 'lucide-react';
import { dummyBots } from '@/lib/dummy-data';
import { BotInfo } from '@/types/app-types';
import { UserService, WhatsAppService } from '@/services';
import { set } from 'date-fns';
import QRScanner from '@/components/QRScanner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const Bots = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotInfo | null>(null);
  const [userBots, setUserBots] = useState<BotInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [butttonLoading, setButttonLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<{ botId: number, connect: boolean }>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);


  const filteredBots = userBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'active') return matchesSearch && bot.isConnected;
    if (selectedTab === 'inactive') return matchesSearch && !bot.isConnected;

    // Filter by type
    return matchesSearch;
  });

  useEffect(() => {
    const loadBots = async () => {
      try {
        setIsLoading(true);
        const bots = await UserService.getUserBots();
        setUserBots(bots);

      } catch (error) {
        console.error("Error loading bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBots();
  }, [])

  const handleEditBot = (bot: BotInfo) => {
    try {
      setIsEditModalOpen(true);
      setSelectedBot(bot);
      setName(bot.name);
      setNumber(bot.number);
      setDescription(bot.description);
    } catch (error) {
      console.error("Error editing bot:", error);
    }
  };

  const handleSettingBot = (bot: BotInfo) => {
    navigate(`/bot-settings/${bot.id}`);
  };

  const handleDeleteBot = (bot: BotInfo) => {
    setSelectedBot(bot);
    setIsDeleteModalOpen(true);
  };

  const handleActivateBot = async (bot: BotInfo) => {
    setSelectedBot(bot);
    setIsActivateModalOpen(true);
  };

  const handleDeactivateBot = async (bot: BotInfo) => {
    setSelectedBot(bot);
    await WhatsAppService.disconnect(bot.id);
  };

  const confirmDeleteBot = async () => {
    try {
      setButttonLoading(true);
      if (selectedBot) {
        await UserService.deleteBot(selectedBot.id);
        setUserBots(userBots.filter(bot => bot.id !== selectedBot.id));
      }
    } catch (error) {
      console.error("Error deleting bot:", error);
    } finally {
      setButttonLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCreateBot = async (name: string, number: string, description: string) => {
    try {
      setButttonLoading(true);
      const bots = await UserService.createBot({ name, number, description });
      setUserBots([...userBots, bots]);
    } catch (error) {
      console.log("Error creating bot:", error);
    } finally {
      setIsCreateModalOpen(false);
      setButttonLoading(false)
    }
  };

  const handleUpdateBot = async (botId: number, name: string, number: string, description: string) => {
    try {
      setButttonLoading(true)
      const bot = await UserService.updateBot(botId, { name, number, description });
      setUserBots(userBots.map(b => b.id === bot.id ? bot : b));
    } catch (erro) {
      console.log("Error updating bot:", erro);
    } finally {
      setIsEditModalOpen(false);
      setButttonLoading(false)
    }
  };

  const handleCencelConnect = async () => {
    try {
      setButttonLoading(true);
      if (selectedBot && isScannerOpen) {
        await WhatsAppService.disconnect(selectedBot.id);
      }
    } catch (error) {
      console.error("Error canceling connection:", error);
    } finally {
      setIsActivateModalOpen(false);
      setButttonLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected?.connect) {
      console.log(`Whatsapp Connected Bot Id: ${isConnected.botId}`);
      setIsActivateModalOpen(false)
    }
  }, [isConnected]);

  if (isLoading) {
    return (
      <DashboardLayout title="Bot Management" >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-botnexa-500 border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Bot Management">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">WhatsApp Bots</h1>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-botnexa-500 hover:bg-botnexa-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Bot
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bots..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full md:w-auto">
                <TabsList className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBots.length > 0 ? (
                filteredBots.map((bot) => (
                  <Card key={bot.id} className="overflow-hidden bg-background">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-md bg-botnexa-100 dark:bg-botnexa-950/30 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{bot.name}</CardTitle>
                          </div>
                        </div>
                        <Badge
                          variant={bot.isConnected || (bot.id === isConnected?.botId && isConnected?.connect) ? 'default' : 'outline'}
                          className={bot.isConnected || (bot.id === isConnected?.botId && isConnected?.connect)
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'text-muted-foreground'
                          }
                        >
                          {bot.isConnected || (bot.id === isConnected?.botId && isConnected?.connect) ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                        {bot.description}
                      </p>
                      <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                        <div>Created: {new Date(bot.created_at).toLocaleDateString()}</div>
                        <div>Phone: {bot.number}</div>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSettingBot(bot)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <div className="flex gap-2">
                        {bot.isConnected || (bot.id === isConnected?.botId && isConnected?.connect) ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeactivateBot(bot)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleActivateBot(bot)}
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditBot(bot)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBot(bot)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <Bot className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No bots found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `No bots match your search "${searchQuery}"`
                      : 'Try creating a new bot or changing your filters'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Bot Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Bot</DialogTitle>
            <DialogDescription>
              Configure a new WhatsApp bot for your business
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Bot Name
              </label>
              <Input id="name" placeholder="e.g. Customer Support Bot" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input id="description" placeholder="Describe what this bot does" onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm font-medium">
                WhatsApp Number
              </label>
              <Input id="whatsappNumber" placeholder="6285628374802" onChange={(e) => setNumber(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-botnexa-500 hover:bg-botnexa-600"
              onClick={() => handleCreateBot(name, number, description)}
            >
              {butttonLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Create Bot'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bot Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Bot</DialogTitle>
            <DialogDescription>
              Configure a new WhatsApp bot for your business
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Bot Name
              </label>
              <Input value={name} id="name" placeholder="e.g. Customer Support Bot" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input value={description} id="description" placeholder="Describe what this bot does" onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm font-medium">
                WhatsApp Number
              </label>
              <Input value={number} id="whatsappNumber" placeholder="6285628374802" onChange={(e) => setNumber(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-botnexa-500 hover:bg-botnexa-600"
              onClick={() => handleUpdateBot(selectedBot!.id, name, number, description)}
            >
              {butttonLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </div>
              ) : (
                'Update Bot'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Bot</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this bot? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedBot && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-md bg-botnexa-100 dark:bg-botnexa-950/30 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedBot.name}</h4>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteBot}
            >
              {butttonLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </div>
              ) : (
                'Delete Bot'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={isActivateModalOpen} onOpenChange={setIsActivateModalOpen}>
        <DialogContent className="sm:max-w-[425px] [&>button.absolute.right-4.top-4]:hidden">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <QRScanner botId={selectedBot?.id} onConnected={(botId, isConnected) => setIsConnected({ botId, connect: isConnected })} onScanOpen={(data) => setIsScannerOpen(data)} />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCencelConnect}
            >
              {butttonLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Disconnecting...
                </div>
              ) : (
                'Cencel'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Bots;

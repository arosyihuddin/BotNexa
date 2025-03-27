
import { useState } from 'react';
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
  MoreVertical,
  Headphones,
  ShoppingCart,
  Calendar,
  FileQuestion,
  Package2,
  Pencil,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { dummyBots } from '@/lib/dummy-data';
import { BotInfo } from '@/types/app-types';

const BotManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotInfo | null>(null);
  
  const bots = dummyBots;
  
  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'active') return matchesSearch && bot.status === 'active';
    if (selectedTab === 'inactive') return matchesSearch && bot.status === 'inactive';
    
    // Filter by type
    return matchesSearch && bot.type === selectedTab;
  });
  
  const getBotIcon = (type: string) => {
    switch (type) {
      case 'support':
        return <Headphones className="h-5 w-5 text-blue-500" />;
      case 'sales':
        return <ShoppingCart className="h-5 w-5 text-green-500" />;
      case 'scheduler':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'faq':
        return <FileQuestion className="h-5 w-5 text-amber-500" />;
      case 'order':
        return <Package2 className="h-5 w-5 text-red-500" />;
      default:
        return <Bot className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const handleEditBot = (bot: BotInfo) => {
    navigate(`/bot-settings/${bot.id}`);
  };
  
  const handleDeleteBot = (bot: BotInfo) => {
    setSelectedBot(bot);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDeleteBot = () => {
    console.log(`Deleting bot: ${selectedBot?.id}`);
    setIsDeleteModalOpen(false);
  };

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
                  <TabsTrigger value="support">Support</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBots.length > 0 ? (
                filteredBots.map((bot) => (
                  <Card key={bot.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-md bg-botnexa-100 dark:bg-botnexa-950/30 flex items-center justify-center">
                            {getBotIcon(bot.type)}
                          </div>
                          <div>
                            <CardTitle className="text-base">{bot.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {bot.type.charAt(0).toUpperCase() + bot.type.slice(1)} Bot
                            </CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant={bot.status === 'active' ? 'default' : 'outline'}
                          className={bot.status === 'active' 
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'text-muted-foreground'
                          }
                        >
                          {bot.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                        {bot.description}
                      </p>
                      <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                        <div>Created: {new Date(bot.createdAt).toLocaleDateString()}</div>
                        <div>Phone: {bot.phoneNumber}</div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-3 border-t flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditBot(bot)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <div className="flex gap-2">
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
              <Input id="name" placeholder="e.g. Customer Support Bot" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input id="description" placeholder="Describe what this bot does" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="botType" className="text-sm font-medium">
                Bot Type
              </label>
              <Select>
                <SelectTrigger id="botType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="scheduler">Scheduler</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="order">Order Tracking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm font-medium">
                WhatsApp Number
              </label>
              <Input id="whatsappNumber" placeholder="+1234567890" />
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
              onClick={() => {
                console.log("Creating new bot");
                setIsCreateModalOpen(false);
              }}
            >
              Create Bot
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
                  {getBotIcon(selectedBot.type)}
                </div>
                <div>
                  <h4 className="font-medium">{selectedBot.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedBot.type.charAt(0).toUpperCase() + selectedBot.type.slice(1)} Bot
                  </p>
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
              Delete Bot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BotManagement;


import { useState } from "react";
import { Search, Plus, Filter, MessageSquare, User, MoreVertical, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/DashboardLayout";
import ChatHistory from "@/components/ChatHistory";

const Conversations = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  const mockChats = [
    { id: "1", name: "John Smith", lastMessage: "I need help with my order", time: "2m ago", unread: 2 },
    { id: "2", name: "Sarah Johnson", lastMessage: "Thank you for the information", time: "1h ago", unread: 0 },
    { id: "3", name: "Michael Brown", lastMessage: "When will my order arrive?", time: "3h ago", unread: 1 },
    { id: "4", name: "Emily Davis", lastMessage: "I'd like to schedule a call", time: "1d ago", unread: 0 },
    { id: "5", name: "David Wilson", lastMessage: "Can you provide more details?", time: "2d ago", unread: 0 },
  ];
  
  return (
    <DashboardLayout title="Conversations">
      <div className="grid md:grid-cols-[350px_1fr] gap-4 h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <div className="border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-8 w-full bg-muted/30"
                />
              </div>
              <Button size="icon" variant="outline" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon" className="shrink-0 bg-botnexa-500 hover:bg-botnexa-600">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full text-left px-3 py-3 border-b hover:bg-muted/30 transition-colors ${
                  selectedChat === chat.id ? "bg-muted/50" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id}`} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chat.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-botnexa-500 hover:bg-botnexa-600 rounded-full shrink-0">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat Content */}
        {selectedChat ? (
          <Card className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedChat}`} />
                  <AvatarFallback>
                    {mockChats.find(c => c.id === selectedChat)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {mockChats.find(c => c.id === selectedChat)?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Contact</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Chat Messages */}
            <CardContent className="flex-1 p-0 overflow-y-auto">
              <ChatHistory />
            </CardContent>
            
            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex items-end gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                />
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">Send</Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="mx-auto bg-muted/50 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Conversation Selected</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Select a conversation from the list to view messages or start a new conversation.
              </p>
              <Button className="mt-4 bg-botnexa-500 hover:bg-botnexa-600">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Conversations;

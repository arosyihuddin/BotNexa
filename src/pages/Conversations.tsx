import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  MessageSquare,
  User,
  MoreVertical,
  ArrowUpRight,
  ArrowLeft,
  Send,
  Archive,
  Bell,
  BellOff,
  Pin,
  CheckCircle,
  Star,
  LogOut,
  Check,
  Copy,
  ArrowRight,
  Trash,
  Reply,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "contact";
  senderName?: string; // For group chats
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  replyTo?: string; // ID of the message being replied to
  forwarded?: boolean; // Indicates if the message was forwarded
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  phone?: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
  isGroup?: boolean;
  participants?: Contact[];
  isArchived?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  isFavorite?: boolean;
}

const Conversations = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [messageInput, setMessageInput] = useState("");
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [forwardMessageId, setForwardMessageId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
    chatId: string;
  } | null>(null);
  const [messageMenuPosition, setMessageMenuPosition] = useState<{
    x: number;
    y: number;
    chatId: string;
    messageId: string;
  } | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [mockContacts, setMockContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=1",
      status: "Hey there! I'm using BotNexa",
      phone: "+1234567890",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=2",
      status: "Available",
      phone: "+1987654321",
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?u=3",
      status: "At work",
      phone: "+1122334455",
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?u=4",
      status: "Busy",
      phone: "+1555666777",
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?u=5",
      status: "BotNexa user",
      phone: "+1888999000",
    },
    {
      id: "6",
      name: "Marketing Team",
      avatar: "https://i.pravatar.cc/150?u=group1",
      status: "Group",
      phone: "",
    },
    {
      id: "7",
      name: "Support Group",
      avatar: "https://i.pravatar.cc/150?u=group2",
      status: "Group",
      phone: "",
    },
  ]);

  const [mockChats, setMockChats] = useState<Chat[]>([
    {
      id: "1",
      name: "John Smith",
      lastMessage: "I need help with my order",
      time: "2m ago",
      unread: 2,
      isArchived: false,
      isMuted: false,
      isPinned: false,
      isFavorite: false,
      messages: [
        {
          id: "1-1",
          content: "Hello, I need help with my order #12345",
          sender: "contact",
          timestamp: "10:30 AM",
          status: "read",
        },
        {
          id: "1-2",
          content: "What seems to be the issue with your order?",
          sender: "user",
          timestamp: "10:32 AM",
          status: "read",
        },
        {
          id: "1-3",
          content: "I ordered the wrong size and would like to change it",
          sender: "contact",
          timestamp: "10:33 AM",
          status: "read",
        },
        {
          id: "1-4",
          content: "I need help with my order",
          sender: "contact",
          timestamp: "10:35 AM",
          status: "delivered",
        },
      ],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      lastMessage: "Thank you for the information",
      time: "1h ago",
      unread: 0,
      isArchived: false,
      isMuted: true,
      isPinned: true,
      isFavorite: true,
      messages: [
        {
          id: "2-1",
          content: "Hi, I'm looking for information about your premium plan",
          sender: "contact",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2-2",
          content:
            "Our premium plan includes 24/7 support, unlimited messages, and priority feature access.",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2-3",
          content:
            "That sounds great! Can you send me a detailed pricing sheet?",
          sender: "contact",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2-4",
          content:
            "Of course! I'll send it right away. Anything else you'd like to know?",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2-5",
          content: "Thank you for the information",
          sender: "contact",
          timestamp: "1h ago",
          status: "read",
        },
      ],
    },
    {
      id: "3",
      name: "Michael Brown",
      lastMessage: "When will my order arrive?",
      time: "3h ago",
      unread: 1,
      isArchived: false,
      isMuted: false,
      isPinned: false,
      isFavorite: false,
      messages: [
        {
          id: "3-1",
          content: "I placed an order yesterday, #54321",
          sender: "contact",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "3-2",
          content:
            "I can see your order has been processed. It should ship today.",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "3-3",
          content: "When will my order arrive?",
          sender: "contact",
          timestamp: "3h ago",
          status: "delivered",
        },
      ],
    },
    {
      id: "4",
      name: "Emily Davis",
      lastMessage: "I'd like to schedule a call",
      time: "1d ago",
      unread: 0,
      isArchived: false,
      isMuted: false,
      isPinned: false,
      isFavorite: false,
      messages: [
        {
          id: "4-1",
          content: "I'd like to schedule a call to discuss your services",
          sender: "contact",
          timestamp: "1d ago",
          status: "read",
        },
      ],
    },
    {
      id: "5",
      name: "David Wilson",
      lastMessage: "Can you provide more details?",
      time: "2d ago",
      unread: 0,
      isArchived: false,
      isMuted: false,
      isPinned: false,
      isFavorite: false,
      messages: [
        {
          id: "5-1",
          content: "I'm interested in your RAG feature",
          sender: "contact",
          timestamp: "3d ago",
          status: "read",
        },
        {
          id: "5-2",
          content:
            "The RAG feature allows you to integrate your knowledge base with our AI responses",
          sender: "user",
          timestamp: "3d ago",
          status: "read",
        },
        {
          id: "5-3",
          content: "Can you provide more details?",
          sender: "contact",
          timestamp: "2d ago",
          status: "read",
        },
      ],
    },
    {
      id: "6",
      name: "Marketing Team",
      lastMessage: "Let's discuss the new campaign",
      time: "4h ago",
      unread: 3,
      isGroup: true,
      isArchived: false,
      isMuted: true,
      isPinned: false,
      isFavorite: false,
      participants: [
        {
          id: "1",
          name: "John Smith",
          avatar: "https://i.pravatar.cc/150?u=1",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?u=2",
        },
        {
          id: "3",
          name: "Michael Brown",
          avatar: "https://i.pravatar.cc/150?u=3",
        },
      ],
      messages: [
        {
          id: "6-1",
          content: "Hey team, I have some ideas for our new marketing campaign",
          sender: "contact",
          senderName: "John Smith",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "6-2",
          content: "Sounds great! When can we discuss?",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "6-3",
          content: "How about tomorrow at 10AM?",
          sender: "contact",
          senderName: "Sarah Johnson",
          timestamp: "4h ago",
          status: "delivered",
        },
        {
          id: "6-4",
          content: "I'll prepare some materials",
          sender: "contact",
          senderName: "Michael Brown",
          timestamp: "4h ago",
          status: "delivered",
        },
        {
          id: "6-5",
          content: "Let's discuss the new campaign",
          sender: "contact",
          senderName: "John Smith",
          timestamp: "4h ago",
          status: "delivered",
        },
      ],
    },
    {
      id: "7",
      name: "Support Group",
      lastMessage: "Can someone help with this client?",
      time: "5h ago",
      unread: 2,
      isGroup: true,
      isArchived: false,
      isMuted: false,
      isPinned: false,
      isFavorite: true,
      participants: [
        {
          id: "1",
          name: "John Smith",
          avatar: "https://i.pravatar.cc/150?u=1",
        },
        {
          id: "4",
          name: "Emily Davis",
          avatar: "https://i.pravatar.cc/150?u=4",
        },
        {
          id: "5",
          name: "David Wilson",
          avatar: "https://i.pravatar.cc/150?u=5",
        },
      ],
      messages: [
        {
          id: "7-1",
          content: "We have a client with an urgent issue",
          sender: "contact",
          senderName: "Emily Davis",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "7-2",
          content: "What's the problem?",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "7-3",
          content: "They can't access their account",
          sender: "contact",
          senderName: "Emily Davis",
          timestamp: "5h ago",
          status: "delivered",
        },
        {
          id: "7-4",
          content: "Can someone help with this client?",
          sender: "contact",
          senderName: "David Wilson",
          timestamp: "5h ago",
          status: "delivered",
        },
      ],
    },
  ]);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Sort chats with pinned ones at the top
  const sortedChats = [...mockChats].sort((a, b) => {
    // First sort by pinned status
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    // Then sort by time (assuming we would parse the time strings)
    // This is a simplified version just for demonstration
    return a.time > b.time ? -1 : 1;
  });

  const filteredChats = sortedChats.filter((chat) => {
    // Apply search filter
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Apply tab filter
    if (filterTab === "all") return matchesSearch && !chat.isArchived;
    if (filterTab === "unread")
      return matchesSearch && chat.unread > 0 && !chat.isArchived;
    if (filterTab === "groups")
      return matchesSearch && chat.isGroup && !chat.isArchived;
    if (filterTab === "archived") return matchesSearch && chat.isArchived;

    return matchesSearch;
  });

  useEffect(() => {
    setShowNewChatModal(false);
    setShowContactModal(false);
    setShowForwardModal(false);
  }, [location]);

  useEffect(() => {
    // Scroll to bottom of messages when a chat is selected or messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat, mockChats]);

  useEffect(() => {
    // Close context menu when clicking outside
    const handleClickOutside = () => {
      setContextMenuPosition(null);
      setMessageMenuPosition(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const updatedChats = mockChats.map((chat) => {
      if (chat.id === selectedChat) {
        const newMessage: Message = {
          id: `${chat.id}-${chat.messages.length + 1}`,
          content: messageInput,
          sender: "user" as const,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent" as const,
        };

        // Add reply information if replying to a message
        if (replyToMessage) {
          const repliedMessage = chat.messages.find(
            (m) => m.id === replyToMessage
          );
          if (repliedMessage) {
            newMessage.replyTo = replyToMessage;
          }
        }

        // Update the chat with new message
        return {
          ...chat,
          lastMessage: messageInput,
          time: "Just now",
          messages: [...chat.messages, newMessage],
        };
      }
      return chat;
    });

    // Re-sort the list to move the chat with the new message to the top (but below pinned chats)
    const chatToMove = updatedChats.find((c) => c.id === selectedChat);
    if (chatToMove) {
      const otherChats = updatedChats.filter((c) => c.id !== selectedChat);

      // Separate pinned and unpinned chats
      const pinnedChats = otherChats.filter((c) => c.isPinned);
      const unpinnedChats = otherChats.filter((c) => !c.isPinned);

      // If the chat we're moving is pinned, keep it with pinned chats
      if (chatToMove.isPinned) {
        setMockChats([...pinnedChats, chatToMove, ...unpinnedChats]);
      } else {
        // Otherwise, put it at the top of unpinned chats
        setMockChats([...pinnedChats, chatToMove, ...unpinnedChats]);
      }
    } else {
      setMockChats(updatedChats);
    }

    setMessageInput("");
    setReplyToMessage(null); // Clear reply after sending
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);

    // Mark as read when selected
    setMockChats((prev) =>
      prev.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat))
    );
  };

  const handleContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    setContextMenuPosition({
      x: e.clientX,
      y: e.clientY,
      chatId,
    });
  };

  const handleMessageContextMenu = (
    e: React.MouseEvent,
    chatId: string,
    messageId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setMessageMenuPosition({
      x: e.clientX,
      y: e.clientY,
      chatId,
      messageId,
    });
  };

  const handleContextMenuAction = (action: string) => {
    if (!contextMenuPosition) return;

    const { chatId } = contextMenuPosition;

    setMockChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          switch (action) {
            case "archive":
              return { ...chat, isArchived: !chat.isArchived };
            case "mute":
              return { ...chat, isMuted: !chat.isMuted };
            case "pin":
              return { ...chat, isPinned: !chat.isPinned };
            case "markUnread":
              return { ...chat, unread: chat.unread === 0 ? 1 : chat.unread };
            case "favorite":
              return { ...chat, isFavorite: !chat.isFavorite };
            case "delete":
              // Remove the chat
              return { ...chat };
            case "leaveGroup":
              // In a real app, this would involve an API call
              console.log("Leave group:", chatId);
              return chat;
            default:
              return chat;
          }
        }
        return chat;
      })
    );

    // For delete action, remove the chat from the list
    if (action === "delete") {
      setMockChats((prev) => prev.filter((chat) => chat.id !== chatId));
      if (selectedChat === chatId) {
        setSelectedChat(null);
      }
    }

    setContextMenuPosition(null);
  };

  const handleMessageAction = (action: string) => {
    if (!messageMenuPosition) return;

    const { chatId, messageId } = messageMenuPosition;

    // Implement message actions
    switch (action) {
      case "reply":
        setReplyToMessage(messageId);
        break;
      case "copy": {
        const message = mockChats
          .find((c) => c.id === chatId)
          ?.messages.find((m) => m.id === messageId);
        if (message) {
          navigator.clipboard.writeText(message.content);
        }
        break;
      }
      case "forward":
        setForwardMessageId(messageId);
        setShowForwardModal(true);
        break;
      case "delete":
        setMockChats((prev) =>
          prev.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: chat.messages.filter((m) => m.id !== messageId),
              };
            }
            return chat;
          })
        );
        break;
    }

    setMessageMenuPosition(null);
  };

  const handleForwardMessage = (targetChatId: string) => {
    if (!forwardMessageId || !selectedChat) return;

    // Find the message to forward
    const sourceChat = mockChats.find((c) => c.id === selectedChat);
    const messageToForward = sourceChat?.messages.find(
      (m) => m.id === forwardMessageId
    );

    if (!messageToForward) return;

    // Create a new forwarded message
    const forwardedMessage: Message = {
      id: `${targetChatId}-forward-${Date.now()}`,
      content: messageToForward.content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      forwarded: true,
    };

    // Add the message to the target chat
    setMockChats((prev) =>
      prev.map((chat) => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: [...chat.messages, forwardedMessage],
            lastMessage: messageToForward.content,
            time: "Just now",
          };
        }
        return chat;
      })
    );

    setForwardMessageId(null);
    setShowForwardModal(false);
  };

  const cancelReply = () => {
    setReplyToMessage(null);
  };

  const getReplyMessage = () => {
    if (!replyToMessage || !selectedChat) return null;

    const chat = mockChats.find((c) => c.id === selectedChat);
    return chat?.messages.find((m) => m.id === replyToMessage);
  };

  const getMessageById = (chatId: string, messageId: string) => {
    const chat = mockChats.find((c) => c.id === chatId);
    return chat?.messages.find((m) => m.id === messageId);
  };

  const selectedChatData = mockChats.find((c) => c.id === selectedChat);

  return (
    <DashboardLayout title="Conversations">
      <div
        className={`grid ${
          isMobile ? "grid-cols-1" : "md:grid-cols-[350px_1fr]"
        } gap-4 h-[calc(100vh-8rem)]`}
      >
        {/* Conversations List - Sembunyikan di mobile ketika chat dipilih */}
        {(!isMobile || !selectedChat) && (
          <div className="border rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8 w-full bg-muted/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  size="icon"
                  className="shrink-0 bg-botnexa-500 hover:bg-botnexa-600"
                  onClick={() => setShowNewChatModal(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="all" onValueChange={setFilterTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex-1">
                    Groups
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">
                    Archived
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="overflow-y-auto flex-1">
              {filteredChats.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`w-full text-left px-3 py-3 border-b hover:bg-muted/30 transition-colors cursor-pointer ${
                      selectedChat === chat.id ? "bg-muted/50" : ""
                    } ${chat.isPinned ? "bg-secondary/50" : ""}`}
                    onClick={() => handleChatSelect(chat.id)}
                    onContextMenu={(e) => handleContextMenu(e, chat.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${chat.id}`}
                        />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {chat.isPinned && (
                              <Pin className="h-3 w-3 text-muted-foreground" />
                            )}
                            <p
                              className={`font-medium truncate ${
                                chat.unread > 0 ? "font-semibold" : ""
                              }`}
                            >
                              {chat.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {chat.isMuted && (
                              <BellOff className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {chat.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p
                            className={`text-sm text-muted-foreground truncate ${
                              chat.unread > 0
                                ? "text-foreground font-medium"
                                : ""
                            }`}
                          >
                            {chat.lastMessage}
                          </p>
                          <div className="flex items-center ml-1">
                            {chat.messages.length > 0 &&
                              chat.messages[chat.messages.length - 1].sender ===
                                "user" && (
                                <>
                                  {chat.messages[chat.messages.length - 1]
                                    .status === "read" ? (
                                    <div className="flex">
                                      <Check className="h-3 w-3 text-botnexa-500" />
                                      <Check className="h-3 w-3 -ml-1 text-botnexa-500" />
                                    </div>
                                  ) : chat.messages[chat.messages.length - 1]
                                      .status === "delivered" ? (
                                    <div className="flex">
                                      <Check className="h-3 w-3 text-muted-foreground" />
                                      <Check className="h-3 w-3 -ml-1 text-muted-foreground" />
                                    </div>
                                  ) : (
                                    <Check className="h-3 w-3 text-muted-foreground/50" />
                                  )}
                                </>
                              )}
                            {chat.unread > 0 && (
                              <Badge className="bg-botnexa-500 hover:bg-botnexa-600 rounded-full shrink-0 ml-1">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Chat Content */}
        {selectedChat ? (
          <Card className="flex flex-col h-full">
            {/* Chat Header */}
            <div
              className="p-3 border-b flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setShowContactModal(true)}
            >
              <div className="flex items-center gap-2">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${selectedChat}`}
                  />
                  <AvatarFallback>
                    {selectedChatData?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedChatData?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedChatData?.isGroup
                      ? `${selectedChatData?.participants?.length} participants`
                      : "Online"}
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
                    <DropdownMenuItem onClick={() => setShowContactModal(true)}>
                      View Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("archive")}
                    >
                      {selectedChatData?.isArchived ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("mute")}
                    >
                      {selectedChatData?.isMuted ? "Unmute" : "Mute"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("pin")}
                    >
                      {selectedChatData?.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("markUnread")}
                    >
                      Mark as unread
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("favorite")}
                    >
                      {selectedChatData?.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleContextMenuAction("delete")}
                      className="text-destructive"
                    >
                      Delete chat
                    </DropdownMenuItem>
                    {selectedChatData?.isGroup && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleContextMenuAction("leaveGroup")}
                      >
                        Leave Group
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Chat Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
              {selectedChatData?.messages.map((message) => {
                const repliedMessage = message.replyTo
                  ? selectedChatData.messages.find(
                      (m) => m.id === message.replyTo
                    )
                  : null;

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "contact" &&
                      selectedChatData.isGroup && (
                        <Avatar className="h-6 w-6 mr-2 mt-1">
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?u=${
                              selectedChatData.participants?.find(
                                (p) => p.name === message.senderName
                              )?.id || "0"
                            }`}
                          />
                          <AvatarFallback>
                            {message.senderName?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                      )}

                    <div
                      className={`max-w-[75%] rounded-lg p-3 group relative ${
                        message.sender === "user"
                          ? "bg-botnexa-500 text-white"
                          : "bg-secondary"
                      }${isMobile ? 'max-w-[85%]' : ''}`}
                      onContextMenu={(e) =>
                        handleMessageContextMenu(
                          e,
                          selectedChatData.id,
                          message.id
                        )
                      }
                    >
                      {selectedChatData.isGroup &&
                        message.sender === "contact" &&
                        message.senderName && (
                          <p className="text-xs font-medium text-botnexa-500 mb-1">
                            {message.senderName}
                          </p>
                        )}

                      {/* Reply information */}
                      {repliedMessage && (
                        <div
                          className={`rounded p-2 mb-2 text-sm ${
                            message.sender === "user"
                              ? "bg-botnexa-600/50"
                              : "bg-secondary/80 border-l-2 border-botnexa-400"
                          }`}
                        >
                          <p className="font-medium text-xs">
                            {repliedMessage.sender === "user"
                              ? "You"
                              : repliedMessage.senderName ||
                                selectedChatData.name}
                          </p>
                          <p className="truncate">{repliedMessage.content}</p>
                        </div>
                      )}

                      {/* Forwarded indicator */}
                      {message.forwarded && message.sender === "contact" && (
                        <p className="text-xs italic mb-1 text-muted-foreground">
                          Forwarded
                        </p>
                      )}

                      <p>{message.content}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span className="text-xs">{message.timestamp}</span>
                        {message.sender === "user" && (
                          <span>
                            {message.status === "read" ? (
                              <div className="flex">
                                <Check className="h-3 w-3 text-white" />
                                <Check className="h-3 w-3 -ml-1 text-white" />
                              </div>
                            ) : message.status === "delivered" ? (
                              <div className="flex">
                                <Check className="h-3 w-3 text-white/70" />
                                <Check className="h-3 w-3 -ml-1 text-white/70" />
                              </div>
                            ) : (
                              <Check className="h-3 w-3 text-white/50" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Hover menu button */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 rounded-full bg-background/10 hover:bg-background/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessageContextMenu(
                              e as unknown as React.MouseEvent,
                              selectedChatData.id,
                              message.id
                            );
                          }}
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex items-center gap-2 mb-2 md:hidden">
                <Button variant="ghost" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Archive className="h-5 w-5" />
                </Button>
              </div>
              {/* Reply preview */}
              {replyToMessage && (
                <div className="mb-2 p-2 bg-muted/30 rounded-lg border-l-2 border-botnexa-500 flex justify-between items-center">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-medium">
                      Replying to{" "}
                      {getReplyMessage()?.sender === "user"
                        ? "yourself"
                        : selectedChatData?.name}
                    </p>
                    <p className="text-sm truncate">
                      {getReplyMessage()?.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={cancelReply}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <form
                className="flex items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-botnexa-500 hover:bg-botnexa-600"
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        ) : (
            !isMobile && (
          <Card className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="mx-auto bg-muted/50 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">
                No Conversation Selected
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Select a conversation from the list to view messages or start a
                new conversation.
              </p>
              <Button
                className="mt-4 bg-botnexa-500 hover:bg-botnexa-600"
                onClick={() => setShowNewChatModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
              </Card>
            )
        )}
      </div>

       {/* Floating button untuk new chat di mobile */}
      {isMobile && !selectedChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button 
            size="lg" 
            className="rounded-full shadow-lg bg-botnexa-500 hover:bg-botnexa-600"
            onClick={() => setShowNewChatModal(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Context Menu */}
      {contextMenuPosition && (
        <div
          className="fixed bg-popover text-popover-foreground rounded-md shadow-md border border-border p-1 z-50"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            transform: isMobile ? 'translate(-50%, -50%)' : 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden" role="menu">
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("archive")}
            >
              <Archive className="h-4 w-4" />
              {mockChats.find((c) => c.id === contextMenuPosition.chatId)
                ?.isArchived
                ? "Unarchive"
                : "Archive"}
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("mute")}
            >
              {mockChats.find((c) => c.id === contextMenuPosition.chatId)
                ?.isMuted ? (
                <>
                  <Bell className="h-4 w-4" />
                  Unmute
                </>
              ) : (
                <>
                  <BellOff className="h-4 w-4" />
                  Mute
                </>
              )}
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("pin")}
            >
              <Pin className="h-4 w-4" />
              {mockChats.find((c) => c.id === contextMenuPosition.chatId)
                ?.isPinned
                ? "Unpin"
                : "Pin"}
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("markUnread")}
            >
              <CheckCircle className="h-4 w-4" />
              Mark as unread
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("favorite")}
            >
              <Star className="h-4 w-4" />
              {mockChats.find((c) => c.id === contextMenuPosition.chatId)
                ?.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"}
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted/50 rounded-sm"
              onClick={() => handleContextMenuAction("delete")}
            >
              <Trash className="h-4 w-4" />
              Delete chat
            </button>
            {mockChats.find((c) => c.id === contextMenuPosition.chatId)
              ?.isGroup && (
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted/50 rounded-sm"
                onClick={() => handleContextMenuAction("leaveGroup")}
              >
                <LogOut className="h-4 w-4" />
                Leave group
              </button>
            )}
          </div>
        </div>
      )}

      {/* Message Context Menu */}
      {messageMenuPosition && (
        <div
          className="fixed bg-popover text-popover-foreground rounded-md shadow-md border border-border p-1 z-50"
          style={{
            top: messageMenuPosition.y,
            left: messageMenuPosition.x,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden" role="menu">
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleMessageAction("reply")}
            >
              <Reply className="h-4 w-4" />
              Reply
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleMessageAction("copy")}
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 rounded-sm"
              onClick={() => handleMessageAction("forward")}
            >
              <ArrowRight className="h-4 w-4" />
              Forward
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted/50 rounded-sm"
              onClick={() => handleMessageAction("delete")}
            >
              <Trash className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      <Dialog open={showNewChatModal} onOpenChange={setShowNewChatModal}>
        <DialogContent className="max-w-md w-[calc(100%-1rem)] mx-2 rounded-lg">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
              <DialogDescription>
                Select a contact to start a new conversation
              </DialogDescription>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-8 w-full" />
          </div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {mockContacts.map((contact) => (
              <button
                key={contact.id}
                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted/50 text-left"
                onClick={() => {
                  // Check if chat already exists
                  const existingChat = mockChats.find(
                    (chat) => !chat.isGroup && chat.name === contact.name
                  );
                  if (existingChat) {
                    setSelectedChat(existingChat.id);
                  } else {
                    // Create new chat
                    const newChat: Chat = {
                      id: `new-${Date.now()}`,
                      name: contact.name,
                      lastMessage: "",
                      time: "Just now",
                      unread: 0,
                      isArchived: false,
                      isMuted: false,
                      isPinned: false,
                      isFavorite: false,
                      messages: [],
                    };
                    setMockChats((prev) => [newChat, ...prev]);
                    setSelectedChat(newChat.id);
                  }
                  setShowNewChatModal(false);
                }}
              >
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {contact.status}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Forward Message Modal */}
      <Dialog open={showForwardModal} onOpenChange={setShowForwardModal}>
        <DialogContent className="max-w-md w-[calc(100%-1rem)] mx-2 rounded-lg">
          <DialogHeader>
            <DialogTitle>Forward Message</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>
                Select contacts to forward this message to
              </DialogDescription>
              </VisuallyHidden>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-8 w-full" />
          </div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted/50 text-left"
                onClick={() => handleForwardMessage(chat.id)}
              >
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id}`} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.isGroup
                      ? `${chat.participants?.length} participants`
                      : "Contact"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Detail Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>
                Detailed contact information and group participants
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          {selectedChatData && (
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-3">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${selectedChatData.id}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedChatData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">
                  {selectedChatData.name}
                </h3>
                {selectedChatData.isGroup ? (
                  <p className="text-muted-foreground">
                    Group · {selectedChatData.participants?.length} participants
                  </p>
                ) : (
                  <p className="text-muted-foreground">+1234567890</p>
                )}
              </div>

              {!selectedChatData.isGroup && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">
                    "Hey there! I'm using BotNexa"
                  </p>
                </div>
              )}

              {selectedChatData.isGroup && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Participants</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedChatData.participants?.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{participant.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Conversations;

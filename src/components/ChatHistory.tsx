
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  className?: string;
  contactName?: string; // Added contactName prop
}

const ChatHistory = ({ className, contactName }: ChatHistoryProps) => {
  // Mock data - in a real app, this would come from your API
  const [conversations] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      content: "Hello, how can I use the RAG feature?",
      timestamp: new Date(2023, 6, 15, 10, 30)
    },
    {
      id: "2",
      sender: "bot",
      content: "The Retrieval-Augmented Generation (RAG) feature allows your bot to search for information and generate more accurate responses. Would you like me to help you set it up?",
      timestamp: new Date(2023, 6, 15, 10, 31)
    },
    {
      id: "3",
      sender: "user",
      content: "Yes, please guide me through the setup.",
      timestamp: new Date(2023, 6, 15, 10, 32)
    },
    {
      id: "4",
      sender: "bot",
      content: "Great! To set up RAG, you'll need to: 1) First, define your knowledge sources. 2) Configure the retrieval settings. 3) Test the configuration. Would you like to start with step 1?",
      timestamp: new Date(2023, 6, 15, 10, 33)
    },
    {
      id: "5",
      sender: "user",
      content: "Can you remind me tomorrow at 9 AM to continue with the setup?",
      timestamp: new Date(2023, 6, 15, 10, 35)
    },
    {
      id: "6",
      sender: "bot",
      content: "I've set a reminder for tomorrow at 9:00 AM to continue with the RAG setup. You'll receive a notification at that time.",
      timestamp: new Date(2023, 6, 15, 10, 36)
    }
  ]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Conversation History</h3>
        <p className="text-sm text-muted-foreground">
          {contactName ? `Recent interactions with ${contactName}` : "Recent interactions with your bot"}
        </p>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-4">
          {conversations.map((message) => (
            <div key={message.id} className={cn(
              "flex gap-3",
              message.sender === "bot" ? "justify-start" : "justify-end"
            )}>
              <div className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === "bot" 
                  ? "bg-secondary text-secondary-foreground rounded-tl-none" 
                  : "bg-botnexa-500 text-white rounded-tr-none"
              )}>
                <div className="text-sm">{message.content}</div>
                <div className={cn(
                  "text-xs mt-1 text-right",
                  message.sender === "bot" ? "text-muted-foreground" : "text-white/80"
                )}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;


// Contact type
export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  lastInteraction: string;
  tags: string[];
}

// Conversation type
export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'active' | 'pending' | 'closed';
}

// Reminder type
export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  contactId: string;
  contactName: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface BotInfo {
  id: number;
  name: string;
  number: string;
  description: string;
  isConnected: boolean;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  settings: JSON;
  userId: string;
}

// Activity Log type
export interface ActivityLog {
  id: string;
  action: 'conversation_started' | 'message_sent' | 'message_received' | 'bot_configured' | 'reminder_created';
  description: string;
  timestamp: string;
  botId: string | null;
  botName: string | null;
  contactId: string | null;
  contactName: string | null;
}

// Analytics Data type
export interface AnalyticsData {
  messageStats: {
    total: number;
    sent: number;
    received: number;
    failedDelivery: number;
    responseRate: number;
  };
  contactsOverTime: Array<{
    date: string;
    count: number;
  }>;
  conversationsByBot: Array<{
    botName: string;
    count: number;
  }>;
  responseTimeData: Array<{
    period: string;
    averageMinutes: number;
  }>;
  userSatisfaction: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

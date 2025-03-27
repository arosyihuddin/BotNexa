
import { Conversation, Contact, Reminder, BotInfo, ActivityLog, AnalyticsData } from "@/types/app-types";

// Dummy Contacts
export const dummyContacts: Contact[] = [
  { id: '1', name: 'John Doe', phoneNumber: '+62812345678', email: 'john@example.com', lastInteraction: new Date('2025-03-15').toISOString(), tags: ['customer', 'premium'] },
  { id: '2', name: 'Sarah Johnson', phoneNumber: '+62823456789', email: 'sarah@example.com', lastInteraction: new Date('2025-03-14').toISOString(), tags: ['lead'] },
  { id: '3', name: 'Michael Brown', phoneNumber: '+62834567890', email: 'michael@example.com', lastInteraction: new Date('2025-03-13').toISOString(), tags: ['customer'] },
  { id: '4', name: 'Lisa Williams', phoneNumber: '+62845678901', email: 'lisa@example.com', lastInteraction: new Date('2025-03-12').toISOString(), tags: ['customer', 'VIP'] },
  { id: '5', name: 'David Wilson', phoneNumber: '+62856789012', email: 'david@example.com', lastInteraction: new Date('2025-03-10').toISOString(), tags: ['lead', 'cold'] },
];

// Dummy Conversations
export const dummyConversations: Conversation[] = [
  { 
    id: '1', 
    contactId: '1', 
    contactName: 'John Doe',
    lastMessage: 'Can you help me with my order?', 
    timestamp: new Date('2025-03-15T14:30:00').toISOString(),
    unreadCount: 2,
    status: 'active' 
  },
  { 
    id: '2', 
    contactId: '2', 
    contactName: 'Sarah Johnson',
    lastMessage: 'Thank you for the information!', 
    timestamp: new Date('2025-03-14T11:15:00').toISOString(),
    unreadCount: 0,
    status: 'active' 
  },
  { 
    id: '3', 
    contactId: '3', 
    contactName: 'Michael Brown',
    lastMessage: 'When will my package arrive?', 
    timestamp: new Date('2025-03-13T16:45:00').toISOString(),
    unreadCount: 1,
    status: 'active' 
  },
  { 
    id: '4', 
    contactId: '4', 
    contactName: 'Lisa Williams',
    lastMessage: 'I need to reschedule my appointment', 
    timestamp: new Date('2025-03-12T09:20:00').toISOString(),
    unreadCount: 0,
    status: 'closed' 
  },
  { 
    id: '5', 
    contactId: '5', 
    contactName: 'David Wilson',
    lastMessage: 'Is there a discount for bulk orders?', 
    timestamp: new Date('2025-03-10T13:10:00').toISOString(),
    unreadCount: 3,
    status: 'pending' 
  },
];

// Dummy Reminders
export const dummyReminders: Reminder[] = [
  { 
    id: '1', 
    title: 'Follow up with John', 
    description: 'Ask about the new product order',
    dueDate: new Date('2025-03-20T10:00:00').toISOString(),
    contactId: '1',
    contactName: 'John Doe',
    priority: 'high',
    completed: false 
  },
  { 
    id: '2', 
    title: 'Send catalog to Sarah', 
    description: 'Include the spring collection',
    dueDate: new Date('2025-03-22T14:30:00').toISOString(),
    contactId: '2',
    contactName: 'Sarah Johnson',
    priority: 'medium',
    completed: false 
  },
  { 
    id: '3', 
    title: 'Call Michael about refund', 
    description: 'Check status of refund request #RT45621',
    dueDate: new Date('2025-03-19T11:00:00').toISOString(),
    contactId: '3',
    contactName: 'Michael Brown',
    priority: 'high',
    completed: false 
  },
  { 
    id: '4', 
    title: 'Schedule meeting with Lisa', 
    description: 'Discuss partnership opportunities',
    dueDate: new Date('2025-03-25T15:00:00').toISOString(),
    contactId: '4',
    contactName: 'Lisa Williams',
    priority: 'low',
    completed: true 
  },
  { 
    id: '5', 
    title: 'Send quote to David', 
    description: 'For bulk order of widgets',
    dueDate: new Date('2025-03-21T09:30:00').toISOString(),
    contactId: '5',
    contactName: 'David Wilson',
    priority: 'medium',
    completed: false 
  },
];

// Dummy Bots
export const dummyBots: BotInfo[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles basic customer inquiries and support tickets',
    status: 'active',
    createdAt: new Date('2025-02-15').toISOString(),
    lastUsed: new Date('2025-03-15').toISOString(),
    type: 'support',
    phoneNumber: '+628123456781'
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Helps with product inquiries and sales questions',
    status: 'active',
    createdAt: new Date('2025-02-20').toISOString(),
    lastUsed: new Date('2025-03-14').toISOString(),
    type: 'sales',
    phoneNumber: '+628123456782'
  },
  {
    id: '3',
    name: 'Appointment Scheduler',
    description: 'Books and manages appointments with clients',
    status: 'inactive',
    createdAt: new Date('2025-03-01').toISOString(),
    lastUsed: new Date('2025-03-10').toISOString(),
    type: 'scheduler',
    phoneNumber: '+628123456783'
  },
  {
    id: '4',
    name: 'FAQ Bot',
    description: 'Answers frequently asked questions automatically',
    status: 'active',
    createdAt: new Date('2025-02-25').toISOString(),
    lastUsed: new Date('2025-03-12').toISOString(),
    type: 'faq',
    phoneNumber: '+628123456784'
  },
  {
    id: '5',
    name: 'Order Tracker',
    description: 'Provides order status and tracking information',
    status: 'active',
    createdAt: new Date('2025-03-05').toISOString(),
    lastUsed: new Date('2025-03-15').toISOString(),
    type: 'order',
    phoneNumber: '+628123456785'
  }
];

// Dummy Activity Logs
export const dummyActivityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'conversation_started',
    description: 'Conversation started with John Doe',
    timestamp: new Date('2025-03-15T14:30:00').toISOString(),
    botId: '1',
    botName: 'Customer Support Bot',
    contactId: '1',
    contactName: 'John Doe'
  },
  {
    id: '2',
    action: 'message_sent',
    description: 'Message sent to Sarah Johnson',
    timestamp: new Date('2025-03-14T11:15:00').toISOString(),
    botId: '2',
    botName: 'Sales Assistant',
    contactId: '2',
    contactName: 'Sarah Johnson'
  },
  {
    id: '3',
    action: 'bot_configured',
    description: 'Appointment Scheduler bot configured',
    timestamp: new Date('2025-03-10T09:45:00').toISOString(),
    botId: '3',
    botName: 'Appointment Scheduler',
    contactId: null,
    contactName: null
  },
  {
    id: '4',
    action: 'reminder_created',
    description: 'Reminder created for Lisa Williams',
    timestamp: new Date('2025-03-12T10:20:00').toISOString(),
    botId: null,
    botName: null,
    contactId: '4',
    contactName: 'Lisa Williams'
  },
  {
    id: '5',
    action: 'message_received',
    description: 'Message received from David Wilson',
    timestamp: new Date('2025-03-10T13:10:00').toISOString(),
    botId: '4',
    botName: 'FAQ Bot',
    contactId: '5',
    contactName: 'David Wilson'
  }
];

// Dummy Analytics Data
export const dummyAnalytics: AnalyticsData = {
  messageStats: {
    total: 1250,
    sent: 587,
    received: 663,
    failedDelivery: 15,
    responseRate: 0.89
  },
  contactsOverTime: [
    { date: '2025-01', count: 45 },
    { date: '2025-02', count: 78 },
    { date: '2025-03', count: 112 },
    { date: '2025-04', count: 134 },
    { date: '2025-05', count: 156 },
    { date: '2025-06', count: 189 }
  ],
  conversationsByBot: [
    { botName: 'Customer Support Bot', count: 540 },
    { botName: 'Sales Assistant', count: 320 },
    { botName: 'Appointment Scheduler', count: 175 },
    { botName: 'FAQ Bot', count: 210 },
    { botName: 'Order Tracker', count: 130 }
  ],
  responseTimeData: [
    { period: 'Morning', averageMinutes: 4.5 },
    { period: 'Afternoon', averageMinutes: 6.2 },
    { period: 'Evening', averageMinutes: 8.7 },
    { period: 'Night', averageMinutes: 12.1 }
  ],
  userSatisfaction: {
    excellent: 45,
    good: 32,
    average: 15,
    poor: 8
  }
};

export const getDummyData = {
  getContacts: () => dummyContacts,
  getConversations: () => dummyConversations,
  getReminders: () => dummyReminders,
  getBots: () => dummyBots,
  getActivityLogs: () => dummyActivityLogs,
  getAnalytics: () => dummyAnalytics
};

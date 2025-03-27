
import { ApiService } from "./api.service";

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  status: "active" | "archived" | "pending";
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "user" | "contact" | "bot";
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
}

export class ConversationsService extends ApiService {
  /**
   * Get all conversations for the current user
   */
  static async getConversations(): Promise<Conversation[]> {
    return this.apiRequest<Conversation[]>('/conversations');
  }
  
  /**
   * Get a specific conversation by ID
   */
  static async getConversation(conversationId: string): Promise<Conversation> {
    return this.apiRequest<Conversation>(`/conversations/${conversationId}`);
  }
  
  /**
   * Get messages for a specific conversation
   */
  static async getMessages(conversationId: string): Promise<Message[]> {
    return this.apiRequest<Message[]>(`/conversations/${conversationId}/messages`);
  }
  
  /**
   * Send a new message
   */
  static async sendMessage(conversationId: string, content: string): Promise<Message> {
    return this.apiRequest<Message>(
      `/conversations/${conversationId}/messages`,
      'POST',
      { content }
    );
  }
  
  /**
   * Archive a conversation
   */
  static async archiveConversation(conversationId: string): Promise<void> {
    return this.apiRequest<void>(
      `/conversations/${conversationId}/archive`,
      'PUT'
    );
  }
  
  /**
   * Reactivate an archived conversation
   */
  static async reactivateConversation(conversationId: string): Promise<void> {
    return this.apiRequest<void>(
      `/conversations/${conversationId}/reactivate`,
      'PUT'
    );
  }
  
  /**
   * Delete a conversation
   */
  static async deleteConversation(conversationId: string): Promise<void> {
    return this.apiRequest<void>(
      `/conversations/${conversationId}`,
      'DELETE'
    );
  }
}

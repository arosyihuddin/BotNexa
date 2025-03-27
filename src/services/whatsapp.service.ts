
import { ApiService } from "./api.service";
import { supabase } from "@/lib/supabase";

// Define connection callback type
type ConnectionCallback = (connected: boolean) => void;

// Store active connection listeners
const connectionListeners: Record<string, ConnectionCallback> = {};

export class WhatsAppService extends ApiService {
  /**
   * Initialize WhatsApp service
   */
  static initialize(): void {
    console.log("WhatsApp service initialized");
  }
  
  /**
   * Connect to WhatsApp
   */
  static async connect(botId: string): Promise<string | null> {
    try {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) throw new Error("User not authenticated");
      
      const response = await this.apiRequest<{ qrCode: string }>(
        `/bots/${botId}/connect`, 
        'POST'
      );
      
      return response.qrCode;
    } catch (error) {
      console.error("Error connecting to WhatsApp:", error);
      return null;
    }
  }
  
  /**
   * Disconnect from WhatsApp
   */
  static async disconnect(botId: string): Promise<boolean> {
    try {
      await this.apiRequest(
        `/bots/${botId}/disconnect`, 
        'POST'
      );
      
      // Remove any active listeners
      delete connectionListeners[botId];
      
      return true;
    } catch (error) {
      console.error("Error disconnecting from WhatsApp:", error);
      return false;
    }
  }
  
  /**
   * Listen for connection status changes
   */
  static listenForConnection(botId: string, callback: ConnectionCallback): void {
    // Store the callback
    connectionListeners[botId] = callback;
    
    // Start polling for connection status
    this.pollConnectionStatus(botId);
  }
  
  /**
   * Poll for connection status
   */
  private static async pollConnectionStatus(botId: string): Promise<void> {
    if (!connectionListeners[botId]) return;
    
    try {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;
      
      const response = await this.apiRequest<{ connected: boolean }>(
        `/bots/${botId}/status`,
        'GET'
      );
      
      // Notify callback
      connectionListeners[botId](response.connected);
      
      // Continue polling if not connected yet
      if (!response.connected) {
        setTimeout(() => this.pollConnectionStatus(botId), 5000);
      }
    } catch (error) {
      console.error("Error polling WhatsApp connection status:", error);
      setTimeout(() => this.pollConnectionStatus(botId), 10000); // Retry with longer delay on error
    }
  }

  /**
   * Send a message through WhatsApp
   */
  static async sendMessage(botId: string, to: string, message: string): Promise<boolean> {
    try {
      await this.apiRequest(
        `/bots/${botId}/send`, 
        'POST', 
        { to, message }
      );
      
      return true;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return false;
    }
  }
}

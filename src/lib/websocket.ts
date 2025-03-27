
import { toast } from "@/components/ui/use-toast";

type WebSocketMessageType = 
  | 'qr'
  | 'ready'
  | 'authenticated'
  | 'message'
  | 'disconnected'
  | 'error'
  | 'whatsapp_status'
  | 'whatsapp_qr'
  | 'generate_pairing_code' 
  | 'request_qr'
  | 'get_whatsapp_status';

interface WebSocketMessage {
  type: WebSocketMessageType;
  data?: any;
}

class WhatsAppWebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  constructor(private url: string) {}

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;
    
    try {
      this.socket = new WebSocket(this.url);
      
      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyListeners('ready', { connected: true });
      };
      
      this.socket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.notifyListeners(message.type, message.data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.socket.onclose = () => {
        this.isConnected = false;
        console.log('WebSocket connection closed');
        this.notifyListeners('disconnected', null);
        this.attemptReconnect();
      };
      
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners('error', { error });
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to WhatsApp service. Please try again later.",
        variant: "destructive",
      });
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      toast({
        title: "Connection Failed",
        description: "Unable to connect to WhatsApp service after multiple attempts. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    const timeout = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);
    this.reconnectAttempts++;
    
    console.log(`Attempting to reconnect in ${timeout / 1000} seconds...`);
    
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, timeout);
  }

  subscribe(type: WebSocketMessageType, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    
    this.listeners.get(type)?.add(callback);
    
    return () => {
      const callbacks = this.listeners.get(type);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  private notifyListeners(type: string, data: any) {
    const callbacks = this.listeners.get(type as WebSocketMessageType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in WebSocket listener for ${type}:`, error);
        }
      });
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    
    this.listeners.clear();
    this.isConnected = false;
  }

  isConnectionOpen() {
    return this.isConnected;
  }

  sendMessage(type: string, data: any = {}) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return false;
    }

    try {
      this.socket.send(JSON.stringify({ type, data }));
      return true;
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return false;
    }
  }
}

// Create a singleton instance
// Replace with your actual WebSocket URL
const websocketUrl = import.meta.env.VITE_WHATSAPP_WEBSOCKET_URL || 'wss://your-whatsapp-api.example.com/ws';
export const whatsAppWebSocket = new WhatsAppWebSocketService(websocketUrl);

// Subscribe to specific message types
export const useWhatsAppWebSocket = () => {
  return {
    connect: () => whatsAppWebSocket.connect(),
    disconnect: () => whatsAppWebSocket.disconnect(),
    subscribe: whatsAppWebSocket.subscribe.bind(whatsAppWebSocket),
    sendMessage: whatsAppWebSocket.sendMessage.bind(whatsAppWebSocket),
    isConnected: () => whatsAppWebSocket.isConnectionOpen(),
  };
};

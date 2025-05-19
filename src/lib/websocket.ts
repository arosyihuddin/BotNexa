import { io, Socket } from "socket.io-client";
import { toast } from "@/components/ui/use-toast";

class WhatsAppSocketIOService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();

  constructor(private url: string) { }

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(this.url, {
      transports: ['websocket'],
      reconnectionAttempts: 2,
    });

    this.socket.onAny((event, data) => {
      this.notifyListeners(event, data);
    });

    this.socket.on("connect", () => {
      console.log("[SOCKET.IO] Connected");
      this.notifyListeners('ready', { connected: true });
    });

    this.socket.on("disconnect", () => {
      console.log("[SOCKET.IO] Disconnected");
      this.notifyListeners('disconnected', null);
    });

    this.socket.on("connect_error", (error) => {
      console.error("[SOCKET.IO] Connection error:", error);
      this.notifyListeners('error', { error });

      toast({
        title: "Connection Error",
        description: "Failed to connect to WhatsApp service.",
        variant: "destructive",
      });
    });
  }


  subscribe(type: string, callback: (data: unknown) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(callback);

    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  private notifyListeners(type: string, data: unknown) {
    const callbacks = this.listeners.get(type);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[SOCKET.IO] Listener error for "${type}":`, error);
        }
      });
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.listeners.clear();
  }

  isConnectionOpen() {
    return this.socket?.connected ?? false;
  }

  sendMessage(type: string, data: unknown = {}) {
    if (!this.socket?.connected) {
      console.error("[SOCKET.IO] Socket not connected");
      return false;
    }

    try {
      this.socket.emit(type, data);
      return true;
    } catch (error) {
      console.error("[SOCKET.IO] Failed to emit:", error);
      return false;
    }
  }
}

// Singleton instance
const socketUrl = import.meta.env.VITE_BACKEND_SOCKET_URL || 'http://localhost:3000';
export const whatsAppSocketIO = new WhatsAppSocketIOService(socketUrl);

// React hook style export
export const useWhatsAppSocket = () => ({
  connect: () => whatsAppSocketIO.connect(),
  disconnect: () => whatsAppSocketIO.disconnect(),
  subscribe: whatsAppSocketIO.subscribe.bind(whatsAppSocketIO),
  sendMessage: whatsAppSocketIO.sendMessage.bind(whatsAppSocketIO),
  isConnected: () => whatsAppSocketIO.isConnectionOpen(),
});

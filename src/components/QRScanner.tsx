
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WhatsAppService } from "@/services/whatsapp.service";
import { UserService } from "@/services/user.service";

interface QRScannerProps {
  botId: string;
  onScanComplete?: () => void;
  onConnected?: () => void;
}

const QRScanner = ({ botId, onScanComplete, onConnected }: QRScannerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if bot is already connected
    const checkBotStatus = async () => {
      try {
        const bot = await UserService.toggleBotStatus(botId, false);
        setIsConnected(bot.isConnected);
        setIsActive(bot.status === 'online');
      } catch (error) {
        console.error("Error checking bot status:", error);
      }
    };

    checkBotStatus();
  }, [botId]);

  const toggleBot = async () => {
    setIsLoading(true);
    try {
      const newStatus = !isActive;
      const updatedBot = await UserService.toggleBotStatus(botId, newStatus);
      
      setIsActive(updatedBot.status === 'online');
      
      if (newStatus) {
        // If turning on, start WhatsApp connection
        const qrCodeData = await WhatsAppService.connect(botId);
        if (qrCodeData) {
          setQrCode(qrCodeData);
          WhatsAppService.listenForConnection(botId, (connected) => {
            setIsConnected(connected);
            setQrCode(null);
            if (connected) {
              if (onScanComplete) onScanComplete();
              if (onConnected) onConnected();
            }
          });
        }
      } else {
        // If turning off, disconnect WhatsApp
        await WhatsAppService.disconnect(botId);
        setQrCode(null);
        setIsConnected(false);
      }
      
      toast({
        title: newStatus ? "Bot Activated" : "Bot Deactivated",
        description: newStatus 
          ? "Scan the QR code to connect WhatsApp" 
          : "Bot has been turned off successfully",
      });
    } catch (error) {
      console.error("Error toggling bot:", error);
      toast({
        title: "Error",
        description: "Failed to toggle bot status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 flex flex-col items-center">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Bot Connection</h3>
          <Button 
            variant={isActive ? "destructive" : "default"}
            size="sm" 
            onClick={toggleBot}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isActive ? "Turn Off" : "Turn On"}
          </Button>
        </div>
        
        {isActive && !isConnected && qrCode && (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-md">
              <img 
                src={qrCode} 
                alt="WhatsApp QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Scan this QR code with WhatsApp on your phone to connect
            </p>
          </div>
        )}
        
        {isActive && isConnected && (
          <div className="text-center p-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm font-medium">Connected</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your WhatsApp is connected and bot is active
            </p>
          </div>
        )}
        
        {!isActive && (
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">
              Bot is currently turned off. Turn it on to connect WhatsApp.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QRScanner;

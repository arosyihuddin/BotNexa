import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WhatsAppService } from "@/services/whatsapp.service";
import { UserService } from "@/services/user.service";
import { useWhatsAppSocket } from "@/lib/websocket";
import { QREncoder } from './QREncoder';
import { time } from "console";
import { Loader2, RotateCcw } from "lucide-react";

interface QRScannerProps {
  botId: number;
  onScanOpen?: (data: boolean) => void;
  onConnected?: (botId: number, connected: boolean) => void;

}

const QRScanner = ({ botId, onScanOpen, onConnected }: QRScannerProps) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [mode, setMode] = useState<"qr" | "pairing">("qr");
  const { toast } = useToast();
  const {
    connect,
    disconnect,
    subscribe,
    sendMessage,
    isConnected,
  } = useWhatsAppSocket();

  // UseEffect untuk connect ke socket
  useEffect(() => {
    const connectWebsocket = async () => {
      console.log("Connecting to socket...");
      connect();

      const unsub = subscribe(`qr-${botId}`, async ({ qr }) => {
        console.log("Received QR:", qr);
        setQrCode(qr);
      });

      const unsubPairing = subscribe(`pairing-${botId}`, async ({ code }) => {
        const pairingCode = `${code.slice(0, 4)}-${code.slice(4)}`;
        console.log("Received Pairing:", pairingCode);
        setPairingCode(pairingCode);
      });

      const timeout = subscribe(`timeout-${botId}`, async ({ timeout }) => {
        console.log("Received Timeout:", timeout);
      });

      return () => {
        unsub?.();
        unsubPairing?.();
        timeout?.();
        disconnect();
        setQrCode(null);
        setPairingCode(null);
        setIsRequested(false);
      };
    }
    connectWebsocket()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botId]);

  // useEfect untuk mode
  useEffect(() => {
    if (mode === null) return

    console.log("Connecting to WhatsApp with mode:", mode);

    const connectToWhatsapp = async () => {
      console.log("Connecting to WhatsApp...");
      await WhatsAppService.connect(botId, mode);
    }

    if (!isRequested) {
      console.log("Requesting WhatsApp connection...");
      connectToWhatsapp();
      setIsRequested(true);
      onScanOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    subscribe("connection_update", async ({ botId, connected, status }) => {
      if (botId !== botId) return;
      console.log(`Connection update Bot ID ${botId}: ${status}`);
      onConnected(botId, connected);
    });

    subscribe(`timeout-${botId}`, async ({ timeout }) => {
      console.log(`Timeout update Bot ID ${botId}: ${timeout}`);
      setIsTimeout(timeout);
      onConnected(botId, false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe])

  const handleReConnect = async () => {
    setIsLoading(true);
    await WhatsAppService.connect(botId, mode);
    setIsLoading(false);
    setIsTimeout(false);
  }

  return (
    <Card className="p-6 flex flex-col items-center bg-background border-0">
      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant={mode === "qr" ? "default" : "outline"}
          onClick={() => setMode("qr")}
        >
          QR Code
        </Button>
        <Button
          variant={mode === "pairing" ? "default" : "outline"}
          onClick={() => setMode("pairing")}
        >
          Pairing Code
        </Button>
      </div>

      {/* Konten berdasarkan mode */}
      {mode === "qr" ? (
        qrCode ? (
          <div className="flex flex-col items-center space-y-4">
            {!isTimeout ? (
              <>
                <div className="bg-white p-4 rounded-md">
                  <QREncoder qrData={qrCode} />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan this QR code with WhatsApp to connect
                </p>
              </>
            ) : (
              <>
                <div className="bg-white p-4 rounded-md relative w-full flex justify-center">
                  <div className="blur-sm">
                    <QREncoder qrData={qrCode} />
                  </div>

                  {/* Tombol di tengah-tengah QR, tidak blur */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      onClick={handleReConnect}
                      className="z-10"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <RotateCcw className="mr-2" />
                          Reconnect
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground text-red-500 mt-2">
                  Connection Timeout, Please Reconnect
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 flex items-center justify-center bg-white p-4 rounded-md">
              <div className="h-6 w-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Loading QR code...
            </p>
          </div>
        )
      ) : mode === "pairing" ? (
        pairingCode ? (
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold tracking-wide">
              {pairingCode}
            </div>
            <p className="text-sm text-muted-foreground">
              Enter this code in your WhatsApp to pair
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 flex items-center justify-center bg-white p-4 rounded-md">
              <div className="h-6 w-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Loading pairing code...
            </p>
          </div>
        )
      ) : null}
    </Card >
  );
};

export default QRScanner;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanLine, QrCode, RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const QRScanner = () => {
  const [pairingCode, setPairingCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [qrRefreshCounter, setQrRefreshCounter] = useState(0);
  const isMobile = useIsMobile();

  // Simulate QR code refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isScanning) {
        setQrRefreshCounter((prev) => prev + 1);
      }
    }, 20000); // Refresh every 20 seconds

    return () => clearTimeout(timer);
  }, [isScanning, qrRefreshCounter]);

  const handlePairingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pairing with code:", pairingCode);
    // Here you would handle the pairing process
    setPairingCode("");
  };

  const refreshQRCode = () => {
    setQrRefreshCounter((prev) => prev + 1);
  };

  const qrSize = isMobile ? "w-full max-w-[250px]" : "w-64";

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan" onClick={() => setIsScanning(true)}>Scan QR Code</TabsTrigger>
          <TabsTrigger value="pair" onClick={() => setIsScanning(false)}>Pairing Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="p-4 sm:p-6">
          <div className="text-center space-y-4">
            <div className="text-lg font-medium">Scan the QR code with WhatsApp</div>
            <p className="text-sm text-muted-foreground pb-2">
              Open WhatsApp on your phone, tap Menu or Settings and select WhatsApp Web
            </p>
            
            <div className="relative mx-auto flex items-center justify-center">
              {/* QR Code with responsive size */}
              <div className={`${qrSize} h-auto aspect-square p-4 border-2 border-botnexa-500 rounded-lg relative`}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=botnexa-connect-${qrRefreshCounter}`} 
                  alt="WhatsApp QR Code"
                  className="w-full h-full object-contain"
                />
                
                {/* Scanning animation with adjusted positioning */}
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="absolute w-full h-0.5 bg-botnexa-400/50 animate-scan">
                      <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-transparent via-botnexa-500 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Style for the scanning animation - Fixed with proper syntax */}
              <style>
                {`
                  @keyframes scan {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(100%); }
                    100% { transform: translateY(0); }
                  }
                  .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                  }
                `}
              </style>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={refreshQRCode}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh QR
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground pt-2">
              QR code will refresh automatically every 20 seconds
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="pair" className="p-4 sm:p-6">
          <div className="text-center space-y-4">
            <div className="text-lg font-medium">Connect with pairing code</div>
            <p className="text-sm text-muted-foreground pb-2">
              1. Open WhatsApp on your phone
              <br />
              2. Tap Menu or Settings and select Linked Devices
              <br />
              3. Tap on "Link a Device"
              <br />
              4. Enter the 8-digit pairing code
            </p>
            
            <form onSubmit={handlePairingSubmit} className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Enter 8-digit pairing code"
                    value={pairingCode}
                    onChange={(e) => setPairingCode(e.target.value)}
                    className="text-center tracking-[0.5em] text-lg"
                    maxLength={8}
                  />
                </div>
                <Button type="submit" className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                  Connect
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default QRScanner;

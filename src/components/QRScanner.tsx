
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
  const [generatedPairingCode, setGeneratedPairingCode] = useState("");
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
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
    // Generate a random 8-digit code
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    setGeneratedPairingCode(randomCode);
    setShowGeneratedCode(true);
  };

  const refreshQRCode = () => {
    setQrRefreshCounter((prev) => prev + 1);
  };

  const qrSize = isMobile ? "w-full max-w-[250px]" : "w-64";

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="scan" 
            onClick={() => {
              setIsScanning(true);
              setShowGeneratedCode(false);
            }}
          >
            Scan QR Code
          </TabsTrigger>
          <TabsTrigger 
            value="pair" 
            onClick={() => {
              setIsScanning(false);
              setShowGeneratedCode(false);
            }}
          >
            Pairing Code
          </TabsTrigger>
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
            
            {showGeneratedCode ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground pb-2">
                  Enter this 8-digit code in your WhatsApp:
                </p>
                <div className="text-3xl font-mono tracking-wider bg-muted p-4 rounded-lg">
                  {generatedPairingCode}
                </div>
                <p className="text-sm text-muted-foreground pb-2">
                  This code will expire in 5 minutes
                </p>
                <Button 
                  onClick={() => setShowGeneratedCode(false)}
                  variant="outline"
                  className="mt-2"
                >
                  Generate New Code
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground pb-2">
                  1. Open WhatsApp on your phone
                  <br />
                  2. Tap Menu or Settings and select Linked Devices
                  <br />
                  3. Tap on "Link a Device"
                </p>
                
                <form onSubmit={handlePairingSubmit} className="space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full">
                      <Input
                        type="number"
                        placeholder="Enter your phone number"
                        value={pairingCode}
                        onChange={(e) => setPairingCode(e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-botnexa-500 hover:bg-botnexa-600"
                      disabled={!pairingCode.trim()}
                    >
                      Generate Pairing Code
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default QRScanner;

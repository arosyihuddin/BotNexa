
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Check } from "lucide-react";
import { PageTransition } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending the reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-botnexa-50/50 to-background dark:from-botnexa-900/10 dark:to-background">
        <header className="py-4 px-6">
          <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </Link>
        </header>
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-botnexa-400 to-botnexa-600 flex items-center justify-center text-white font-bold text-lg">
                  B
                </div>
                <span className="font-bold text-xl">BotNexa</span>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
              <p className="text-muted-foreground mt-2">
                {isSubmitted 
                  ? "Check your email for the reset link" 
                  : "Enter your email and we'll send you a link to reset your password"}
              </p>
            </div>
            
            <Card className="p-6 bg-white/70 dark:bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
              {isSubmitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Sent</h3>
                  <p className="text-muted-foreground mb-4">
                    A password reset link has been sent to <span className="font-medium">{email}</span>
                  </p>
                  <Button asChild className="w-full mt-2">
                    <Link to="/login">Return to login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="pl-10 bg-white dark:bg-card"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-botnexa-500 hover:bg-botnexa-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              )}
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Remembered your password?</span>{" "}
                <Link
                  to="/login"
                  className="text-botnexa-600 dark:text-botnexa-400 hover:text-botnexa-700 dark:hover:text-botnexa-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;

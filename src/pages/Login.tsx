
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { EyeIcon, ArrowLeft, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/lib/animations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to dashboard on successful login
      navigate("/dashboard");
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
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
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </header>
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your account to continue
              </p>
            </div>
            
            <Card className="p-6 bg-white/70 dark:bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-botnexa-600 dark:text-botnexa-400 hover:text-botnexa-700 dark:hover:text-botnexa-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pl-10 pr-10 bg-white dark:bg-card"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-botnexa-500 hover:bg-botnexa-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account?</span>{" "}
                <Link
                  to="/register"
                  className="text-botnexa-600 dark:text-botnexa-400 hover:text-botnexa-700 dark:hover:text-botnexa-300 font-medium transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </Card>
            
            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>
                By signing in, you agree to our{" "}
                <Link
                  to="/terms-of-service"
                  className="underline hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="underline hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { EyeIcon, ArrowLeft, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/lib/animations";
import { supabase } from "@/lib/supabase";
import { UserService } from "@/services/user.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login with Supabase and API
      await UserService.loginUser(email, password);

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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      // Sign in with Google popup
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });

      if (error) throw error;

      // The redirect will happen automatically
      const { data: { user } } = await supabase.auth.getUser()
      console.log("user", user);

      toast({
        title: "Redirecting to Google",
        description: "Please complete the sign-in process.",
      });
    } catch (error) {
      toast({
        title: "Google sign-in failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
      console.error("Google sign-in error:", error);
      setIsGoogleLoading(false);
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

                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative px-4 text-xs uppercase bg-white dark:bg-card text-muted-foreground">
                    Or continue with
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    "Connecting..."
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                          fill="#34A853"
                        />
                      </svg>
                      Sign in with Google
                    </>
                  )}
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

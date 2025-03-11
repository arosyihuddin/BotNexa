
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/lib/animations";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be your actual registration logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration success:", formData);
      setStep(2);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-botnexa-50/50 to-background">
        <header className="py-4 px-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
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
              
              {step === 1 ? (
                <>
                  <h1 className="text-2xl font-bold">Create an account</h1>
                  <p className="text-muted-foreground mt-2">Join BotNexa to enhance your WhatsApp experience</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">Registration successful!</h1>
                  <p className="text-muted-foreground mt-2">Your account has been created</p>
                </>
              )}
            </div>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-border/50 animate-scale-in">
              {step === 1 ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-10 bg-white"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-botnexa-600 hover:text-botnexa-700 transition-colors">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-botnexa-600 hover:text-botnexa-700 transition-colors">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-botnexa-500 hover:bg-botnexa-600"
                    disabled={isLoading || !agreeTerms}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6 py-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Account Created Successfully</h3>
                    <p className="text-muted-foreground">
                      We've sent a confirmation email to <span className="font-medium">{formData.email}</span>
                    </p>
                  </div>
                  
                  <Button
                    onClick={goToDashboard}
                    className="w-full bg-botnexa-500 hover:bg-botnexa-600"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}
              
              {step === 1 && (
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Already have an account?</span>{" "}
                  <Link
                    to="/login"
                    className="text-botnexa-600 hover:text-botnexa-700 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Register;

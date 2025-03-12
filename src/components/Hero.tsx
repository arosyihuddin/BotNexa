
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Bot, Zap } from "lucide-react";

const Hero = () => {
  return <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-botnexa-50/50 to-transparent dark:from-botnexa-950/30 dark:to-transparent -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-botnexa-200/20 dark:bg-botnexa-800/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-[5%] w-72 h-72 bg-botnexa-100/30 dark:bg-botnexa-900/30 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-botnexa-100 border border-botnexa-200 text-botnexa-700 dark:bg-botnexa-900/50 dark:border-botnexa-800 dark:text-botnexa-300 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-botnexa-500 mr-2"></span>
            Introducing BotNexa
          </div>
          
          <h1 className="heading-xl text-balance">
            Manage your WhatsApp Bot with 
            <span className="text-botnexa-500"> unmatched precision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            BotNexa provides a seamless interface to configure, manage and optimize your WhatsApp bot. 
            Connect, automate, and enhance your messaging experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-botnexa-500 hover:bg-botnexa-600 px-6 h-12 text-white">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
          <FeatureCard icon={<MessageSquare className="h-6 w-6 text-botnexa-500" />} title="Intelligent Conversations" description="Leverage AI to create natural conversations. Our bots understand context and respond appropriately." />
          <FeatureCard icon={<Bot className="h-6 w-6 text-botnexa-500" />} title="Easy Bot Configuration" description="Configure your bot with our intuitive interface. No coding required, just point and click." />
          <FeatureCard icon={<Zap className="h-6 w-6 text-botnexa-500" />} title="Smart Automation" description="Automate repetitive tasks and free up your time. Let your bot handle the routine inquiries." />
        </div>
      </div>
      
      {/* Hero image */}
      <div className="mt-16 md:mt-24 perspective-800">
        <div className="relative max-w-4xl mx-auto preserve-3d">
          <div className="glass-card rounded-xl overflow-hidden shadow-2xl premium-shadow transform rotate-x-2 backface-hidden animate-float">
            <img src="/dashboard.png" alt="BotNexa Dashboard" className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] h-[20px] bg-black/10 blur-xl rounded-full"></div>
        </div>
      </div>
    </section>;
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description
}: FeatureCardProps) => <div className="group p-6 bg-white dark:bg-card rounded-xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-botnexa-200 dark:hover:border-botnexa-700 animate-fade-in">
    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-botnexa-50 dark:bg-botnexa-900/30 group-hover:bg-botnexa-100 dark:group-hover:bg-botnexa-900/50 transition-colors mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground transition-colors group-hover:text-botnexa-600 dark:group-hover:text-botnexa-400">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>;

export default Hero;

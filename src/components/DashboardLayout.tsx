import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, BarChart3, Settings, Users, MessageSquare, Calendar, Bell,
  LogOut, Search, Menu, X, Activity, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageTransition } from "@/lib/animations";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const DashboardLayout = ({ children, title, showBackButton, onBack }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebar-desktop-state');
    return saved ? JSON.parse(saved) : true;
  });
  const { toast } = useToast();

  // Sinkronkan state ke localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-desktop-state', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Handle perubahan dari tab lain
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'sidebar-desktop-state') {
        setIsSidebarOpen(JSON.parse(e.newValue || 'false'));
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an issue signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            className={cn(
              "h-screen bg-background border-r border-border",
              isSidebarOpen ? "w-64" : "md:w-16"
            )}
            defaultOpen={!isMobile}
            header={
              <div className="flex items-center justify-between w-full px-4 h-16 shrink-0">
                <div className="flex items-center gap-2 min-w-max">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-botnexa-400 to-botnexa-600 flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                  <span className={cn(
                    "font-bold text-xl transition-opacity",
                    isSidebarOpen ? "opacity-100" : "md:opacity-0"
                  )}>
                    BotNexa
                  </span>
                </div>
              </div>
            }
            items={[
              {
                title: "Dashboard",
                href: "/dashboard",
                icon: <Home className="h-5 w-5" />,
                active: location.pathname === '/dashboard',
              },
              {
                title: "Conversations",
                href: "/conversations",
                icon: <MessageSquare className="h-5 w-5" />,
                active: location.pathname === '/conversations',
              },
              {
                title: "Bots",
                href: "/bots",
                icon: <Bot className="h-5 w-5" />,
                active: location.pathname === '/bots',
              },
              {
                title: "Reminders",
                href: "/reminders",
                icon: <Calendar className="h-5 w-5" />,
                active: location.pathname === '/reminders',
              },
              {
                title: "Contacts",
                href: "/contacts",
                icon: <Users className="h-5 w-5" />,
                active: location.pathname === '/contacts',
              },
              {
                title: "Analytics",
                href: "/analytics",
                icon: <BarChart3 className="h-5 w-5" />,
                active: location.pathname === '/analytics',
              },
              {
                title: "Log Activity",
                href: "/log-activity",
                icon: <Activity className="h-5 w-5" />,
                active: location.pathname === '/log-activity',
              },
              {
                title: "Settings",
                href: "/settings",
                icon: <Settings className="h-5 w-5" />,
                active: location.pathname === '/settings',
              },
            ]}
            footer={
              <div className={cn(
                "flex items-center gap-3 p-4 mt-auto border-t border-border",
                isSidebarOpen ? "justify-between" : "md:justify-center"
              )}>
                <Avatar className={cn("shrink-0", !isSidebarOpen && "md:w-8 md:h-8")}>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className={cn(
                  "flex-1 overflow-hidden transition-opacity",
                  isSidebarOpen ? "opacity-100" : "md:opacity-0"
                )}>
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className={cn(!isSidebarOpen && "md:hidden")}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            }
          />

          {/* Main Content */}
          <div className={cn(
            "flex-1 flex flex-col min-h-0 transition-margin duration-300",
            isSidebarOpen ? "md:ml-64" : "md:ml-16"
          )}>
            <header className={cn(
              "h-14 border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 bg-background/95 backdrop-blur-sm z-20"
            )}>
              <div className="flex items-center gap-4">
                {showBackButton && (
                  <Button variant="ghost" size="icon" onClick={handleBack}>
                    <X className="h-5 w-5" />
                  </Button>
                )}

                <h1 className="text-xl font-semibold pl-7">{title}</h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px] pl-8 bg-background"
                  />
                </div>

                <ThemeToggle />

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-botnexa-500 rounded-full"></span>
                </Button>

                <Avatar className="h-8 w-8 hidden sm:flex">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
              <div className="max-w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div >
    </PageTransition >
  );
};

export default DashboardLayout;

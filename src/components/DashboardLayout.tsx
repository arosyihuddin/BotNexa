import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, BarChart3, Settings, Users, MessageSquare, BrainCircuit, Calendar, Bell, 
  LogOut, Search, User, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageTransition } from "@/lib/animations";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        <SidebarProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar className="border-r border-border">
              <SidebarHeader className="py-4 px-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-botnexa-400 to-botnexa-600 flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                  <span className="font-bold text-xl">BotNexa</span>
                </div>
                
                {isMobile && (
                  <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SidebarTrigger>
                )}
              </SidebarHeader>
              
              <SidebarContent className="px-2 py-2">
                <nav className="flex flex-col space-y-2">
                  <NavItem 
                    icon={<Home />} 
                    label="Dashboard" 
                    active={location.pathname === '/dashboard'} 
                    to="/dashboard" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<MessageSquare />} 
                    label="Conversations" 
                    active={location.pathname === '/conversations'} 
                    to="/conversations" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<BrainCircuit />} 
                    label="AI Settings" 
                    active={location.pathname === '/ai-settings'} 
                    to="/ai-settings" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<Calendar />} 
                    label="Reminders" 
                    active={location.pathname === '/reminders'} 
                    to="/reminders" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<Users />} 
                    label="Contacts" 
                    active={location.pathname === '/contacts'} 
                    to="/contacts" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<BarChart3 />} 
                    label="Analytics" 
                    active={location.pathname === '/analytics'} 
                    to="/analytics" 
                    className="p-2 hover:bg-gray-100"
                  />
                  <NavItem 
                    icon={<Settings />} 
                    label="Settings" 
                    active={location.pathname === '/settings'} 
                    to="/settings" 
                    className="p-2 hover:bg-gray-100"
                  />
                </nav>
              </SidebarContent>
              
              <SidebarFooter className="p-4 border-t border-border mt-auto">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </SidebarFooter>
            </Sidebar>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header */}
              <header className="h-14 border-b border-border flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  {isMobile && (
                    <SidebarTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SidebarTrigger>
                  )}
                  <h1 className="text-xl font-semibold">{title}</h1>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search..." 
                      className="w-[200px] pl-8 bg-background focus-visible:ring-botnexa-500"
                    />
                  </div>
                  
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
              
              {/* Content */}
              <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 w-full">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </PageTransition>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
  className?: string; // Added className to allow passing custom styles
}




const NavItem = ({ icon, label, active, to }: NavItemProps) => {
  const navigate = useNavigate();
  
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-botnexa-50 text-botnexa-700"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
      onClick={() => to && navigate(to)}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1 h-4 bg-botnexa-500 rounded-full" />}
    </button>
  );
};

export default DashboardLayout;


import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isPossibleDashboardRoute = location.pathname.includes('/dashboard') || 
    location.pathname.includes('/conversations') || 
    location.pathname.includes('/settings') || 
    location.pathname.includes('/contacts') || 
    location.pathname.includes('/analytics') || 
    location.pathname.includes('/ai-settings') || 
    location.pathname.includes('/reminders');

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-md px-4">
        <div className="mb-8 w-24 h-24 rounded-full bg-muted/50 mx-auto flex items-center justify-center">
          <span className="text-4xl">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or is still under development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to={isPossibleDashboardRoute ? "/dashboard" : "/"}>
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-botnexa-500 hover:bg-botnexa-600">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

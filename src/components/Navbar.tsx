
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-botnexa-400 to-botnexa-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="font-bold text-xl">BotNexa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isActive("/")} onClick={() => {}}>
              Home
            </NavLink>
            <NavLink to="/#features" active={location.hash === "#features"} onClick={() => scrollToSection('features')}>
              Features
            </NavLink>
            <NavLink to="/#pricing" active={location.hash === "#pricing"} onClick={() => scrollToSection('pricing')}>
              Pricing
            </NavLink>
            <div className="ml-4 flex items-center gap-3">
              <ThemeToggle />
              <Button asChild variant="ghost" className="font-medium">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="font-medium bg-botnexa-500 hover:bg-botnexa-600">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="relative"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <ChevronDown className={cn(
                "h-3 w-3 absolute -bottom-1 right-0 transition-transform duration-200",
                isMobileMenuOpen ? "rotate-180" : "rotate-0"
              )} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[68px] z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="bg-background/95 dark:bg-card/95 backdrop-blur-md shadow-md py-4 px-6 flex flex-col gap-3 border-b border-border">
          <MobileNavLink to="/" active={isActive("/")} onClick={() => {}}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/#features" active={location.hash === "#features"} onClick={() => scrollToSection('features')}>
            Features
          </MobileNavLink>
          <MobileNavLink to="/#pricing" active={location.hash === "#pricing"} onClick={() => scrollToSection('pricing')}>
            Pricing
          </MobileNavLink>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="w-full bg-botnexa-500 hover:bg-botnexa-600">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const NavLink = ({ to, active, children, onClick }: NavLinkProps) => {
  const isHash = to.includes('#');
  
  if (isHash) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "px-3 py-2 rounded-full text-sm font-medium transition-colors relative",
          active
            ? "text-botnexa-600 dark:text-botnexa-400"
            : "text-foreground/80 hover:text-foreground hover:bg-secondary/80"
        )}
      >
        {children}
        {active && (
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-botnexa-500 rounded-full" />
        )}
      </button>
    );
  }
  
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-full text-sm font-medium transition-colors relative",
        active
          ? "text-botnexa-600 dark:text-botnexa-400"
          : "text-foreground/80 hover:text-foreground hover:bg-secondary/80"
      )}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-botnexa-500 rounded-full" />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, active, children, onClick }: NavLinkProps) => {
  const isHash = to.includes('#');
  
  if (isHash) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "py-2 px-3 rounded-md text-base font-medium transition-colors",
          active
            ? "bg-secondary text-botnexa-600 dark:text-botnexa-400"
            : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
        )}
      >
        {children}
      </button>
    );
  }
  
  return (
    <Link
      to={to}
      className={cn(
        "py-2 px-3 rounded-md text-base font-medium transition-colors",
        active
          ? "bg-secondary text-botnexa-600 dark:text-botnexa-400"
          : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;

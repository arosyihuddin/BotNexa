
import * as React from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  header?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  items?: {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    showTitle?: boolean;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    customContent?: React.ReactNode;
  }[];
  footer?: React.ReactNode;
  setActivePath?: (path: string) => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      defaultOpen = true,
      header,
      isOpen,
      setIsOpen,
      items = [],
      footer,
      setActivePath,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useIsMobile();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isControlled = isOpen !== undefined && setIsOpen !== undefined;
    const showOpen = isControlled ? isOpen : open;
    const showMobileOpen = isControlled ? isOpen : mobileOpen;

    // Handle click outside to close mobile sidebar
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isMobile && showMobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          if (isControlled) {
            setIsOpen(false);
          } else {
            setMobileOpen(false);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMobile, showMobileOpen, isControlled, setIsOpen]);

    const toggleSidebar = () => {
      if (isControlled) {
        setIsOpen(!showOpen);
      } else {
        if (isMobile) {
          setMobileOpen(!showMobileOpen);
        } else {
          setOpen(!showOpen);
        }
      }
    };

    return (
      <>
        {isMobile && (
          // Mobile Toggle Button
          <Button
            variant="outline"
            size="icon"
            className={cn("fixed left-4 top-4 z-40", 
              showMobileOpen ? "hidden" : "block"
            )}
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        )}
        
        {/* <div
          ref={sidebarRef}
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r bg-background transition-transform duration-300 ease-in-out overflow-hidden",
            isMobile
              ? showMobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : showOpen
              ? "translate-x-0 md:z-0"
              : "-translate-x-full md:z-0",
            className
          )} */}
        <div
          ref={sidebarRef}
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r bg-background transition-transform duration-300 ease-in-out md:static md:transform-none",
            isMobile
              ? showMobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : showOpen
              ? "translate-x-0 md:w-64"
              : "md:w-[4.5rem] hover:md:w-64",
            className
          )}
          {...props}
        >
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex-1">
              {header || <div className="font-medium">Sidebar Header</div>}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={toggleSidebar}
            >
              {isMobile ? (
                <X className="h-4 w-4" />
              ) : showOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showOpen ? "Close Menu" : "Open Menu"}
              </span>
            </Button>
          </div>
          
          <nav className="flex-1 overflow-auto p-2">
            <ul className="grid gap-1">
              {items.map((item, index) => {
                // Set the active state based on the current route
                const isActive = item.href 
                  ? location.pathname === item.href
                  : item.active;
                
                return (
                  <li key={index}>
                    {item.customContent || (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          isActive ? "bg-accent" : "",
                          item.disabled && "pointer-events-none opacity-50"
                        )}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          } else if (item.href && !item.disabled) {
                            navigate(item.href);
                            if (setActivePath) setActivePath(item.href);
                            if (isMobile && isControlled) {
                              setIsOpen(false);
                            } else if (isMobile) {
                              setMobileOpen(false);
                            }
                          }
                        }}
                      >
                        {item.icon && (
                          <span className="mr-2">{item.icon}</span>
                        )}
                        {item.title}
                        {item.label && (
                          <span className="ml-auto">{item.label}</span>
                        )}
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {footer && <div className="border-t p-4">{footer}</div>}
        </div>
        
        {/* Overlay for mobile */}
        {isMobile && showMobileOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/50" 
            onClick={toggleSidebar}
          />
        )}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };

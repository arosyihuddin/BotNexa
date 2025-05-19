import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./button"; // Corrected import path
import { X, ChevronLeft, Menu } from "lucide-react"; // Importing Menu icon for hamburger

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
    disabled?: boolean;
    customContent?: React.ReactNode;
    label?: string; // Added label property
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
    const [open, setOpen] = React.useState(() => {
      // Check localStorage for sidebar state
      const savedState = localStorage.getItem('sidebarOpen');
      return savedState ? JSON.parse(savedState) : defaultOpen;
    });
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isControlled = isOpen !== undefined && setIsOpen !== undefined;
    const showOpen = isControlled ? isOpen : open;
    const showMobileOpen = isControlled ? isOpen : mobileOpen;

    // Handle click outside to close mobile sidebar
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (showMobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
    }, [showMobileOpen, isControlled, setIsOpen]);

    const toggleSidebar = () => {
      if (isControlled) {
        setIsOpen(!showOpen);
      } else {
        // Pisahkan logika mobile dan desktop
        if (window.innerWidth < 768) { // Asumsi breakpoint mobile md (768px)
          setMobileOpen(!showMobileOpen);
        } else {
          setOpen(!showOpen);
        }
        localStorage.setItem('sidebarOpen', JSON.stringify(!showOpen));
      }
    };

    return (
      <>
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-30 flex h-screen flex-col border-r bg-background transition-[transform,width] duration-300 ease-in-out 
            ${showMobileOpen ? "w-64 translate-x-0" :
              showOpen ? "w-64 md:translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"}`}
          {...props}
        >
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex-1">
              {showOpen && (header || <div className="font-medium">Sidebar Header</div>)}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={toggleSidebar}
            >
              {showOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" /> // Using Menu icon for hamburger
              )}
              <span className="sr-only">
                {showOpen ? "Close Menu" : "Open Menu"}
              </span>
            </Button>
          </div>

          <nav className="flex-1 overflow-auto p-2">
            <ul className="grid gap-1">
              {items.map((item, index) => {
                const isActive = item.href
                  ? location.pathname === item.href
                  : item.active;

                return (
                  <li key={index}>
                    {item.customContent || (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full ${!showOpen ? "justify-center px-2" : "justify-start"} ${isActive ? "bg-accent" : ""} ${item.disabled ? "pointer-events-none opacity-50" : ""}`}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          } else if (item.href && !item.disabled) {
                            navigate(item.href);
                            if (setActivePath) setActivePath(item.href);
                            if (mobileOpen && isControlled) {
                              setIsOpen(false);
                            } else if (mobileOpen) {
                              setMobileOpen(false);
                            }
                          }
                        }}
                      >
                        {item.icon}
                        {showOpen && (
                          <>
                            <span className="ml-2">{item.title}</span>
                            {item.label && (
                              <span className="ml-auto">{item.label}</span>
                            )}
                          </>
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
        {mobileOpen && (
          <div className="fixed inset-0 z-20 bg-black/50" />
        )}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };

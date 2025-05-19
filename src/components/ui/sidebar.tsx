import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "./button";
import { ChevronLeft, Menu, User, Settings, LogOut } from "lucide-react";

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
  ({ className, defaultOpen = true, header, items = [], ...props }, ref) => {
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) setIsMobileOpen(false);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        // Handle mobile sidebar close
        if (window.innerWidth < 768 &&
          sidebarRef.current &&
          !sidebarRef.current.contains(e.target as Node)) {
          setIsMobileOpen(false);
        }

        // Handle profile dropdown close
        if (dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <>
        {/* Mobile Toggle Button (Only shown when sidebar is closed) */}
        {!isMobileOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed z-40 left-2 top-2 md:hidden h-9 w-9"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}

        {/* Sidebar Container */}
        <div
          ref={sidebarRef}
          className={`
            fixed inset-y-0 left-0 z-30 flex flex-col
            bg-background border-r
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:transition-[width] 
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            ${props.isOpen ? 'md:w-64' : 'md:w-16'}
          `}
          {...props}
        >
          {/* Header Section */}
          <div className="flex h-14 items-center border-b px-2">
            <div className="flex-1 overflow-hidden">
              {props.isOpen && (header || (
                <div className="font-medium px-2 truncate">App Logo</div>
              ))}
            </div>

            {/* Desktop Toggle (Hidden in mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hidden md:inline-flex"
              onClick={() => props.setIsOpen?.(!props.isOpen)}
            >
              {props.isOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">
                {props.isOpen ? "Collapse" : "Expand"}
              </span>
            </Button>
          </div>

          {/* Navigation Items with proper links */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="grid gap-1">
              {items.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href || "#"}
                    className="block"
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      if (window.innerWidth < 768) setIsMobileOpen(false);
                    }}
                  >
                    <Button
                      variant={location.pathname === item.href ? "secondary" : "ghost"}
                      className={`w-full justify-start h-10 ${!props.isOpen ? "px-2 justify-center" : "px-3"
                        }`}
                    >
                      {item.icon}
                      {(props.isOpen || window.innerWidth < 768) && <span className="ml-2 truncate">{item.title}</span>}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Profile Section with fixed dropdown positioning */}
          <div className="border-t p-2 relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className={`w-full h-10 ${props.isOpen ? "justify-start px-3" : "justify-center px-2"
                }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="h-5 w-5" />
              {props.isOpen && <span className="ml-2 truncate">User Profile</span>}
            </Button>

            {isDropdownOpen && (
              <div
                className={`
                  absolute
                  ${props.isOpen ? 'left-[15.5rem]' : 'left-[3.5rem]'}
                  bottom-2
                  mt-2 bg-background border rounded-lg shadow-lg z-50
                  w-[calc(100%-1rem)] md:w-48
                  ${!props.isOpen ? '-translate-x-full left-16 top-16' : ''}
                `}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 px-3"
                  onClick={() => console.log("Settings clicked")}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-red-600 hover:bg-red-50"
                  onClick={() => console.log("Logout clicked")}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            )}

            {/* Handle click outside dropdown */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };

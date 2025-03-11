
import { useEffect } from "react";

interface ScrollRevealOptions {
  distance?: string;
  duration?: number;
  delay?: number;
  origin?: "top" | "right" | "bottom" | "left";
  reset?: boolean;
  opacity?: number;
  scale?: number;
  cleanup?: boolean;
  easing?: string;
  interval?: number;
}

export const useScrollReveal = (
  selector: string,
  options?: ScrollRevealOptions
) => {
  useEffect(() => {
    let cleanupFunction = () => {};
    
    const defaultOptions = {
      distance: "60px",
      duration: 800,
      delay: 100,
      origin: "bottom" as const,
      reset: false,
      opacity: 0,
      scale: 1,
      cleanup: true,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const revealElements = async () => {
      try {
        const ScrollReveal = (await import("scrollreveal")).default;
        const sr = ScrollReveal({
          distance: mergedOptions.distance,
          duration: mergedOptions.duration,
          delay: mergedOptions.delay,
          origin: mergedOptions.origin,
          reset: mergedOptions.reset,
          easing: mergedOptions.easing,
          opacity: mergedOptions.opacity,
          scale: mergedOptions.scale,
          interval: mergedOptions.interval,
        });

        sr.reveal(selector);
        
        if (mergedOptions.cleanup) {
          cleanupFunction = () => {
            sr.destroy();
          };
        }
      } catch (error) {
        console.error("ScrollReveal failed to load", error);
      }
    };

    revealElements();
    
    return cleanupFunction;
  }, [selector, options]);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

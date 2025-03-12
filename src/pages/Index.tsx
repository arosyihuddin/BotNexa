
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageSquare, BrainCircuit, Calendar } from "lucide-react";
import { useScrollReveal, useSmoothScroll, PageTransition } from "@/lib/animations";

const Index = () => {
  // Initialize smooth scrolling
  useSmoothScroll();
  
  // Initialize scroll reveal animations
  useScrollReveal('.hero-section', { origin: 'top', distance: '50px' });
  useScrollReveal('.feature-card', { 
    origin: 'bottom', 
    distance: '30px',
    interval: 100,
    delay: 200 
  });
  useScrollReveal('.cta-section', { 
    origin: 'bottom', 
    distance: '30px' 
  });
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-botnexa-50 dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg mb-4 dark:text-white">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your needs and scale as you grow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Basic</h3>
                  <div className="text-3xl font-bold mb-2 dark:text-white">$9<span className="text-lg font-normal text-muted-foreground">
                    /mo</span></div>
                  <p className="text-muted-foreground">For personal use</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>1 WhatsApp connection</PricingFeature>
                  <PricingFeature>Basic AI capabilities</PricingFeature>
                  <PricingFeature>500 messages per month</PricingFeature>
                  <PricingFeature>Email support</PricingFeature>
                </ul>
                
                <Button asChild className="w-full" variant="outline">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
              
              {/* Pro Plan - Highlighted */}
              <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-botnexa-200 dark:border-botnexa-700 p-6 transform scale-105 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-botnexa-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional</h3>
                  <div className="text-3xl font-bold mb-2 dark:text-white">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-muted-foreground">For growing businesses</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>3 WhatsApp connections</PricingFeature>
                  <PricingFeature>Advanced AI capabilities</PricingFeature>
                  <PricingFeature>RAG feature included</PricingFeature>
                  <PricingFeature>2,000 messages per month</PricingFeature>
                  <PricingFeature>Priority support</PricingFeature>
                </ul>
                
                <Button asChild className="w-full bg-botnexa-500 hover:bg-botnexa-600">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Enterprise</h3>
                  <div className="text-3xl font-bold mb-2 dark:text-white">$99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-muted-foreground">For large organizations</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingFeature>10 WhatsApp connections</PricingFeature>
                  <PricingFeature>Advanced AI capabilities</PricingFeature>
                  <PricingFeature>RAG + Custom knowledge base</PricingFeature>
                  <PricingFeature>Unlimited messages</PricingFeature>
                  <PricingFeature>24/7 dedicated support</PricingFeature>
                  <PricingFeature>Custom integrations</PricingFeature>
                </ul>
                
                <Button asChild className="w-full" variant="outline">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-card cta-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-6 dark:text-white">Ready to Transform Your WhatsApp Experience?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who are already using BotNexa to manage their WhatsApp bots with ease.
              </p>
              <Button asChild size="lg" className="bg-botnexa-500 hover:bg-botnexa-600 px-8 h-12">
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 md:py-12 bg-botnexa-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="font-bold text-xl mb-4">BotNexa</div>
                <p className="text-white/70 text-sm">
                  The ultimate WhatsApp bot management platform. Connect, automate, and enhance your messaging experience.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <FooterLink>Features</FooterLink>
                  <FooterLink>Pricing</FooterLink>
                  <FooterLink>Documentation</FooterLink>
                  <FooterLink>API</FooterLink>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <FooterLink>About</FooterLink>
                  <FooterLink>Blog</FooterLink>
                  <FooterLink>Careers</FooterLink>
                  <FooterLink>Contact</FooterLink>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <FooterLink>Terms</FooterLink>
                  <FooterLink>Privacy</FooterLink>
                  <FooterLink>Cookies</FooterLink>
                  <FooterLink>Licenses</FooterLink>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/70 text-sm">
              © {new Date().getFullYear()} BotNexa. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

const PricingFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <Check className="h-5 w-5 text-botnexa-500 flex-shrink-0 mt-0.5" />
    <span className="dark:text-white">{children}</span>
  </li>
);

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <a href="#" className="text-white/70 hover:text-white transition-colors">
      {children}
    </a>
  </li>
);

export default Index;

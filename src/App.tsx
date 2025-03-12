
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AISettings from "./pages/AISettings";
import Conversations from "./pages/Conversations";
import Reminders from "./pages/Reminders";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="botnexa-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Index /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
            <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
            <Route path="/ai-settings" element={<Suspense fallback={<div>Loading...</div>}><AISettings /></Suspense>} />
            <Route path="/conversations" element={<Suspense fallback={<div>Loading...</div>}><Conversations /></Suspense>} />
            <Route path="/reminders" element={<Suspense fallback={<div>Loading...</div>}><Reminders /></Suspense>} />
            <Route path="/analytics" element={<Suspense fallback={<div>Loading...</div>}><Analytics /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>} />
            <Route path="/contacts" element={<Suspense fallback={<div>Loading...</div>}><Contacts /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

};

export default App;

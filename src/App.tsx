
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import Settings from "./pages/Settings";
import Contacts from "./pages/Contacts";
import Analytics from "./pages/Analytics";
import Reminders from "./pages/Reminders";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LogActivity from "./pages/LogActivity";
import BotManagement from "./pages/BotManagement";
import BotSettings from "./pages/BotSettings";
import AuthMiddleware from "./components/AuthMiddleware";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { useEffect } from "react";
import { WhatsAppService } from "./services/whatsapp.service";

import "./App.css";

function App() {
  useEffect(() => {
    // Initialize WhatsApp Service
    WhatsAppService.initialize();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="botnexa-theme">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={
            <AuthMiddleware requireAuth={false}>
              <Login />
            </AuthMiddleware>
          } />
          <Route path="/register" element={
            <AuthMiddleware requireAuth={false}>
              <Register />
            </AuthMiddleware>
          } />
          <Route path="/forgot-password" element={
            <AuthMiddleware requireAuth={false}>
              <ForgotPassword />
            </AuthMiddleware>
          } />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/features" element={<Features />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthMiddleware requireAuth={true}>
              <Dashboard />
            </AuthMiddleware>
          } />
          <Route path="/conversations" element={
            <AuthMiddleware requireAuth={true}>
              <Conversations />
            </AuthMiddleware>
          } />
          <Route path="/contacts" element={
            <AuthMiddleware requireAuth={true}>
              <Contacts />
            </AuthMiddleware>
          } />
          <Route path="/analytics" element={
            <AuthMiddleware requireAuth={true}>
              <Analytics />
            </AuthMiddleware>
          } />
          <Route path="/reminders" element={
            <AuthMiddleware requireAuth={true}>
              <Reminders />
            </AuthMiddleware>
          } />
          <Route path="/settings" element={
            <AuthMiddleware requireAuth={true}>
              <Settings />
            </AuthMiddleware>
          } />
          <Route path="/log-activity" element={
            <AuthMiddleware requireAuth={true}>
              <LogActivity />
            </AuthMiddleware>
          } />
          <Route path="/bot-management" element={
            <AuthMiddleware requireAuth={true}>
              <BotManagement />
            </AuthMiddleware>
          } />
          <Route path="/bot-settings/:botId" element={
            <AuthMiddleware requireAuth={true}>
              <BotSettings />
            </AuthMiddleware>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Toasters */}
        <Toaster />
        <Sonner position="top-right" closeButton />
      </Router>
    </ThemeProvider>
  );
}

export default App;

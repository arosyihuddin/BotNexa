
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/lib/animations";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-botnexa-50/50 to-background dark:from-botnexa-900/10 dark:to-background">
        <header className="py-4 px-6">
          <Link to="/register" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to register
          </Link>
        </header>
        
        <main className="pb-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-8 mt-4">
              <h1 className="text-3xl font-bold mt-4 text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                BotNexa ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our BotNexa service ("Service").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
              </p>
              <p>
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will notify you of any changes by updating the "Last Updated" date at the top of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We may collect information about you in various ways when you use our Service. The information we may collect includes:
              </p>
              
              <h3>2.1 Personal Data</h3>
              <p>
                Personal Data is information that can be used to identify you individually, such as:
              </p>
              <ul>
                <li>Contact information (e.g., email address, phone number)</li>
                <li>Account credentials (e.g., username and password)</li>
                <li>Billing information (e.g., credit card number, billing address)</li>
                <li>Profile information (e.g., name, profile picture)</li>
                <li>User-generated content (e.g., messages, configurations)</li>
              </ul>
              
              <h3>2.2 Usage Data</h3>
              <p>
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include:
              </p>
              <ul>
                <li>Your computer's Internet Protocol address (e.g., IP address)</li>
                <li>Browser type and version</li>
                <li>The pages of our Service that you visit</li>
                <li>The time and date of your visit</li>
                <li>The time spent on those pages</li>
                <li>Unique device identifiers</li>
                <li>Other diagnostic data</li>
              </ul>
              
              <h3>2.3 Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our Service</li>
                <li>Notify you about changes to our Service</li>
                <li>Allow you to participate in interactive features of our Service</li>
                <li>Provide customer support</li>
                <li>Monitor the usage of our Service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Provide you with news, special offers, and general information about other goods, services, and events which we offer</li>
                <li>Process your transactions</li>
                <li>Manage your account</li>
                <li>Fulfill any other purpose for which you provide the information</li>
              </ul>
              
              <h2>4. Disclosure of Your Information</h2>
              <p>
                We may disclose your information in the following situations:
              </p>
              
              <h3>4.1 Business Transactions</h3>
              <p>
                If we are involved in a merger, acquisition, or asset sale, your information may be transferred. We will provide notice before your information is transferred and becomes subject to a different Privacy Policy.
              </p>
              
              <h3>4.2 Legal Requirements</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
              </p>
              
              <h3>4.3 Business Partners</h3>
              <p>
                We may share your information with our business partners to offer you certain products, services, or promotions.
              </p>
              
              <h3>4.4 With Your Consent</h3>
              <p>
                We may disclose your personal information for any other purpose with your consent.
              </p>
              
              <h2>5. Security of Your Information</h2>
              <p>
                The security of your information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
              
              <h2>6. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li>The right to access, update, or delete your information</li>
                <li>The right to rectification (to correct inaccurate data)</li>
                <li>The right to object to processing of your information</li>
                <li>The right to restriction (to limit how we use your data)</li>
                <li>The right to data portability (to receive a copy of your data)</li>
                <li>The right to withdraw consent</li>
              </ul>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: privacy@botnexa.com</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/lib/animations";

const TermsOfService = () => {
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
              <h1 className="text-3xl font-bold mt-4 text-foreground">Terms of Service</h1>
              <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to BotNexa ("Company", "we", "our", "us")! As you have just clicked our Terms of Service, please pause, grab a cup of coffee and carefully read the following pages. It will take you approximately 20 minutes.
              </p>
              <p>
                These Terms of Service ("Terms", "Terms of Service") govern your use of our web application BotNexa (collectively or individually "Service") operated by BotNexa.
              </p>
              <p>
                Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here: <Link to="/privacy-policy" className="text-botnexa-600 dark:text-botnexa-400 hover:underline">Privacy Policy</Link>.
              </p>
              <p>
                Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound by them.
              </p>
              <p>
                If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at support@botnexa.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.
              </p>
              
              <h2>2. Communications</h2>
              <p>
                By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
              </p>
              
              <h2>3. Subscriptions</h2>
              <p>
                Some parts of Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
              </p>
              <p>
                At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or BotNexa cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting BotNexa customer support team.
              </p>
              <p>
                A valid payment method, including credit card, is required to process the payment for your Subscription. You shall provide BotNexa with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize BotNexa to charge all Subscription fees incurred through your account to any such payment instruments.
              </p>
              <p>
                Should automatic billing fail to occur for any reason, BotNexa will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
              </p>
              
              <h2>4. Free Trial</h2>
              <p>
                BotNexa may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
              </p>
              <p>
                You may be required to enter your billing information in order to sign up for Free Trial.
              </p>
              <p>
                If you do enter your billing information when signing up for Free Trial, you will not be charged by BotNexa until Free Trial has expired. On the last day of Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.
              </p>
              <p>
                At any time and without notice, BotNexa reserves the right to (i) modify Terms of Service of Free Trial offer, or (ii) cancel such Free Trial offer.
              </p>
              
              <h2>5. Fee Changes</h2>
              <p>
                BotNexa, in its sole discretion and at any time, may modify Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.
              </p>
              <p>
                BotNexa will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.
              </p>
              <p>
                Your continued use of Service after Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.
              </p>
              
              <h2>6. Refunds</h2>
              <p>
                Except when required by law, paid Subscription fees are non-refundable.
              </p>
              
              <h2>7. Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content on or through Service, You represent and warrant that: (i) Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.
              </p>
              <p>
                You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through Service. However, by posting Content using Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through Service. You agree that this license includes the right for us to make your Content available to other users of Service, who may also use your Content subject to these Terms.
              </p>
              <p>
                BotNexa has the right but not the obligation to monitor and edit all Content provided by users.
              </p>
              <p>
                In addition, Content found on or through this Service are the property of BotNexa or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.
              </p>
              
              <h2>8. Prohibited Uses</h2>
              <p>
                You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:
              </p>
              <ul>
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</li>
              </ul>
              
              <p>Additionally, you agree not to:</p>
              <ul>
                <li>Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party's use of Service, including their ability to engage in real time activities through Service.</li>
                <li>Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</li>
                <li>Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</li>
                <li>Use any device, software, or routine that interferes with the proper working of Service.</li>
                <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</li>
                <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</li>
                <li>Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</li>
                <li>Take any action that may damage or falsify Company rating.</li>
                <li>Otherwise attempt to interfere with the proper working of Service.</li>
              </ul>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                In no event shall BotNexa, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
              </p>
              
              <h2>10. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul>
                <li>By email: terms@botnexa.com</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;

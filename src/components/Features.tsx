
import { CheckCircle2, MessageCircle, BrainCircuit, Calendar } from "lucide-react";

const Features = () => {
  return <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Powerful Features for WhatsApp Bot Management
          </h2>
          <p className="text-lg text-muted-foreground">
            BotNexa provides all the tools you need to create, manage, and optimize your WhatsApp bot experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-12">
              <FeatureItem icon={<MessageCircle className="h-6 w-6 text-botnexa-500" />} title="AI-Powered Conversations" description="Our bots leverage advanced AI to understand user queries and respond with relevant information, creating natural conversations that feel human." />
              <FeatureItem icon={<BrainCircuit className="h-6 w-6 text-botnexa-500" />} title="Retrieval-Augmented Generation" description="Using RAG technology, our bots can search for information and generate responses that are more accurate and contextually relevant." />
              <FeatureItem icon={<Calendar className="h-6 w-6 text-botnexa-500" />} title="Smart Reminders" description="Set up automated reminders for important events, meetings, or tasks. Never miss a deadline with our intelligent reminder system." />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="glass-card rounded-xl overflow-hidden shadow-lg relative z-10 transform md:rotate-y-2 backface-hidden animate-float">
                <img src="/feature.png" alt="BotNexa Features" className="w-full h-auto" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-8 w-16 h-16 bg-botnexa-100 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-botnexa-200/50 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] h-[20px] bg-black/10 blur-xl rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Additional features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-botnexa-50 to-white dark:from-botnexa-900/30 dark:to-botnexa-900/10 dark:bg-card p-6 rounded-xl border border-botnexa-100 dark:border-botnexa-800">
            <h3 className="font-semibold text-xl mb-4 text-foreground">Easy Integration</h3>
            <ul className="space-y-3">
              <FeatureListItem>Simple QR code scanning</FeatureListItem>
              <FeatureListItem>Quick pairing with code</FeatureListItem>
              <FeatureListItem>Seamless connection process</FeatureListItem>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-botnexa-50 to-white dark:from-botnexa-900/30 dark:to-botnexa-900/10 dark:bg-card p-6 rounded-xl border border-botnexa-100 dark:border-botnexa-800">
            <h3 className="font-semibold text-xl mb-4 text-foreground">Intuitive Dashboard</h3>
            <ul className="space-y-3">
              <FeatureListItem>Clean, modern interface</FeatureListItem>
              <FeatureListItem>Real-time chat monitoring</FeatureListItem>
              <FeatureListItem>Easy bot configuration</FeatureListItem>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-botnexa-50 to-white dark:from-botnexa-900/30 dark:to-botnexa-900/10 dark:bg-card p-6 rounded-xl border border-botnexa-100 dark:border-botnexa-800">
            <h3 className="font-semibold text-xl mb-4 text-foreground">Advanced Analytics</h3>
            <ul className="space-y-3">
              <FeatureListItem>Conversation metrics</FeatureListItem>
              <FeatureListItem>User engagement tracking</FeatureListItem>
              <FeatureListItem>Performance optimization</FeatureListItem>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({
  icon,
  title,
  description
}: FeatureItemProps) => <div className="flex gap-5">
    <div className="flex-shrink-0 mt-1">
      <div className="w-12 h-12 rounded-full bg-botnexa-50 dark:bg-botnexa-900/40 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>;

const FeatureListItem = ({
  children
}: {
  children: React.ReactNode;
}) => <li className="flex items-start gap-2">
    <CheckCircle2 className="h-5 w-5 text-botnexa-500 flex-shrink-0 mt-0.5" />
    <span className="text-foreground">{children}</span>
  </li>;

export default Features;

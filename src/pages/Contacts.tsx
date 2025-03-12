import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User, Users, Search, MessageSquare, Phone, Mail, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Contact = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  members?: number;
  type: 'contact' | 'group';
  status?: 'online' | 'offline' | 'away';
  lastSeen?: string;
};

const Contacts = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const contacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', type: 'contact', status: 'online' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 345 678 901', type: 'contact', status: 'offline', lastSeen: '2 hours ago' },
    { id: 3, name: 'Marketing Team', members: 12, type: 'group' },
    { id: 4, name: 'Support Team', members: 8, type: 'group' },
    { id: 5, name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 456 789 012', type: 'contact', status: 'away' },
    { id: 6, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 567 890 123', type: 'contact', status: 'offline', lastSeen: 'yesterday' },
    { id: 7, name: 'Development Team', members: 15, type: 'group' },
    { id: 8, name: 'Design Team', members: 6, type: 'group' },
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredContacts = (tabValue: string) => {
    if (tabValue === 'all') return filteredContacts;
    return filteredContacts.filter(c => c.type === (tabValue === 'contacts' ? 'contact' : 'group'));
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactDetailsOpen(true);
  };

  const handleStartConversation = (contactId: number) => {
    navigate(`/conversations?contact=${contactId}`);
  };

  return (
    <DashboardLayout title="Contacts">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="contacts" className="flex-1">Contacts</TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getFilteredContacts(selectedTab).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No contacts found
                </div>
              ) : (
                getFilteredContacts(selectedTab).map(contact => (
                  <div 
                    key={contact.id} 
                    className="p-4 rounded-lg border hover:bg-accent/50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-botnexa-100 dark:bg-botnexa-950/30 flex items-center justify-center">
                        {contact.type === 'contact' ? (
                          <User className="h-5 w-5 text-botnexa-600 dark:text-botnexa-400" />
                        ) : (
                          <Users className="h-5 w-5 text-botnexa-600 dark:text-botnexa-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.type === 'contact' ? contact.phone : `${contact.members} members`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => handleViewContact(contact)}
                    >
                      View
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={isContactDetailsOpen} onOpenChange={setIsContactDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              {selectedContact?.type === 'contact' ? 'View contact information' : 'View group information'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarFallback className="text-lg bg-botnexa-100 dark:bg-botnexa-950/30 text-botnexa-600 dark:text-botnexa-400">
                    {selectedContact.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                
                {selectedContact.type === 'contact' && selectedContact.status && (
                  <div className="mt-1">
                    <Badge variant="outline" className={
                      selectedContact.status === 'online' 
                        ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900' 
                        : selectedContact.status === 'away'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                          : 'bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400 border-gray-200 dark:border-gray-900'
                    }>
                      {selectedContact.status === 'online' ? 'Online' : 
                       selectedContact.status === 'away' ? 'Away' : 
                       `Offline ${selectedContact.lastSeen ? '· ' + selectedContact.lastSeen : ''}`}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                {selectedContact.type === 'contact' ? (
                  <>
                    {selectedContact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedContact.phone}</span>
                      </div>
                    )}
                    {selectedContact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedContact.email}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedContact.members} members</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  className="bg-botnexa-500 hover:bg-botnexa-600"
                  onClick={() => {
                    if (selectedContact) {
                      handleStartConversation(selectedContact.id);
                    }
                    setIsContactDetailsOpen(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Conversation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Contacts;

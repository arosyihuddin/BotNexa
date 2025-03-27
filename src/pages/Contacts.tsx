
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User, Users, Search, MessageSquare, Phone, Mail, Plus } from 'lucide-react';
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
import { dummyContacts } from '@/lib/dummy-data';
import { Contact } from '@/types/app-types';

const Contacts = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const contacts = dummyContacts;

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredContacts = (tabValue: string) => {
    if (tabValue === 'all') return filteredContacts;
    // For demonstration purposes, let's assume contacts with 'customer' tag are individuals
    // and contacts with 'lead' tag are groups
    if (tabValue === 'contacts') return filteredContacts.filter(c => c.tags.includes('customer'));
    return filteredContacts.filter(c => c.tags.includes('lead'));
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactDetailsOpen(true);
  };

  const handleStartConversation = (contactId: string) => {
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
            <div className="flex justify-between items-center">
              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="contacts" className="flex-1">Customers</TabsTrigger>
                  <TabsTrigger value="groups" className="flex-1">Leads</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button size="sm" className="bg-botnexa-500 hover:bg-botnexa-600 ml-2">
                <Plus className="h-4 w-4 mr-2" />
                New Contact
              </Button>
            </div>
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
                        <User className="h-5 w-5 text-botnexa-600 dark:text-botnexa-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.phoneNumber}
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
              View contact information
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
                
                <div className="mt-1 flex flex-wrap gap-1 justify-center">
                  {selectedContact.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedContact.phoneNumber}</span>
                </div>
                {selectedContact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedContact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-botnexa-50 text-botnexa-700 dark:bg-botnexa-950/30 dark:text-botnexa-400 border-botnexa-200 dark:border-botnexa-900">
                    Last contact: {new Date(selectedContact.lastInteraction).toLocaleDateString()}
                  </Badge>
                </div>
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

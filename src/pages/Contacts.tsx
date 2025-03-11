import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout'; // Corrected import path
import { Button } from '../components/ui/button'; // Corrected import path
import { Input } from '../components/ui/input'; // Changed to named import
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'; // Importing Tabs components
import { User, Users } from 'lucide-react'; // Importing icons

const Contact = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const contacts = [
    { id: 1, name: 'John Doe', type: 'contact' },
    { id: 2, name: 'Jane Smith', type: 'contact' },
    { id: 3, name: 'Group A', type: 'group' },
    { id: 4, name: 'Group B', type: 'group' },
  ];

  return (
    <DashboardLayout title="Contacts">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ContactList contacts={contacts} />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactList contacts={contacts.filter(c => c.type === 'contact')} />
          </TabsContent>
          <TabsContent value="groups">
            <ContactList contacts={contacts.filter(c => c.type === 'group')} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const ContactList = ({ contacts }) => {
  return (
    <div className="space-y-2">
      {contacts.map(contact => (
        <div key={contact.id} className="p-2 border-b flex items-center">
          {contact.type === 'contact' ? (
            <User className="mr-2" />
          ) : (
            <Users className="mr-2" />
          )}
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default Contact;

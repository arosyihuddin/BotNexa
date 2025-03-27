
import { ApiService } from "./api.service";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  profilePicture?: string;
  lastInteraction?: string;
  tags?: string[];
  notes?: string;
  status: "active" | "archived" | "blocked";
}

export class ContactsService extends ApiService {
  /**
   * Get all contacts for the current user
   */
  static async getContacts(): Promise<Contact[]> {
    return this.apiRequest<Contact[]>('/contacts');
  }
  
  /**
   * Get a specific contact by ID
   */
  static async getContact(contactId: string): Promise<Contact> {
    return this.apiRequest<Contact>(`/contacts/${contactId}`);
  }
  
  /**
   * Create a new contact
   */
  static async createContact(contactData: Omit<Contact, 'id'>): Promise<Contact> {
    return this.apiRequest<Contact>('/contacts', 'POST', contactData);
  }
  
  /**
   * Update an existing contact
   */
  static async updateContact(contactId: string, contactData: Partial<Contact>): Promise<Contact> {
    return this.apiRequest<Contact>(`/contacts/${contactId}`, 'PUT', contactData);
  }
  
  /**
   * Delete a contact
   */
  static async deleteContact(contactId: string): Promise<void> {
    return this.apiRequest<void>(`/contacts/${contactId}`, 'DELETE');
  }
  
  /**
   * Import contacts from CSV file
   */
  static async importContacts(file: File, onProgress?: (progress: number) => void): Promise<{ imported: number; errors: number }> {
    return this.uploadFile('/contacts/import', file, onProgress);
  }
  
  /**
   * Export contacts to CSV
   */
  static async exportContacts(): Promise<string> {
    const response = await this.apiRequest<{ downloadUrl: string }>('/contacts/export');
    return response.downloadUrl;
  }
}

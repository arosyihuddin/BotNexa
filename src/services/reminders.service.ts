
import { ApiService } from "./api.service";

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed" | "cancelled";
  isRecurring: boolean;
  recurringPattern?: string;
  contactId?: string;
}

export class RemindersService extends ApiService {
  /**
   * Get all reminders for the current user
   */
  static async getReminders(): Promise<Reminder[]> {
    return this.apiRequest<Reminder[]>('/reminders');
  }
  
  /**
   * Get a specific reminder by ID
   */
  static async getReminder(reminderId: string): Promise<Reminder> {
    return this.apiRequest<Reminder>(`/reminders/${reminderId}`);
  }
  
  /**
   * Create a new reminder
   */
  static async createReminder(reminderData: Omit<Reminder, 'id'>): Promise<Reminder> {
    return this.apiRequest<Reminder>('/reminders', 'POST', reminderData);
  }
  
  /**
   * Update an existing reminder
   */
  static async updateReminder(reminderId: string, reminderData: Partial<Reminder>): Promise<Reminder> {
    return this.apiRequest<Reminder>(`/reminders/${reminderId}`, 'PUT', reminderData);
  }
  
  /**
   * Change reminder status
   */
  static async updateReminderStatus(
    reminderId: string, 
    status: "pending" | "completed" | "cancelled"
  ): Promise<Reminder> {
    return this.apiRequest<Reminder>(
      `/reminders/${reminderId}/status`, 
      'PUT', 
      { status }
    );
  }
  
  /**
   * Delete a reminder
   */
  static async deleteReminder(reminderId: string): Promise<void> {
    return this.apiRequest<void>(`/reminders/${reminderId}`, 'DELETE');
  }
  
  /**
   * Get upcoming reminders
   */
  static async getUpcomingReminders(): Promise<Reminder[]> {
    return this.apiRequest<Reminder[]>('/reminders/upcoming');
  }
  
  /**
   * Get today's reminders
   */
  static async getTodayReminders(): Promise<Reminder[]> {
    return this.apiRequest<Reminder[]>('/reminders/today');
  }
}

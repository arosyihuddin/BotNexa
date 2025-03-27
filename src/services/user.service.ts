
import { ApiService } from "./api.service";
import { supabase, saveUserToSupabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone_number?: string;
  created_at: string;
  subscription_tier: 'free' | 'premium' | 'business';
}

export interface UserSettings {
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserBot {
  id: string;
  name: string;
  status: 'online' | 'offline';
  isConnected: boolean;
  lastConnection?: string;
  type: string;
  phone_number?: string;
}

export class UserService extends ApiService {
  /**
   * Get current user profile from API
   */
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return null;
    
    try {
      // Get user profile from API
      return await this.getUserById(user.id);
    } catch (error) {
      console.error("Error fetching user profile from API", error);
      throw error;
    }
  }
  
  /**
   * Update user profile in both Supabase and API backend
   */
  static async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return null;
    
    // Update relevant fields in Supabase auth if applicable
    if (profileData.full_name || profileData.avatar_url) {
      await supabase.auth.updateUser({ 
        data: { 
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url 
        } 
      });
    }
    
    // Update email if provided and different
    if (profileData.email && profileData.email !== user.email) {
      await supabase.auth.updateUser({ email: profileData.email });
    }
    
    // Update API backend
    return this.apiRequest<UserProfile>('/user/profile', 'PUT', profileData);
  }
  
  /**
   * Get user settings
   */
  static async getUserSettings(): Promise<UserSettings> {
    return this.apiRequest<UserSettings>('/user/settings');
  }
  
  /**
   * Update user settings
   */
  static async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    return this.apiRequest<UserSettings>('/user/settings', 'PUT', settings);
  }
  
  /**
   * Upload profile picture
   */
  static async uploadProfilePicture(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ avatarUrl: string }> {
    return this.uploadFile('/user/profile-picture', file, onProgress);
  }
  
  /**
   * Update subscription tier
   */
  static async updateSubscriptionTier(
    tier: 'free' | 'premium' | 'business'
  ): Promise<UserProfile | null> {
    return this.apiRequest<UserProfile | null>(
      '/user/subscription',
      'PUT',
      { tier }
    );
  }

  /**
   * Get user bots
   */
  static async getUserBots(): Promise<UserBot[]> {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return [];
    
    return this.apiRequest<UserBot[]>(`/users/${user.id}/bots`);
  }

  /**
   * Get user bots by user ID
   */
  static async getUserBotsById(userId: string): Promise<UserBot[]> {
    return this.apiRequest<UserBot[]>(`/users/${userId}/bots`);
  }

  /**
   * Toggle bot status (on/off)
   */
  static async toggleBotStatus(botId: string, isActive: boolean): Promise<UserBot> {
    return this.apiRequest<UserBot>(
      `/bots/${botId}/status`,
      'PUT',
      { status: isActive ? 'online' : 'offline' }
    );
  }
  
  /**
   * Create a new bot
   */
  static async createBot(botData: { name: string, phone_number: string }): Promise<UserBot> {
    return this.apiRequest<UserBot>('/bots/create', 'POST', botData);
  }
  
  /**
   * Delete a bot
   */
  static async deleteBot(botId: string): Promise<void> {
    return this.apiRequest<void>(`/bots/${botId}`, 'DELETE');
  }
  
  /**
   * Handle user registration with Supabase
   */
  static async registerUser(userData: { 
    email: string; 
    password: string; 
    fullName: string;
  }): Promise<any> {
    try {
      // Register with API first
      const apiResponse = await this.register(userData);
      
      // Create user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
          }
        }
      });
      
      if (authError) throw authError;
      
      // Save user data to Supabase profile table
      if (authData.user) {
        await saveUserToSupabase({
          id: authData.user.id,
          email: authData.user.email || '',
          full_name: userData.fullName,
        });
      }
      
      return authData.user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
  
  /**
   * Handle user login with Supabase
   */
  static async loginUser(email: string, password: string): Promise<any> {
    try {
      // Login with API
      const apiResponse = await this.login(email, password);
      
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) throw authError;
      
      // Update or create Supabase profile record
      if (authData.user) {
        await saveUserToSupabase({
          id: authData.user.id,
          email: authData.user.email || '',
        });
      }
      
      return authData.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
}

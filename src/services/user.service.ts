
import { BotInfo } from "@/types/app-types";
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

  static async getUserBots(): Promise<BotInfo[]> {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return [];

    const response = await this.apiRequest<BotInfo[]>(`/users/${user.id}/bots`)
    return response;
  }

  /**
   * Toggle bot status (on/off)
   */
  static async toggleBotStatus(botId: number, isActive: boolean): Promise<BotInfo> {
    return this.apiRequest<BotInfo>(
      `/bots/${botId}/status`,
      'PUT',
      { status: isActive ? 'online' : 'offline' }
    );
  }

  /**
   * Create a new bot
   */
  static async createBot(botData: { name: string, number: string, description: string }): Promise<BotInfo> {
    return this.apiRequest<BotInfo>('/bots', 'POST', botData);
  }

  /**
   * Update a bot
   */
  static async updateBot(botId: number, botData: { name: string, number: string, description: string }): Promise<BotInfo> {
    return this.apiRequest<BotInfo>(`/bots/${botId}`, 'PUT', botData);
  }

  /**
   * Delete a bot
   */
  static async deleteBot(botId: number): Promise<void> {
    return this.apiRequest<void>(`/bots/${botId}`, 'DELETE');
  }

}

import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

// Initialize Supabase client with provided credentials
const supabaseUrl = 'https://ywskcjllsdbnapecmfkg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3c2tjamxsc2RibmFwZWNtZmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwODQ1NzgsImV4cCI6MjA1NDY2MDU3OH0.sHTtQy6eHbxNi3REi7B8AnfEoDAuoH1d0kMiXZpPLt0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User profile type
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  created_at: string;
  whatsapp_connected: boolean;
  subscription_tier?: 'free' | 'premium' | 'business';
}

// Get the current user from Supabase
export const getCurrentUser = async (): Promise<SupabaseUser | null> => {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
};

// Get user profile from Supabase
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

// Save user profile to Supabase
export const saveUserToSupabase = async (userData: {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
}): Promise<UserProfile | null> => {
  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userData.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user from Supabase:', fetchError);
    return null;
  }

  // If user doesn't exist, create them
  if (!existingUser) {
    const newUser = {
      ...userData,
      whatsapp_connected: false,
      subscription_tier: 'free' as const,
    };

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error('Error saving user to Supabase:', error);
      return null;
    }

    return data;
  }

  // Otherwise, update existing user data
  const { data, error } = await supabase
    .from('users')
    .update({
      email: userData.email || existingUser.email,
      full_name: userData.full_name || existingUser.full_name,
      avatar_url: userData.avatar_url || existingUser.avatar_url,
      phone_number: userData.phone_number || existingUser.phone_number,
    })
    .eq('id', userData.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user in Supabase:', error);
    return existingUser;
  }

  return data;
};

// Update WhatsApp connection status
export const updateWhatsAppConnectionStatus = async (userId: string, connected: boolean): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update({ whatsapp_connected: connected })
    .eq('id', userId);

  if (error) {
    console.error('Error updating WhatsApp connection status:', error);
  }
};


import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

// Base API URL - should be stored in environment variables in production
const API_BASE_URL = 'http://localhost:3000/api/v1';

/**
 * Base API Service with common methods and error handling
 */
export class ApiService {
  /**
   * Make an authenticated API request
   */
  protected static async apiRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: Record<string, unknown>,
    requiresAuth: boolean = true
  ): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Add authentication token if required
      if (requiresAuth) {
        // Get current user's token for authentication
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        
        if (!token) {
          throw new Error('Authentication required');
        }
        
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
      };
      
      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `API request failed with status: ${response.status}`
        );
      }
      
      if (response.status === 204) {
        return {} as T; // No content response
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown API error';
      
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  }
  
  /**
   * Handle file uploads with progress tracking
   */
  protected static async uploadFile(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<any> {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const formData = new FormData();
      formData.append('file', file);
      
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', `${API_BASE_URL}${endpoint}`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        
        if (onProgress) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              onProgress(progress);
            }
          };
        }
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => {
          reject(new Error('Upload failed'));
        };
        
        xhr.send(formData);
      });
    } catch (error) {
      console.error('File upload failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
      
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  }

  /**
   * Login API endpoint
   */
  static async login(email: string, password: string): Promise<any> {
    return this.apiRequest('/login', 'POST', { email, password }, false);
  }

  /**
   * Register API endpoint
   */
  static async register(userData: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<any> {
    return this.apiRequest('/register', 'POST', userData, false);
  }

  /**
   * Get all users
   */
  static async getUsers(): Promise<any[]> {
    return this.apiRequest('/users');
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<any> {
    return this.apiRequest(`/users/${userId}`);
  }

  /**
   * Get user bots
   */
  static async getUserBots(userId: string): Promise<any[]> {
    return this.apiRequest(`/users/${userId}/bots`);
  }
}

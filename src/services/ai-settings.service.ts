
import { ApiService } from "./api.service";

export interface AIModel {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface AIPersonality {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  prompt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  contentType: "file" | "text" | "webpage";
  content?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  status: "processing" | "active" | "error";
}

export class AISettingsService extends ApiService {
  /**
   * Get available AI models
   */
  static async getAIModels(): Promise<AIModel[]> {
    return this.apiRequest<AIModel[]>('/ai/models');
  }
  
  /**
   * Set default AI model
   */
  static async setDefaultAIModel(modelId: string): Promise<void> {
    return this.apiRequest<void>('/ai/models/default', 'PUT', { modelId });
  }
  
  /**
   * Get AI personalities
   */
  static async getAIPersonalities(): Promise<AIPersonality[]> {
    return this.apiRequest<AIPersonality[]>('/ai/personalities');
  }
  
  /**
   * Create a new AI personality
   */
  static async createAIPersonality(personalityData: Omit<AIPersonality, 'id'>): Promise<AIPersonality> {
    return this.apiRequest<AIPersonality>('/ai/personalities', 'POST', personalityData);
  }
  
  /**
   * Update an AI personality
   */
  static async updateAIPersonality(personalityId: string, data: Partial<AIPersonality>): Promise<AIPersonality> {
    return this.apiRequest<AIPersonality>(`/ai/personalities/${personalityId}`, 'PUT', data);
  }
  
  /**
   * Delete an AI personality
   */
  static async deleteAIPersonality(personalityId: string): Promise<void> {
    return this.apiRequest<void>(`/ai/personalities/${personalityId}`, 'DELETE');
  }
  
  /**
   * Get knowledge documents
   */
  static async getKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
    return this.apiRequest<KnowledgeDocument[]>('/ai/knowledge');
  }
  
  /**
   * Upload a file document
   */
  static async uploadDocument(
    file: File, 
    metadata: { title: string; description: string },
    onProgress?: (progress: number) => void
  ): Promise<KnowledgeDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    return this.uploadFile('/ai/knowledge/upload', file, onProgress);
  }
  
  /**
   * Create a text document
   */
  static async createTextDocument(documentData: {
    title: string;
    description: string;
    content: string;
  }): Promise<KnowledgeDocument> {
    return this.apiRequest<KnowledgeDocument>(
      '/ai/knowledge/text',
      'POST',
      documentData
    );
  }
  
  /**
   * Add a webpage to knowledge base
   */
  static async addWebpage(webpageData: {
    title: string;
    description: string;
    url: string;
  }): Promise<KnowledgeDocument> {
    return this.apiRequest<KnowledgeDocument>(
      '/ai/knowledge/webpage',
      'POST',
      webpageData
    );
  }
  
  /**
   * Delete a knowledge document
   */
  static async deleteDocument(documentId: string): Promise<void> {
    return this.apiRequest<void>(`/ai/knowledge/${documentId}`, 'DELETE');
  }
}

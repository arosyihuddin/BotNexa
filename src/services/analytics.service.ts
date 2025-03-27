
import { ApiService } from "./api.service";

export interface AnalyticsOverview {
  totalMessages: number;
  activeUsers: number;
  responseRate: number;
  avgResponseTime: number;
  messagesByDate: { date: string; count: number }[];
  usersByDate: { date: string; count: number }[];
  topIntents: { intent: string; count: number }[];
}

export interface MessageMetrics {
  total: number;
  automated: number;
  manual: number;
  dailyStats: {
    date: string;
    total: number;
    automated: number;
    manual: number;
  }[];
}

export interface UserMetrics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  returningUsers: number;
  userGrowth: { date: string; count: number }[];
}

export class AnalyticsService extends ApiService {
  /**
   * Get analytics overview
   */
  static async getAnalyticsOverview(
    timeRange: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<AnalyticsOverview> {
    return this.apiRequest<AnalyticsOverview>(`/analytics/overview?timeRange=${timeRange}`);
  }
  
  /**
   * Get message metrics
   */
  static async getMessageMetrics(
    timeRange: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<MessageMetrics> {
    return this.apiRequest<MessageMetrics>(`/analytics/messages?timeRange=${timeRange}`);
  }
  
  /**
   * Get user metrics
   */
  static async getUserMetrics(
    timeRange: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<UserMetrics> {
    return this.apiRequest<UserMetrics>(`/analytics/users?timeRange=${timeRange}`);
  }
  
  /**
   * Generate analytics report
   */
  static async generateReport(
    timeRange: 'day' | 'week' | 'month' | 'year' = 'month',
    format: 'pdf' | 'csv' = 'pdf'
  ): Promise<{ downloadUrl: string }> {
    return this.apiRequest<{ downloadUrl: string }>(
      '/analytics/report',
      'POST',
      { timeRange, format }
    );
  }
}

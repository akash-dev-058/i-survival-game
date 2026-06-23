import { query } from '../db';
import { AnalyticsEvent } from '../models/AnalyticsEvent';

export class AnalyticsRepository {
  /**
   * Persists a new analytics event.
   */
  async create(eventType: string, payload: Record<string, any>): Promise<AnalyticsEvent> {
    const result = await query<AnalyticsEvent>(
      `INSERT INTO analytics_events (event_type, payload) VALUES ($1, $2) RETURNING id, event_type, payload, created_at`,
      [eventType, payload]
    );
    return result.rows[0];
  }

  /**
   * Retrieves the most recent N events – useful for admin dashboards.
   */
  async getRecent(limit: number = 100): Promise<AnalyticsEvent[]> {
    const result = await query<AnalyticsEvent>(
      `SELECT id, event_type, payload, created_at FROM analytics_events ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    return result.rows;
  }
}

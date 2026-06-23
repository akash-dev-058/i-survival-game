import { AnalyticsRepository } from '../repositories/analyticsRepository';
import { analyticsEventSchema, AnalyticsEventInput } from '../utils/validation';
import { ValidationError } from 'zod';
import logger from '../middleware/logger';

export class AnalyticsService {
  private repo: AnalyticsRepository;

  constructor() {
    this.repo = new AnalyticsRepository();
  }

  /**
   * Validates and stores an analytics event.
   * Throws a `ValidationError` if input does not conform to the schema.
   */
  async recordEvent(raw: unknown): Promise<void> {
    const parsed = analyticsEventSchema.safeParse(raw);
    if (!parsed.success) {
      logger.warn('Analytics event validation failed', { errors: parsed.error.errors });
      throw parsed.error;
    }
    const { eventType, payload } = parsed.data as AnalyticsEventInput;
    try {
      await this.repo.create(eventType, payload);
    } catch (err) {
      logger.error('Failed to persist analytics event', { error: err, eventType, payload });
      throw err;
    }
  }
}

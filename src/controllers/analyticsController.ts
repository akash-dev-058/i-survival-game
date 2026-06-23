import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analyticsService';
import { ValidationError } from 'zod';

const analyticsService = new AnalyticsService();

/**
 * POST /api/analytics – records a gameplay analytics event.
 */
export async function postAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await analyticsService.recordEvent(req.body);
    res.status(201).json({ message: 'Event recorded' });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: { message: 'Invalid analytics payload', details: err.errors } });
    } else {
      next(err);
    }
  }
}

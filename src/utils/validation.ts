import { z } from 'zod';

/**
 * Schema for incoming analytics events.
 * `eventType` is a short string identifying the event (e.g., "player_move").
 * `payload` is an arbitrary JSON object – we keep it loosely typed but require it to be an object.
 */
export const analyticsEventSchema = z.object({
  eventType: z.string().min(1).max(100),
  payload: z.record(z.any()),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

export interface AnalyticsEvent {
  id: number;
  event_type: string;
  payload: Record<string, any>;
  created_at: Date;
}

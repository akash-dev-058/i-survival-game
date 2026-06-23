import { Router } from 'express';
import { postAnalytics } from '../controllers/analyticsController';
import { authenticate } from '../middleware/auth';
import { apiRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply authentication and rate limiting to the analytics endpoint
router.post('/api/analytics', authenticate, apiRateLimiter, postAnalytics);

export default router;

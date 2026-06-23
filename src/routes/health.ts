import { Router, Request, Response } from 'express';
import { isDatabaseAlive } from '../db';

const router = Router();

/**
 * GET /health – simple health check returning service status and DB connectivity.
 */
router.get('/health', async (_req: Request, res: Response) => {
  const dbAlive = await isDatabaseAlive();
  const status = dbAlive ? 'ok' : 'degraded';
  res.status(200).json({ status, database: dbAlive ? 'connected' : 'unreachable', timestamp: new Date().toISOString() });
});

export default router;

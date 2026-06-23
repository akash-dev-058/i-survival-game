import { Request, Response, NextFunction } from 'express';
import logger from './logger';

/**
 * Centralised error handling middleware.
 * It logs the error and returns a JSON response with an appropriate HTTP status.
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  const status = err.statusCode ?? err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  const details = err.details ?? undefined;

  logger.error('Error handling request', {
    status,
    message,
    details,
    stack: err.stack,
  });

  res.status(status).json({
    error: {
      message,
      ...(details && { details }),
    },
  });
}

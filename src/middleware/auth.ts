import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

/**
 * JWT authentication middleware.
 * Expects the token in the `Authorization: Bearer <token>` header.
 */
export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Missing or malformed Authorization header' } });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { sub: string; role: string };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }
}

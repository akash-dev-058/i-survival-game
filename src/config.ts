import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

interface Config {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  rateLimitWindowMs: number;
  rateLimitMax: number;
  enableDetailedLogging: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
  enableDetailedLogging: process.env.ENABLE_DETAILED_LOGGING === 'true',
};

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}
if (!config.jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export default config;

import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import healthRouter from './routes/health';
import analyticsRouter from './routes/analytics';

const app: Application = express();

// Global middlewares
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Routes
app.use(healthRouter);
app.use(analyticsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: { message: 'Resource not found' } });
});

// Central error handler
app.use(errorHandler);

export default app;

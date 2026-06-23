import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';
import config from '../config';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Morgan token to log request body when detailed logging is enabled
morgan.token('req-body', (req) => {
  if (config.enableDetailedLogging && req.body && Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }
  return '';
});

const stream: StreamOptions = {
  write: (message) => logger.info(message.trim()),
};

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :req-body',
  { stream }
);

export default logger;
export { requestLogger };

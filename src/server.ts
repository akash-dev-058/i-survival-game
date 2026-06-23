import http from 'http';
import app from './app';
import config from './config';
import logger from './middleware/logger';

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

// Graceful shutdown handling
function shutdown(signal: string) {
  logger.info(`Received ${signal}. Closing server...`);
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown', { error: err });
      process.exit(1);
    }
    logger.info('Server closed. Exiting process.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

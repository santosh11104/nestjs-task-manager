import pino from 'pino';
import pinoLoki from 'pino-loki';

export const logger = pino({
  transport: {
    target: 'pino-loki',
    options: {
      host: 'http://localhost:3100',
      labels: { service: 'nestjs-task-manager' },
    },
  },
});

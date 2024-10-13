import { createLogger, format, transports } from 'winston';
import path from 'path';

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.File({ 
      filename: path.join(__dirname, '../error.log'), 
      level: 'error' 
    }),
    new transports.File({ 
      filename: path.join(__dirname, '../combined.log')
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    })
  ]
});

export default logger;

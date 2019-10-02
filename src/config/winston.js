import fs from 'fs';
import winston from 'winston';
import { conn } from './mongoDB';
const expressWinston = require('express-winston');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;
require('winston-mongodb').MongoDB;
const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf((info) => {
  return `${info.timestamp} [${process.env.NODE_ENV}] ${info.level}: ${info.message}`;
});

const infoTransport = new winston.transports.File({
  filename: 'info.log',
  dirname: logDir,
  level: 'info',
});

const errorTransport = new winston.transports.File({
  filename: 'error.log',
  dirname: logDir,
  level: 'error',
});

const logger = createLogger({
  format: combine(
    label({ label: 'dev' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myFormat,
  ),
  transports: [infoTransport, errorTransport],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'exceptions.log',
    }),
  ],
});

const stream = {
  write: (messages) => {
    logger.info(messages);
  },
};

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const customLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'response.log',
      dirname: './src/logs',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'warn.log',
      dirname: './src/logs',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'err.log',
      dirname: './src/logs',
      level: 'error',
    }),
    new winston.transports.MongoDB({
      db: conn.client.s.url,
      level: 'info',
      capped: true,
      metaKey: 'meta',
    }),
  ],
  colorize: false,
  expressFormat: true,
  statusLevels: false,
  level: (req, res) => {
    let level;
    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'warn'; }
    if (res.statusCode >= 500) { level = 'error'; }
    return level;
  },
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      dirname: './src/logs',
      level: 'error',
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

export { logger, stream, customLogger, errorLogger };

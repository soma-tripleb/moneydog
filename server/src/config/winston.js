import fs from 'fs';
import winston from 'winston';
const expressWinston = require('express-winston');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;
import 'winston-mongodb';
import dotenv from 'dotenv';
dotenv.config();

const logDir = './server/logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

let MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.TEST_DB_URL}`;
} else {
  MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DEV_DB_URL}`;
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
      filename: './server/exceptions.log',
      dirname: logDir,
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
      dirname: logDir,
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'warn.log',
      dirname: logDir,
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'err.log',
      dirname: logDir,
      level: 'error',
    }),
    new winston.transports.MongoDB({
      db: MONGO_URI,
      level: 'info',
      capped: true,
      metaKey: 'meta',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
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
      dirname: logDir,
      level: 'error',
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

export { logger, stream, customLogger, errorLogger };

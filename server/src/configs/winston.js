import fs from 'fs';
import winston from 'winston';
import app from '../../app';
const expressWinston = require('express-winston');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;
const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf((info) => {
  // console.log(JSON.stringify(info));
  if (info instanceof Error) {
    return `error 일때 ${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
  }
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
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
    label({label: 'dev'}),
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

// log the whole request and response body
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const customLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'response.log',
      dirname: './src/logs',
      level: 'info',
    }),
    new winston.transports.Console(),
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
  ],
  colorize: false,
  expressFormat: true,
  statusLevels: false,
  level: (req, res) => {
    let level;
    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'error'; }
    if (res.statusCode >= 500) { level = 'error'; }
    return level;
  },
});

const errorLogger = expressWinston.errorLogger({
  // showstack: true,
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

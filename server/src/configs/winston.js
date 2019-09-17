import fs from 'fs';
import winston from 'winston';
const expressWinston = require('express-winston');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;
const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf((info) => {
  if (info instanceof Error) {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
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

export { logger, stream };

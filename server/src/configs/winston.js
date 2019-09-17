import fs from 'fs';
import winston from 'winston';
const logDir = __dirname + '/../logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
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

const logger = winston.createLogger({
  format: combine(
    label({label: 'jimmy winston test'}),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  transports: [infoTransport, errorTransport],
});

const stream = {
  write: (messages) => {
    logger.info(messages);
  },
};

// if (process.env.NODE_ENV === 'dev') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
export { logger, stream };

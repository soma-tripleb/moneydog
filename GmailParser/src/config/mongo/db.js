import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DB_SCHEMA = process.env.DB_SCHEMA;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const PRODUCTION_URL = process.env.PROD_DB_URL;
const DEVELOPMENT_URL = process.env.DEV_DB_URL;
const TEST_URL = process.env.TEST_DB_URL;
const GMAIL_URL =process.env.GMAIL_URL;

const client = async () => {

  const PREFIX = DB_SCHEMA.concat(DB_USER).concat(':').concat(DB_PASSWORD).concat('@');

  const DB_ENV = (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;

  let POSTFIX;
  switch (DB_ENV) {
    case 'production':
      POSTFIX = PRODUCTION_URL;
      break;
    case 'development':
      POSTFIX = DEVELOPMENT_URL;
      break;
    case 'test':
      POSTFIX = TEST_URL;
      break;
    case 'gmail':
      POSTFIX = GMAIL_URL;
    default:
      POSTFIX = TEST_URL;
      break;
  };

  console.log(`MONGO DB CONNECTION IN ${DB_ENV}`);
  const DB_URL = PREFIX.concat(POSTFIX);

  const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  return client;
};

export default {
  client,
};
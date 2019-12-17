import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DB_SCHEMA = 'mongodb+srv://';
const DB_USER = 'admin';
const DB_PASSWORD = 'moneydog1234';

const PRODUCTION_URL = process.env.PROD_DB_URL;
const DEVELOPMENT_URL = 'moneydog-test-p9fsb.mongodb.net/dev?retryWrites=true&w=majority';
const TEST_URL = process.env.TEST_DB_URL;
const GMAIL_URL = process.env.GMAIL_URL;

const client = async () => {

  const PREFIX = DB_SCHEMA.concat(DB_USER).concat(':').concat(DB_PASSWORD).concat('@');

  const DB_ENV = (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;

  let POSTFIX;
  switch (DB_ENV) {
    case 'production':
      POSTFIX = PRODUCTION_URL;
      break;
    case 'dev':
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
  // TODO(park): NODE 실행 환경에 따라서 어떤 DB 에 매칭 되었는지 확인하기
  return client;
};

export default {
  client,
};
import mongoDB from '../config/mongo/db';
import dotenv from 'dotenv';
dotenv.config();

const DB_ENV = (() => {
  return (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;
})();

const getUser = async (useremail) => {
  const client = await mongoDB.client();
  const db = client.db(DB_ENV);

  return db.collection('users').findOne({ email: useremail })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      throw new Error(`QUERY_USER_FIND_ONE ` + err);
    })
    .finally(() => {
      client.close();
    });
};

const insertRefreshToken = async (useremail, refreshToken) => {
  const client = await mongoDB.client();
  const db = client.db(DB_ENV);

  return db.collection('users').updateOne( { email: useremail }, { $set: { refreshToken: refreshToken } })
    .catch((err) => {
      throw new Error(`QUERY_USER_INSERT ` + err);
    }).then((result) => {
      return result;
    }).finally(() => { client.close(); });
};

export default {
  getUser,
  insertRefreshToken,
};

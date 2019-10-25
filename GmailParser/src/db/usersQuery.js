import mongoDB from '../config/mongo/db';
import dotenv from 'dotenv';
dotenv.config();

const DB_ENV = (() => {
  return (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;
})();

const getUser = async (useremail) => {
  const client = await mongoDB.client();
  const db = client.db(DB_ENV);

  return db.collection('users').findOne({ useremail: useremail })
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

const insertUser = async (userInfo) => {
  let client;
  let db;

  try {
    client = await mongoDB.client();
    db = client.db(DB_ENV);

    const findUser = await db.collection('users').findOne({ useremail: userInfo.useremail });

    if (findUser.useremail === userInfo.useremail) throw new Error('이미 존재하는 사용자');

  } catch (err) {
    if (err instanceof TypeError) {
      return db.collection('users').insertOne(
        {
          useremail: userInfo.useremail,
          username: userInfo.username,
          refreshToken: userInfo.refreshToken,
        })
        .catch((err) => {
          throw new Error(`QUERY_USER_INSERT ` + err);
        })
        .finally(() => {
          client.close();
        });
    } else
      throw new Error('QUERY_USER_INSERT_FIND_ONE ' + err);
  }
};

const insertRefreshToken = async (useremail, refreshToken) => {
  const client = await mongoDB.client();
  const db = client.db(DB_ENV);

  return db.collection('users').updateOne({ email: useremail }, { $set: { refreshToken: refreshToken } })
    .catch((err) => {
      throw new Error(`QUERY_USER_INSERT ` + err);
    }).then((result) => {
      return result;
    }).finally(() => { client.close(); });
};

const getRefreshToken = async (useremail) => {

  try {
    const client = await mongoDB.client();
    const db = client.db(DB_ENV);

    const result = await db.collection('users').findOne({ useremail: useremail });

    return result.refreshToken;

  } catch (err) {
    throw err;
  }
}

export default {
  getUser,
  insertUser,
  insertRefreshToken,
  getRefreshToken,
};
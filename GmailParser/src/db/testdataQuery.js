import mongoDB from 'src/config/mongo/db';
import dotenv from 'dotenv';
dotenv.config();

const DB_ENV = (() => {
  return (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;
})();

const insertTestData = async (testdataForm) => {

  let result;
  let client;

  try {
    client = await mongoDB.client();
    const db = client.db(DB_ENV);

    const findResult = await db.collection('testdata').findOne({ messageId: testdataForm.messageId });

    if (!findResult) {
      const data = testdataForm.GMAIL_JSON;
      const updateResult = await db.collection('testdata').insertOne(
        {
          messageId: testdataForm.messageId,
          q: testdataForm.q,
          snippet: testdataForm.snippet,
          date: testdataForm.date,
          subject: testdataForm.subject,
          from: testdataForm.from,
          data,
        }
      );

      result = updateResult;
    } else {
      result = findResult;
    }

  } catch (err) {
    throw err;
  } finally {
    client.close();
  }

  return result;
};

const getByQ = async (q) => {

  let result;
  let client;

  try {
    client = await mongoDB.client();
    const db = client.db(DB_ENV);

    const findResult = await db.collection('testdata').findOne({ q: q });

    result = findResult;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }

  return result;
};

const deleteByObjectId = async (messageId) => {

  let result;
  let client;

  try {
    client = await mongoDB.client();
    const db = client.db(DB_ENV);

    const deleteResult = await db.collection('testdata').deleteOne({ messageId: messageId });

    result = deleteResult;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }

  return result;
};

export default {
  insertTestData,
  deleteByObjectId,
  getByQ,
};

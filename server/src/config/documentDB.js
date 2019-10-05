require('dotenv').config();
const MongoClinet = require('mongodb').MongoClient;
const ca = `${process.env.DOCUMENT_DB_KEY}`;
console.log(`${process.env.DB_USER}`);
const mongourl = `mongodb://${process.env.DOCUMENT_DB_USER}:${process.env.DOCUMENT_DB_PASSWORD}@${process.env.DOCUMENT_DB_CLUSTER}`;
const client = MongoClinet.connect(
  `mongodb://${process.env.DOCUMENT_DB_USER}:${process.env.DOCUMENT_DB_PASSWORD}@${process.env.DOCUMENT_DB_CLUSTER}`,
  {sslValidate: true, sslCA: ca, useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    // Specify the database to be used
    db = client.db('test');
    col = db.collection('col');
    col.insertOne({'hello': 'Amazon DocumentDB'}, function(err, result){
      // Find the document that was previously written
      col.findOne({'hello': 'Amazon DocumentDB'}, function(err, result){
        // Print the result to the screen
        console.log(result);
        // Close the connection
        client.close();
      });
    });
  });

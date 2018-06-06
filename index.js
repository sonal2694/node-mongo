const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err, null);
  const db = client.db('conFusion');
  console.log('Connected correctly to the MongoDB server.');

  dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
    console.log("Insert Document:\n", result.ops);

    dboper.findDocuments(db, "dishes", (docs) => {
      console.log("Found documents:\n", docs);

      dboper.updateDocument(db, {name: "Vadonut"}, {description: "Update Test"}, "dishes", (result) => {
        console.log("Updated document:\n", result.result);

        dboper.findDocuments(db, "dishes", (docs) => {
          console.log("Found updated documents:\n", docs);

          db.dropCollection("dishes", (result) => {
            console.log("Dropped Collection: ", result);
            client.close();
          });
        });
      });
    });
  });
});

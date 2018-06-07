const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((client) => {

  const db = client.db('conFusion');
  console.log('Connected correctly to the MongoDB server.');

  dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes")
  .then((result) => {
    console.log("4. Insert Document:\n", result.ops);
    return dboper.findDocuments(db, "dishes");
  })

  .then((docs) => {
    console.log("5. Found documents:\n", docs);
    return dboper.updateDocument(db, {name: "Vadonut"}, {description: "Update Test"}, "dishes");
  })

  .then((result) => {
    console.log("6. Updated document:\n", result.result);
    return dboper.findDocuments(db, "dishes");
  })

  .then((docs) => {
    console.log("7. Found updated documents:\n", docs);
    return db.dropCollection("dishes");
  })

  .then((result) => {
    console.log("8. Dropped Collection: ", result);
    return client.close();
  })
  .catch((err) => console.log(err));

}, (err) => console.log(err)) // second argument to the first then()
.catch((err) => console.log(err));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err, null);
  const db = client.db('conFusion');
  console.log('Connected correctly to the MongoDB server.');

  const collection = db.collection("dishes");
  collection.insertOne({"name": "Uthappizza", "description": "test"},
  (err, result) => {
    assert.equal(err, null);
    console.log("After insert:\n");
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);
      console.log("Found:\n");
      console.log(docs);

      db.dropCollection("dishes", (err, result) => {
        assert.equal(err, null);
        client.close();
      });
    });
  });
});

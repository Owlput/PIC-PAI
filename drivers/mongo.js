const { MongoClient } = require("mongodb");
const getConfig = require("../config/configHandler");
const mongoConfig = getConfig().mongo;

const mongo = new MongoClient(mongoConfig.uri);

exports.find = async function find(req) {
  try {
    await mongo.connect();
    const collection = mongo.db(req.mongo.db).collection(req.mongo.collection);
    const result = collection.find(req.mongo.query);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await mongo.close();
  }
};
exports.aggregate = async function aggregate(req) {
  try {
    await mongo.connect();
    const cursor = mongo
      .db(req.mongo.db)
      .collection(req.mongo.collection)
      .aggregate(req.mongo.pipeline);
    let result = [];
    for await (const doc of cursor) {
      result.push(doc);
    }
    return result;
  } catch (e) {
    console.log(e);
  }
};
exports.insertOne = async function insertOne(req) {
  try {
    await mongo.connect();
    await mongo
      .db(req.mongo.db)
      .collection(req.mongo.collection)
      .insertOne(req.mongo.doc);
  } catch (e) {
    console.log(e);
  }
};

const {MongoClient} = require('mongodb')
const getConfig = require("../config/configHandler")
const mongoConfig = getConfig().mongo

const mongo = new MongoClient(mongoConfig.uri)

module.export =  async function find(req) {
    try {
      await client.connect();
      const db = client.db(req.mongo.db)
      const collection = db.collection(req.mongo.collection)
      const result = await collection.findOne(req.mongo.query);
      return result;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
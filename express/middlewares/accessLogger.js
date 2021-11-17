const moment = require("moment");
const mongo = require('../../drivers/mongo')

async function accessLogger (req, res, next) {
  let request = {
      mongo:{
    db: "bmx-bedata",
    collection: "accessLog",
    doc:{
    timestamp: `${moment().format()}`,
    from: {
      ip: `${req.ips}`,
    },
    target: {
      protocol: `${req.protocol}`,
      url: `${req.url}`,
      originalURL: `${req.originalUrl}`,
    }
}}
  };
  mongo.insertOne(request)
  next();
};

module.exports = accessLogger;

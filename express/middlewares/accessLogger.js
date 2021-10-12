const moment = require("moment");
const mongo = require('../../drivers/mongo')

async function accessLogger (req, res, next) {
  let request = {
    db: "bmx-bedata",
    collection: "permitData",
    doc:{
    timestamp: `${moment().format()}`,
    host: {
      ip: `${req.ip}`,
    },
    target: {
      protocol: `${req.protocol}`,
      url: `${req.url}`,
      originalURL: `${req.originalUrl}`,
    },
    server: {
      routeMatched: `${req.route}`,
    },
}
  };
  await mongo.insertOne(request)
  next();
};

module.exports = accessLogger;

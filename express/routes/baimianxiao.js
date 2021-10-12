const express = require("express");
const router = express.Router();
const mongo = require("../../drivers/mongo");

router.get("/data/thumbData/all", (req, res) => {
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "thumbData",
      pipeline: [
        {
          $match: {},
        },
      ],
    },
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  mongo.aggregate(query).then((result) => res.json(result));
});
router.get("/data/imageData/:uri", (req, res) => {
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "imageData",
      pipeline: [
        {
          $match: {
            uri: req.params.uri,
          },
        },
        {
          $lookup: {
            from: "authorData",
            localField: "author.1",
            foreignField: "authorId",
            as: "authorData",
          },
        },
        {
          $addFields: {
            authorInfo: {
              $arrayElemAt: ["$authorData", 0],
            },
          },
        },
        {
          $project: {
            authorData: 0,
          },
        },
      ],
    },
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  mongo.aggregate(query).then((result) => res.json(result));
});
router.get("/data/permitData/all", (req, res) => {
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "permitData",
      pipeline: [
        {
          '$lookup': {
            'from': 'authorData', 
            'localField': 'aId', 
            'foreignField': 'authorId', 
            'as': 'authorData'
          }
        }, {
          '$addFields': {
            'author': {
              '$arrayElemAt': [
                '$authorData', 0
              ]
            }
          }
        }, {
          '$project': {
            'authorData': 0, 
            '_id': 0, 
            'aId': 0, 
            'author.recentWorks': 0
          }
        }
      ],
    },
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  mongo.aggregate(query).then((result) => res.json(result));
});

//router.use('/data/thumbData/all',require('../middlewares/accessLogger'))
module.exports = router;

const express = require("express");
const router = express.Router();
const mongo = require("../../drivers/mongo");

router.use(require('../middlewares/accessLogger'))

router.get("/data/thumbData/all", (req, res) => {
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "thumbData",
      pipeline: [
        {
          $match: {},
        },{
          $project:{
            _id:0,
          }
        }
      ],
    },
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  mongo.aggregate(query).then((result) => res.json(result));
});
router.get("/data/workData/:uri", (req, res) => {
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "workData",
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
            _id:0,
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
      collection: "permitDataAuthor",
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
router.get("/data/permitData/:uri",(req,res)=>{
  const query = {
    mongo: {
      db: "bmx-bedata",
      collection: "permitDataArtwork",
      pipeline: [
        {
          '$match': {uri:req.params.uri}
        }, {
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
            '_id': 0, 
            'authorData': 0, 
            'author._id': 0, 
            'author.recentWorks': 0
          }
        }
      ],
    },
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  mongo.aggregate(query).then((result) => res.json(result[0]));
})

module.exports = router;

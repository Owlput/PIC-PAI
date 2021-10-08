const express = require("express");
const router = express.Router();
const mongo = require("../../drivers/mongo") 

router.get("/data/thumbs/all", (req, res) => {
    const query = {
        mongo:{
            db:"bmx-bedata",
            collection:"thumbData",
            pipeline:[
                {
                  '$match': {}
                }
              ],
        }
    }
    res.set('Access-Control-Allow-Origin',"https://xn--9wyS51efve.com")
    mongo.aggregate(query)
    .then(result => res.json(result))
})
router.get("/data/imageData/:uri", (req, res) => {
    const query = {
        mongo:{
            db:"bmx-bedata",
            collection:"imageData",
            pipeline:[
                {'$match':{
                    'uri':req.params.uri
                }},
                {
                  '$lookup': {
                    'from': 'authorData', 
                    'localField': 'author.1', 
                    'foreignField': 'authorId', 
                    'as': 'authorData'
                  }
                }, {
                  '$addFields': {
                    'authorInfo': {
                      '$arrayElemAt': [
                        '$authorData', 0
                      ]
                    }
                  }
                }, {
                  '$project': {
                    'authorData': 0
                  }
                }
              ]
        }
    }
    res.set('Access-Control-Allow-Origin',"https://xn--9wyS51efve.com")
    mongo.aggregate(query)
    .then(result => res.json(result))
})

module.exports = router;
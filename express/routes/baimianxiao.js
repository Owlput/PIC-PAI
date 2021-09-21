const express = require("express");
const router = express.Router();
const mongoClient = require("/drivers/mongodb") 

router.get("/images/:page", (req, res) => {
    let params = {
        mongo:{
            db:"baimianxiao",
            collection:"images",
            query:{
                page:`${req.params.page}`
            }
        }
    }
    res.json(mongoClient.find(params))
})

module.exports = router;
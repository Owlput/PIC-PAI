const express = require("express");
const router = express.Router();

router.get("/:imgPath",(req,res)=>{
    res.sendFile(`/${__dirname}/${req.params.imgPath}`)
})

module.exports = router
const express = require("express");
const router = express.Router();

router.get('/:path',(req,res)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Methods","GET")
    res.sendFile(`/public/img/${req.params.path}`,{root:__dirname})
})
module.exports = router
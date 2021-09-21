const express = require("express");
const router = express.Router();

router.get("/:fileId", (req, res) => {
    res.json()
})

module.exports = router;

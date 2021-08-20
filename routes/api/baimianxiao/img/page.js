const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:page", (req, res) => {
  let page = parseInt(req.params.page)
  if (!page || page <= 0) {
    res.status(400).json({"msg":"Illegal page"});
  } else {
    res.json(pageHandler(page));
  }
});

const pageHandler = (page) => {
  let imageOrder = [(page - 1) * 10, page * 10];
  return getLocalImages(imageOrder);
};

function getLocalImages(array) {
  let allFiles = fs.readdirSync("public/img");
  let resultArray = [];
  for (i = array[0]; i <= array[1]; i++) {
    if (allFiles[i]) {
      resultArray.push({
        id: `${i}`,
        src: `/api/baimianxiao/image/${allFiles[i]}`,
      });
    } else {
      return resultArray;
    }
  }return resultArray;
}

module.exports = router;

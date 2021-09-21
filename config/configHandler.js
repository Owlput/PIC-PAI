const fs = require('fs')
module.exports = function getConfig() {
        let configJSON = JSON.parse(fs.readFileSync("./config/config.json","utf8"))
        return configJSON
}
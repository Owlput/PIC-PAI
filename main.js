const express = require("express")
const getConfig = require("./config/configHandler")

const app = express()

const config = getConfig()

app.use('/baimianxiao',require('./express/routes/baimianxiao'))

app.listen(config.port ,()=>console.log(`Server strated on ${config.port}`))
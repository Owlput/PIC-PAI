const express = require("express")
//const router = require("./routes/api/baimianxiao/images.js")

const app = express()

const PORT = 4000

app.use("/api/baimianxiao/img",require('./routes/api/baimianxiao/img/page'))

app.listen(PORT,()=>console.log(`Server strated on ${PORT}`))
const express = require("express")
//const router = require("./routes/api/baimianxiao/images.js")

const app = express()

const PORT = 4000

app.use("/api/baimianxiao/img/page",require('./routes/api/baimianxiao/img/page/page'))
app.use("/api/baimianxiao/img/image",require('./routes/api/baimianxiao/img/image/image'))

app.listen(PORT,()=>console.log(`Server strated on ${PORT}`))
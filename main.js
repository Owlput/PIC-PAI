const express = require("express")
const path = require('path')

const app = express()

const PORT = 4000

app.use("/image/page",require('./page'))
app.use("/image",require('./image'))

app.use(express.static(path.join(__dirname,"public","image")))
app.listen(PORT,()=>console.log(`Server strated on ${PORT}`))
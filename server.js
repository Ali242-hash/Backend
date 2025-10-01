const express = require("express")
const dbHandler = require("./dbHandler")
const cors = require("cors")
const routes = require("./routes")

//dbHandler.userIQ.sync({force:true})
//dbHandler.Artworks.sync({force:true})

require("dotenv").config()

const PORT = process.env.PORT || 3000

const server = express()

server.use(express.json())
server.use(cors())
server.use("/",routes)


server.listen(PORT,()=>{console.log("server fut");
})
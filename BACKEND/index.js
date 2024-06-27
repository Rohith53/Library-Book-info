import express from "express"
import { PORT } from "./config.js"
import mongoose from "mongoose"
import { mongoDBURL } from "./config.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())

app.use('/',bookRoutes)

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("app connected to db")
    app.listen(PORT, ()=>{
        console.log(`app running on server ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
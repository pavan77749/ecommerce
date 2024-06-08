import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"

//configure env
dotenv.config()

//connect database config
connectDB();


//rest object
const app = express()

// middle wares
app.use(express.json())
app.use(morgan('dev'))

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>welcome to ecommerce</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan.white);
})
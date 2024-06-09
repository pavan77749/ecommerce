import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import cors from 'cors'

//configure env
dotenv.config()

//connect database config
connectDB();


//rest object
const app = express()

// middle wares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth/",authRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>welcome to ecommerce</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan.white);
})
import express from "express"
import colors from "colors"
import dotenv from "dotenv"

//configure env
dotenv.config({path:''})

//rest object
const app = express()

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>welcome to ecommerce</h1>")
})

//PORT
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan.white);
})
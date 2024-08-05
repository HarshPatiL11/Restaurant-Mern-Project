const express=require('express')
const morgon=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB = require('./MVC/DB/DB')
// const userRouter = require('./MVC/Routes/u   serRoute.js')
const app=express()
// config dotenv
dotenv.config()
// call db
connectDB()
// middleware
app.use(morgon('dev'))
app.use(express.json())
app.use(cors()) ;

app.get('/',(req,res)=>{
    res.send("<h1>hello server </h1>")
})
// route
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/transection",)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(("listenin to port "+PORT).bgYellow.white)
})
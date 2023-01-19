const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const {connection}=require("./config/db")
const{userRouter}=require('./routes/user.router')
const {mensRouter}=require("./routes/menscolec.route")
const{authenticator}=require("./middlewares/authenticater.middleware")
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cors())

app.use('/users',userRouter)
app.use("/mens",mensRouter)

app.use(authenticator)


app.listen(process.env.port,async(connection)=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is runnin at ${process.env.port}`)
})
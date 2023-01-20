const { json } = require('express')
const express=require('express')
const mensRouter=express.Router()
const {mensModel}=require("../models/mencolec.model")
const { userModel } = require('../models/users.model')

// localhost:4500/mens?p=1
mensRouter.get("/",async(req,res)=>{
    const page=req.query.p || 0
    const itemlimit=20
    try {
        let data=await mensModel.find().skip(page*itemlimit).limit(itemlimit)
        let totalcount=await mensModel.find()
        res.status(200).send({"data":data,totalcount:totalcount.length})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})
mensRouter.get("/product/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let product=await mensModel.find({_id:id})
        res.status(200).send({"data":product})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})

mensRouter.post("/cartitem",async(req,res)=>{
    // let userID=req.body.userID
    let itemarray=(req.body.itemsArray)
    try {
        let allItems= await mensModel.find({ '_id': { $in: itemarray}});
        res.status(200).send({"data":allItems})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})


module.exports={
    mensRouter
}
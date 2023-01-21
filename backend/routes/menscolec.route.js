const { json } = require('express')
const express=require('express')
const mensRouter=express.Router()
const {mensModel}=require("../models/mencolec.model")


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
mensRouter.patch("/update/:id",async(req,res)=>{
    let payload=req.body
    let id=req.params.id
    try {
        await mensModel.findByIdAndUpdate({"_id":id},payload)
        res.status(200).send({"msg":updated})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})
mensRouter.post("/additem",async(req,res)=>{
    let data=req.body
    try {
        let addItem=new mensModel(data) 
        await addItem.save()
        res.status(200).send({"msg":added})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})

mensRouter.delete('/delete/:id',async(req,res)=>{
    let dltID=req.params.id
    try {
        await mensModel.findByIdAndDelete(dltID)
        res.status(200).send({"msg":"deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":"Something went wrong"})
    }
})
module.exports={
    mensRouter
}
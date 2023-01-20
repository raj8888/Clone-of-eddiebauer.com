const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userRouter=express.Router()
const {userModel}=require('../models/users.model')

userRouter.post('/register',async(req,res)=>{
    const {firstName,lastName,email,location,mobile,password}=req.body
    try {
        let findemail=await userModel.find({email})
        if(findemail.length>=1){
            res.status(400).send({"msg":"user already registered"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                const user=new userModel({firstName,lastName,email,location,mobile,password:hash})
                await user.save()
                res.status(200).send({"msg":"user registered"})
            });
        }
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.find({email})
        if(user.length>0){
            let temp=user[0]._id
            let fname=user[0].firstName
            bcrypt.compare(password, user[0].password, async(err, result)=> {
               if(result){
                const token=jwt.sign({ userID:user[0]._id }, process.env.seckey);
                res.status(200).send({"msg":"login succesull","token":token,userID:temp,"firstName":fname})
               }else{
                res.status(400).send({"msg":"wrong credential"})
               }
            });
        }else{
            res.status(400).send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})

userRouter.get('/bagitems/:id',async(req,res)=>{
    let id=req.params.id
    try {
        let mensData=await userModel.find({_id:id})
        res.status(200).send({"itemsArray":mensData[0]['itemsArray']})
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})

userRouter.patch('/addtobag',async(req,res)=>{
    let id=req.body.id
    let prouctId=req.body.productID
    try {
        let mensData=await userModel.find({_id:id})
        let itemsArray=mensData[0].itemsArray
        itemsArray.push(prouctId)
        let updateData=await userModel.findByIdAndUpdate(id,{itemsArray:itemsArray})
       res.status(200).send({'msg':"added"})
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})

userRouter.patch('/updateitems',async(req,res)=>{
   let userID=req.body.userID
   let itemsArray=req.body.itemsArray
   try {
    await userModel.findOneAndUpdate({_id:userID},{itemsArray:itemsArray})
    res.status(200).send({'msg':"updated"})
   } catch (error) {
    res.status(400).send({"msg":"Something went wrong"})
   }
})
module.exports={
    userRouter
}
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

module.exports={
    userRouter
}
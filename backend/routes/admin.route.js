const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const adminRouter=express.Router()
const {adminModel}=require('../models/admin.model')

adminRouter.post('/register',async(req,res)=>{
    const {email,password}=req.body
    try {
        let findemail=await adminModel.find({email})
        if(findemail.length>=1){
            res.status(400).send({"msg":"user already registered"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                const user=new adminModel({email,password:hash})
                await user.save()
                res.status(200).send({"msg":"user registered"})
            });
        }
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
    }
})

adminRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await adminModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, async(err, result)=> {
               if(result){
                const token=jwt.sign({ userID:user[0]._id }, process.env.adminseckey);
                res.status(200).send({"msg":"login succesull","token":token})
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
    adminRouter
}

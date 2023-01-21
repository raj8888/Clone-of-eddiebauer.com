const mongoose =require('mongoose')

const adminSchema=mongoose.Schema({
    email:String,
    password:String,
})

const adminModel=mongoose.model('admin',adminSchema)

module.exports={
    adminModel
}
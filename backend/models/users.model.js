const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    location:String,
    mobile:String,
    password:String,
    itemsArray:{type: Array}
})

const userModel=mongoose.model('users',userSchema)

module.exports={
    userModel
}

// {
//     "firstName":"Raj",
//     "lastName":"Jadhav",
//     "email":"jadhavrj8877@gmail.com",
//     "location":"Nagthane",
//     "mobile":"8080680231",
//     "password":"raj8080680"
//   }
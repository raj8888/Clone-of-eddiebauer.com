const mongoose=require("mongoose")

const mensSchema=mongoose.Schema({
    wrapperhref:String ,
    sciQKALjsrc2:String ,
    title:String,
    strike_price:String,
    display_price:String ,
    color_label:String ,
    star:String ,
    sceXEjp:Number,
    color_imgsrc1:String ,
    color_imgsrc2:String,
    color_imgsrc3:String
})

const mensModel=mongoose.model("mens",mensSchema)

module.exports={
    mensModel
}
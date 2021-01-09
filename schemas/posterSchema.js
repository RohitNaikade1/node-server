const mongoose=require("mongoose");

const posterSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    picture:{
        type:String,
        required:true,
        trim:true
    },
    filename:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model('posters',posterSchema);
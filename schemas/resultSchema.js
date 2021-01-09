const mongoose=require("mongoose");

const resultSchema=new mongoose.Schema({
    ID:{
       type:Number,
       default:101
    },
    month:{
        type:[String],
        required:true
    },
    JavaCount:{
        type:[Number],
        required:true
    },
    CPPCount:{
        type:[Number],
        required:true
    },
    DSCount:{
        type:[Number],
        required:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model('result',resultSchema);
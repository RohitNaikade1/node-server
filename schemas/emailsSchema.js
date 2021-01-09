const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const emailsSchema=new mongoose.Schema({
    batch:{
       type:String,
       trim:true
    },
    student:{
        type:String,
        trim:true
    },
    hash_student:{
        type:String,
        trim:true
    },
    emails:{
        type:[String]
    }
},{
    timestamps:true
});
emailsSchema.virtual('studentPassword')
.set(function(password){
    this.hash_student=bcrypt.hashSync(password,10);
});

emailsSchema.methods={
    authenticateStudent:function(studentPassword){
        return bcrypt.compareSync(studentPassword,this.hash_student);
    }
}
module.exports=mongoose.model('emails',emailsSchema);
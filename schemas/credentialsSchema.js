const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const credentialsSchema=new mongoose.Schema({
    batch:{
       type:String
    },
    instructor:{
        type:String
    },
    email:{
        type:String
    },
    hash_instructor:{
        type:String
    }
},{
    timestamps:true
});
credentialsSchema.virtual('instructorPassword')
.set(function(password){
    this.hash_instructor=bcrypt.hashSync(password,10);
});

credentialsSchema.methods={
    authenticateInstructor:function(instructorPassword){
        return bcrypt.compareSync(instructorPassword,this.hash_instructor);
    }
}

module.exports=mongoose.model('credentials',credentialsSchema);
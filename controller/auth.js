const Creds=require("../schemas/credentialsSchema");
const admin=require('../schemas/adminSchema')
const Email=require('../schemas/emailsSchema')
const jwt=require('jsonwebtoken')
const key=require('../config/keys')

exports.userSignIn=(req,res)=>{
    const batch=req.body.batch;
    const email=req.body.email;
    const password=req.body.password;
    var role="";
    if(batch==="Instructor"){
        Creds.findOne({email:email},(err,user)=>{
            if(!user){
                return res.status(400).json({
                    warning:"instructor with this email does not exists"
                })
            }else{
                // console.log(user)
                if(!user.authenticateInstructor(password)){
                    return res.status(400).json({
                        warning: 'Email and password do not match'
                    });
                }else{
                    role="instructor";
                    const token = jwt.sign(
                        {
                            role,
                            email,
                            password
                        },
                        key.SECRET_KEY,
                        {
                            expiresIn: '1d'
                        }
                    );
                    return res.status(200).json({
                        data: token
                    });
                }
            }
        })  
    }else{
        Email.findOne({batch:batch , emails: email},(err,user)=>{
            if(!user){
                return res.status(400).json({
                    warning:`user with this ${email} not exists in ${batch}`
                })
            }else{
                console.log(user)
                        if (!user.authenticateStudent(password)) {
                            return res.status(400).json({
                                warning: 'Email and password do not match'
                            });
                        } else {
                            role = "student";
                            const token = jwt.sign(
                                {
                                    role,
                                    email,
                                    password
                                },
                                key.SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            );
                            return res.status(200).json({
                                data: token
                            });
                        }
            }
        })
    }
}

exports.adminSignIn=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    admin.findOne({email:email},(err,user)=>{
         if(!user){
                return res.status(400).json({
                    warning:"admin with this email does not exists"
                })
            }else{
                if(!user.comparePassword(password)){
                    return res.status(400).json({
                        warning: 'Email and password do not match'
                    });
                }else{
                    role="admin";
                    const token = jwt.sign(
                        {
                            role,
                            email,
                            password
                        },
                        key.SECRET_KEY,
                        {
                            expiresIn: '1d'
                        }
                    );
                    return res.status(200).json({
                        data: token
                    });
                }
            }
        })  
}
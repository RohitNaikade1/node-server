const express=require("express");
const Router=express.Router();
const {userSignIn,adminSignIn}=require("../controller/auth");

Router.post('/signin',userSignIn);

Router.post('/adminSignIn',adminSignIn);

module.exports=Router;
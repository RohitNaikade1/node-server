const express=require("express");
const Router=express.Router();
const {addAdmin,updateAdmin}=require("../controller/admin");

Router.post('/add',addAdmin);

Router.post('/update',updateAdmin);

module.exports=Router;
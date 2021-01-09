const express=require("express");
const Router=express.Router();

const {addInstructor,updateInstructor,deleteInstructor,readInstructor}=require("../controller/instructor");

Router.post('/add',addInstructor);
Router.post('/update',updateInstructor);
Router.post('/delete',deleteInstructor);
Router.get('/read',readInstructor);


module.exports=Router;
const express=require("express");
const Router=express.Router();
const {addCreds,updateInstructorPassword,
    updateInstructor,fetchCreds,deleteBatch}=require("../controller/credentials");

Router.post('/add',addCreds);

Router.post('/instructorPass',updateInstructorPassword);

Router.post('/instructor',updateInstructor)

Router.post('/delete',deleteBatch)

Router.get('/fetch',fetchCreds)

module.exports=Router;
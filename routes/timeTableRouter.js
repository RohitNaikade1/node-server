const express=require("express");
const Router=express.Router();
const {AddRecord,fetchRecord,deleteRecord}=require("../controller/timeTable");

Router.post('/add',AddRecord);

Router.post('/delete',deleteRecord);

Router.get('/read',fetchRecord)

module.exports=Router;
const express=require("express");
const Router=express.Router();
const {AddRecord,fetchRecord}=require("../controller/student");

Router.post('/addRecord',AddRecord);

Router.get('/readRecord',fetchRecord)

module.exports=Router;

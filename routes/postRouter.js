const express=require("express");
const Router=express.Router();
const {AddRecord,fetchRecord,deleteRecord,fetchToday}=require("../controller/post");

Router.post('/addPost',AddRecord);

Router.post('/deletePost',deleteRecord);

Router.get('/readPost',fetchRecord)

Router.get('/fetchToday',fetchToday)

module.exports=Router;
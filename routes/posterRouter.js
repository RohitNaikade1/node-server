const express=require("express");
const Router=express.Router();
const {addPoster,fetchPosters,deletePoster}=require("../controller/posters");

Router.post('/add',addPoster);

Router.post('/delete',deletePoster);

Router.get('/fetch',fetchPosters)

module.exports=Router;
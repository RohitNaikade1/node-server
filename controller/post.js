const Post=require("../schemas/postSchema");
var format = require('date-format');

exports.AddRecord=(req,res)=>{
    // console.log(req.body);
    const ID=req.body.ID;
    const date=req.body.dt;
    const time=req.body.time;
    const subject=req.body.subject;
    const type=req.body.type;
    const description=req.body.description;
    const weblink=req.body.weblink;
    const picture=req.body.picture;
    const teacher=req.body.teacher;
    const data=new Post({
        ID,
        date,
        time,
        subject,
        type,
        description,
        picture,
        weblink,
        teacher
    });
    data.save((error,data)=>{
        if (error) {
            return res.status(400).json({
                message: error
            });
        }
        if (data) {
            return res.status(200).json({
                data: data
            });
        }
    })
}

exports.fetchRecord=(req,res)=>{
    Post.find({}).sort({createdAt:-1})
    .exec((err,response)=>{
        if (response) {
            return res.status(200).json({
                data: response
            })
            if (err) {
                return res.status(500).json({
                    data: err
                })
            }
        }
    })
}

exports.fetchToday=(req,res)=>{
    const dt=format.asString('dd/MM/yyyy', new Date());
    console.log(dt)
    Post.find({date:dt})
    .exec((err,response)=>{
        if (response) {
            return res.status(200).json({
                data: response
            })
            if (err) {
                return res.status(500).json({
                    data: err
                })
            }
        }
    })
}

exports.deleteRecord=(req,res)=>{
    console.log(req.body.key)
    Post.deleteOne({_id:req.body.key},(err,data)=>{
        if (data) {
            return res.status(200).json({
                data: "success"
            })
            if (err) {
                return res.status(500).json({
                    data: err
                })
            }
        }
    })
}
const Student=require("../schemas/studentSchema");

exports.AddRecord=(req,res)=>{
    // console.log(req.body);
    const rollNo=req.body.rollNo;
    const Name=req.body.Name;
    const emailId=req.body.emailId;
    const batch=req.body.batch;
    const data=new Student({
        rollNo,
        Name,
        emailId,
        batch
    });
    console.log(data)
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
    Student.find({})
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
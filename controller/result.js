const Result=require("../schemas/resultSchema");

exports.AddRecord=(req,res)=>{
    const ID=req.body.ID;
    const month=req.body.month;
    const JavaCount=req.body.JavaCount;
    const CPPCount=req.body.CPPCount;
    const DSCount=req.body.DSCount;

    Result.findOneAndUpdate({
        ID:ID
    },{
        $set:{
          ID:ID,
          month:month,
          JavaCount:JavaCount,
          CPPCount:CPPCount,
          DSCount:DSCount  
        }
    },
    function (err, data) {
        if (err) {
            return res.status(500).json({
                error: "error while updating data"
            })
        } else if (data) {
            return res.status(200).json({
                message: "records updated successfully!"
            });
        }
    }
    )
}

exports.fetchRecord=(req,res)=>{
    Result.find({})
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
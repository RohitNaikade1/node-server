const timeTable = require("../schemas/timeTableSchema");

exports.AddRecord = (req, res) => {
    const teacher = req.body.teacher;
    const type = req.body.type;
    const description = req.body.description;
    const time = req.body.time;

    // const data = new timeTable({
    //     Records: [{
    //         uid:ID,
    //         teacher,
    //         type,
    //         description,
    //         time
    //     }]

    // });
    // data.save((error, data) => {
    //     if (error) {
    //         return res.status(400).json({
    //             message: error
    //         });
    //     }
    //     if (data) {
    //         return res.status(200).json({
    //             data: data
    //         });
    //     }
    // })


    timeTable.update({
        id:101
    },{
        $push:{Records:{
          teacher:teacher,
          type:type,
          description:description,
          time:time  
        }}
    },
    function (err, data) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else if (data) {
            return res.status(200).json({
                message: "Your update recorded successfully!"
            });
        }
    }
    )
}

exports.deleteRecord = (req, res) => {
    const id = req.body.id;

    timeTable.update({
        id:101
    },{
        $pull:{Records:{
            _id:id
        }}
    },
    function (err, data) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else if (data) {
            return res.status(200).json({
                message: "Your update recorded successfully!"
            });
        }
    }
    )
}

exports.fetchRecord = (req, res) => {
    timeTable.find({})
        .exec((err, response) => {
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
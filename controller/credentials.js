const creds = require("../schemas/credentialsSchema");
const _ = require('lodash');

exports.addCreds = (req, res) => {
    const tbatch = req.body.batch;
    const instructor = req.body.instructor;
    const email = req.body.email;
    const instructorPassword = req.body.instructorPassword;
    const batch = tbatch.toLowerCase();
    const data = new creds({
        batch,
        instructor,
        instructorPassword,
        email
    });
    data.save((error, data) => {
        console.log(error)
        if (error) {
            return res.status(400).json({
                error: "Error while storing Record"
            });
        }
        if (data) {
            return res.status(200).json({
                message: "Batch with credentials Stored successfully!"
            });
        }
    })
}

exports.fetchCreds = (req, res) => {
    creds.find({})
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

exports.updateInstructorPassword = (req, res) => {
    const tbatch = req.body.batch;
    const instructorPassword = req.body.instructorPassword;
    const batch = tbatch.toLowerCase();
    creds.findOne({ batch: batch }, function (error, response) {
        if (!response) {
            return res.status(400).json({
                error: "Batch does not exists!"
            })
        } else {
            const updatedFields = {
                instructorPassword: instructorPassword
            }
            response = _.extend(response, updatedFields);

            response.save((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Error resetting user password'
                    });
                }
                res.json({
                    message: `instructor's Password updated successfully! `
                });
            });
        }
    }) 
}

exports.updateInstructor = (req, res) => {
    const tbatch = req.body.batch;
    const instructor = req.body.instructor;
    const batch = tbatch.toLowerCase();
    creds.findOne({ batch: batch }, function (error, response) {
        if (!response) {
            return res.status(400).json({
                error: "Batch does not exists!"
            })
        } else {
            creds.update({ batch: batch }, {
                $set: {
                    instructor: instructor
                }
            }, function (error, success) {
                if (error) {
                    return res.status(400).json({
                        error: "error while updating an instructor"
                    })
                } else {
                    return res.status(200).json({
                        message: "instructor updated Successfully!"
                    })
                }
            })
        }
    })
}

exports.deleteBatch = (req, res) => {
    const tbatch = req.body.batch;
    const batch = tbatch.toLowerCase();
    creds.findOne({ batch: batch }, function (error, response) {
        if (!response) {
            return res.status(400).json({
                error: "Batch does not exists!"
            })
        } else {
            creds.deleteOne({ batch: batch }, function (error, success) {
                if (error) {
                    return res.status(400).json({
                        error: "There is a problem while deleting a batch!"
                    })
                } else {
                    return res.status(200).json({
                        message: "Batch deleted Successfully!"
                    })
                }
            }
            )
        }
    })

}
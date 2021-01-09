const Instructor = require("../schemas/instructorSchema");
const _ = require('lodash');
const path = require('path');
const fs = require('fs')

exports.addInstructor = (req, res) => {
    const name = req.body.name;
    const ibatch = req.body.batch;
    const batch = ibatch.toUpperCase();
    const education = req.body.education;
    const email = req.body.email;
    const instagram = req.body.instagram;
    const github = req.body.github;
    const facebook = req.body.facebook;
    const linkedIn = req.body.linkedIn;
    const picture = `http://localhost:5000/instructor/${req.files.picture.name}`;
    const filename = req.files.picture.name;

    const file = req.files.picture;
    Instructor.findOne({ batch: batch }, function (error, data) {
        if (data) {
            return res.status(400).json({
                error: "Batch already exists!"
            });
        } else {
            file.mv(path.join(__dirname, 'images/instructor', file.name), (err) => {
                if (err) {
                } else {
        
                }
            });
            const data = new Instructor({
                name,
                batch,
                education,
                instagram, github,
                facebook,
                email,
                picture,
                linkedIn,
                filename
            });
            data.save((error, data) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({
                        error: "error while adding an instructor"
                    });
                } else {
                    return res.status(200).json({
                        message: "instructor added successfully!"
                    });
                }
            })
        }
    })
}

exports.updateInstructor = (req, res) => {
    const name = req.body.name;
    const ibatch = req.body.batch;
    const batch = ibatch.toUpperCase();
    const education = req.body.education;
    const email = req.body.email;
    const instagram = req.body.instagram;
    const github = req.body.github;
    const facebook = req.body.facebook;
    const linkedIn = req.body.linkedIn;
    const picture = `http://localhost:5000/instructor/${req.files.picture.name}`;
    const filename = req.files.picture.name;
    const file = req.files.picture;

    Instructor.findOne({ batch: batch }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "Batch does not not exist!"
            });
        } else {
            file.mv(path.join(__dirname, 'images/instructor', file.name), (err) => {
                if (err) {
                } else {
        
                }
            })
            fs.unlinkSync(path.join(__dirname, 'images/instructor', user.filename));
            const updatedFields = {
                name: name,
                education: education,
                email: email,
                instagram: instagram,
                github: github,
                facebook: facebook,
                picture: picture,
                linkedIn: linkedIn,
                filename: filename
            }
            user = _.extend(user, updatedFields);

            user.save((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Error while updating instructor details'
                    });
                }
                res.json({
                    message: `Instructor updated successfully! `
                });
            });
        }
    })

}

exports.deleteInstructor = (req, res) => {
    Instructor.countDocuments((err, noOfDocs) => {
        if (noOfDocs > 3) {
            const ibatch = req.body.batch;
            const batch = ibatch.toUpperCase();
            Instructor.findOne({ batch: batch }, function (error, user) {
                if (!user) {
                    return res.status(400).json({
                        error: "Batch does not not exist!"
                    });
                } else {
                    fs.unlinkSync(path.join(__dirname, 'images/instructor', user.filename));
                    Instructor.deleteOne({ batch: batch }, (err, success) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Error while deleting an instructor'
                            });
                        } else {
                            return res.status(200).json({
                                message: 'Instructor deleted successfully'
                            });
                        }
                    });
                }
            })
        } else {
            return res.status(400).json({
                error: "Only one record is remaining.deletion not allowed"
            });
        }
    })
}


exports.readInstructor = (req, res) => {
    Instructor.find({})
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
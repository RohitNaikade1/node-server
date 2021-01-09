const Emails = require("../schemas/emailsSchema");
const _ = require('lodash');
const key = require("../config/keys")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key.EmailKey);

exports.addBatch = (req, res) => {
    const ibatch = req.body.batch;
    const batch = ibatch.toLowerCase();
    const emails = req.body.emails;
    const studentPassword = req.body.password;
    Emails.findOne({ batch: batch }, function (error, response) {
        if (response) {
            return res.status(400).json({
                error: "Batch alreday exists!"
            })
        } else {
            const data = new Emails({
                batch,
                emails,
                studentPassword,
                student: studentPassword
            });
            data.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    });
                }
                if (data) {
                    return res.status(200).json({
                        message: "Batch Added Successfully!"
                    });
                }
            })
        }
    })
}

exports.fetchEmails = (req, res) => {
    Emails.find({})
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

exports.updateStudentPassword = (req, res) => {
    const ibatch = req.body.batch;
    const batch = ibatch.toLowerCase();
    const studentPassword = req.body.studentPassword;
    Emails.findOne({ batch: batch }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "Batch does not exists!"
            });
        } else {
            const updatedFields = {
                studentPassword: studentPassword
            }
            user = _.extend(user, updatedFields);

            user.save((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Error resetting user password'
                    });
                } else {
                    return res.status(200).json({
                        message: 'Student password updated successfully!'
                    });
                }
            });
        }
    })
}

exports.addEmail = (req, res) => {
    const ibatch = req.body.batch;
    const batch = ibatch.toLowerCase();
    const email = req.body.email;
    // console.log(req.body)
    Emails.findOne({ batch: batch }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "Batch does not exists!"
            });
        } else {
            Emails.updateOne({ batch: batch }, {
                $push: {
                    emails: email
                }
            }, function (error, success) {
                if (error) {
                    return res.status(400).json({
                        error: "error while updating email database"
                    })
                } else {
                    Emails.findOne({ batch: batch }, function (error, user) {
                        sgMail.send({
                            from: key.EMAIL_FROM,
                            to: email,
                            subject: `Your Email Address is added in notification list of batch ${batch} of VISIONWARE institute!`,
                            text: `You can login with your registered email address and your batch password is ${user.student}`
                        })
                            .then(sent => {
                                return res.status(200).json({
                                    message: "Emails updated successfully!"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                }
            })
        }
    })


}

exports.deleteEmail = (req, res) => {
    const ibatch = req.body.batch;
    const batch = ibatch.toLowerCase();
    const email = req.body.email;
    Emails.findOne({ batch: batch }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "Batch does not exists!"
            });
        } else {
            Emails.updateOne({ batch: batch }, {
                $pull: {
                    emails: email
                }
            }, function (error, success) {
                if (error) {
                    return res.status(400).json({
                        error: "error while deleting email database"
                    })
                } else {
                    return res.status(200).json({
                        message: "Email deleted successfully!"
                    })
                }
            })
        }
    })
}

exports.deleteBatch = (req, res) => {
    const ibatch = req.body.batch;
    const batch = ibatch.toLowerCase();
    Emails.deleteOne({ batch: batch }, function (error, success) {
        if (error) {
            return res.status(400).json({
                error: "error while deleting batch"
            })
        } else {
            return res.status(200).json({
                message: "Batch deleted Successfully"
            })
        }
    })
}
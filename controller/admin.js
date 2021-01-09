const Admin = require("../schemas/adminSchema");
const _ = require('lodash');

exports.addAdmin = (req, res) => {
    const email1 = req.body.email;
    const email=email1.toLowerCase();
    const password = req.body.password;
    const data = new Admin({
        email,
        password
    });
    data.save((error, data) => {
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

exports.updateAdmin = (req, res) => {
    const email1 = req.body.email;
    const email=email1.toLowerCase();
    const password1 = req.body.password;
    const uemail1 = req.body.uemail;
    const uemail=uemail1.toLowerCase();
    Admin.findOne({ email: email }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "Admin with this email not exist!"
            });
        } else {
            const updatedFields = {
                password: password1,
                email: uemail
            }
            user = _.extend(user, updatedFields);

            user.save((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Error resetting user password'
                    });
                }
                res.json({
                    message: `Password updated successfully! `
                });
            });
        }
    })

}
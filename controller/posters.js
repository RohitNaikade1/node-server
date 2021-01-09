const Poster = require("../schemas/posterSchema");
const path = require('path');
const fs = require('fs')

exports.addPoster = (req, res) => {
    const caption = req.body.caption;
    const title = req.body.title;
    const picture = `http://localhost:5000/poster/${req.files.picture.name}`;
    const filename = req.files.picture.name;
    const file = req.files.picture;
    file.mv(path.join(__dirname, 'images/poster', file.name), (err) => {
        if (err) {
        } else {

        }
    });
    const data = new Poster({
        caption,
        title,
        picture,
        filename
    });
    data.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: "error while adding a poster"
            });
        } else {
            return res.status(200).json({
                message: "poster added successfully!"
            });
        }
    })
}

exports.deletePoster = (req, res) => {
    Poster.countDocuments((err, noOfDocs) => {
        if (noOfDocs > 3) {
            const title = req.body.title;
            Poster.findOne({ title: title }, function (error, user) {
                if (!user) {
                    return res.status(400).json({
                        error: "Poster does not not exist!"
                    });
                } else {
                    fs.unlinkSync(path.join(__dirname, 'images/poster', user.filename));
                    Poster.deleteOne({ title: title }, (err, success) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Error while deleting a poster'
                            });
                        } else {
                            return res.status(200).json({
                                message: 'Poster deleted successfully'
                            });
                        }
                    });
                }
            })
        } else {
                return res.status(400).json({
                    error: "Only three records are remaining.deletion not allowed"
                });
            }
    })
}


exports.fetchPosters = (req, res) => {
    Poster.find({}).sort({ createdAt: -1 })
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
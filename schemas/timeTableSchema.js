const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
        id: {
            type: Number,
            default: 101
        },
        Records: [{
            type:{
                type: String
            },
            teacher:{
                type: String
            },
            description:{
                type: String
            },
            time:{
                type: String
            }
        }
        ]
}, {
    timestamps: true
});
module.exports = mongoose.model('timeTable', timeTableSchema);
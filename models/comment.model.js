const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: false,
    },
    issue: {
        type: String,
        require: false,
    },
    sprint: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    previousComment: {
        type: String,
        required: false,
    },
}); 

module.exports = mongoose.model('comment', commentSchema);
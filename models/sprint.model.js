const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    number: {
        type: Number,
        require: true,
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    duration: {
        type: String, 
        required: false,
    },
    project: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    progress: {
        type: String, 
        required: true,
        enum: {
            values: ["Todo", "In Progress", "Completed"],
            message: '{VALUE} is not supported as a project type.'
        }
    },
    materials: [
        {
            id: {
                type: String,
                required: false,
            },
            name: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            }
        }
    ]
}); 

module.exports = mongoose.model('sprint', sprintSchema);
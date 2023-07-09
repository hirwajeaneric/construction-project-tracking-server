const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: [true, 'Description must be provided'] 
    },
    name: { 
        type: String, 
        required: [true, 'Project name must be provided'] 
    },
    code: {
        type: String,
        required: false,
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
    estimatedEndDate: { 
        type: Date, 
        required: false, 
    },
    endDate: { 
        type: Date, 
        required: false, 
    },
    projectType: { 
        type: String,
        required: [true, "Project type must be provided"], 
        enum: {
            values: [
                "Residential building construction",
                "Commercial building construction",
                "Bridge construction",
                "Road construction",
                "Tunnel construction",
                "Railway construction",
                "Airport construction",
                "Dam construction",
                "Power plant construction",
                "Hospital construction",
                "School construction",
                "Shopping mall construction",
                "Stadium construction",
                "Hotel construction",
                "Convention center construction",
                "Warehouse construction",
                "Data center construction",
                "Park construction",
                "Highway construction",
                "Pipeline construction"
            ],
            message: '{VALUE} is not supported as a project type.'
        }
    },
    country: {
        type: String, 
        required: [true, "Project country is required"],
    },
    province: {
        type: String, 
        required: false
    },
    city: {
        type: String, 
        required: [true, "The city of location of the project is required"],
    },
    district: {
        type: String, 
        required: false
    },
    sector: {
        type: String, 
        required: false
    },
    address: {
        type: String, 
        required: [true, "Please provide the street address of the project."],
    },
    dimensions: {
        type: String,
        required: [true, "Please provide the project displacement in meter squares."]
    },
    ownerId: {
        type: String,   
        required: false,
    },
    ownerName: {
        type: String, 
        required: false,
    },
    ownerEmail: { 
        type: String, 
        required: false 
    },
    consultantId: { 
        type: String, 
        required: true 
    },
    consultantName: { 
        type: String, 
        required: true 
    },
    consultantEmail: { 
        type: String, 
        required: true 
    },
    progress: { 
        type: Number, 
        required: true,
        default: 0, 
    },
    status: { 
        type: String, 
        required: true,
        default: "Open",
        enum: {
            values: ["Open","Closed"],
            message: '{VALUE} is not supported as a project status.'
        }
    },
}) 

module.exports = mongoose.model('project', projectSchema);
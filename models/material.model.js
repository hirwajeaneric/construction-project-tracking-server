const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Material is required'] 
    },
    picture: {
        type: String,
        required: false,
    },
    description: { 
        type: String, 
        required: false, 
    },
    type: { 
        type: String, 
        required: true, 
    },
    quantity: { 
        type: Number, 
        required: true, 
    },
    unitPrice: { 
        type: Number,
        required: true,
        defaut: 0 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    project: { 
        type: String, 
        required: true 
    }
}) 

module.exports = mongoose.model('material', materialSchema);
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
    measurementUnit: { 
        type: String, 
        required: true,
        enum: {
            values: ["Piece(s)", "Tone(s)", "Bag(s)","Truck(s)"],
            message: '{VALUE} is not supported as a measurement unit' 
        }
    },
    unitPrice: { 
        type: Number,
        required: true,
        defaut: 0 
    },
    currency: {
        type: String,
        required: true,
    },
    totalPrice: { 
        type: Number, 
        required: false 
    },
    project: { 
        type: String, 
        required: true 
    },
    entryDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    }
}) 

// materialSchema.pre('save', async function() {
//     this.totalPrice = this.quantity * this.unitPrice;
// })

module.exports = mongoose.model('material', materialSchema);
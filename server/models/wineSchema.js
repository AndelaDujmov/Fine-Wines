const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    alcoholPercentage: { 
        type: Number, 
        required: false 
    },
    type: { 
        type: String, 
        required: true 
    },
    manufacturer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Manufacturer', 
        required: true 
    }
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
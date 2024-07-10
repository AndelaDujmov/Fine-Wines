const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    establishedYear: { 
        type: Number, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    description: {
         type: String 
    },
    logoUrl: { 
        type: String 
    }
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports(Manufacturer);
const mongoose = require('mongoose');

const favoriteListSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Wine', 
        required: true 
    }
});

const Favorites = mongoose.model('Favorites', favoriteListSchema);

module.exports = Favorites;
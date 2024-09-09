const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Wine', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    total: { 
        type: Number, 
        required: true 
    }
});

const ShoppingCart = mongoose.model('Shoppingcart', shoppingCartSchema);

module.exports = ShoppingCart;
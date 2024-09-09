const express = require('express');
const ShoppingCart = require('../models/shoppingCartSchema');
const Wine = require('../models/wineSchema');
const { checkAuthenticated } = require('../middleware/checkRole');
const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
    const user = req.user.id;

    const cart = await ShoppingCart.find({ user });

    if (cart)
        return res.json({ cart: cart });

    return res.status(404);
});  

router.post("/add/:id", checkAuthenticated, async (req, res) => {
   try{
    const user = req.user.id;
    const count = 1;
    const product = req.params.id;
    const wine = await Wine.findById(product);
    
    const cart = await ShoppingCart.findOne({ user, product });

    if (cart) {
        cart.total += wine.price;
        cart.quantity += 1;
        await cart.save();
    }
    else{
        await ShoppingCart.create({
            user: user,
            product: product,
            quantity: count,
            total: wine.price
        })
    }

    res.status(200).json({ message: "Product added to the cart" });
   }catch (err) {
    res.status(500);
   }
});  

router.delete("/remove/:id", checkAuthenticated, async (req, res) => {
    const itemId = req.params.id;
    const userId = req.user.id;

    try {
        const cartItem = await ShoppingCart.findOne({ user: userId, product: itemId });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        const wine = await Wine.findById(itemId); 

        const price = wine.price;

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.total -= price;
            await cartItem.save();
        } else {
            await ShoppingCart.findByIdAndDelete(cartItem._id);
        }

        res.status(200).json({ message: "Product removed from the cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/checkout", checkAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try{
        const carts = await ShoppingCart.find({ user: userId });

        if (carts.length === 0)
            return res.status(400).json({ message: "User doesnt have purchances" });

        await ShoppingCart.deleteMany({ user: userId });
        return res.status(200).json({ message: "Successfully checked out" });
    }catch(err) {
        return res.status(404).json({ message: "Not found" });
    }
});  

module.exports = router;
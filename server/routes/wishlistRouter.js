const express = require('express');
const Favorites = require('../models/favoriteListSchema');
const { checkAuthenticated } = require('../middleware/checkRole');
const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
    const user = req.user.id;

    const wishlist = await Favorites.find({ user });

    if (wishlist) 
        return res.json({wishlist: wishlist});
    
    return res.status(404);
});  

router.post("/add/:id", checkAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const wineId = req.params.id;

    const result = await Favorites.create({
        user: userId,
        product: wineId
    });

    res.json({data: result});
});  

router.delete("/remove/:id", checkAuthenticated, async (req, res) => {
   try{
    const id = req.params.id;
    const result = await Favorites.findByIdAndDelete(id);

    if (!result)
        return res.status(404).json({message: "Not found"});
  
    return res.status(200).json({message: "OK"});
   
   }catch(err){
    return res.status(500).json({message: "Internal server error"});
   }
});  

module.exports = router;
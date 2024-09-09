const express = require('express');
const User = require('../models/userSchema');
const { checkAdmin, checkAuthenticated } = require('../middleware/checkRole');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const {firstName, lastName, username, email, password} = req.body;
        
        if (!username)
            return res.json({ error: "Username is required" })

        if (!password || password.length < 6)
            return res.json({ error: "Password is required and it should be more than 6 characters long" })

        const checkIfExists = await User.findOne({username});

        if (checkIfExists)
            return res.json({ error: "Username is already taken" })

        const hashedPassword = await hashPassword(password);
        const user = User.create({firstName, lastName, username, email, password, isAdmin: false});

        return res.json(user);
        
    }catch(err){

    }
});

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({username});

        if (!user)
            return res.json({ error: "User does not exist" });

        const ifPasswordsMatch = user.password == password;

        if (!ifPasswordsMatch)
            return res.json({ error: "Passwords dont match" });

        jwt.sign({ username: user.username, id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
        
            res.cookie('token', token).json({user: user, token: token});
        });   

    }catch(err){

    }
});

router.post('/logout', async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })

    res.json({message: 'Logged out successfully!'});
})

router.get('/user', checkAuthenticated,  async (req, res) => {
   try{
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
   } catch(err) {
    res.status(500).json({ error: "Internal server error" });
   }
});

router.get('/user/:id', checkAuthenticated,  async (req, res) => {
    try{
         const userId = req.params.id;
 
         const user = await User.findById(userId);
 
         if (!user) {
             return res.status(404).json({ error: "User not found" });
         }
 
         res.json({ user });
    } catch(err) {
     res.status(500).json({ error: "Internal server error" });
    }
 });

router.get('/users', checkAdmin, async (req, res) => {
    try{
        const userId = req.user.id;

        const users = await User.find({ isAdmin: false });

        res.json({ users });
    } catch {

    }
})

router.put('/user/passwd/:id', async (req, res) => {
    try{
        const userId = req.user.id;

        const users = await User.find({ isAdmin: false });

        res.json({ users });
    } catch {

    }
})

module.exports = router;
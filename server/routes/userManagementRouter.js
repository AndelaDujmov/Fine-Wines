const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');


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
        const user = User.create({firstName, lastName, username, email, password});

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

        jwt.sign({ username: user.username, id: user._id, email: user.email }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
        });

    }catch(err){

    }
});

router.get('/user', async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;

            res.json(user);
        })
    }

});

module.exports = router;
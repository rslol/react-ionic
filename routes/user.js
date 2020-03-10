const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/key');
const User = require('../models/user');
const validateRegistration = require('../validation/register');
const validateLogin = require('../validation/login');

/**
 * @route POST users/register
 * @description Register New User 
 * @access Public 
 */
router.post('/register', async (req, res) => {
    const { err, isValid } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json(err);

    const { userName, email, password } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (user) return res.status(400).json({ error: "User Already Exist" });

        const newUser = new User({
            userName,
            email, 
            password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        const payload = {
            id: newUser.id
        }

        jwt.sign(
            payload, 
            key.secret,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) return res.status(500).json(err);
                res.json({ token });
            }
        )
    } catch (e) {
        return res.status(500).json(e);
    }
})

/**
 * @route POST user/login 
 * @description Login User
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { err, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(err);

    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(404).json({ error: "Profile Not Found" });

        const passwordCheck = bcrypt.compare(password, user.password);
        if (passwordCheck) {
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                key.secret, 
                { expiresIn: 3600 }, 
                (err, token) => {
                    if (err) return res.status(500).json(err);
                    res.json({ token });
                }
            )
        }
    } catch (e) {
        return res.status(500).json(e);
    }
})

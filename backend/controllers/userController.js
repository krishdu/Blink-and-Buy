const User = require('../models/userModel');
const { createCustomError } = require('../utils/errorHandler');
const asyncWrapper = require('../middleware/asyncWrapper');

/**
 * @param  {} async(req
 * @param  {} res
 * @param  {} next
 */
const registerUser = asyncWrapper ( async(req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name, 
        email,
        password,
        avatar: {
            public_id: 'demo id',
            url: 'demo url'
        }
    });

    res.status(201).json({
        success: true,
        user
    });
})

module.exports = {
    registerUser
}
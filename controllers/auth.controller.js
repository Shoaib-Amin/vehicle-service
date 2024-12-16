const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }

    const isValidPassword = user.matchPassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect email or password'
        });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
}

const create = async (req, res) => {
    const { email, password } = req.body;
    if(!email ||!password){
        return res.status(400).json({
            success: false,
            message: 'Email and password required'
        });
    }

    try {
        const newUser = new User({
            email: email,
            password: password
        });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    login,
    create
}
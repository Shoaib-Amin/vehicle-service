const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,  // Ensures that email is unique
        trim: true,  // Removes any leading/trailing whitespace
        lowercase: true,  // Converts email to lowercase for uniformity
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']  // Basic email validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']  // Password length requirement
    }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();  // Skip hashing if the password is not modified
    }
    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt
        this.password = await bcrypt.hash(this.password, salt);  // Hash password
        next();
    } catch (error) {
        next(error);  // Pass the error to the next middleware
    }
});

// Method to compare input password with the stored hashed password
userSchema.methods.matchPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);  // Compares the entered password with the hashed one
};

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;

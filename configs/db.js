const mongoose = require('mongoose');

// Define the MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/vehicle-service'; // Replace with your local or environment variable URI

// Connect to MongoDB
const connectDB = async () => {

    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully 🚀');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
module.exports = connectDB;

const mongoose = require('mongoose');

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema({
    car_model: {
        type: String,
        required: [true, 'car_model is required'],
        minlength: [3, 'car_model must be at least 3 characters long'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        validate: {
            validator: Number.isFinite,
            message: 'price must be a number'
        }
    },
    phone_number: {
        type: String,
        required: [true, 'phone_number is required'],
        match: [/^\d{11}$/, 'phone_number must be exactly 11 digits']
    },
    images: {
        type: [{
            image_name: {
                type: String,
            },
            image_url: {
                type: String,
                required: [true, 'image_url is required']
            }
        }],
        validate: {
            validator: (value) => value.length <= 10,
            message: 'images must not contain more than 5 elements'
        },
        _id: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  // ObjectId for user reference
        ref: 'User',  // Reference to the User model
        required: true  // This ensures that every vehicle is created by a user
    }
});

// Create and export the model
const VehicleCollection = mongoose.model('Vehicle', vehicleSchema);
module.exports = VehicleCollection;

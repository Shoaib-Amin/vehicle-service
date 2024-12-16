const { validationResult } = require('express-validator');
const Vehicle = require("../models/Vehicle")

const add = async (req, res) => {
    const errors = validationResult(req);

    if (req.files.length > 10) {
        return res.status(400).json({
            success: false,
            error: 'You can only upload up to 10 images'
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { car_model, price, phone_number } = req.body
        const images = req.files.map(file => {
            return {
                image_url: process.env.SERVER_URL + "/" + file.path,
                image_name: file.filename
            }
        })

        const newVehicle = new Vehicle({
            car_model: car_model,
            price: price,
            phone_number: phone_number,
            images: images,
            createdBy: req.user.id
        });

        await newVehicle.save()
        return res.status(201).json({
            success: true,
            error: 'New Vehicle created successfully'
        });
    } catch (error) {
        console.error('Error while saving vehicle', error.message)
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        // Get the page and limit from query params, with default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the skip value
        const skip = (page - 1) * limit;

        // Fetch data with pagination
        const data = await Vehicle.find({ createdBy: req.user.id })
            .skip(skip)
            .limit(limit);

        // Count total records for pagination metadata
        const totalRecords = await Vehicle.countDocuments({ createdBy: req.user.id });

        // Calculate total pages
        const totalPages = Math.ceil(totalRecords / limit);

        return res.status(200).json({
            success: true,
            message: 'Data fetched successfully',
            data,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: page,
                limit,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    add,
    getAll
}
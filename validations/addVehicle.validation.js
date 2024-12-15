const { body } = require('express-validator');

const add_vehicle_validation = [
    // Validate that car_model is not empty
    body('car_model')
        .notEmpty()
        .withMessage('car_model is required')
        .isString()
        .withMessage('car_model must be a string')
        .isLength({ min: 3 })
        .withMessage('car_model must be at least 3 characters long'),

    // Validate that last_name is not empty
    body('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price must be a number'),

    // Validate that email is present and is a valid email format
    body('phone_number')
        .notEmpty()
        .withMessage('phone_number is required')
        .matches(/^\d{11}$/)
        .withMessage('phone_number must be exactly 11 digits')
     ,

    // Validate that last_name is not empty
    body('images')
        .isLength({ max: 5 })
        .withMessage('images must be at least 5 characters long'),
]

module.exports = add_vehicle_validation
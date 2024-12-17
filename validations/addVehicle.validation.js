const { body } = require('express-validator');

const add_vehicle_validation = [
    body('car_model')
        .notEmpty()
        .withMessage('car_model is required')
        .isString()
        .withMessage('car_model must be a string')
        .isLength({ min: 3 })
        .withMessage('car_model must be at least 3 characters long'),

    body('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price must be a number'),

    body('phone_number')
        .notEmpty()
        .withMessage('phone_number is required')
        .matches(/^\d{10}$/)
        .withMessage('phone_number must be exactly 11 digits')
]

module.exports = add_vehicle_validation
const express = require("express");
const { add } = require("../controllers/vehicle.controller");
const router = express.Router();
const add_vehicle_validation = require('../validations/addVehicle.validation')

router.post("/add", [add_vehicle_validation], add)

module.exports = router;
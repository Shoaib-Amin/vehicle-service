const express = require("express");
const { add, getAll } = require("../controllers/vehicle.controller");
const router = express.Router();
const add_vehicle_validation = require('../validations/addVehicle.validation')

router.get("/", [add_vehicle_validation], getAll) // GET all data
router.post("/add", [add_vehicle_validation], add) // POST new data

module.exports = router;
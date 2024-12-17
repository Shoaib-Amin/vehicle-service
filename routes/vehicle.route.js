const express = require("express");
const { add, getAll, deletById } = require("../controllers/vehicle.controller");
const router = express.Router();
const add_vehicle_validation = require('../validations/addVehicle.validation')

router.get("/", getAll) // GET all data
router.post("/add", [add_vehicle_validation], add) // POST new data
router.delete("/:id", deletById) // DELETE data


module.exports = router;
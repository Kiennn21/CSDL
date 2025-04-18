const express = require("express");
const router = express.Router();
const roomCtrl = require("../controllers/roomConstraintController");
const vehicleCtrl = require("../controllers/vehicleConstraintController");

router.get("/room-violations", roomCtrl.getRoomOccupancyViolations);
router.get("/vehicle-violations", vehicleCtrl.getVehicleRegistrationViolations);

module.exports = router;

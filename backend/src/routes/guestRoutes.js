const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");

router.get("/guest-visits", guestController.getGuestVisits);

module.exports = router;

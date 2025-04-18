const express = require("express");
const router = express.Router();
const serviceReportController = require("../controllers/serviceReportController");

router.get("/monthly-service-revenue", serviceReportController.getMonthlyServiceRevenue);

module.exports = router;

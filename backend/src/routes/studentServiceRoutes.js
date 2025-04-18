const express = require("express");
const router = express.Router();
const studentServiceController = require("../controllers/studentServiceController");

router.get(
  "/student-services",
  studentServiceController.getStudentServicesInDateRange
);

module.exports = router;

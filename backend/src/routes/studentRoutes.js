const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/student-payments", studentController.getStudentPayments);

module.exports = router;

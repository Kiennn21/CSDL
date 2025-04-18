const mongoose = require('mongoose');
const Student = require('../models/studentModel');
const StudentService = require('../models/studentServiceModel');
const Service = require('../models/serviceModel');
const MonthlyParking = require('../models/monthlyParkingModel');

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/ktx_sinhvien")
  .then(async () => {
    console.log("MongoDB connected");

    // Truy vấn bộ sưu tập students
    try {
      const students = await Student.find();
      console.log("Students Data:", students);
    } catch (err) {
      console.error("Error fetching students data:", err);
    }

    // Truy vấn bộ sưu tập student_services
    try {
      const studentServices = await StudentService.find();
      console.log("Student Services Data:", studentServices);
    } catch (err) {
      console.error("Error fetching student services data:", err);
    }


    try {
      const monthly_parking = await MonthlyParking.find();
      console.log("MonthlyParking Services Data:", monthly_parking);
    } catch (err) {
      console.error("Error fetching MonthlyParking services data:", err);
    }

    try {
      const services = await Service.find();
      console.log("Services Data:", services);
    } catch (err) {
      console.error("Error fetching services data:", err);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const mongoose = require("mongoose");

const monthlyParkingSchema = new mongoose.Schema({
  student_id: String,
  vehicle_id: String,
  license_plate: String,
  register_date: Date,
  monthly_fee: Number,
});

const MonthlyParking = mongoose.model('monthly_parking', monthlyParkingSchema, 'monthly_parking');
module.exports = MonthlyParking;

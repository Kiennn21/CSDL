const mongoose = require("mongoose");

const studentServiceSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  service_id: { type: String, required: true },
  usage_time: { type: Date, required: true },
  total_price: { type: Number, required: true },
});

const StudentService = mongoose.model("student_service", studentServiceSchema);
module.exports = StudentService;

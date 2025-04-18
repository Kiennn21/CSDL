const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cmt: { type: String, required: true },
  dob: { type: Date, required: true },
  class: { type: String, required: true },
  hometown: { type: String, required: true },
  room_number: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

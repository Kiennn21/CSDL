const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  guest_cmt: String,
  guest_name: String,
  dob: Date,
  visit_date: Date,
  student_id: String
});

module.exports = mongoose.model("Guest", guestSchema);

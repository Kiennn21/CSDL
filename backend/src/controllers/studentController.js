const Student = require("../models/studentModel");
const mongoose = require("mongoose");

const getStudentPayments = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $lookup: {
          from: "student_services",
          localField: "student_id",
          foreignField: "student_id",
          as: "services_used",
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "room_number",
          foreignField: "room_number",
          as: "room_info",
        },
      },
      { $unwind: "$room_info" },
      {
        $addFields: {
          total_service_fee: { $sum: "$services_used.total_price" },
          room_fee: "$room_info.price_per_month",
        },
      },
      {
        $project: {
          _id: 0,
          student_id: 1,
          name: 1,
          room_number: 1,
          room_fee: 1,
          total_service_fee: 1,
          total_payment: { $add: ["$room_fee", "$total_service_fee"] },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching student payments:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getStudentPayments,
};

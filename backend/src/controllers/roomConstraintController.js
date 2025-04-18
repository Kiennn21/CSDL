const Student = require("../models/studentModel");

exports.getRoomOccupancyViolations = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$room_number",
          student_count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "rooms", 
          localField: "_id",
          foreignField: "room_number",
          as: "room_info"
        }
      },
      { $unwind: "$room_info" },
      {
        $project: {
          room_number: "$_id",
          student_count: 1,
          max_occupancy: "$room_info.max_occupancy",
          over_capacity: {
            $gt: ["$student_count", "$room_info.max_occupancy"]
          }
        }
      },
      {
        $match: { over_capacity: true }
      }
    ]);

    console.log(result); 
    res.json(result);
  } catch (err) {
    console.error("Error checking room occupancy:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

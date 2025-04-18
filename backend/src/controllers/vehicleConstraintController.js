const MonthlyParking = require('../models/monthlyParkingModel');

exports.getVehicleRegistrationViolations = async (req, res) => {
  try {
    const MAX_VEHICLES = 2;

    const result = await MonthlyParking.aggregate([
      {
        $group: {
          _id: "$student_id",
          total_vehicles: { $sum: 1 }
        }
      },
      {
        $match: {
          total_vehicles: { $gt: MAX_VEHICLES }
        }
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "student_id",
          as: "student_info"
        }
      },
      { $unwind: "$student_info" },
      {
        $project: {
          student_id: "$_id",
          name: "$student_info.name",
          class: "$student_info.class",
          total_vehicles: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

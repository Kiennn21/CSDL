const StudentService = require("../models/studentServiceModel");

const getStudentServicesInDateRange = async (req, res) => {
  try {
    console.log("Fetching all data...");

    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Both startDate and endDate are required" });
    }

    const result = await StudentService.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "student_id",
          as: "student",
        },
      },
      { $unwind: "$student" },

      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "service_id",
          as: "service",
        },
      },
      { $unwind: "$service" }, 

      {
        $match: {
          usage_time: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },

      {
        $group: {
          _id: {
            student_id: "$student_id",
            student_name: "$student.name",
            service_name: "$service.service_name",
          },
          total_price: { $sum: "$total_price" }, 
        },
      },
      {
        $project: {
          _id: 0,
          student_id: "$_id.student_id",
          student_name: "$_id.student_name",
          service_name: "$_id.service_name",
          total_price: 1,
        },
      },
    ]);

    console.log("Aggregation result:", result);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching all student services:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getStudentServicesInDateRange };

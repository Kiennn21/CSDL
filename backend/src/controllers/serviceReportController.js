const StudentService = require('../models/studentServiceModel');

exports.getMonthlyServiceRevenue = async (req, res) => {
  try {
    const result = await StudentService.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "service_id",
          as: "service_info"
        }
      },
      { $unwind: "$service_info" },
      {
        $group: {
          _id: {
            month: { $month: "$usage_time" },
            year: { $year: "$usage_time" },
            service_id: "$service_id",
            service_name: "$service_info.service_name"
          },
          total_revenue: { $sum: "$total_price" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          service_id: "$_id.service_id",
          service_name: "$_id.service_name",
          month: "$_id.month",
          year: "$_id.year",
          total_revenue: 1,
          usage_count: "$count"
        }
      },
      {
        $sort: {
          year: -1,
          month: -1,
          service_name: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching monthly service revenue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

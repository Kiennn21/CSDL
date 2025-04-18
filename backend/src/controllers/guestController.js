const Guest = require('../models/guestModel'); 

const getGuestVisits = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = await Guest.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: 'student_id',
          foreignField: 'student_id',
          as: 'student_info',
        },
      },
      { $unwind: '$student_info' }, 

      {
        $match: {
          visit_date: {
            $gte: start,
            $lte: end,
          },
        },
      },

      {
        $group: {
          _id: {
            student_id: '$student_id',
            student_name: '$student_info.name',
            guest_cmt: '$guest_cmt',
            guest_name: '$guest_name',
          },
          visit_count: { $sum: 1 }, 
        },
      },

      {
        $project: {
          _id: 0,
          student_id: '$_id.student_id',
          student_name: '$_id.student_name',
          guest_cmt: '$_id.guest_cmt',
          guest_name: '$_id.guest_name',
          visit_count: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching guest visits:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getGuestVisits };

const { Activity, User } = require('../models');

exports.getActivityFeed = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user', // must match alias in model
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({ activities });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activity feed', error: err.message });
  }
};

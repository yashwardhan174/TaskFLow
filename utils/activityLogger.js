const { Activity } = require('../models');

const logActivity = async ({ userId, action, entityType, entityId }) => {
  try {
    await Activity.create({
      userId,
      action,
      entityType,
      entityId
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

module.exports = logActivity;

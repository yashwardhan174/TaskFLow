const { Activity } = require('../models');

module.exports = async function logActivity({ userId, action, entity, entityId }) {
  return await Activity.create({
    userId,
    action,
    entity,
    entityId
  });
};

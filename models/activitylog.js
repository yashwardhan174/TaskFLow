'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Activity.init({
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    entity: DataTypes.STRING,
    entityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });

  return Activity;
};

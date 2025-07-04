'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Each comment belongs to a task
      Comment.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });

      // Each comment is made by a user
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Threaded reply: comment can have a parent
      Comment.belongsTo(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'parent'
      });

      // Comment can have many replies
      Comment.hasMany(models.Comment, {
        foreignKey: 'parentCommentId',
        as: 'replies'
      });
    }
  }

  Comment.init({
    text: DataTypes.TEXT,
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    parentCommentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};

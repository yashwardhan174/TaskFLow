const { Task, TaskAssignee, User } = require('../models');
const { Sequelize } = require('sequelize');

// a) Task status counts for a project
exports.taskStatusCounts = async (req, res) => {
  const { projectId } = req.params;
  try {
    const counts = await Task.findAll({
      where: { projectId },
      attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      group: ['status']
    });
    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task status counts', error: err.message });
  }
};

// b) Project progress (completed vs total tasks)
exports.projectProgress = async (req, res) => {
  const { projectId } = req.params;
  try {
    const totalTasks = await Task.count({ where: { projectId } });
    const completedTasks = await Task.count({ where: { projectId, status: 'Done' } });
    const progressPercent = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    res.json({ totalTasks, completedTasks, progressPercent });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project progress', error: err.message });
  }
};

// c) User workload - tasks assigned per user
exports.userWorkload = async (req, res) => {
  try {
    const workload = await TaskAssignee.findAll({
      attributes: ['userId', [Sequelize.fn('COUNT', Sequelize.col('taskId')), 'taskCount']],
      group: ['userId'],
      include: [{ model: User, attributes: ['id', 'name'] }]
    });
    res.json(workload);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user workload', error: err.message });
  }
};

// d) Tasks created last 7 days (activity trend)
exports.tasksCreatedLastWeek = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Sequelize.Op.gte]: Sequelize.literal('DATE_SUB(CURDATE(), INTERVAL 7 DAY)')
        }
      },
      group: ['date'],
      order: [['date', 'ASC']]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching activity trends', error: err.message });
  }
};
// e) User workload filtered by project
exports.getUserWorkloadByProject = async (req, res) => {
  const userId = req.user.id;
  const { projectId } = req.params;

  try {
    // Count tasks assigned to this user for the specified project
    const count = await TaskAssignee.count({
      where: { userId },
      include: [{
        model: Task,
        where: { projectId }
      }]
    });

    res.json({ userId, projectId, assignedTaskCount: count });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user workload by project', error: err.message });
  }
};

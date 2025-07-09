const { Task, TaskAssignee, TaskDependency, User } = require('../models');
const logActivity = require('../utils/logActivity');
const sendNotification = require('../utils/sendNotification');

exports.createTask = async (req, res) => {
  const { title, description, priority, status, startDate, dueDate, projectId, assigneeIds } = req.body;

  try {
    const task = await Task.create({ title, description, priority, status, startDate, dueDate, projectId });

    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');

    if (Array.isArray(assigneeIds) && assigneeIds.length) {
      await Promise.all(
        assigneeIds.map(userId =>
          TaskAssignee.create({ taskId: task.id, userId })
        )
      );

      // Notify assignees
      await Promise.all(
        assigneeIds.map(userId =>
          sendNotification({
            userId,
            message: `You were assigned to a new task: "${task.title}"`,
            io,
            onlineUsers
          })
        )
      );
    }

    // Log activity
    await logActivity({
      userId: req.user.id,
      action: `created a task "${task.title}"`,
      entity: 'task',
      entityId: task.id
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.findAll({
      where: { projectId },
      include: [{ model: User, as: 'assignees', attributes: ['id', 'name'] }]
    });

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');

    //  Notify assignees
    const assignees = await TaskAssignee.findAll({ where: { taskId: task.id } });
    await Promise.all(
      assignees.map(a =>
        sendNotification({
          userId: a.userId,
          message: `Task "${task.title}" status updated to "${status}"`,
          io,
          onlineUsers
        })
      )
    );

    // Log activity
    await logActivity({
      userId: req.user.id,
      action: `updated task status to "${status}"`,
      entity: 'task',
      entityId: task.id
    });

    res.json({ message: 'Status updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};

exports.addDependency = async (req, res) => {
  const { taskId, dependsOnTaskId } = req.body;

  try {
    const dependency = await TaskDependency.create({ taskId, dependsOnTaskId });

    const task = await Task.findByPk(taskId);
    const assignees = await TaskAssignee.findAll({ where: { taskId } });

    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');

    //  Notify assignees
    await Promise.all(
      assignees.map(a =>
        sendNotification({
          userId: a.userId,
          message: `Task "${task.title}" now depends on Task ID: ${dependsOnTaskId}`,
          io,
          onlineUsers
        })
      )
    );

    // Log activity
    await logActivity({
      userId: req.user.id,
      action: `added dependency on task ${dependsOnTaskId}`,
      entity: 'task',
      entityId: taskId
    });

    res.status(201).json({ message: 'Dependency added', dependency });
  } catch (err) {
    res.status(500).json({ message: 'Error adding dependency', error: err.message });
  }
};

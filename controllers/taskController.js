const { Task, TaskAssignee, TaskDependency, User } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description, priority, status, startDate, dueDate, projectId, assigneeIds } = req.body;

  try {
    const task = await Task.create({ title, description, priority, status, startDate, dueDate, projectId });

    if (Array.isArray(assigneeIds) && assigneeIds.length) {
      await Promise.all(
        assigneeIds.map(userId =>
          TaskAssignee.create({ taskId: task.id, userId })
        )
      );
    }

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

    res.json({ message: 'Status updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};

exports.addDependency = async (req, res) => {
  const { taskId, dependsOnTaskId } = req.body;

  try {
    const dependency = await TaskDependency.create({ taskId, dependsOnTaskId });
    res.status(201).json({ message: 'Dependency added', dependency });
  } catch (err) {
    res.status(500).json({ message: 'Error adding dependency', error: err.message });
  }
};

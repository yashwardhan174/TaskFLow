const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  addDependency
} = require('../controllers/taskController');

router.post('/', authenticateToken, createTask);
router.get('/:projectId', authenticateToken, getTasksByProject);
router.put('/:id/status', authenticateToken, updateTaskStatus);
router.post('/dependency', authenticateToken, addDependency);

module.exports = router;

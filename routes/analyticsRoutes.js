const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authenticateToken = require('../middleware/auth');

router.get('/project/:projectId/status-counts', authenticateToken, analyticsController.taskStatusCounts);
router.get('/project/:projectId/progress', authenticateToken, analyticsController.projectProgress);
router.get('/user/workload', authenticateToken, analyticsController.userWorkload);
router.get('/activity/tasks-last-week', authenticateToken, analyticsController.tasksCreatedLastWeek);
router.get('/user/workload/project/:projectId', authenticateToken, analyticsController.getUserWorkloadByProject);

module.exports = router;

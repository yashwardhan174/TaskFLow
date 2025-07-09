const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  createTeam,
  addTeamMembers,
  getTeamMembersByProject
} = require('../controllers/teamController');

router.post('/', authenticateToken, createTeam);
router.post('/:teamId/members', authenticateToken, addTeamMembers);
router.get('/project/:projectId', authenticateToken, getTeamMembersByProject);

module.exports = router;

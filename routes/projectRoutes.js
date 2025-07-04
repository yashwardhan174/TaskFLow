const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { createProject, getProjectById } = require('../controllers/projectController');

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'project_manager'),
  createProject
);

router.get(
  '/:id',
  authenticateToken,
  getProjectById
);

module.exports = router;

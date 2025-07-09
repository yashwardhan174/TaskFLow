const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getActivityFeed } = require('../controllers/activityController');

router.get('/', authenticateToken, getActivityFeed);

module.exports = router;

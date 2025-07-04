const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { addComment, getCommentsForTask } = require('../controllers/commentController');

router.post('/:taskId', authenticateToken, addComment);
router.get('/:taskId', authenticateToken, getCommentsForTask);

module.exports = router;

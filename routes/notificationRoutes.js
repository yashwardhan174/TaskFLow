const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} = require('../controllers/notificationController');

// Get all notifications for the logged-in user
router.get('/', authenticateToken, getUserNotifications);

// Mark a specific notification as read
router.put('/:id/read', authenticateToken, markNotificationAsRead);

// Delete a specific notification
router.delete('/:id', authenticateToken, deleteNotification);

module.exports = router;

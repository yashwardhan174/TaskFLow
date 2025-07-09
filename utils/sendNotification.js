const { Notification } = require('../models');

async function sendNotification({ userId, message }) {
  // Save to DB
  const notification = await Notification.create({ userId, message });

  // Emit to connected user if online
  const io = require('../server').io;
  const onlineUsers = require('../server').onlineUsers;

  const socketId = onlineUsers.get(userId.toString());
  if (socketId) {
    io.to(socketId).emit('notification', { message });
  }

  return notification;
}

module.exports = sendNotification;

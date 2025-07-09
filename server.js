// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const projectRoutes = require('./routes/projectRoutes');
const commentRoutes = require('./routes/commentRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const fileRoutes = require('./routes/fileRoutes');
const activityRoutes = require('./routes/activityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskFlow API',
      version: '1.0.0',
      description: 'API documentation for TaskFlow backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Adjust paths to your routes/controllers with swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes with prefixes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Default route
app.get('/', (req, res) => {
  res.send('TaskFlow API is running ✅');
});

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust in production to frontend URL
    methods: ['GET', 'POST'],
  },
});

// Map to store online users: userId => socketId
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(' Socket connected:', socket.id);

  socket.on('register', (userId) => {
    onlineUsers.set(userId.toString(), socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    console.log(' Socket disconnected:', socket.id);
  });
});

// Make io and onlineUsers accessible in routes/controllers
app.set('io', io);
app.set('onlineUsers', onlineUsers);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

module.exports = { io, onlineUsers };

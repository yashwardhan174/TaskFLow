const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();



// Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Route registration
app.use('/api/auth', authRoutes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('TaskFlow API is running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

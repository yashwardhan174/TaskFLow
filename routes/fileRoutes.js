const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadFile } = require('../controllers/fileController');

router.post('/:taskId', authenticateToken, upload.single('file'), uploadFile);

module.exports = router;

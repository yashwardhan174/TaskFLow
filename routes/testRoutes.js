const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

router.get(
  '/admin-check',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: `Hello Admin ${req.user.email}` });
  }
);

module.exports = router;

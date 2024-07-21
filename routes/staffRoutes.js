const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Register a single staff member
router.post('/register', staffController.register);

// Login a staff member
router.post('/login', staffController.login);

module.exports = router;

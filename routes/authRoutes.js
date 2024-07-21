const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a single student
router.post('/register', authController.register);

// Register multiple students
router.post('/register/batch', authController.registerStudentsBatch);

// Login endpoint (to be implemented)
router.post('/login', authController.login);

// Get all students
router.get('/students', authController.getAllStudents);


// Route for updating a student by ID
router.put('/students/:studentId', authController.updateStudentById);

// Route for deleting a student by ID
router.delete('/students/:studentId', authController.deleteStudentById);

// Route: GET /api/students/class/:className
router.get('/class/:className', authController.getStudentsByClassName);


module.exports = router;

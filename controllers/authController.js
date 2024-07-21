// Import the Student model
const Student = require('../models/Student');

// Controller logic for registration
exports.register = async (req, res) => {
    // Extract registration data from the request body
    const { studentId, firstName, lastName, age, course, className } = req.body;

    try {
        // Check if the student with the provided student ID already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this ID already exists' });
        }

        // Create a new student using the Student model
        const newStudent = new Student({ studentId, firstName, lastName, age, course, className });
        // Save the new student to the database
        await newStudent.save();
        // Respond with a success message
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        // If an error occurs, respond with the error message
        res.status(500).json({ error: error.message });
    }
};

// Controller logic for login
exports.login = async (req, res) => {
    // Implement your login logic here
    res.status(501).json({ message: 'Login functionality not implemented yet' });
};

// Controller logic for updating a student by ID
exports.updateStudentById = async (req, res) => {
    const { studentId } = req.params;
    const updateData = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate({ studentId }, updateData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller: Register multiple students
exports.registerStudentsBatch = async (req, res) => {
    const students = req.body;

    try {
        const newStudents = await Student.insertMany(students);
        res.status(201).json({ message: 'Students registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findOne({ studentId });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json(student);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller logic for deleting a student by ID
exports.deleteStudentById = async (req, res) => {
    const { studentId } = req.params;

    try {
        const deletedStudent = await Student.findOneAndDelete({ studentId });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get students by class name
exports.getStudentsByClassName = async (req, res) => {
    const { className } = req.params;
  
    try {
      const students = await Student.find({ className });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get all students with pagination and search
exports.getAllStudents = async (req, res) => {
    const { page = 1, limit = 20, search = '' } = req.query;

    try {
        const query = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { studentId: { $regex: search, $options: 'i' } },
                { className: { $regex: search, $options: 'i' } }
            ]
        };

        const students = await Student.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalStudents = await Student.countDocuments(query);

        res.status(200).json({
            students,
            totalPages: Math.ceil(totalStudents / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
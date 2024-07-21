const Result_SS2 = require('../models/Result_SS2');

// Batch result upload for SS2
exports.uploadResults = async (req, res) => {
    const results = req.body;

    const successResults = [];
    const errorResults = [];

    for (const resultData of results) {
        const { studentId, chemistry, math, english } = resultData;

        try {
            // Check if a result already exists for the student
            const existingResult = await Result_SS2.findOne({ studentId });

            if (existingResult) {
                // If a result already exists, return an error
                errorResults.push({ message: 'Result already exists for the student', studentId });
                continue; // Move to the next iteration
            }

            const newResult = new Result_SS2({
                studentId,
                chemistry,
                math,
                english
            });

            const savedResult = await newResult.save();
            successResults.push({ message: 'Result added successfully', result: savedResult });

        } catch (error) {
            errorResults.push({ message: 'Failed to add result', error: error.message, data: resultData });
        }
    }

    res.status(207).json({ 
        message: 'Batch upload results',
        success: successResults,
        errors: errorResults 
    });
};

// Get results for WHOLE SS2
exports.getClassResultsSS2 = async (req, res) => {
    try {
        const results = await Result_SS2.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Upload result for a single user
exports.uploadSingleResult = async (req, res) => {
    // Check if the request body is an array (indicating a batch upload)
    if (Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Batch upload is not allowed on this endpoint' });
    }

    const { studentId, chemistry, math, english } = req.body;

    try {
        // Check for duplicate result
        const existingResult = await Result_SS2.findOne({ studentId });
        if (existingResult) {
            return res.status(400).json({ message: 'Result already exists for the studentId provided' });
        }

        const newResult = new Result_SS2({
            studentId,
            chemistry,
            math,
            english
        });

        const savedResult = await newResult.save();
        res.status(201).json({ message: 'Result added successfully', result: savedResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get result for a single user by studentId
exports.getSingleResult = async (req, res) => {
    const { studentId } = req.params;

    try {
        const result = await Result_SS2.findOne({ studentId });
        if (!result) {
            res.status(404).json({ message: 'Result not found for the studentId provided' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  
  // Edit a student's results by studentId
  exports.editSS2Student = async (req, res) => {
    const { studentId } = req.params;
    const { chemistry, math, english } = req.body;
  
    try {
      const updatedStudent = await Result_SS2.findOneAndUpdate(
        { studentId },
        { chemistry, math, english },
        { new: true, runValidators: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a student's results by studentId
  exports.deleteSS2Student = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const deletedStudent = await Result_SS2.findOneAndDelete({ studentId });
  
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
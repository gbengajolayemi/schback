const mongoose = require('mongoose');

const resultSchemaSS3 = new mongoose.Schema({
  studentId: {
    type: String,
    ref: 'Student', // Reference the Student model
    required: true
  },
  chemistry: { type: Number, required: true },
  math: { type: Number, required: true },
  english: { type: Number, required: true }
});

const Result_SS3 = mongoose.model('Result_SS3', resultSchemaSS3, /*'results_SS3'*/);

module.exports = Result_SS3

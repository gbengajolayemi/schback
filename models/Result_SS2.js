const mongoose = require('mongoose');

const resultSchemaSS2 = new mongoose.Schema({
  studentId: {
    type: String,
    ref: 'Student', // Reference the Student model
    required: true
  },
  chemistry: { type: Number, required: true },
  math: { type: Number, required: true },
  english: { type: Number, required: true }
});

const Result_SS2 = mongoose.model('Result_SS2', resultSchemaSS2, 'results_SS2');

module.exports = Result_SS2;

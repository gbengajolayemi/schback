const mongoose = require('mongoose');

const resultSchemaSS1 = new mongoose.Schema({
  studentId: {
    type: String,
    ref: 'Student', // Reference the Student model
    required: true
  },
  chemistry: { type: Number, required: true },
  math: { type: Number, required: true },
  english: { type: Number, required: true }
});

const Result_SS1 = mongoose.model('Result_SS1', resultSchemaSS1, 'results_SS1');

module.exports = Result_SS1;
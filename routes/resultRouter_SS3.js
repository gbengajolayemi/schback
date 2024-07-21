const express = require('express');
const router = express.Router();
const resultController_SS3 = require('../controllers/resultController_SS3');

// Route: POST /api/results/ss3/uploadResults
router.post('/uploadResults', resultController_SS3.uploadResults);

// Route: GET /api/results/ss3
router.get('/', resultController_SS3.getClassResultsSS3);

// Route: POST /api/results/ss3/uploadSingleResult
router.post('/uploadSingleResult', resultController_SS3.uploadSingleResult);

// Route: GET /api/results/ss3/:studentId
router.get('/:studentId', resultController_SS3.getSingleResult);

// Route: PUT /api/results/ss3/ss3students/:studentId (Edit student results by student ID)
router.put('/ss3students/:studentId', resultController_SS3.editSS3Student);

// Route: DELETE /api/results/ss3/ss3students/:studentId (Delete student results by student ID)
router.delete('/ss3students/:studentId', resultController_SS3.deleteSS3Student);

module.exports = router;

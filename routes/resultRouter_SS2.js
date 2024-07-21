const express = require('express');
const router = express.Router();
const resultController_SS2 = require('../controllers/resultController_SS2');

// Route: POST /api/results/ss2/uploadResults
router.post('/uploadResults', resultController_SS2.uploadResults);

// Route: GET /api/results/ss2
router.get('/', resultController_SS2.getClassResultsSS2);

// Route: POST /api/results/ss2/uploadSingleResult
router.post('/uploadSingleResult', resultController_SS2.uploadSingleResult);

// Route: GET /api/results/ss2/:studentId
router.get('/:studentId', resultController_SS2.getSingleResult);

// Route: PUT /api/results/ss2/ss2students/:studentId
router.put('/ss2students/:studentId', resultController_SS2.editSS2Student);

// Route: DELETE /api/results/ss2/ss2students/:studentId
router.delete('/ss2students/:studentId', resultController_SS2.deleteSS2Student);

module.exports = router;

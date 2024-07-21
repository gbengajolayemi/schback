const express = require('express');
const router = express.Router();
const resultController_SS1 = require('../controllers/resultController_SS1');

// Route: POST /api/results/ss1/uploadResults
router.post('/uploadResults', resultController_SS1.uploadResults);

// Route: GET /api/results/ss1
router.get('/', resultController_SS1.getClassResultsSS1);

// Route: POST /api/results/ss1/uploadSingleResult
router.post('/uploadSingleResult', resultController_SS1.uploadSingleResult);

// Route: GET /api/results/ss1/:studentId
router.get('/:studentId', resultController_SS1.getSingleResult);

// Route: PUT /api/results/ss1/:studentId
router.put('/:studentId', resultController_SS1.editSS1Result);

// Route: DELETE /api/results/ss1/:studentId
router.delete('/:studentId', resultController_SS1.deleteSS1Result);

module.exports = router;

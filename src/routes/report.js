const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

// Get report by patient and score ID
router.get('/patient/:patientId/score/:scoreId', ReportController.getReport);

// Get HTML report
router.get('/patient/:patientId/score/:scoreId/html', ReportController.getHTMLReport);

// Get latest report for patient
router.get('/patient/:patientId/latest', ReportController.getLatestReport);

module.exports = router;

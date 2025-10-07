const express = require('express');
const router = express.Router();
const QuestionnaireController = require('../controllers/QuestionnaireController');

// Submit questionnaire
router.post('/submit', QuestionnaireController.submitQuestionnaire);

// Get patient responses
router.get('/patient/:patientId/responses', QuestionnaireController.getPatientResponses);

// Get patient scores
router.get('/patient/:patientId/scores', QuestionnaireController.getPatientScores);

module.exports = router;

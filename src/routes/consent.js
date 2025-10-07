const express = require('express');
const router = express.Router();
const ConsentController = require('../controllers/ConsentController');

// Submit consent
router.post('/submit', ConsentController.submitConsent);

// Get patient consents
router.get('/patient/:patientId', ConsentController.getPatientConsents);

// Get consent for a score
router.get('/score/:scoreId', ConsentController.getScoreConsent);

module.exports = router;

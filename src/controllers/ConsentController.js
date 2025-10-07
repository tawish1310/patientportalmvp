const ConsentRecord = require('../models/ConsentRecord');
const Patient = require('../models/Patient');
const QualityOfLifeScore = require('../models/QualityOfLifeScore');

class ConsentController {
  /**
   * Submit consent to share report with doctor
   */
  static async submitConsent(req, res) {
    try {
      const { patientId, scoreId, doctorEmail, consentGiven } = req.body;

      // Validate input
      if (!patientId || !scoreId || !doctorEmail || consentGiven === undefined) {
        return res.status(400).json({ 
          error: 'Missing required fields: patientId, scoreId, doctorEmail, consentGiven' 
        });
      }

      // Verify patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      // Verify score exists
      const score = await QualityOfLifeScore.findById(scoreId);
      if (!score) {
        return res.status(404).json({ error: 'Score not found' });
      }

      // Create consent record
      const consent = await ConsentRecord.create(
        patientId,
        scoreId,
        doctorEmail,
        consentGiven
      );

      res.status(201).json({
        message: consentGiven 
          ? 'Consent granted. Report will be shared with doctor.' 
          : 'Consent declined.',
        consentId: consent.id,
        consent
      });
    } catch (error) {
      console.error('Error submitting consent:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get consent records for a patient
   */
  static async getPatientConsents(req, res) {
    try {
      const { patientId } = req.params;

      const consents = await ConsentRecord.findByPatientId(parseInt(patientId));
      
      res.json({
        patientId: parseInt(patientId),
        consents
      });
    } catch (error) {
      console.error('Error fetching consents:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get consent for a specific score
   */
  static async getScoreConsent(req, res) {
    try {
      const { scoreId } = req.params;

      const consent = await ConsentRecord.findByScoreId(parseInt(scoreId));
      
      if (!consent) {
        return res.status(404).json({ error: 'No consent found for this score' });
      }

      res.json(consent);
    } catch (error) {
      console.error('Error fetching consent:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ConsentController;

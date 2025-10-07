const Patient = require('../models/Patient');
const QuestionnaireResponse = require('../models/QuestionnaireResponse');
const QualityOfLifeScore = require('../models/QualityOfLifeScore');
const ScoreCalculationService = require('../services/ScoreCalculationService');
const LLMService = require('../services/LLMService');

class QuestionnaireController {
  /**
   * Submit questionnaire responses
   */
  static async submitQuestionnaire(req, res) {
    try {
      const { patientName, patientEmail, patientAge, responses } = req.body;

      // Validate input
      if (!patientName || !patientEmail || !responses || !Array.isArray(responses)) {
        return res.status(400).json({ 
          error: 'Missing required fields: patientName, patientEmail, responses' 
        });
      }

      // Create or find patient
      let patient = await Patient.findByEmail(patientEmail);
      if (!patient) {
        patient = await Patient.create(patientName, patientEmail, patientAge);
      }

      // Store responses with scores
      const responsesWithScores = responses.map(r => ({
        patientId: patient.id,
        questionId: r.questionId,
        questionText: r.questionText,
        answer: r.answer,
        score: ScoreCalculationService.getScoreForAnswer(r.answer)
      }));

      await QuestionnaireResponse.createBatch(responsesWithScores);

      // Calculate quality of life score
      const scoreData = await ScoreCalculationService.calculateScore(responsesWithScores);

      // Get LLM analysis
      const llmAnalysis = await LLMService.generatePersonalizedInsights(
        patient,
        responsesWithScores,
        scoreData
      );

      // Store the score and analysis
      const qualityScore = await QualityOfLifeScore.create(
        patient.id,
        scoreData.totalScore,
        JSON.stringify(llmAnalysis)
      );

      res.status(201).json({
        message: 'Questionnaire submitted successfully',
        patientId: patient.id,
        scoreId: qualityScore.id,
        score: scoreData.totalScore,
        analysis: llmAnalysis
      });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get patient responses
   */
  static async getPatientResponses(req, res) {
    try {
      const { patientId } = req.params;

      const responses = await QuestionnaireResponse.findByPatientId(patientId);
      
      res.json({
        patientId: parseInt(patientId),
        responses
      });
    } catch (error) {
      console.error('Error fetching responses:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get quality of life scores for a patient
   */
  static async getPatientScores(req, res) {
    try {
      const { patientId } = req.params;

      const scores = await QualityOfLifeScore.findByPatientId(patientId);
      
      res.json({
        patientId: parseInt(patientId),
        scores
      });
    } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = QuestionnaireController;

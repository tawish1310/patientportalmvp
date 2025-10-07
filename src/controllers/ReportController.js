const ReportGenerationService = require('../services/ReportGenerationService');
const Patient = require('../models/Patient');
const QualityOfLifeScore = require('../models/QualityOfLifeScore');

class ReportController {
  /**
   * Generate and retrieve report
   */
  static async getReport(req, res) {
    try {
      const { patientId, scoreId } = req.params;

      const report = await ReportGenerationService.generateReport(
        parseInt(patientId),
        parseInt(scoreId)
      );

      res.json(report);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get HTML version of report
   */
  static async getHTMLReport(req, res) {
    try {
      const { patientId, scoreId } = req.params;

      const report = await ReportGenerationService.generateReport(
        parseInt(patientId),
        parseInt(scoreId)
      );

      const htmlReport = ReportGenerationService.generateHTMLReport(report);

      res.setHeader('Content-Type', 'text/html');
      res.send(htmlReport);
    } catch (error) {
      console.error('Error generating HTML report:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get latest report for a patient
   */
  static async getLatestReport(req, res) {
    try {
      const { patientId } = req.params;

      const latestScore = await QualityOfLifeScore.getLatestByPatientId(
        parseInt(patientId)
      );

      if (!latestScore) {
        return res.status(404).json({ error: 'No scores found for patient' });
      }

      const report = await ReportGenerationService.generateReport(
        parseInt(patientId),
        latestScore.id
      );

      res.json(report);
    } catch (error) {
      console.error('Error generating latest report:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReportController;

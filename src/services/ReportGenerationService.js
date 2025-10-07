const Patient = require('../models/Patient');
const QualityOfLifeScore = require('../models/QualityOfLifeScore');
const QuestionnaireResponse = require('../models/QuestionnaireResponse');

class ReportGenerationService {
  /**
   * Generate a comprehensive report for a patient
   */
  static async generateReport(patientId, scoreId) {
    try {
      // Fetch patient data
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new Error('Patient not found');
      }

      // Fetch score data
      const score = await QualityOfLifeScore.findById(scoreId);
      if (!score) {
        throw new Error('Score not found');
      }

      // Fetch responses
      const responses = await QuestionnaireResponse.findByPatientId(patientId);

      // Generate report
      const report = {
        reportId: `RPT-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        patient: {
          name: patient.name,
          email: patient.email,
          age: patient.age
        },
        qualityOfLifeScore: {
          totalScore: score.total_score,
          scoreId: score.id,
          calculatedAt: score.created_at
        },
        llmAnalysis: score.llm_analysis ? JSON.parse(score.llm_analysis) : null,
        responses: responses.map(r => ({
          question: r.question_text,
          answer: r.answer,
          score: r.score
        })),
        summary: this.generateSummary(score.total_score, responses.length),
        recommendations: this.generateRecommendations(score.total_score)
      };

      return report;
    } catch (error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  }

  /**
   * Generate summary text
   */
  static generateSummary(totalScore, numberOfQuestions) {
    return `This report is based on ${numberOfQuestions} questionnaire responses with an overall quality of life score of ${totalScore}/100.`;
  }

  /**
   * Generate recommendations based on score
   */
  static generateRecommendations(score) {
    const recommendations = [];
    
    if (score < 40) {
      recommendations.push('Immediate consultation with healthcare provider recommended');
      recommendations.push('Consider comprehensive health assessment');
    } else if (score < 60) {
      recommendations.push('Schedule follow-up with healthcare provider');
      recommendations.push('Implement lifestyle modifications');
    } else if (score < 80) {
      recommendations.push('Maintain current health practices');
      recommendations.push('Regular monitoring recommended');
    } else {
      recommendations.push('Continue excellent health practices');
      recommendations.push('Annual check-ups recommended');
    }
    
    return recommendations;
  }

  /**
   * Generate HTML version of the report
   */
  static generateHTMLReport(reportData) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Quality of Life Report</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
        .score { font-size: 48px; font-weight: bold; color: #27ae60; }
        .recommendations { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #3498db; color: white; }
    </style>
</head>
<body>
    <h1>Quality of Life Assessment Report</h1>
    
    <div class="section">
        <h2>Patient Information</h2>
        <p><strong>Name:</strong> ${reportData.patient.name}</p>
        <p><strong>Report ID:</strong> ${reportData.reportId}</p>
        <p><strong>Generated:</strong> ${new Date(reportData.generatedAt).toLocaleString()}</p>
    </div>
    
    <div class="section">
        <h2>Quality of Life Score</h2>
        <div class="score">${reportData.qualityOfLifeScore.totalScore}/100</div>
        <p>${reportData.summary}</p>
    </div>
    
    ${reportData.llmAnalysis ? `
    <div class="section">
        <h2>Analysis</h2>
        <p><strong>Category:</strong> ${reportData.llmAnalysis.category}</p>
        <p><strong>Summary:</strong> ${reportData.llmAnalysis.summary}</p>
    </div>
    ` : ''}
    
    <div class="section recommendations">
        <h2>Recommendations</h2>
        <ul>
            ${reportData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>
    
    <div class="section">
        <h2>Response Summary</h2>
        <table>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                ${reportData.responses.map(r => `
                    <tr>
                        <td>${r.question}</td>
                        <td>${r.answer}</td>
                        <td>${r.score || 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <p><em>This report is for informational purposes only and should be discussed with your healthcare provider.</em></p>
    </div>
</body>
</html>
    `;
  }
}

module.exports = ReportGenerationService;

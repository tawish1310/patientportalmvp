const QuestionnaireResponse = require('../models/QuestionnaireResponse');

class ScoreCalculationService {
  /**
   * Calculate quality of life score based on questionnaire responses
   * This is a simple scoring system where each answer has a score
   * The total score is normalized to 0-100 scale
   */
  static async calculateScore(responses) {
    if (!responses || responses.length === 0) {
      throw new Error('No responses provided for scoring');
    }

    let totalScore = 0;
    let maxPossibleScore = 0;

    responses.forEach(response => {
      // Assign score based on answer (this is a simplified scoring)
      const score = response.score || this.getScoreForAnswer(response.answer);
      totalScore += score;
      maxPossibleScore += 5; // Assuming max score per question is 5
    });

    // Normalize to 0-100 scale
    const normalizedScore = (totalScore / maxPossibleScore) * 100;
    
    return {
      totalScore: normalizedScore.toFixed(2),
      rawScore: totalScore,
      maxPossibleScore: maxPossibleScore,
      numberOfQuestions: responses.length
    };
  }

  /**
   * Simple scoring logic for common answer patterns
   */
  static getScoreForAnswer(answer) {
    const lowerAnswer = answer.toLowerCase().trim();
    
    // Frequency-based scoring (e.g., "Never", "Rarely", "Sometimes", "Often", "Always")
    const frequencyMap = {
      'never': 5,
      'rarely': 4,
      'sometimes': 3,
      'often': 2,
      'always': 1
    };
    
    // Quality-based scoring (e.g., "Excellent", "Good", "Fair", "Poor")
    const qualityMap = {
      'excellent': 5,
      'very good': 4,
      'good': 3,
      'fair': 2,
      'poor': 1
    };
    
    // Agreement-based scoring
    const agreementMap = {
      'strongly agree': 5,
      'agree': 4,
      'neutral': 3,
      'disagree': 2,
      'strongly disagree': 1
    };
    
    // Check which map the answer belongs to
    if (frequencyMap[lowerAnswer] !== undefined) {
      return frequencyMap[lowerAnswer];
    } else if (qualityMap[lowerAnswer] !== undefined) {
      return qualityMap[lowerAnswer];
    } else if (agreementMap[lowerAnswer] !== undefined) {
      return agreementMap[lowerAnswer];
    }
    
    // For numeric answers (1-5 scale)
    const numericValue = parseInt(answer);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
      return numericValue;
    }
    
    // Default score
    return 3;
  }
}

module.exports = ScoreCalculationService;

const db = require('../database/db');

class QualityOfLifeScore {
  static create(patientId, totalScore, llmAnalysis = null) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO quality_of_life_scores 
        (patient_id, total_score, llm_analysis) 
        VALUES (?, ?, ?)`;
      db.run(sql, [patientId, totalScore, llmAnalysis], function(err) {
        if (err) reject(err);
        else resolve({ 
          id: this.lastID, 
          patientId, 
          totalScore, 
          llmAnalysis 
        });
      });
    });
  }

  static findByPatientId(patientId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM quality_of_life_scores 
        WHERE patient_id = ? 
        ORDER BY created_at DESC`;
      db.all(sql, [patientId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM quality_of_life_scores WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static getLatestByPatientId(patientId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM quality_of_life_scores 
        WHERE patient_id = ? 
        ORDER BY created_at DESC 
        LIMIT 1`;
      db.get(sql, [patientId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = QualityOfLifeScore;

const db = require('../database/db');

class QuestionnaireResponse {
  static create(patientId, questionId, questionText, answer, score = null) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO questionnaire_responses 
        (patient_id, question_id, question_text, answer, score) 
        VALUES (?, ?, ?, ?, ?)`;
      db.run(sql, [patientId, questionId, questionText, answer, score], function(err) {
        if (err) reject(err);
        else resolve({ 
          id: this.lastID, 
          patientId, 
          questionId, 
          questionText, 
          answer, 
          score 
        });
      });
    });
  }

  static createBatch(responses) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        const stmt = db.prepare(`INSERT INTO questionnaire_responses 
          (patient_id, question_id, question_text, answer, score) 
          VALUES (?, ?, ?, ?, ?)`);
        
        const results = [];
        let errors = [];
        
        responses.forEach((response) => {
          stmt.run([
            response.patientId,
            response.questionId,
            response.questionText,
            response.answer,
            response.score || null
          ], function(err) {
            if (err) {
              errors.push(err);
            } else {
              results.push({ id: this.lastID, ...response });
            }
          });
        });
        
        stmt.finalize((err) => {
          if (err || errors.length > 0) {
            reject(errors.length > 0 ? errors[0] : err);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  static findByPatientId(patientId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM questionnaire_responses WHERE patient_id = ? ORDER BY created_at';
      db.all(sql, [patientId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM questionnaire_responses ORDER BY created_at DESC';
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = QuestionnaireResponse;

const db = require('../database/db');

class ConsentRecord {
  static create(patientId, scoreId, doctorEmail, consentGiven) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO consent_records 
        (patient_id, score_id, doctor_email, consent_given) 
        VALUES (?, ?, ?, ?)`;
      db.run(sql, [patientId, scoreId, doctorEmail, consentGiven], function(err) {
        if (err) reject(err);
        else resolve({ 
          id: this.lastID, 
          patientId, 
          scoreId, 
          doctorEmail, 
          consentGiven 
        });
      });
    });
  }

  static findByScoreId(scoreId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM consent_records WHERE score_id = ?';
      db.get(sql, [scoreId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static findByPatientId(patientId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM consent_records 
        WHERE patient_id = ? 
        ORDER BY consent_date DESC`;
      db.all(sql, [patientId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = ConsentRecord;

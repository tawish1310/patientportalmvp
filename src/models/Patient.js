const db = require('../database/db');

class Patient {
  static create(name, email, age) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO patients (name, email, age) VALUES (?, ?, ?)';
      db.run(sql, [name, email, age], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, email, age });
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients ORDER BY created_at DESC';
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = Patient;

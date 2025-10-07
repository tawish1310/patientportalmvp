const db = require('./db');

// Initialize database tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create patients table
      db.run(`
        CREATE TABLE IF NOT EXISTS patients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          age INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('Error creating patients table:', err);
      });

      // Create questionnaire_responses table
      db.run(`
        CREATE TABLE IF NOT EXISTS questionnaire_responses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          question_id TEXT NOT NULL,
          question_text TEXT NOT NULL,
          answer TEXT NOT NULL,
          score INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients(id)
        )
      `, (err) => {
        if (err) console.error('Error creating questionnaire_responses table:', err);
      });

      // Create quality_of_life_scores table
      db.run(`
        CREATE TABLE IF NOT EXISTS quality_of_life_scores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          total_score REAL NOT NULL,
          llm_analysis TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients(id)
        )
      `, (err) => {
        if (err) console.error('Error creating quality_of_life_scores table:', err);
      });

      // Create consent_records table
      db.run(`
        CREATE TABLE IF NOT EXISTS consent_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          score_id INTEGER NOT NULL,
          doctor_email TEXT NOT NULL,
          consent_given BOOLEAN NOT NULL,
          consent_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients(id),
          FOREIGN KEY (score_id) REFERENCES quality_of_life_scores(id)
        )
      `, (err) => {
        if (err) console.error('Error creating consent_records table:', err);
        else {
          console.log('All tables created successfully');
          resolve();
        }
      });
    });
  });
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('Database initialized successfully');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error initializing database:', err);
      process.exit(1);
    });
}

module.exports = { initDatabase };

const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Submit patient questionnaire
router.post('/submit', (req, res) => {
  const { name, email, age, answers } = req.body;

  // Validate input
  if (!name || !email || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert patient
  const insertPatient = `INSERT INTO patients (name, email, age) VALUES (?, ?, ?)`;
  
  db.run(insertPatient, [name, email, age], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }

    const patientId = this.lastID;

    // Insert answers
    const insertAnswer = `INSERT INTO responses (patient_id, question_id, answer, score) VALUES (?, ?, ?, ?)`;
    let completed = 0;
    let totalScore = 0;

    answers.forEach((item, index) => {
      const score = item.score || 0;
      totalScore += score;
      
      db.run(insertAnswer, [patientId, item.questionId, item.answer, score], (err) => {
        if (err) {
          console.error('Error inserting answer:', err.message);
        }
        
        completed++;
        
        // When all answers are inserted, calculate and save quality of life score
        if (completed === answers.length) {
          const categoryScores = JSON.stringify({
            physical: answers.filter(a => a.category === 'physical').reduce((sum, a) => sum + (a.score || 0), 0),
            mental: answers.filter(a => a.category === 'mental').reduce((sum, a) => sum + (a.score || 0), 0),
            social: answers.filter(a => a.category === 'social').reduce((sum, a) => sum + (a.score || 0), 0)
          });

          const insertScore = `INSERT INTO quality_of_life_scores (patient_id, total_score, category_scores) VALUES (?, ?, ?)`;
          
          db.run(insertScore, [patientId, totalScore, categoryScores], (err) => {
            if (err) {
              console.error('Error inserting quality of life score:', err.message);
            }
            
            res.json({ 
              message: 'Questionnaire submitted successfully', 
              patientId: patientId,
              totalScore: totalScore
            });
          });
        }
      });
    });
  });
});

// Get all patients
router.get('/patients', (req, res) => {
  db.all('SELECT * FROM patients ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get patient responses
router.get('/patients/:id/responses', (req, res) => {
  const patientId = req.params.id;
  
  db.all('SELECT * FROM responses WHERE patient_id = ? ORDER BY question_id', [patientId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get quality of life scores
router.get('/scores', (req, res) => {
  const query = `
    SELECT q.*, p.name, p.email, p.age
    FROM quality_of_life_scores q
    JOIN patients p ON q.patient_id = p.id
    ORDER BY q.calculated_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;

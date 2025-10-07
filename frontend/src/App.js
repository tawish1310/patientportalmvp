import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  const handleSubmitSuccess = (data) => {
    setSubmitted(true);
    setScoreData(data);
  };

  const handleReset = () => {
    setSubmitted(false);
    setScoreData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Patient Quality of Life Assessment</h1>
        <p>Help us understand your well-being</p>
      </header>
      
      <main className="App-main">
        {!submitted ? (
          <PatientForm onSubmitSuccess={handleSubmitSuccess} />
        ) : (
          <div className="success-message">
            <h2>✓ Thank You!</h2>
            <p>Your questionnaire has been submitted successfully.</p>
            {scoreData && (
              <div className="score-info">
                <p><strong>Patient ID:</strong> {scoreData.patientId}</p>
                <p><strong>Total Score:</strong> {scoreData.totalScore}</p>
              </div>
            )}
            <button onClick={handleReset} className="btn btn-secondary">
              Submit Another Response
            </button>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2024 Patient Portal MVP - Quality of Life Assessment</p>
      </footer>
    </div>
  );
}

export default App;

# Patient Portal MVP

Building a quick Q&A form to analyze patient Quality of Life score.

## Overview

This application consists of:
- **React Frontend**: A user-friendly form for patients to answer quality of life questionnaires
- **Node.js Backend**: Express API server to handle form submissions and store data
- **SQLite Database**: Stores patient information, responses, and calculated quality of life scores
- **Python Notebooks**: Analyze and aggregate patient data to generate insights

## Features

- ✅ Patient information collection (name, email, age)
- ✅ 9 quality of life questions across 3 categories:
  - Physical Health
  - Mental Well-being
  - Social Relationships
- ✅ Automatic score calculation based on responses
- ✅ Data storage in SQLite database
- ✅ Python notebooks for data analysis and visualization
- ✅ Quality of life score aggregation and reporting

## Project Structure

```
patientportalmvp/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── PatientForm.js
│   │   │   └── PatientForm.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
├── backend/                # Express API server
│   ├── routes/
│   │   └── api.js         # API routes
│   ├── models/
│   │   └── database.js    # Database initialization
│   ├── server.js          # Server entry point
│   └── package.json
├── notebooks/              # Python Jupyter notebooks
│   ├── analyze_quality_of_life.ipynb
│   └── requirements.txt
├── data/                   # Database storage (created on first run)
│   └── patient_portal.db
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

### Python Notebooks Setup

1. Navigate to the notebooks directory:
   ```bash
   cd notebooks
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

4. Open `analyze_quality_of_life.ipynb` to analyze the patient data

## Usage

### Submitting a Questionnaire

1. Open the application in your browser
2. Fill in your personal information (name, email, age)
3. Answer all 9 quality of life questions
4. Click "Submit Questionnaire"
5. You'll receive a confirmation with your patient ID and total score

### Analyzing Data

1. After patients have submitted responses, open the Jupyter notebook
2. Run all cells to:
   - Load patient data from the database
   - Calculate summary statistics
   - Visualize score distributions
   - Analyze scores by age group
   - Generate individual patient profiles
   - Export summary reports

## API Endpoints

### POST `/api/submit`
Submit a patient questionnaire

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 35,
  "answers": [
    {
      "questionId": 1,
      "answer": "Good",
      "score": 3,
      "category": "physical"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Questionnaire submitted successfully",
  "patientId": 1,
  "totalScore": 27
}
```

### GET `/api/patients`
Get all patients

### GET `/api/patients/:id/responses`
Get responses for a specific patient

### GET `/api/scores`
Get all quality of life scores with patient information

## Database Schema

### patients
- `id`: Primary key
- `name`: Patient name
- `email`: Patient email (unique)
- `age`: Patient age
- `created_at`: Timestamp

### responses
- `id`: Primary key
- `patient_id`: Foreign key to patients
- `question_id`: Question identifier
- `answer`: Text answer
- `score`: Numeric score (1-5)
- `created_at`: Timestamp

### quality_of_life_scores
- `id`: Primary key
- `patient_id`: Foreign key to patients
- `total_score`: Sum of all scores
- `category_scores`: JSON object with scores per category
- `calculated_at`: Timestamp

## Quality of Life Scoring

Each question is scored from 1-5:
- 5: Best possible outcome
- 4: Very good
- 3: Good/Neutral
- 2: Fair/Poor
- 1: Worst possible outcome

**Score Ranges:**
- Minimum: 9 (all questions scored 1)
- Maximum: 45 (all questions scored 5)

**Categories:**
- Physical Health: 3 questions (max 15 points)
- Mental Well-being: 3 questions (max 15 points)
- Social Relationships: 3 questions (max 15 points)

## Future Enhancements

- [ ] User authentication and patient login
- [ ] Historical tracking of patient scores over time
- [ ] Email notifications for completed assessments
- [ ] Advanced analytics dashboard
- [ ] Export data to PDF reports
- [ ] Mobile app version

## License

MIT License

## Contributors

Built as a Patient Portal MVP for quality of life assessment.

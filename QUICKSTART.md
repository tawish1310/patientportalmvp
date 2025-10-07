# Quick Start Guide

This guide will help you get the Patient Portal MVP up and running quickly.

## Prerequisites

- Node.js v16+ installed
- Python 3.8+ installed
- npm or yarn package manager

## Quick Setup (All-in-One)

### 1. Install All Dependencies

```bash
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install Python dependencies (optional - for analysis)
cd notebooks
pip install -r requirements.txt
cd ..
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend API will start on `http://localhost:3001`

### 3. Start the Frontend (in a new terminal)

```bash
cd frontend
npm start
```

The React app will open automatically at `http://localhost:3000`

## Using the Application

1. Open your browser to `http://localhost:3000`
2. Fill in your personal information:
   - Full Name
   - Email Address
   - Age
3. Answer all 9 quality of life questions across three categories:
   - **Physical Health** (3 questions)
   - **Mental Well-being** (3 questions)
   - **Social Relationships** (3 questions)
4. Click "Submit Questionnaire"
5. You'll receive confirmation with your Patient ID and Total Score

## Testing the Backend API

You can test the API directly using curl:

### Health Check
```bash
curl http://localhost:3001/health
```

### Submit a Questionnaire
```bash
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "email": "test@example.com",
    "age": 30,
    "answers": [
      {"questionId": 1, "answer": "Good", "score": 3, "category": "physical"},
      {"questionId": 2, "answer": "Sometimes", "score": 3, "category": "physical"},
      {"questionId": 3, "answer": "Satisfied", "score": 4, "category": "physical"},
      {"questionId": 4, "answer": "Good", "score": 3, "category": "mental"},
      {"questionId": 5, "answer": "Sometimes", "score": 3, "category": "mental"},
      {"questionId": 6, "answer": "Satisfied", "score": 4, "category": "mental"},
      {"questionId": 7, "answer": "Satisfied", "score": 4, "category": "social"},
      {"questionId": 8, "answer": "Often", "score": 4, "category": "social"},
      {"questionId": 9, "answer": "Good", "score": 3, "category": "social"}
    ]
  }'
```

### Get All Patients
```bash
curl http://localhost:3001/api/patients
```

### Get Quality of Life Scores
```bash
curl http://localhost:3001/api/scores
```

## Analyzing Data with Python

After collecting patient responses:

1. Navigate to the notebooks directory:
   ```bash
   cd notebooks
   ```

2. Start Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

3. Open `analyze_quality_of_life.ipynb`

4. Run all cells to:
   - Load patient data from the database
   - Calculate summary statistics
   - Visualize score distributions
   - Analyze scores by age group
   - Generate individual patient profiles
   - Export summary reports to CSV

## Database Location

The SQLite database is created automatically at:
```
data/patient_portal.db
```

## Troubleshooting

### Backend won't start
- Ensure port 3001 is not in use
- Check that the `data/` directory exists
- Verify all npm packages are installed

### Frontend won't start
- Ensure port 3000 is not in use
- Check that all npm packages are installed
- Clear browser cache if seeing old versions

### Database errors
- Ensure the `data/` directory exists in the project root
- Check file permissions
- Verify sqlite3 package is installed

### Python notebook issues
- Ensure all packages in requirements.txt are installed
- Verify the database file exists and has data
- Check Python version (3.8+ required)

## What's Next?

After successfully running the application, you can:
- Submit multiple patient questionnaires
- View the data in the database
- Run the Python analysis notebook
- Customize the questions in `frontend/src/components/PatientForm.js`
- Add more API endpoints in `backend/routes/api.js`
- Enhance the analytics in the Jupyter notebook

## Production Deployment Notes

For production deployment:
1. Build the frontend: `cd frontend && npm run build`
2. Set up environment variables for database location
3. Use a process manager like PM2 for the backend
4. Set up a reverse proxy (nginx) for the frontend
5. Use PostgreSQL or MySQL instead of SQLite for better scalability
6. Add authentication and authorization
7. Implement HTTPS
# Patient Portal MVP - Quick Start Guide

## Overview
A complete web application for collecting medical questionnaire responses, calculating quality of life scores, and generating reports with AI-powered analysis.

## Quick Start

### 1. Installation
```bash
npm install
npm run init-db
```

### 2. Start Server
```bash
npm start
```
Visit: http://localhost:3000

### 3. Complete Assessment
1. Enter patient information (name, email, age)
2. Answer 10 quality of life questions
3. View your personalized score and recommendations
4. Optionally consent to share report with doctor

## System Architecture

### Database Schema
```
patients
├── id (PK)
├── name
├── email (unique)
├── age
└── created_at

questionnaire_responses
├── id (PK)
├── patient_id (FK)
├── question_id
├── question_text
├── answer
├── score
└── created_at

quality_of_life_scores
├── id (PK)
├── patient_id (FK)
├── total_score
├── llm_analysis (JSON)
└── created_at

consent_records
├── id (PK)
├── patient_id (FK)
├── score_id (FK)
├── doctor_email
├── consent_given
└── consent_date
```

### API Endpoints

**Health Check**
- GET `/api/health` - Check if API is running

**Questionnaire**
- POST `/api/questionnaire/submit` - Submit questionnaire
- GET `/api/questionnaire/patient/:id/responses` - Get responses
- GET `/api/questionnaire/patient/:id/scores` - Get scores

**Reports**
- GET `/api/report/patient/:pid/score/:sid` - Get JSON report
- GET `/api/report/patient/:pid/score/:sid/html` - Get HTML report
- GET `/api/report/patient/:pid/latest` - Get latest report

**Consent**
- POST `/api/consent/submit` - Submit consent
- GET `/api/consent/patient/:id` - Get patient consents
- GET `/api/consent/score/:id` - Get score consent

## Scoring System

### Answer to Score Mapping
- **Quality Scale**: Excellent (5), Very Good (4), Good (3), Fair (2), Poor (1)
- **Frequency Scale**: Never/Always (5), Rarely/Often (4), Sometimes (3), etc.
- **Agreement Scale**: Strongly Agree (5) → Strongly Disagree (1)

### Score Calculation
1. Each answer mapped to 1-5 score
2. Total score calculated
3. Normalized to 0-100 scale
4. Categorized: Excellent (80+), Good (60-79), Fair (40-59), Needs Attention (<40)

### LLM Analysis
- Personalized recommendations based on score
- Key findings identification
- Age-tailored guidance
- Follow-up action suggestions

## Example Usage

### Submit Questionnaire
```bash
curl -X POST http://localhost:3000/api/questionnaire/submit \
  -H "Content-Type: application/json" \
  -d '{
    "patientName": "John Doe",
    "patientEmail": "john@example.com",
    "patientAge": 35,
    "responses": [
      {
        "questionId": "q1",
        "questionText": "How would you rate your overall physical health?",
        "answer": "Good"
      }
    ]
  }'
```

### Get Report
```bash
curl http://localhost:3000/api/report/patient/1/latest
```

### Submit Consent
```bash
curl -X POST http://localhost:3000/api/consent/submit \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": 1,
    "scoreId": 1,
    "doctorEmail": "doctor@clinic.com",
    "consentGiven": true
  }'
```

## Development

### Project Structure
```
patientportalmvp/
├── src/
│   ├── index.js                 # Main server
│   ├── database/               # Database setup
│   ├── models/                 # Data models
│   ├── services/              # Business logic
│   ├── controllers/           # Request handlers
│   └── routes/                # API routes
├── public/
│   ├── index.html             # Frontend UI
│   └── app.js                 # Frontend logic
├── data/                      # SQLite database
├── package.json
└── README.md
```

### Environment Variables
Create a `.env` file based on `.env.example`:
```
PORT=3000
DATABASE_PATH=./data/patientportal.sqlite
LLM_API_KEY=your_api_key_here
LLM_API_ENDPOINT=https://api.openai.com/v1/chat/completions
```

## Features

✅ Interactive questionnaire form  
✅ Real-time score calculation  
✅ AI-powered analysis  
✅ HTML report generation  
✅ Consent management  
✅ RESTful API  
✅ SQLite database  
✅ Responsive UI  

## Testing

The system has been tested with:
- Patient registration
- Complete questionnaire flow (10 questions)
- Score calculation and categorization
- LLM analysis generation
- JSON and HTML report generation
- Consent workflow
- All API endpoints

## Future Enhancements

- Real LLM API integration (OpenAI, Anthropic)
- User authentication
- Email service for reports
- Data encryption
- Admin dashboard
- Unit tests
- Cloud deployment

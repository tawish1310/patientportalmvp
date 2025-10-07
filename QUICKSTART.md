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

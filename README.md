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
A comprehensive patient portal application for collecting medical questionnaire responses, calculating quality of life scores, and generating detailed reports with LLM-powered analysis.

## Features

- **Medical Questionnaire Form**: Interactive web-based questionnaire to collect patient responses
- **Database Storage**: SQLite database for storing patient information, responses, scores, and consent records
- **Quality of Life Score Calculation**: Intelligent scoring system that analyzes responses and calculates normalized scores (0-100)
- **LLM Integration**: AI-powered analysis service that provides personalized insights and recommendations
- **Report Generation**: Automated generation of comprehensive HTML reports
- **Consent Management**: Patient consent workflow for sharing reports with healthcare providers
- **RESTful API**: Complete backend API for all operations

## Technology Stack

- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Architecture**: MVC pattern with service layer

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
├── src/
│   ├── index.js                 # Main application entry point
│   ├── database/
│   │   ├── db.js               # Database connection
│   │   └── init.js             # Database initialization
│   ├── models/
│   │   ├── Patient.js          # Patient data model
│   │   ├── QuestionnaireResponse.js
│   │   ├── QualityOfLifeScore.js
│   │   └── ConsentRecord.js
│   ├── services/
│   │   ├── ScoreCalculationService.js  # Score calculation logic
│   │   ├── LLMService.js              # LLM analysis integration
│   │   └── ReportGenerationService.js # Report generation
│   ├── controllers/
│   │   ├── QuestionnaireController.js
│   │   ├── ReportController.js
│   │   └── ConsentController.js
│   └── routes/
│       ├── questionnaire.js
│       ├── report.js
│       └── consent.js
├── public/
│   ├── index.html              # Frontend UI
│   └── app.js                  # Frontend JavaScript
├── data/                       # SQLite database storage
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tawish1310/patientportalmvp.git
   cd patientportalmvp
   ```

2. **Install dependencies**:
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
3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

4. **Initialize the database**:
   ```bash
   npm run init-db
   ```

## Usage

### Starting the Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

### Using the Application

1. **Fill Patient Information**: Enter name, email, and age
2. **Complete Questionnaire**: Answer all 10 quality of life questions
3. **View Results**: See your quality of life score and personalized recommendations
4. **Share Report**: Optionally consent to share the report with your doctor
5. **View Full Report**: Access detailed HTML report

## API Endpoints

### Questionnaire

- `POST /api/questionnaire/submit` - Submit questionnaire responses
  ```json
  {
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
  }
  ```

- `GET /api/questionnaire/patient/:patientId/responses` - Get patient responses
- `GET /api/questionnaire/patient/:patientId/scores` - Get patient scores

### Reports

- `GET /api/report/patient/:patientId/score/:scoreId` - Get JSON report
- `GET /api/report/patient/:patientId/score/:scoreId/html` - Get HTML report
- `GET /api/report/patient/:patientId/latest` - Get latest report

### Consent

- `POST /api/consent/submit` - Submit consent record
  ```json
  {
    "patientId": 1,
    "scoreId": 1,
    "doctorEmail": "doctor@clinic.com",
    "consentGiven": true
  }
  ```

- `GET /api/consent/patient/:patientId` - Get patient consents
- `GET /api/consent/score/:scoreId` - Get consent for score

### Health Check

- `GET /api/health` - API health status

## Database Schema

### Tables

1. **patients**: Patient information
2. **questionnaire_responses**: Individual question responses
3. **quality_of_life_scores**: Calculated scores with LLM analysis
4. **consent_records**: Patient consent for sharing reports

## Quality of Life Scoring System

The system uses a sophisticated scoring algorithm:

1. **Answer Mapping**: Maps text responses to numeric scores (1-5)
2. **Score Calculation**: Aggregates individual question scores
3. **Normalization**: Converts to 0-100 scale
4. **Categorization**: Classifies scores into categories (Excellent, Good, Fair, Needs Attention)

## LLM Analysis Service

The LLM service provides:

- **Score Interpretation**: Contextual analysis of the quality of life score
- **Personalized Recommendations**: Tailored advice based on responses
- **Key Findings**: Identification of areas needing attention
- **Follow-up Actions**: Suggested next steps

*Note: Current implementation uses rule-based analysis. For production, integrate with OpenAI or similar LLM API.*

## Development

### Running Tests

```bash
npm test
```

### Adding New Questions

Edit the `questions` array in `public/app.js` to add or modify questionnaire questions.

### Customizing Scoring

Modify `src/services/ScoreCalculationService.js` to adjust scoring logic.

## License

ISC

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

Patient Portal MVP Team

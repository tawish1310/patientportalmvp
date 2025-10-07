# Patient Portal MVP

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

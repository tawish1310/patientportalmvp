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

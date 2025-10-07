# Application Screenshots and Features

## Main Application Features

### 1. Patient Information Form
The application starts with a clean, professional interface that collects:
- **Full Name** (required)
- **Email Address** (required, validated)
- **Age** (required, numeric input)

### 2. Quality of Life Questions

The questionnaire includes 9 carefully designed questions across three categories:

#### Physical Health (Questions 1-3)
1. Overall physical health rating
2. Frequency of pain or discomfort
3. Satisfaction with daily activities

#### Mental Well-being (Questions 4-6)
4. Mental and emotional well-being rating
5. Frequency of anxiety or stress
6. Sleep quality satisfaction

#### Social Relationships (Questions 7-9)
7. Personal relationships satisfaction
8. Social activities engagement
9. Work-life balance rating

### 3. Scoring System

Each question offers 5 response options scored from 1-5:
- **5 points**: Excellent/Very Satisfied/Never (for negative questions)
- **4 points**: Very Good/Satisfied/Rarely
- **3 points**: Good/Neutral/Sometimes
- **2 points**: Fair/Dissatisfied/Often
- **1 point**: Poor/Very Dissatisfied/Always (for negative questions)

**Total Possible Score Range**: 9 - 45 points
- Physical Health: 3 - 15 points
- Mental Well-being: 3 - 15 points
- Social Relationships: 3 - 15 points

### 4. User Interface Features

#### Form Design
- **Gradient header** with purple/blue theme
- **Responsive layout** that works on mobile and desktop
- **Clear section separation** between personal info and questions
- **Color-coded categories** (blue for physical, purple for mental, green for social)
- **Radio button selections** for easy answering
- **Real-time validation** with error messages
- **Disabled submit** until all fields are complete

#### Success Page
After submission, users see:
- **Confirmation message** with checkmark
- **Patient ID** for their records
- **Total Quality of Life Score**
- **Option to submit another response**

### 5. Visual Design Elements

#### Colors
- Primary: Purple gradient (#667eea to #764ba2)
- Physical category: Light blue (#e3f2fd, #1976d2)
- Mental category: Light purple (#f3e5f5, #7b1fa2)
- Social category: Light green (#e8f5e9, #388e3c)
- Success: Green (#4caf50)
- Error: Red (#dc3545)

#### Typography
- System font stack for compatibility
- Clear hierarchy with varying font sizes
- Bold labels for form fields
- Question numbers and categories clearly marked

#### Spacing
- Generous padding for readability
- Grouped questions in cards
- Clear separation between sections
- White space to reduce cognitive load

### 6. Data Analysis Features (Python Notebooks)

The included Jupyter notebook provides:

#### Statistical Analysis
- Mean, median, and standard deviation of scores
- Category-wise score breakdowns
- Age group comparisons

#### Visualizations
- Score distribution histograms
- Box plots for outlier detection
- Category comparison bar charts
- Age group analysis charts
- Individual patient radar charts

#### Export Features
- CSV export of all scores
- Summary reports
- Individual patient profiles

### 7. API Endpoints

The backend provides RESTful API endpoints:
- `POST /api/submit` - Submit questionnaire
- `GET /api/patients` - List all patients
- `GET /api/patients/:id/responses` - Get patient responses
- `GET /api/scores` - Get all quality of life scores
- `GET /health` - API health check

## User Flow

1. **Landing** → User sees header and form
2. **Information Entry** → Fill personal details
3. **Question Answering** → Select answers for all 9 questions
4. **Validation** → Form checks all fields are complete
5. **Submission** → Data sent to backend API
6. **Database Storage** → SQLite stores patient, responses, and scores
7. **Confirmation** → Success screen with results
8. **Analysis** → Admin/researcher uses Python notebooks to analyze aggregate data

## Technical Architecture

```
┌─────────────────┐
│  React Frontend │ (Port 3000)
│  - Patient Form │
│  - Validation   │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│  Express API    │ (Port 3000)
│  - Routes       │
│  - Validation   │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│ SQLite Database │
│  - patients     │
│  - responses    │
│  - scores       │
└────────┬────────┘
         │ Query
         ▼
┌─────────────────┐
│ Python Notebook │
│  - Analytics    │
│  - Visualization│
│  - Reporting    │
└─────────────────┘
```

## Quality of Life Score Interpretation

The scoring system helps healthcare providers understand patient well-being:

### Overall Score Ranges (Total: 9-45)
- **36-45**: Excellent quality of life
- **27-35**: Good quality of life
- **18-26**: Fair quality of life
- **9-17**: Poor quality of life

### Category Scores (Each: 3-15)
- **12-15**: Excellent in this area
- **9-11**: Good in this area
- **6-8**: Fair in this area
- **3-5**: Needs attention in this area

## Future Enhancements

Potential features to add:
- User authentication for patients
- Historical tracking of scores over time
- Email notifications
- PDF report generation
- More detailed analytics dashboard
- Mobile app version
- Multi-language support
- Accessibility improvements
- Integration with EHR systems

// API Base URL
const API_BASE_URL = '/api';

// Store patient and assessment data
let patientData = {
    patientId: null,
    scoreId: null,
    name: '',
    email: '',
    age: null
};

// Sample questionnaire questions
const questions = [
    {
        id: 'q1',
        text: 'How would you rate your overall physical health?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q2',
        text: 'How often do you experience pain or discomfort?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
    },
    {
        id: 'q3',
        text: 'How would you rate your energy levels?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q4',
        text: 'How well are you able to perform daily activities?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q5',
        text: 'How satisfied are you with your sleep quality?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q6',
        text: 'How often do you feel stressed or anxious?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
    },
    {
        id: 'q7',
        text: 'How would you rate your emotional well-being?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q8',
        text: 'How satisfied are you with your social relationships?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    {
        id: 'q9',
        text: 'How often do you engage in physical exercise?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never']
    },
    {
        id: 'q10',
        text: 'How satisfied are you with your overall quality of life?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    }
];

// Navigate between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Start questionnaire
function startQuestionnaire() {
    const name = document.getElementById('patientName').value.trim();
    const email = document.getElementById('patientEmail').value.trim();
    const age = document.getElementById('patientAge').value;
    
    if (!name || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    patientData.name = name;
    patientData.email = email;
    patientData.age = age ? parseInt(age) : null;
    
    renderQuestions();
    showSection('section-questionnaire');
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Render questionnaire questions
function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${question.text}`;
        questionCard.appendChild(questionTitle);
        
        const radioGroup = document.createElement('div');
        radioGroup.className = 'radio-group';
        
        question.options.forEach(option => {
            const radioOption = document.createElement('div');
            radioOption.className = 'radio-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = question.id;
            radio.value = option;
            radio.id = `${question.id}-${option}`;
            
            const label = document.createElement('label');
            label.htmlFor = `${question.id}-${option}`;
            label.textContent = option;
            label.style.cursor = 'pointer';
            label.style.flex = '1';
            
            radioOption.appendChild(radio);
            radioOption.appendChild(label);
            radioGroup.appendChild(radioOption);
        });
        
        questionCard.appendChild(radioGroup);
        container.appendChild(questionCard);
    });
}

// Submit questionnaire
async function submitQuestionnaire() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Collect responses
    const responses = [];
    let allAnswered = true;
    
    questions.forEach(question => {
        const selected = document.querySelector(`input[name="${question.id}"]:checked`);
        if (selected) {
            responses.push({
                questionId: question.id,
                questionText: question.text,
                answer: selected.value
            });
        } else {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert('Please answer all questions before submitting');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Assessment';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/questionnaire/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientName: patientData.name,
                patientEmail: patientData.email,
                patientAge: patientData.age,
                responses: responses
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            patientData.patientId = data.patientId;
            patientData.scoreId = data.scoreId;
            displayResults(data);
            showSection('section-results');
        } else {
            throw new Error(data.error || 'Failed to submit questionnaire');
        }
    } catch (error) {
        alert('Error submitting questionnaire: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Assessment';
    }
}

// Display results
function displayResults(data) {
    document.getElementById('scoreValue').textContent = data.score;
    document.getElementById('scoreCategory').textContent = data.analysis.category;
    
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    data.analysis.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
    
    // Display additional analysis
    const analysisSection = document.getElementById('analysisSection');
    if (data.analysis.summary) {
        analysisSection.innerHTML = `
            <div style="text-align: left; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h3>Analysis Summary</h3>
                <p style="margin: 10px 0;">${data.analysis.summary}</p>
                ${data.analysis.keyFindings ? `
                    <h4 style="margin-top: 15px;">Key Findings:</h4>
                    <ul style="margin-left: 20px;">
                        ${data.analysis.keyFindings.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
}

// Show consent section
function showConsent() {
    showSection('section-consent');
}

// Show results section
function showResults() {
    showSection('section-results');
}

// Submit consent
async function submitConsent() {
    const doctorEmail = document.getElementById('doctorEmail').value.trim();
    const consentGiven = document.getElementById('consentCheckbox').checked;
    
    if (!doctorEmail) {
        alert('Please enter your doctor\'s email address');
        return;
    }
    
    if (!validateEmail(doctorEmail)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (!consentGiven) {
        alert('Please check the consent box to proceed');
        return;
    }
    
    const consentBtn = document.getElementById('consentBtn');
    consentBtn.disabled = true;
    consentBtn.textContent = 'Submitting...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/consent/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId: patientData.patientId,
                scoreId: patientData.scoreId,
                doctorEmail: doctorEmail,
                consentGiven: consentGiven
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const completionMessage = document.getElementById('completionMessage');
            completionMessage.textContent = `Your assessment has been completed and ${consentGiven ? 'your report will be shared with ' + doctorEmail : 'saved successfully'}.`;
            showSection('section-complete');
        } else {
            throw new Error(data.error || 'Failed to submit consent');
        }
    } catch (error) {
        alert('Error submitting consent: ' + error.message);
    } finally {
        consentBtn.disabled = false;
        consentBtn.textContent = 'Submit';
    }
}

// View full report
function viewReport() {
    if (patientData.patientId && patientData.scoreId) {
        window.open(`${API_BASE_URL}/report/patient/${patientData.patientId}/score/${patientData.scoreId}/html`, '_blank');
    }
}

// Start over
function startOver() {
    patientData = {
        patientId: null,
        scoreId: null,
        name: '',
        email: '',
        age: null
    };
    
    document.getElementById('patientName').value = '';
    document.getElementById('patientEmail').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('doctorEmail').value = '';
    document.getElementById('consentCheckbox').checked = false;
    
    showSection('section-patient-info');
}

// Go back
function goBack() {
    showSection('section-patient-info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Patient Portal loaded successfully');
});

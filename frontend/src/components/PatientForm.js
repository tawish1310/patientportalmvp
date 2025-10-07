import React, { useState } from 'react';
import axios from 'axios';
import './PatientForm.css';

const QUESTIONS = [
  {
    id: 1,
    category: 'physical',
    question: 'How would you rate your overall physical health?',
    options: [
      { label: 'Excellent', score: 5 },
      { label: 'Very Good', score: 4 },
      { label: 'Good', score: 3 },
      { label: 'Fair', score: 2 },
      { label: 'Poor', score: 1 }
    ]
  },
  {
    id: 2,
    category: 'physical',
    question: 'How often do you experience pain or discomfort?',
    options: [
      { label: 'Never', score: 5 },
      { label: 'Rarely', score: 4 },
      { label: 'Sometimes', score: 3 },
      { label: 'Often', score: 2 },
      { label: 'Always', score: 1 }
    ]
  },
  {
    id: 3,
    category: 'physical',
    question: 'How satisfied are you with your ability to perform daily activities?',
    options: [
      { label: 'Very Satisfied', score: 5 },
      { label: 'Satisfied', score: 4 },
      { label: 'Neutral', score: 3 },
      { label: 'Dissatisfied', score: 2 },
      { label: 'Very Dissatisfied', score: 1 }
    ]
  },
  {
    id: 4,
    category: 'mental',
    question: 'How would you rate your mental and emotional well-being?',
    options: [
      { label: 'Excellent', score: 5 },
      { label: 'Very Good', score: 4 },
      { label: 'Good', score: 3 },
      { label: 'Fair', score: 2 },
      { label: 'Poor', score: 1 }
    ]
  },
  {
    id: 5,
    category: 'mental',
    question: 'How often do you feel anxious or stressed?',
    options: [
      { label: 'Never', score: 5 },
      { label: 'Rarely', score: 4 },
      { label: 'Sometimes', score: 3 },
      { label: 'Often', score: 2 },
      { label: 'Always', score: 1 }
    ]
  },
  {
    id: 6,
    category: 'mental',
    question: 'How satisfied are you with your sleep quality?',
    options: [
      { label: 'Very Satisfied', score: 5 },
      { label: 'Satisfied', score: 4 },
      { label: 'Neutral', score: 3 },
      { label: 'Dissatisfied', score: 2 },
      { label: 'Very Dissatisfied', score: 1 }
    ]
  },
  {
    id: 7,
    category: 'social',
    question: 'How satisfied are you with your personal relationships?',
    options: [
      { label: 'Very Satisfied', score: 5 },
      { label: 'Satisfied', score: 4 },
      { label: 'Neutral', score: 3 },
      { label: 'Dissatisfied', score: 2 },
      { label: 'Very Dissatisfied', score: 1 }
    ]
  },
  {
    id: 8,
    category: 'social',
    question: 'How often do you engage in social activities?',
    options: [
      { label: 'Very Often', score: 5 },
      { label: 'Often', score: 4 },
      { label: 'Sometimes', score: 3 },
      { label: 'Rarely', score: 2 },
      { label: 'Never', score: 1 }
    ]
  },
  {
    id: 9,
    category: 'social',
    question: 'How would you rate your work-life balance?',
    options: [
      { label: 'Excellent', score: 5 },
      { label: 'Very Good', score: 4 },
      { label: 'Good', score: 3 },
      { label: 'Fair', score: 2 },
      { label: 'Poor', score: 1 }
    ]
  }
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function PatientForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleAnswerChange = (questionId, answer, score, category) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { answer, score, category }
    }));
    
    // Clear error for this question
    if (errors[`question_${questionId}`]) {
      setErrors(prev => ({
        ...prev,
        [`question_${questionId}`]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    // Check all questions are answered
    QUESTIONS.forEach(q => {
      if (!answers[q.id]) {
        newErrors[`question_${q.id}`] = 'This question is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        answers: Object.entries(answers).map(([questionId, data]) => ({
          questionId: parseInt(questionId),
          answer: data.answer,
          score: data.score,
          category: data.category
        }))
      };
      
      const response = await axios.post(`${API_URL}/submit`, submissionData);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else {
        setErrors({ submit: 'An error occurred while submitting the form. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Personal Information</h2>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>
      </div>
      
      <div className="form-section">
        <h2>Quality of Life Questions</h2>
        <p className="section-description">
          Please answer all questions to help us understand your quality of life.
        </p>
        
        {QUESTIONS.map((q, index) => (
          <div key={q.id} className="question-group">
            <div className="question-header">
              <span className="question-number">Question {index + 1}</span>
              <span className={`question-category category-${q.category}`}>
                {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
              </span>
            </div>
            
            <p className="question-text">{q.question}</p>
            
            <div className="options-group">
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="radio-label">
                  <input
                    type="radio"
                    name={`question_${q.id}`}
                    value={option.label}
                    checked={answers[q.id]?.answer === option.label}
                    onChange={() => handleAnswerChange(q.id, option.label, option.score, q.category)}
                  />
                  <span className="radio-text">{option.label}</span>
                </label>
              ))}
            </div>
            
            {errors[`question_${q.id}`] && (
              <span className="error-message">{errors[`question_${q.id}`]}</span>
            )}
          </div>
        ))}
      </div>
      
      {errors.submit && (
        <div className="error-banner">
          {errors.submit}
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
      </button>
    </form>
  );
}

export default PatientForm;

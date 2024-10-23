import React, { useState } from 'react';
import { postJob } from '../services/jobService';
import './Styles/JobPost.css';

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: 'Entry/Beginner',
    candidates: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token is missing');
      return;
    }

    const candidatesArray = formData.candidates.split(',').map(email => email.trim());

    try {
      const response = await postJob({ ...formData, candidates: candidatesArray }, token);
      setMessage(response.msg);
    } catch (err) {
      setError(err.msg || 'Job posting failed.');
    }
  };

  return (
    <div className="job-post-form">
      <h2>Create Interview</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="experienceLevel">Experience Level</label>
          <select
            name="experienceLevel"
            id="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="Entry/Beginner">Entry/Beginner Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="candidates">Add Candidate</label>
          <input
            type="text"
            name="candidates"
            id="candidates"
            placeholder="xyz@email.com"
            value={formData.candidates}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Send</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default JobPost;

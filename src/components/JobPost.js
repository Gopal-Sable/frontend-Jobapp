// JobPost.js 
import React, { useState } from 'react';
import { postJob } from '../services/jobService';

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const candidatesArray = formData.candidates.split(',').map(email => email.trim());

    try {
      const response = await postJob({ ...formData, candidates: candidatesArray }, token);
      setMessage(response.msg);
    } catch (err) {
      setError(err.msg);
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="experienceLevel" placeholder="Experience Level" value={formData.experienceLevel} onChange={handleChange} required />
        <input type="text" name="candidates" placeholder="Enter candidate emails, separated by commas" value={formData.candidates} onChange={handleChange} required />
        <input type="date" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} required />
        <button type="submit">Post Job</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </form>
    </div>
  );
};

export default JobPost;

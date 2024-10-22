import React, { useState } from 'react';
import './Styles/Dashboard.css';
import { logoutCompany } from '../services/authService';
import {  postJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState(['']); // Array to hold multiple emails
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = async () => {
    await logoutCompany();
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };

  const handleAddCandidate = () => {
    setCandidates([...candidates, '']);
  };

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates, // Array of candidates' emails
      endDate
    };

    try {
      const response = await postJob(formData,token);
      setSuccessMessage('Interview created successfully!');
      setErrorMessage('');
      console.log('Interview Created:', response); // You can handle success here
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create interview');
      setSuccessMessage('');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <button onClick={toggleForm} className="create-interview-btn">
          Create Interview
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      <main className="main-content">
        {showForm && (
          <div className="form-container">
            <h2>Create Interview</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter Job Title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <input
                  type="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter Job Description"
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <div className="form-group">
                <label>Add Candidates</label>
                {candidates.map((email, index) => (
                  <input
                    key={index}
                    type="email"
                    value={email}
                    onChange={(e) => handleCandidateChange(index, e.target.value)}
                    placeholder="Enter Candidate Email"
                    required
                  />
                ))}
                <button type="button" onClick={handleAddCandidate} className="add-candidate-btn">
                  Add Another Candidate
                </button>
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">Send</button>

              {/* Success/Error Messages */}
              {successMessage && <p className="success-message">{successMessage}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

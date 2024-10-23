import React, { useState, useEffect } from 'react';
import './Styles/Dashboard.css';
import { logoutCompany } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import JobPost from './JobPost';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logoutCompany();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="logo">
            <FaHome className="logo-icon" />
            <span className="logo-text">Covette</span>
          </div>
        </div>
      </aside>

      <header className="header">
        <span className="header-contact">Contact</span>
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
        </div>
       
      </header>

      <main className="main-content">
        <button onClick={toggleForm} className="create-interview-btn">
          Create Interview
        </button>
        {showForm && (
          <div className="job-post-container">
            <JobPost />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

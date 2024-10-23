import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCompany } from '../services/authService'; // API for login
import './Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in (token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCompany({ email, password }); // API call for login
      localStorage.setItem('token', response.token); // Save token to localStorage
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="header">
          <div className="logo">Cuvette</div>
          <nav>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <div className="login-content">
          <div className="info">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <p className="tagline">Lorem ipsum is simply dummy text</p>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

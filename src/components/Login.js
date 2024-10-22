import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCompany } from '../services/authService'; // API for login
import './Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCompany({ email, password }); // API call for login
      localStorage.setItem('authToken', response.token); // Save token to localStorage
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="login-container" style={{ height: '100vh' }}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP } from '../services/authService'; // API for verifying OTP
import './Styles/VerifyOTP.css';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phone } = location.state || {}; // Retrieve email and phone from state

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOTP({ email, phone, otp });
      setMessage('OTP Verified Successfully!');
      setError('');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful OTP verification
      }, 1000);
    } catch (err) {
      setError(err || 'OTP Verification Failed.');
      setMessage('');
    }
  };

  return (
    <div className="otp-container" style={{ height: '100vh' }}>
      <header className="header">
        <div className="logo">Cuvette</div>
        <nav>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className="otp-content">
        <div className="info">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        </div>

        <form className="otp-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p className="tagline">Lorem ipsum is simply dummy text</p>

          <div className="form-group">
            <label>Email OTP</label>
            <input
              type="text"
              name="emailOTP"
              placeholder="Enter Email OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Verify</button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;

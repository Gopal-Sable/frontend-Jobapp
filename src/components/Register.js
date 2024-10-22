import React, { useState } from 'react';
import { registerCompany } from '../services/authService'; // Assuming your API functions are in 'api.js'
import './Styles/Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    employeeSize: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCompany(formData);
      setMessage('Company registered successfully!');
      setError(''); // Clear any previous errors
      
      navigate('/verifyotp', { state: { email: formData.email, phone: formData.phone } });
    } catch (err) {
      setMessage('');
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <header className="header">
        <div className="logo">Cuvette</div>
        <nav>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      
      <div className="register-content">
        <div className="info">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p className="tagline">Lorem ipsum is simply dummy text</p>

          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          {/* Phone */}
          <div className="form-group">
            <label>Phone no.</label>
            <input 
              type="text" 
              name="phone"
              placeholder="Phone no." 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>
            <input 
              type="text" 
              name="companyName"
              placeholder="Company Name" 
              value={formData.companyName} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Company Email */}
          <div className="form-group">
            <label>Company Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Company Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Employee Size */}
          <div className="form-group">
            <label>Employee Size</label>
            <input 
              type="text" 
              name="employeeSize"
              placeholder="Employee Size" 
              value={formData.employeeSize} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit">Proceed</button>

          {/* Terms and Conditions */}
          <p className="terms">
            By clicking on proceed, you accept our <a href="/terms">Terms & Conditions</a>.
          </p>

          {/* Display success or error message */}
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;

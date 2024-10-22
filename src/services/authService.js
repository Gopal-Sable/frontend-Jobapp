// authService.js 
import axios from 'axios';

const API_URL = "https://jobbackend-ce5d.onrender.com" //process.env.REACT_APP_API_URL;

export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, companyData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const verifyOTP = async (otpData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verify-otp`, otpData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const loginCompany = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
export const logoutCompany = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/logout`);
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Logout failed';
  }
};
// jobService.js 
import axios from 'axios';

const API_URL ="https://jobbackend-ce5d.onrender.com" //process.env.REACT_APP_API_URL;

export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/jobs/job`, jobData, {
      headers: { Authorization: token ,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

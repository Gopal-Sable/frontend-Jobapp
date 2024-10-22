import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOTP';
import JobPost from './components/JobPost';
import Dashboard from './components/Dashboard';

import { useAuth } from './services/useAuth'; // Custom hook to check auth status


function App() {
  const { isLoggedIn } = useAuth();
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Protected route */}
             <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Redirect to login if user tries to access dashboard without logging in */}
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/jobpost" element={<JobPost />} />
      </Routes>
    </Router>
  );
}

export default App;

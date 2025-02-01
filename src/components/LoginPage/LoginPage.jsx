import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import LbackImage from "../../assets/Lback.png";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      // Don't redirect immediately on first load. We want the user to log in manually first.
      console.log('User is already logged in');
    } else {
      // If the user is not logged in, show the login form
      console.log('User is logged out');
    }
  }, []);

  // Handle form submission (login or register)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Dummy validation check: replace with your actual login logic
    if (formData.email && formData.password) {
      localStorage.setItem('isLoggedIn', true);  
      // Set the login status in localStorage
      window.location.href = 'http://127.0.0.1:5000'; // Redirect to the external website
    } else {
      alert('Please enter valid credentials');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ backgroundImage: `url(${LbackImage})`, height: '100vh' }}>
      <div className="login-container">
        <div className="login-box">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {!isLogin && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
        
            <button type="submit" className="submit-btn" >
              {isLogin ? 'Login' : 'Register'
              }
            </button>
         
          </form>
          <p className="toggle-form">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register here' : 'Login here'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
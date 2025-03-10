import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const clientId = "886838287131-fotu4sh90du29nuql1nd6s1q0mdd8pe7.apps.googleusercontent.com";

  useEffect(() => {
    // Wipe login data when the website is loaded for the first time
    localStorage.clear();
  }, []);

  const handleGoogleSuccess = (response) => {
    const credential = response.credential;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('googleCredential', credential);
    alert('Login successful with Google');
    window.location.href = 'http://127.0.0.1:5000/';
  };

  const handleGoogleFailure = () => {
    setError('Google login failed. Please try again.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (isLogin) {
      if (!storedUser) {
        setError('No account found. Please register first.');
      } else if (formData.email === storedUser.email && formData.password === storedUser.password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'http://127.0.0.1:5000/';
      } else {
        setError('Incorrect email or password.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
      } else {
        localStorage.setItem('user', JSON.stringify(formData));
        alert('Registration successful. You can now log in.');
        setIsLogin(true);
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setError('');
  };

  const handleResetPassword = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser || storedUser.email !== resetEmail) {
      setError('Email not found. Please check and try again.');
    } else if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
    } else {
      storedUser.password = newPassword;
      localStorage.setItem('user', JSON.stringify(storedUser));
      alert('Password reset successful. You can now log in.');
      setIsForgotPassword(false);
      setIsLogin(true);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <div className="login-box">
          <h2>{isForgotPassword ? 'Reset Password' : isLogin ? 'Login' : 'Register'}</h2>
          {error && <p className="error-message">{error}</p>}

          {isForgotPassword ? (
            <div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className="submit-btn" onClick={handleResetPassword}>Reset Password</button>
              <p className="toggle-form" onClick={() => setIsForgotPassword(false)}>Back to Login</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              )}

              {isLogin && (
                <p className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </p>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
          )}

          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />

          {!isForgotPassword && (
            <p className="toggle-form">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Register here' : 'Login here'}
              </span>
            </p>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;

// src/components/LandingPage.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // For redirecting
import '../styles/landing.css'; // Import the CSS file for styling

const LandingPage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' }); // For login form
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change for registration form
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input change for login form
  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to register the user
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      if (response.data.message) {
        setSuccessMessage('Registration successful! You can now log in.');
        window.alert('Registration successful! You can now log in.');
        setShowRegisterForm(false); // Optionally, hide the form after successful registration
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error registering:', error);
    }
  };

  // Handle form submission for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginData);
      if (response.data.message === 'Login successful') {
        navigate('/dashboard'); // Redirect to the dashboard after login
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the Expense Tracker App</h1>
      <p>Manage your expenses effortlessly.</p>

      {/* Conditionally render the sign-up or login form or buttons */}
      {showRegisterForm ? (
        <div className="register-form">
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="primary-btn">Register</button>
          </form>
        </div>
      ) : showLoginForm ? (
        <div className="login-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginInputChange}
              />
            </div>
            <button type="submit" className="primary-btn">Login</button>
          </form>
        </div>
      ) : (
        <div className="cta-buttons">
          <button className="primary-btn" onClick={() => setShowRegisterForm(true)}>Sign Up</button>
          <button className="secondary-btn" onClick={() => setShowLoginForm(true)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

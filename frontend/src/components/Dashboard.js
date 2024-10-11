// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css'; // Import the CSS file for dashboard styling

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a POST request to the backend to logout
      await axios.post('http://localhost:5000/auth/logout');
      
      // Notify user of successful logout and clear session data
      window.alert('Logged out successfully!');

      // Redirect to the landing page after logout
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      window.alert('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <div className="header">
        <h1>Welcome to your Dashboard</h1>
        <p>Select an option from the sidebar to get started.</p>
      </div>
      <div className="dashboard-container">
        <div className="sidebar">
          <ul>
            <li><h3>Expenses</h3></li>
            <hr />
            <li><h3>Categorize</h3></li>
            <hr />
            <li><h3>Other</h3></li>
            <hr />
            <li><h3>Other</h3></li>
            <hr />
            <li><h3>Other</h3></li>
            <hr />
            <li onClick={handleLogout}><h3>Logout</h3></li>
            <hr />
          </ul>
        </div>
        <div className="main-content">
          <div className="expenses-list">
            <h2>Recent Expenses</h2>
            {/* You can dynamically map through expenses here */}
            {[...Array(30)].map((_, index) => (
              <div key={index} className="expense-item">
                Expense {index + 1}: $100 on groceries
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

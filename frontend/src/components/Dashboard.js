import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css'; // Import the CSS file for dashboard styling
import Expenses from './Expenses'; // Import the Expenses component
import Categorize from './Categorize'; // Placeholder component for Categorize

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('expenses'); // Manage the active tab state

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a POST request to the backend to logout
      await axios.post('http://localhost:5000/auth/logout');
      
      // Notify user of successful logout and clear session data
      window.alert('Logged out successfully!');
      navigate('/'); // Redirect to the landing page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      window.alert('Failed to log out. Please try again.');
    }
  };

  // Function to render the main content based on the selected tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'expenses':
        return <Expenses />; // Display the Expenses component
      case 'categorize':
        return <Categorize />; // Placeholder for Categorize component
      default:
        return <h2>Select an option from the sidebar</h2>;
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
            <li onClick={() => setActiveTab('expenses')}><h3>Expenses</h3></li>
            <hr />
            <li onClick={() => setActiveTab('categorize')}><h3>Categorize</h3></li>
            <hr />
            <li onClick={handleLogout}><h3>Logout</h3></li>
            <hr />
          </ul>
        </div>
        <div className="main-content">
          {/* Render main content dynamically based on activeTab */}
          {renderMainContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

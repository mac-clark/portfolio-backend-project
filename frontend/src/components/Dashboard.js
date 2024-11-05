// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import Expenses from './Expenses';
import Categorize from './Categorize';
import Visualize from './Visualize'; // Import Visualize component

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('expenses'); // Default tab
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
        setUserFullName(response.data.fullName);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout');
      window.alert('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      window.alert('Failed to log out. Please try again.');
    }
  };

  // Function to render the main content based on the selected tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'expenses':
        return <Expenses />;
      case 'categorize':
        return <Categorize />;
      case 'visualize':
        return <Visualize />; // Render the Visualize component
      default:
        return <h2>Select an option from the sidebar</h2>;
    }
  };

  return (
    <>
      <div className="header">
        <h1>Welcome, {userFullName}</h1>
        <p>Select an option from the sidebar to get started.</p>
      </div>
      <div className="dashboard-container">
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('expenses')}><h3>Expenses</h3></li>
            <hr />
            <li onClick={() => setActiveTab('categorize')}><h3>Categorize</h3></li>
            <hr />
            <li onClick={() => setActiveTab('visualize')}><h3>Visualize</h3></li>
            <hr />
            <li onClick={handleLogout}><h3>Logout</h3></li>
            <hr />
          </ul>
        </div>
        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

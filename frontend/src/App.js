// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css'; // Add your styles here

function App() {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    document.body.className = theme; // Apply the theme to the body class
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('preferred-theme', newTheme); // Store user's theme preference
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Routes to render content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add other routes as necessary */}
        </Routes>

        {/* Toggle button at the bottom-right corner */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </Router>
  );
}

// Detect system preference for light/dark mode
const getPreferredTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default App;

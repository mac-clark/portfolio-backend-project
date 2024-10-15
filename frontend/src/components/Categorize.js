// src/components/Categorize.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/categorize.css'; // New CSS file for categorize styling

const Categorize = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories/category', { withCredentials: true });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes for the new category
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const response = await axios.post('http://localhost:5000/categories/category', { name: newCategory }, { withCredentials: true });
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategory(''); // Reset form
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/category/${id}`, { withCredentials: true });
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="categories-container">
      <h2>Your Categories</h2>

      {/* Form to add new category */}
      <div className="add-category-form">
        <input
          type="text"
          name="category"
          value={newCategory}
          onChange={handleInputChange}
          placeholder="New Category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Display list of categories */}
      <div className="categories-list">
        {categories.length ? (
          categories.map((category, index) => (
            <div key={category._id || index} className="category-item">
              <p>{category.name}</p>
              <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default Categorize;

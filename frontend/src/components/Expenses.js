import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]  // Default to today's date
  });

  // Fetch expenses and categories on component mount
  useEffect(() => {
    const fetchExpensesAndCategories = async () => {
      await fetchExpenses(); // Fetch expenses separately to use later in handleAddExpense
      const categoriesResponse = await axios.get('http://localhost:5000/categories/category', { withCredentials: true });
      setCategories(categoriesResponse.data);
    };
  
    fetchExpensesAndCategories();
  }, []);

  // Handle input changes for new expense
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  // Handle adding a new expense
  const handleAddExpense = async () => {
    try {
      await axios.post('http://localhost:5000/expenses/expense', newExpense, { withCredentials: true });
      setNewExpense({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] }); // Reset form
      fetchExpenses(); // Refetch all expenses to get the latest data, including categories
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  
  // Refactor fetchExpenses into a separate function
  const fetchExpenses = async () => {
    try {
      const expensesResponse = await axios.get('http://localhost:5000/expenses', { withCredentials: true });
      setExpenses(expensesResponse.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/expense/${id}`, { withCredentials: true });
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="expenses-container">
      <h2>Your Expenses</h2>

      {/* Form to add new expense */}
      <div className="add-expense-form">
        <select
          name="category"
          value={newExpense.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Display list of expenses */}
      <div className="expenses-list">
        {expenses.length ? (
          expenses.map((expense, index) => (
            <div key={expense._id || index} className="expense-item">
              <p>
                {expense.category?.name || 'Uncategorized'}: ${expense.amount} - {expense.description} ({new Date(expense.date).toLocaleDateString()})
              </p>
              <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default Expenses;

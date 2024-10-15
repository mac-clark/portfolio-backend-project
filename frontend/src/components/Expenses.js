import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/expenses.css'; // Create a new CSS file for expenses styling

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: ''
  });

  // Fetch expenses and categories on component mount
  useEffect(() => {
    const fetchExpensesAndCategories = async () => {
      try {
        const expensesResponse = await axios.get('http://localhost:5000/expenses', { withCredentials: true });
        setExpenses(expensesResponse.data);

        const categoriesResponse = await axios.get('http://localhost:5000/categories/category', { withCredentials: true });
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching expenses or categories:', error);
      }
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
    console.log(newExpense);
    try {
      const response = await axios.post('http://localhost:5000/expenses/expense', newExpense, { withCredentials: true });
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setNewExpense({ description: '', amount: '', category: '' }); // Reset form
    } catch (error) {
      console.error('Error adding expense:', error);
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
            <button onClick={handleAddExpense}>Add Expense</button>
        </div>

        {/* Display list of expenses */}
        <div className="expenses-list">
            {expenses.length ? (
                expenses.map((expense, index) => (
                    <div key={expense._id || index} className="expense-item">
                        <p>{expense.category.name}: ${expense.amount} - {expense.description}</p>
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

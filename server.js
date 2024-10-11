require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);

// Root message
app.get('/', (req, res) => {
  res.send('Welcome to the project backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

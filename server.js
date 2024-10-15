require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const sessionConfig = require('./config/session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',  // The frontend URL
  credentials: true,  // This allows cookies (credentials) to be sent cross-origin
}));
app.use(express.json());

// Connect to database
connectDB();
// Session config
app.use(sessionConfig);

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

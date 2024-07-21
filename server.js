require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const resultRoutes_SS1 = require('./routes/resultRouter_SS1'); // Import resultRoutes for SS1
const resultRoutes_SS2 = require('./routes/resultRouter_SS2'); // Import resultRoutes for SS2
const resultRoutes_SS3 = require('./routes/resultRouter_SS3'); // Import resultRoutes for SS3

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load Environment Variables
console.log('Loaded environment variables:', process.env);

// Check MongoDB URI
if (!process.env.MONGO_URI) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1); // Exit the application if MongoDB URI is not defined
}

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/results/ss1', resultRoutes_SS1); // Use resultRoutes for SS1
app.use('/api/results/ss2', resultRoutes_SS2); // Use resultRoutes for SS2
app.use('/api/results/ss3', resultRoutes_SS3); // Use resultRoutes for SS3

// Listen on Port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

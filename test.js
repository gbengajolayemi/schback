const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log all GET requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    console.log(`GET request made to: ${req.url}`);
  }
  next();
});

// Protected route
app.get('/check', (req, res) => {
    res.send('working');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

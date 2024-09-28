const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Protected route
app.get('/check', (req, res) => {
    res.send('working');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.send('Health endpoint is working');
});


// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
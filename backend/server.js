// backend/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Sample questions about Ethiopia
const questions = require('./questions.json');

// API route to get questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

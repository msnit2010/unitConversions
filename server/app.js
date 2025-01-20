const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Global middleware to set default headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.use('/api', require('./routes/conversions'));

// Error handler must be last
app.use(errorHandler);

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  });
});

module.exports = app; 
const express = require('express');
const path = require('path');
const cors = require('cors');
const convertRouter = require('./routes/convert');
const healthRouter = require('./routes/health');
const rateLimit = require('express-rate-limit');
const feedbackRouter = require('./routes/feedback');
const { connectRedis } = require('./config/redis');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// CORS configuration
app.use(cors({
  origin: isDev 
    ? [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://0.0.0.0:3000',
        /^http:\/\/192\.168\.\d+\.\d+:3000$/,
        /^http:\/\/172\.\d+\.\d+\.\d+:3000$/,
        /^http:\/\/10\.\d+\.\d+\.\d+:3000$/
      ]
    : true, // Allow all origins in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// API routes
app.use('/api/convert', convertRouter);
app.use('/api/health', healthRouter);
app.use('/api/feedback', feedbackRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Unit Converter API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      convert: '/api/convert',
      feedback: '/api/feedback'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: isDev ? err.message : 'Internal server error'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Connect to Redis if enabled
if (process.env.REDIS_ENABLED === 'true') {
  connectRedis().catch(console.error);
}

// Vercel serverless function handler
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Helper to get local IP address
function getLocalIP() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost'; // Fallback
} 
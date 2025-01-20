const express = require('express');
const cors = require('cors');
const convertRouter = require('./routes/convert');
const healthRouter = require('./routes/health');

const app = express();

// Enable CORS for development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3000', 'http://localhost:5000'] 
    : ['http://localhost:3000']
}));

app.use(express.json());

// API routes
app.use('/api/convert', convertRouter);
app.use('/api/health', healthRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
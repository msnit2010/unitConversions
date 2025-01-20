const express = require('express');
const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    // Here you would typically store the feedback in a database
    // For now, we'll just log it
    console.log('Received feedback:', { name, email, subject, message });

    res.json({
      success: true,
      message: 'Feedback received successfully'
    });
  } catch (error) {
    console.error('Error handling feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router; 
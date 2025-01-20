const express = require('express');
const router = express.Router();
const { convert } = require('../utils/converter');
const { checkCache, setCacheResult } = require('../middleware/cache');
const { withRedis } = require('../config/redis');

// GET endpoint for conversions
router.get('/', checkCache, async (req, res) => {
  try {
    const { category, fromUnit, toUnit, value } = req.query;
    
    if (!category || !fromUnit || !toUnit || !value) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid numeric value'
      });
    }

    const result = await convert(category, fromUnit, toUnit, numericValue);
    
    // Cache successful result if Redis is enabled
    if (req.cacheKey) {
      await setCacheResult(req.cacheKey, result);
    }

    res.json({
      success: true,
      result: {
        value: result.value,
        formatted: result.formatted
      },
      formula: result.formula,
      steps: result.steps
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to convert'
    });
  }
});

// POST endpoint for conversions
router.post('/', checkCache, async (req, res) => {
  try {
    const { category, fromUnit, toUnit, value } = req.body;
    
    console.log('Conversion request:', {
      category,
      fromUnit,
      toUnit,
      value
    });
    
    if (!category || !fromUnit || !toUnit || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid numeric value'
      });
    }

    const result = await convert(category, fromUnit, toUnit, numericValue);
    
    // Cache successful result if Redis is enabled
    if (req.cacheKey) {
      await setCacheResult(req.cacheKey, result);
    }

    res.json(result); // Send the entire result object
  } catch (error) {
    console.error('POST Conversion error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to convert'
    });
  }
});

module.exports = router; 
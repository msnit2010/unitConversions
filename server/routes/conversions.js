const express = require('express');
const router = express.Router();
const UnitConverter = require('../services/UnitConverter');
const { checkCache, setCacheResult } = require('../middleware/cache');
const { withRedis } = require('../config/redis');

// Create a singleton instance of UnitConverter
const converter = new UnitConverter();

// Validate and normalize category name
function validateCategory(category) {
  if (!category) {
    throw new Error('Category is required');
  }
  
  const categories = converter.getCategories();
  const normalizedCategory = category.toLowerCase();
  
  // Find the actual category key by case-insensitive comparison
  const actualCategory = Object.keys(categories).find(
    key => key.toLowerCase() === normalizedCategory
  );
  
  console.log('Available categories:', Object.keys(categories));
  console.log('Normalized category:', normalizedCategory);
  console.log('Actual category:', actualCategory);
  
  if (!actualCategory) {
    throw new Error(`Category '${category}' not found`);
  }
  
  return actualCategory;
}

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    success: true
  });
});

// GET /api/convert
router.get('/convert', checkCache, async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');

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

    const result = converter.convert(category, fromUnit, toUnit, numericValue);
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    // Cache successful result
    if (req.cacheKey) {
      await setCacheResult(req.cacheKey, result);
    }

    return res.json(result);
  } catch (error) {
    console.error('Conversion error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/categories
router.get('/categories', (req, res) => {
  try {
    const categories = converter.getCategories();
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// GET /api/units/:category
router.get('/units/:category', (req, res) => {
  try {
    const validCategory = validateCategory(req.params.category);
    const units = converter.getUnits(validCategory);
    res.json({
      success: true,
      ...units
    });
  } catch (error) {
    console.error('Units error:', error);
    res.status(error.message.includes('not found') ? 400 : 500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// GET /api/formula
router.get('/formula', (req, res) => {
  try {
    const { category, fromUnit, toUnit } = req.query;
    if (!category || !fromUnit || !toUnit) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }
    
    const validCategory = validateCategory(category);
    const formula = converter.getConversionFormula(validCategory, fromUnit, toUnit);
    res.json({
      success: true,
      formula: `1 ${fromUnit} = ${formula.formula} ${toUnit}`,
      steps: formula.explanation.split('\n')
    });
  } catch (error) {
    console.error('Formula error:', error);
    res.status(error.message.includes('not found') ? 400 : 500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// GET /api/conversions
router.get('/conversions', checkCache, async (req, res) => {
    try {
        res.set({
            'Cache-Control': 'public, max-age=300',
            'Vary': 'Accept-Language'
        });

        // Get all categories and their units
        const categories = converter.getCategories();
        const conversions = {};

        // Build conversion options for each category
        for (const [categoryId, categoryData] of Object.entries(categories)) {
            const units = converter.getUnits(categoryId);
            
            // Format category name properly
            const formattedCategory = converter._formatCategoryName(categoryId);
            
            conversions[categoryId] = {
                name: formattedCategory,
                icon: getCategoryIcon(categoryId), // Add icon mapping
                baseUnit: formatUnitName(units.baseUnit),
                units: units.units.map(unit => ({
                    id: unit.id,
                    name: formatUnitName(unit.id),
                    factor: unit.factor
                })),
                commonConversions: getCommonConversions(categoryId, units)
            };
        }

        res.json({
            success: true,
            conversions
        });
    } catch (error) {
        console.error('Conversions error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Helper function to format unit names
function formatUnitName(unit) {
    if (!unit) return '';
    
    // Special cases for compound units
    if (unit.includes('Per')) {
        const [first, second] = unit.split('Per');
        return `${formatUnitName(first)} per ${formatUnitName(second)}`;
    }

    return unit
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .replace(/\s+/g, ' ') // Remove extra spaces
        .trim();
}

// Helper function to get category icon
function getCategoryIcon(category) {
    const icons = {
        length: '📏',
        weight: '⚖️',  // Changed from mass to weight to match category ID
        temperature: '🌡️',
        volume: '💧',
        area: '📐',
        time: '⏰',
        speed: '🏃',
        pressure: '🎈',
        energy: '⚡',
        power: '💪',
        angle: '📐',
        dataStorage: '💾',
        force: '💥',
        fuelConsumption: '⛽',
        density: '🧊',
        acceleration: '🚀',
        torque: '🔧',
        heat: '🔥'
    };
    return icons[category] || '🔄';
}

// Helper function to get common conversions for a category
function getCommonConversions(category, units) {
    const commonConversionsMap = {
        length: [
            { from: 'meter', to: 'foot', description: 'Height of a person' },
            { from: 'kilometer', to: 'mile', description: 'Distance between cities' },
            { from: 'inch', to: 'centimeter', description: 'Small measurements' }
        ],
        weight: [
            { from: 'kilogram', to: 'pound', description: 'Body weight' },
            { from: 'gram', to: 'ounce', description: 'Food portions' },
            { from: 'ton', to: 'pound', description: 'Heavy loads' }
        ],
        temperature: [
            { from: 'celsius', to: 'fahrenheit', description: 'Room temperature' },
            { from: 'celsius', to: 'kelvin', description: 'Scientific measurements' },
            { from: 'fahrenheit', to: 'celsius', description: 'Weather conversion' }
        ],
        volume: [
            { from: 'liter', to: 'gallon', description: 'Liquid volume' },
            { from: 'milliliter', to: 'fluidOunce', description: 'Drink size' },
            { from: 'cubicMeter', to: 'liter', description: 'Large containers' }
        ]
        // Add more categories as needed
    };

    const commonConversions = commonConversionsMap[category] || [];
    return commonConversions.map(conv => {
        const fromUnit = units.units.find(u => u.id === conv.from) || { factor: 1 };
        const toUnit = units.units.find(u => u.id === conv.to) || { factor: 1 };
        
        return {
            from: {
                unit: formatUnitName(conv.from),
                value: 1,
                formatted: `1 ${formatUnitName(conv.from)}`
            },
            to: {
                unit: formatUnitName(conv.to),
                value: toUnit.factor / fromUnit.factor,
                formatted: `${(toUnit.factor / fromUnit.factor).toFixed(4)} ${formatUnitName(conv.to)}`
            },
            description: conv.description
        };
    });
}

module.exports = router; 
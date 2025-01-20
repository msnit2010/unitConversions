const conversionFactors = require('../data/conversionFactors.json');
console.log('Raw conversion factors:', conversionFactors);

class UnitConverter {
  constructor() {
    console.log('Loading conversion factors...');
    this.conversionFactors = conversionFactors;
    console.log('Loaded categories:', Object.keys(this.conversionFactors));
  }

  /**
   * Get all available categories
   * @returns {Object} Categories with their base units and units
   */
  getCategories() {
    return Object.entries(this.conversionFactors).reduce((acc, [id, data]) => {
      acc[id] = {
        baseUnit: data.baseUnit,
        units: data.units
      };
      return acc;
    }, {});
  }

  /**
   * Find category by name (case-insensitive)
   * @param {string} category - The category name to find
   * @returns {string|null} The actual category name or null if not found
   */
  _findCategoryName(category) {
    if (!category) return null;
    return Object.keys(this.conversionFactors).find(
      key => key.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get all units for a specific category
   * @param {string} category - The category to get units for
   * @returns {Object} Units with their conversion factors
   */
  getUnits(category) {
    const actualCategory = this._findCategoryName(category);
    if (!actualCategory) {
      throw new Error(`Category '${category}' not found`);
    }

    const categoryData = this.conversionFactors[actualCategory];
    return {
      baseUnit: categoryData.baseUnit,
      units: Object.keys(categoryData.units).map(unit => ({
        id: unit,
        name: this._formatUnitName(unit),
        factor: categoryData.units[unit]
      }))
    };
  }

  /**
   * Convert a value from one unit to another
   * @param {string} category - The category of units
   * @param {string} fromUnit - The source unit
   * @param {string} toUnit - The target unit
   * @param {number} value - The value to convert
   * @returns {Object} The conversion result with additional information
   */
  convert(category, fromUnit, toUnit, value) {
    try {
      console.log('Converting:', { category, fromUnit, toUnit, value });
      
      if (!category || !fromUnit || !toUnit || typeof value !== 'number') {
        return {
          success: false,
          error: 'Invalid input parameters'
        };
      }

      const categoryData = this.conversionFactors[category];
      if (!categoryData) {
        return {
          success: false,
          error: `Category '${category}' not found`
        };
      }

      const baseUnit = categoryData.baseUnit;
      if (!baseUnit) {
        return {
          success: false,
          error: 'Invalid category configuration'
        };
      }

      // Validate units exist in category
      if (fromUnit !== baseUnit && !categoryData.units[fromUnit]) {
        return {
          success: false,
          error: `Unit '${fromUnit}' not found in category '${category}'`
        };
      }

      if (toUnit !== baseUnit && !categoryData.units[toUnit]) {
        return {
          success: false,
          error: `Unit '${toUnit}' not found in category '${category}'`
        };
      }

      const result = this._performConversion(categoryData, fromUnit, toUnit, value);
      
      return {
        success: true,
        result: {
          value: result,
          from: {
            unit: fromUnit,
            value: value
          },
          to: {
            unit: toUnit,
            value: result
          }
        }
      };
    } catch (error) {
      console.error('Conversion error:', error);
      return {
        success: false,
        error: error.message || 'Conversion failed'
      };
    }
  }

  _performConversion(categoryData, fromUnit, toUnit, value) {
    const baseUnit = categoryData.baseUnit;
    
    // Convert to base unit first
    let baseValue = fromUnit === baseUnit ? 
      value : 
      value * categoryData.units[fromUnit];

    // Convert from base unit to target unit
    return toUnit === baseUnit ? 
      baseValue : 
      baseValue / categoryData.units[toUnit];
  }

  /**
   * Get conversion formula between two units
   * @param {string} category - The category of units
   * @param {string} fromUnit - The source unit
   * @param {string} toUnit - The target unit
   * @returns {Object} The conversion formula and explanation
   */
  getConversionFormula(category, fromUnit, toUnit) {
    const actualCategory = this._findCategoryName(category);
    if (!actualCategory) {
      throw new Error(`Category '${category}' not found`);
    }

    const categoryData = this.conversionFactors[actualCategory];
    
    if (fromUnit !== categoryData.baseUnit && !categoryData.units[fromUnit]) {
      throw new Error(`Unit '${fromUnit}' not found in category '${actualCategory}'`);
    }

    if (toUnit !== categoryData.baseUnit && !categoryData.units[toUnit]) {
      throw new Error(`Unit '${toUnit}' not found in category '${actualCategory}'`);
    }

    // Handle special conversions
    if (this._isSpecialConversion(categoryData, fromUnit) || 
        this._isSpecialConversion(categoryData, toUnit)) {
      return this._getSpecialConversionFormula(categoryData, fromUnit, toUnit);
    }

    const baseUnit = categoryData.baseUnit;
    const fromFactor = fromUnit === baseUnit ? 1 : categoryData.units[fromUnit];
    const toFactor = toUnit === baseUnit ? 1 : categoryData.units[toUnit];

    if (fromUnit === toUnit) {
      return {
        formula: '1',
        explanation: `No conversion needed - both units are ${fromUnit}`
      };
    }

    return {
      formula: `${(1 / toFactor * fromFactor).toFixed(6)}`,
      explanation: [
        `1. Multiply the value by ${fromFactor} to convert to ${baseUnit}`,
        `2. Divide by ${toFactor} to convert from ${baseUnit} to ${toUnit}`
      ].join('\n')
    };
  }

  _findCategory(fromUnit, toUnit) {
    return Object.keys(this.conversionFactors).find(category => {
      const units = this.conversionFactors[category].units;
      return (fromUnit === this.conversionFactors[category].baseUnit || units[fromUnit] !== undefined) &&
             (toUnit === this.conversionFactors[category].baseUnit || units[toUnit] !== undefined);
    });
  }

  _isSpecialConversion(categoryData, unit) {
    return categoryData.units[unit] === 'special';
  }

  _handleSpecialConversion(categoryData, fromUnit, toUnit, value) {
    const specialConversions = categoryData.specialConversions;
    let result;

    if (categoryData.baseUnit === 'kelvin') {
      // Temperature conversions
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = eval(specialConversions.celsiusToFahrenheit.replace('value', value));
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = eval(specialConversions.fahrenheitToCelsius.replace('value', value));
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = eval(specialConversions.kelvinToCelsius.replace('value', value));
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = eval(specialConversions.celsiusToKelvin.replace('value', value));
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        const celsius = eval(specialConversions.fahrenheitToCelsius.replace('value', value));
        result = eval(specialConversions.celsiusToKelvin.replace('value', celsius));
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        const celsius = eval(specialConversions.kelvinToCelsius.replace('value', value));
        result = eval(specialConversions.celsiusToFahrenheit.replace('value', celsius));
      }
    }

    return {
      from: {
        unit: fromUnit,
        value: value,
        formatted: this._formatValue(value, fromUnit)
      },
      to: {
        unit: toUnit,
        value: Number(result.toFixed(8)),
        formatted: this._formatValue(result, toUnit)
      },
      category: categoryData.baseUnit,
      formula: this._getSpecialConversionFormula(categoryData, fromUnit, toUnit).formula
    };
  }

  _getSpecialConversionFormula(categoryData, fromUnit, toUnit) {
    const specialConversions = categoryData.specialConversions;
    
    if (categoryData.baseUnit === 'kelvin') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return {
          formula: '(°C × 9/5) + 32 = °F',
          explanation: 'Multiply by 9/5 and add 32'
        };
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return {
          formula: '(°F - 32) × 5/9 = °C',
          explanation: 'Subtract 32 and multiply by 5/9'
        };
      }
      // Add other temperature conversion formulas
    }

    return {
      formula: 'Special conversion',
      explanation: 'This conversion uses a special formula'
    };
  }

  _formatValue(value, unit) {
    // Add unit symbols and formatting
    const symbols = {
      celsius: '°C',
      fahrenheit: '°F',
      kelvin: 'K',
      squareMeter: 'm²',
      cubicMeter: 'm³',
      // Add more unit symbols
    };

    const formatted = this._formatNumber(value);
    return `${formatted}${symbols[unit] || ' ' + unit}`;
  }

  _formatNumber(num) {
    // Handle zero case
    if (num === 0) return 0;

    const abs = Math.abs(num);
    
    // For very small numbers (less than 1e-6), convert to scientific notation
    if (abs < 1e-6) {
      return Number(num.toExponential(6));
    }
    
    // For very large numbers (greater than 1e9), convert to scientific notation
    if (abs >= 1e9) {
      return Number(num.toExponential(6));
    }

    // For numbers close to integers (difference less than 1e-10), round to integer
    if (Math.abs(Math.round(num) - num) < 1e-10) {
      return Math.round(num);
    }
    
    // For regular numbers, use fixed precision
    if (abs >= 100) {
      return Number(num.toFixed(2));
    }
    
    return Number(num.toFixed(6));
  }

  _formatCategoryName(category) {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  _formatUnitName(unit) {
    return unit
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

// Export an instance instead of the class
module.exports = UnitConverter; 
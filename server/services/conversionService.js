const conversionFormulas = require('../data/conversionFormulas');

class ConversionService {
  static getCategories() {
    return Object.keys(conversionFormulas);
  }

  static getUnitsForCategory(category) {
    if (!conversionFormulas[category]) {
      throw new Error(`Category '${category}' not found`);
    }
    return Object.keys(conversionFormulas[category]);
  }

  static convert(category, fromUnit, toUnit, value) {
    // Input validation
    if (!category || !fromUnit || !toUnit || value === undefined) {
      throw new Error('Missing required parameters');
    }

    // Check if category exists
    if (!conversionFormulas[category]) {
      throw new Error(`Category '${category}' not found`);
    }

    // Check if units exist in category
    if (!conversionFormulas[category][fromUnit]) {
      throw new Error(`Unit '${fromUnit}' not found in category '${category}'`);
    }

    // Parse value to number
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      throw new Error('Invalid numeric value');
    }

    // Same unit conversion
    if (fromUnit === toUnit) {
      return {
        value: numericValue,
        formula: `${fromUnit} → ${toUnit}`,
        category
      };
    }

    try {
      // Get conversion formula
      const formula = conversionFormulas[category][fromUnit][toUnit];
      if (!formula) {
        throw new Error(`Conversion from '${fromUnit}' to '${toUnit}' not supported`);
      }

      // Perform conversion
      const result = formula(numericValue);

      return {
        value: Number(result.toFixed(6)),
        formula: `${fromUnit} → ${toUnit}`,
        category
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }
}

module.exports = ConversionService; 
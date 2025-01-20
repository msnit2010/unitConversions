export const conversionFormulas = {
  length: {
    meters: {
      feet: (value) => value * 3.28084,
      inches: (value) => value * 39.3701,
      kilometers: (value) => value / 1000,
      miles: (value) => value * 0.000621371
    },
    feet: {
      meters: (value) => value / 3.28084,
      inches: (value) => value * 12,
      kilometers: (value) => value / 3280.84,
      miles: (value) => value * 0.000189394
    }
    // Add more conversions as needed
  },
  weight: {
    kilograms: {
      pounds: (value) => value * 2.20462,
      ounces: (value) => value * 35.274,
      grams: (value) => value * 1000
    },
    pounds: {
      kilograms: (value) => value / 2.20462,
      ounces: (value) => value * 16,
      grams: (value) => value * 453.592
    }
    // Add more conversions as needed
  },
  temperature: {
    celsius: {
      fahrenheit: (value) => (value * 9/5) + 32,
      kelvin: (value) => value + 273.15
    },
    fahrenheit: {
      celsius: (value) => (value - 32) * 5/9,
      kelvin: (value) => (value - 32) * 5/9 + 273.15
    },
    kelvin: {
      celsius: (value) => value - 273.15,
      fahrenheit: (value) => (value - 273.15) * 9/5 + 32
    }
  }
};

export const convert = (value, fromUnit, toUnit, category) => {
  if (!value) return '';
  
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'Invalid input';
  
  if (fromUnit === toUnit) return numericValue;
  
  try {
    const formula = conversionFormulas[category][fromUnit][toUnit];
    const result = formula(numericValue);
    return Number.isFinite(result) ? result.toFixed(4) : 'Error';
  } catch (error) {
    return 'Conversion not available';
  }
}; 
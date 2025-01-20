const CONVERSION_FACTORS = {
  length: {
    base: 'meter',
    factors: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.344,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
    },
  },
  temperature: {
    base: 'celsius',
    formulas: {
      celsius: {
        fahrenheit: (c) => (c * 9/5) + 32,
        kelvin: (c) => c + 273.15,
      },
      fahrenheit: {
        celsius: (f) => (f - 32) * 5/9,
        kelvin: (f) => (f - 32) * 5/9 + 273.15,
      },
      kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9/5 + 32,
      },
    },
  },
  weight: {
    base: 'kilogram',
    factors: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
    },
  },
  volume: {
    base: 'liter',
    factors: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      fluidounce: 33.814,
      cubicmeter: 0.001,
    },
  },
  area: {
    base: 'squaremeter',
    factors: {
      squaremeter: 1,
      squarekilometer: 0.000001,
      hectare: 0.0001,
      acre: 0.000247105,
      squarefoot: 10.7639,
      squareinch: 1550,
    },
  },
  time: {
    base: 'second',
    factors: {
      second: 1,
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800,
      month: 1/2592000,
      year: 1/31536000,
    },
  },
};

const API_BASE_URL = (() => {
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  
  // In production, use window.location to get the current host
  const host = window.location.hostname;
  return `http://${host}:5000`;
})();

console.log('API Base URL:', API_BASE_URL);

class ConversionService {
  static async convert(value, fromUnit, toUnit, category) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          fromUnit,
          toUnit,
          value: parseFloat(value)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to convert');
      }
      return await response.json();
    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  }

  static async getFormula(fromUnit, toUnit, category) {
    try {
      const response = await fetch(`${API_BASE_URL}/formula?category=${category}&fromUnit=${fromUnit}&toUnit=${toUnit}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get formula');
      }
      return await response.json();
    } catch (error) {
      console.error('Formula error:', error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Categories error:', error);
      throw error;
    }
  }

  static async getUnits(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/units/${category}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get units');
      }
      return await response.json();
    } catch (error) {
      console.error('Units error:', error);
      throw error;
    }
  }

  static getCommonConversions(category) {
    switch (category) {
      case 'length':
        return [
          { from: '1 meter', to: '3.28084 feet', description: 'Height of a person' },
          { from: '1 kilometer', to: '0.621371 miles', description: 'Distance between cities' },
          { from: '1 inch', to: '2.54 centimeters', description: 'Small measurements' },
        ];
      case 'temperature':
        return [
          { from: '0°C', to: '32°F', description: 'Freezing point of water' },
          { from: '100°C', to: '212°F', description: 'Boiling point of water' },
          { from: '37°C', to: '98.6°F', description: 'Normal body temperature' },
        ];
      case 'weight':
        return [
          { from: '1 kilogram', to: '2.20462 pounds', description: 'Average bag of flour' },
          { from: '1 pound', to: '453.592 grams', description: 'Standard weight measure' },
          { from: '1 ounce', to: '28.3495 grams', description: 'Small weight measure' },
        ];
      // Add more categories
      default:
        return [];
    }
  }
}

export default ConversionService; 
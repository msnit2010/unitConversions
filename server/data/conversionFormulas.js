const conversionFormulas = {
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

module.exports = conversionFormulas; 
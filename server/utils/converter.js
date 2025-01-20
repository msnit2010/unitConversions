const conversions = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176,
    cup: 0.236588,
    fluidounce: 0.0295735
  },
  area: {
    squaremeter: 1,
    squarekilometer: 1000000,
    hectare: 10000,
    acre: 4046.86,
    squarefoot: 0.092903,
    squareinch: 0.00064516,
    squareyard: 0.836127,
    squaremile: 2589988.11
  },
  pressure: {
    pascal: 1,
    kilopascal: 1000,
    megapascal: 1000000,
    bar: 100000,
    psi: 6894.76,
    atmosphere: 101325
  },
  energy: {
    joule: 1,
    kilojoule: 1000,
    calorie: 4.184,
    kilocalorie: 4184,
    watthour: 3600,
    kilowatthour: 3600000,
    electronvolt: 1.602176634e-19
  },
  power: {
    watt: 1,
    kilowatt: 1000,
    megawatt: 1000000,
    horsepower: 745.7,
    btuperminute: 17.584264
  },
  speed: {
    mps: 1,           // meters per second (base unit)
    kph: 0.277778,    // kilometers per hour (1 km/h = 0.277778 m/s)
    mph: 0.44704,     // miles per hour (1 mph = 0.44704 m/s)
    fps: 0.3048,      // feet per second (1 fps = 0.3048 m/s)
    knot: 0.514444    // nautical miles per hour (1 knot = 0.514444 m/s)
  },
  angle: {
    degree: Math.PI / 180,
    radian: 1,
    gradian: Math.PI / 200,
    arcminute: Math.PI / 10800,
    arcsecond: Math.PI / 648000
  },
  data: {
    byte: 1,
    kilobyte: 1024,
    megabyte: 1048576,
    gigabyte: 1073741824,
    terabyte: 1099511627776,
    bit: 0.125
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    year: 31536000
  }
};

const normalizeUnitName = (unit) => {
  // Handle null/undefined input
  if (!unit) return '';
  
  // Remove spaces, underscores, dots and convert to lowercase
  return unit.toLowerCase()
    .replace(/[\s_\.]/g, '')
    .replace(/square(kilo)?meters?/, 'square$1meter')
    .replace(/square(kilo)?metres?/, 'square$1meter')
    .replace(/sq(uare)?/, 'square')
    .replace(/kilometers?/, 'kilometer')
    .replace(/metres?/, 'meter');
};

const convert = async (category, fromUnit, toUnit, value) => {
  try {
    // Add logging for debugging
    console.debug('Conversion request:', {
      category,
      fromUnit,
      toUnit,
      value
    });

    // Normalize unit names
    const normalizedFromUnit = normalizeUnitName(fromUnit);
    const normalizedToUnit = normalizeUnitName(toUnit);

    if (category === 'temperature') {
      return convertTemperature(normalizedFromUnit, normalizedToUnit, value);
    }

    if (!conversions[category]) {
      throw new Error(`Unsupported category: ${category}`);
    }

    const fromFactor = conversions[category][normalizedFromUnit];
    const toFactor = conversions[category][normalizedToUnit];

    if (!fromFactor) {
      throw new Error(`Invalid unit "${fromUnit}" for category ${category}. Available units: ${Object.keys(conversions[category]).join(', ')}`);
    }
    if (!toFactor) {
      throw new Error(`Invalid unit "${toUnit}" for category ${category}. Available units: ${Object.keys(conversions[category]).join(', ')}`);
    }

    // Use high precision arithmetic for the conversion
    const baseValue = Number((value * fromFactor).toPrecision(15));
    const result = Number((baseValue / toFactor).toPrecision(15));

    // Format display values based on magnitude
    const magnitude = Math.abs(result);
    const formattedValue = magnitude === 0 ? '0' :
      magnitude < 1e-6 ? result.toExponential(6) :
      magnitude < 1e-3 ? result.toFixed(9) :
      result.toFixed(6);

    return {
      success: true,
      result: {
        value: result, // Keep full precision for the actual value
        formatted: `${formattedValue} ${toUnit}`,
        formula: `${value} ${fromUnit} × (${fromFactor}/${toFactor}) = ${formattedValue} ${toUnit}`,
        steps: [
          `Convert ${value} ${fromUnit} to base unit: ${value} × ${fromFactor} = ${baseValue}`,
          `Convert to ${toUnit}: ${baseValue} ÷ ${toFactor} = ${formattedValue}`,
          `Final result: ${formattedValue} ${toUnit}`
        ]
      }
    };
  } catch (error) {
    console.error('Conversion error:', {
      category,
      fromUnit,
      toUnit,
      value,
      error: error.message
    });
    throw error;
  }
};

const convertTemperature = (fromUnit, toUnit, value) => {
  const conversions = {
    'celsius-fahrenheit': (c) => (c * 9/5) + 32,
    'celsius-kelvin': (c) => c + 273.15,
    'fahrenheit-celsius': (f) => (f - 32) * 5/9,
    'fahrenheit-kelvin': (f) => (f - 32) * 5/9 + 273.15,
    'kelvin-celsius': (k) => k - 273.15,
    'kelvin-fahrenheit': (k) => (k - 273.15) * 9/5 + 32
  };

  const key = `${fromUnit}-${toUnit}`.toLowerCase();
  const converter = conversions[key];

  if (!converter) {
    throw new Error(`Invalid unit "${fromUnit}" for temperature conversion. Available units: celsius, fahrenheit, kelvin`);
  }

  const result = converter(value);

  const formulas = {
    'celsius-fahrenheit': `(${value}°C × 9/5) + 32 = ${result.toFixed(2)}°F`,
    'celsius-kelvin': `${value}°C + 273.15 = ${result.toFixed(2)}K`,
    'fahrenheit-celsius': `(${value}°F - 32) × 5/9 = ${result.toFixed(2)}°C`,
    'fahrenheit-kelvin': `(${value}°F - 32) × 5/9 + 273.15 = ${result.toFixed(2)}K`,
    'kelvin-celsius': `${value}K - 273.15 = ${result.toFixed(2)}°C`,
    'kelvin-fahrenheit': `(${value}K - 273.15) × 9/5 + 32 = ${result.toFixed(2)}°F`
  };

  const steps = {
    'celsius-fahrenheit': [
      `Start with ${value}°C`,
      `Multiply by 9/5: ${value} × 9/5 = ${(value * 9/5).toFixed(2)}`,
      `Add 32: ${(value * 9/5).toFixed(2)} + 32 = ${result.toFixed(2)}°F`
    ],
    'celsius-kelvin': [
      `Start with ${value}°C`,
      `Add 273.15: ${value} + 273.15 = ${result.toFixed(2)}K`
    ],
    'fahrenheit-celsius': [
      `Start with ${value}°F`,
      `Subtract 32: ${value} - 32 = ${(value - 32).toFixed(2)}`,
      `Multiply by 5/9: ${(value - 32).toFixed(2)} × 5/9 = ${result.toFixed(2)}°C`
    ],
    'fahrenheit-kelvin': [
      `Start with ${value}°F`,
      `Convert to Celsius: (${value} - 32) × 5/9 = ${((value - 32) * 5/9).toFixed(2)}°C`,
      `Add 273.15: ${((value - 32) * 5/9).toFixed(2)} + 273.15 = ${result.toFixed(2)}K`
    ],
    'kelvin-celsius': [
      `Start with ${value}K`,
      `Subtract 273.15: ${value} - 273.15 = ${result.toFixed(2)}°C`
    ],
    'kelvin-fahrenheit': [
      `Start with ${value}K`,
      `Convert to Celsius: ${value} - 273.15 = ${(value - 273.15).toFixed(2)}°C`,
      `Convert to Fahrenheit: ${(value - 273.15).toFixed(2)} × 9/5 + 32 = ${result.toFixed(2)}°F`
    ]
  };

  return {
    success: true,
    result: {
      value: Number(result.toFixed(6)),
      formatted: `${result.toFixed(2)}°${toUnit.charAt(0).toUpperCase()}`,
      formula: formulas[key],
      steps: steps[key] || []
    }
  };
};

module.exports = { convert }; 
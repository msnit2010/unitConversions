export const categories = [
  {
    id: 'length',
    name: 'Length',
    icon: '📏',
    commonUnits: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch', 'nauticalMile']
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: '⚖️',
    commonUnits: ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton', 'stone']
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: '💧',
    commonUnits: ['liter', 'milliliter', 'cubicMeter', 'gallon', 'quart', 'pint', 'cup', 'fluidOunce', 'tablespoon', 'teaspoon']
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: '🌡️',
    commonUnits: ['celsius', 'fahrenheit', 'kelvin']
  },
  {
    id: 'area',
    name: 'Area',
    icon: '📐',
    commonUnits: ['squareMeter', 'squareKilometer', 'squareMile', 'squareYard', 'squareFoot', 'squareInch', 'hectare', 'acre']
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: '🏃',
    commonUnits: ['meterPerSecond', 'kilometerPerHour', 'milePerHour', 'knot', 'footPerSecond']
  },
  {
    id: 'time',
    name: 'Time',
    icon: '⏱️',
    commonUnits: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century']
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: '🔄',
    commonUnits: ['pascal', 'kilopascal', 'bar', 'psi', 'atmosphere', 'torr', 'millimeterOfMercury']
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: '⚡',
    commonUnits: ['joule', 'kilojoule', 'calorie', 'kilocalorie', 'watthour', 'kilowatthour', 'electronvolt', 'britishThermalUnit']
  },
  {
    id: 'power',
    name: 'Power',
    icon: '💪',
    commonUnits: ['watt', 'kilowatt', 'megawatt', 'horsepower', 'kilocaloriePerHour']
  },
  {
    id: 'dataStorage',
    name: 'Data Storage',
    icon: '💾',
    commonUnits: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte', 'bit', 'kibibyte', 'mebibyte', 'gibibyte']
  },
  {
    id: 'fuelEconomy',
    name: 'Fuel Economy',
    icon: '⛽',
    commonUnits: ['kilometerPerLiter', 'milePerGallon', 'literPer100Kilometer']
  }
];

export const commonConversions = [
  { id: 'meterToFeet', category: 'length', from: 'meter', to: 'foot', name: 'Meters to Feet' },
  { id: 'kgToPounds', category: 'weight', from: 'kilogram', to: 'pound', name: 'Kilograms to Pounds' },
  { id: 'celsiusToFahrenheit', category: 'temperature', from: 'celsius', to: 'fahrenheit', name: 'Celsius to Fahrenheit' },
  { id: 'kmhToMph', category: 'speed', from: 'kilometerPerHour', to: 'milePerHour', name: 'KM/H to MPH' },
  { id: 'literToGallon', category: 'volume', from: 'liter', to: 'gallon', name: 'Liters to Gallons' },
  { id: 'mbToGb', category: 'dataStorage', from: 'megabyte', to: 'gigabyte', name: 'Megabytes to Gigabytes' }
]; 
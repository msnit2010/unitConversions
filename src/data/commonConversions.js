// Common conversion categories and their most used conversions
export const commonConversions = [
  {
    id: 'length-m-ft',
    category: 'Length',
    name: 'Meters to Feet',
    from: 'meters',
    to: 'feet'
  },
  {
    id: 'length-km-mi',
    category: 'Length',
    name: 'Kilometers to Miles',
    from: 'kilometers',
    to: 'miles'
  },
  {
    id: 'weight-kg-lb',
    category: 'Weight',
    name: 'Kilograms to Pounds',
    from: 'kilograms',
    to: 'pounds'
  },
  {
    id: 'temperature-c-f',
    category: 'Temperature',
    name: 'Celsius to Fahrenheit',
    from: 'celsius',
    to: 'fahrenheit'
  },
  {
    id: 'volume-l-gal',
    category: 'Volume',
    name: 'Liters to Gallons',
    from: 'liters',
    to: 'gallons'
  },
  {
    id: 'length-cm-in',
    category: 'Length',
    name: 'Centimeters to Inches',
    from: 'centimeters',
    to: 'inches'
  }
];

// We'll export both ways to ensure compatibility
export default commonConversions; 
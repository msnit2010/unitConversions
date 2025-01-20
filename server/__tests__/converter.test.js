const { convert } = require('../utils/converter');

describe('Unit Converter', () => {
  // Test all categories
  const categories = [
    'length',
    'weight',
    'volume',
    'temperature',
    'area',
    'pressure',
    'energy',
    'power',
    'speed',
    'angle',
    'data',
    'time'
  ];
  
  // Test basic conversion functionality
  categories.forEach(category => {
    describe(`${category} conversions`, () => {
      const testCases = {
        length: { from: 'meter', to: 'kilometer', value: 1000, expected: 1 },
        weight: { from: 'kilogram', to: 'gram', value: 1, expected: 1000 },
        volume: { from: 'liter', to: 'milliliter', value: 1, expected: 1000 },
        temperature: { 
          from: 'celsius', 
          to: 'fahrenheit', 
          value: 0, 
          expected: 32,
          zeroValue: 32 // Special case for temperature zero point
        },
        area: { from: 'squaremeter', to: 'squarekilometer', value: 1000000, expected: 1 },
        pressure: { from: 'pascal', to: 'kilopascal', value: 1000, expected: 1 },
        energy: { from: 'joule', to: 'kilojoule', value: 1000, expected: 1 },
        power: { from: 'watt', to: 'kilowatt', value: 1000, expected: 1 },
        speed: { 
          from: 'kph', 
          to: 'mps', 
          value: 3.6, 
          expected: 1 
        }, // 3.6 km/h = 1 m/s
        angle: { from: 'degree', to: 'radian', value: 180, expected: Math.PI },
        data: { from: 'byte', to: 'kilobyte', value: 1024, expected: 1 },
        time: { from: 'second', to: 'minute', value: 60, expected: 1 }
      };

      if (testCases[category]) {
        test('converts basic units correctly', async () => {
          const { from, to, value, expected } = testCases[category];
          const result = await convert(category, from, to, value);
          expect(result.success).toBe(true);
          expect(result.result.value).toBeCloseTo(expected, 4);
        });

        // Test case sensitivity
        test('handles case-insensitive unit names', async () => {
          const { from, to, value, expected } = testCases[category];
          const result = await convert(
            category,
            from.toUpperCase(),
            to.toUpperCase(),
            value
          );
          expect(result.success).toBe(true);
          expect(result.result.value).toBeCloseTo(expected, 4);
        });

        // Test error handling
        test('handles invalid units gracefully', async () => {
          await expect(convert(category, 'invalid', 'meter', 1))
            .rejects
            .toThrow(/Invalid unit/);
        });

        // Test zero values
        test('handles zero values', async () => {
          const { from, to, zeroValue } = testCases[category];
          const result = await convert(category, from, to, 0);
          expect(result.success).toBe(true);
          // Use zeroValue for temperature, 0 for other categories
          const expectedZero = category === 'temperature' ? zeroValue : 0;
          expect(result.result.value).toBeCloseTo(expectedZero, 4);
        });

        // Test very small values
        test('handles very small values', async () => {
          const { from, to } = testCases[category];
          const result = await convert(category, from, to, 1e-10);
          expect(result.success).toBe(true);
          expect(result.result.value).not.toBe(0);
          expect(isFinite(result.result.value)).toBe(true);
        });

        // Test very large values
        test('handles very large values', async () => {
          const { from, to } = testCases[category];
          const result = await convert(category, from, to, 1e10);
          expect(result.success).toBe(true);
          expect(isFinite(result.result.value)).toBe(true);
        });
      }
    });
  });

  // Comprehensive area conversion tests
  describe('area conversions', () => {
    const areaUnits = [
      'squaremeter',
      'squarekilometer',
      'hectare',
      'acre',
      'squarefoot',
      'squareinch',
      'squareyard',
      'squaremile'
    ];

    // Test all possible area unit combinations
    areaUnits.forEach(fromUnit => {
      areaUnits.forEach(toUnit => {
        test(`converts from ${fromUnit} to ${toUnit}`, async () => {
          const result = await convert('area', fromUnit, toUnit, 1);
          expect(result.success).toBe(true);
          expect(result.result.value).toBeDefined();
          expect(typeof result.result.value).toBe('number');
          expect(isFinite(result.result.value)).toBe(true);
        });
      });
    });

    // Test specific known conversions
    const knownConversions = [
      {
        from: 'squarekilometer',
        to: 'squaremeter',
        value: 1,
        expected: 1000000
      },
      {
        from: 'hectare',
        to: 'squaremeter',
        value: 1,
        expected: 10000
      },
      {
        from: 'acre',
        to: 'squaremeter',
        value: 1,
        expected: 4046.86
      },
      {
        from: 'squarefoot',
        to: 'squaremeter',
        value: 1,
        expected: 0.092903
      },
      {
        from: 'squareinch',
        to: 'squaremeter',
        value: 1,
        expected: 0.00064516
      }
    ];

    test.each(knownConversions)(
      'converts $value $from to $to',
      async ({ from, to, value, expected }) => {
        const result = await convert('area', from, to, value);
        expect(result.success).toBe(true);
        expect(result.result.value).toBeCloseTo(expected, 4);
      }
    );

    // Test error cases
    test('handles invalid area unit names', async () => {
      await expect(convert('area', 'squareKilometer', 'invalidUnit', 1))
        .rejects
        .toThrow(/Invalid unit/);
    });

    test('handles case variations correctly', async () => {
      const variations = [
        { input: 'squareKilometer', expected: 'squarekilometer' },
        { input: 'SQUAREKILOMETER', expected: 'squarekilometer' },
        { input: 'SquareKilometer', expected: 'squarekilometer' },
        { input: 'square_kilometer', expected: 'squarekilometer' }
      ];

      for (const { input } of variations) {
        const result = await convert('area', input, 'squaremeter', 1);
        expect(result.success).toBe(true);
      }
    });

    // Test edge cases
    test('handles zero values', async () => {
      const result = await convert('area', 'squaremeter', 'squarekilometer', 0);
      expect(result.success).toBe(true);
      expect(result.result.value).toBe(0);
    });

    test('handles very large values', async () => {
      const result = await convert('area', 'squarekilometer', 'squareinch', 1000);
      expect(result.success).toBe(true);
      expect(isFinite(result.result.value)).toBe(true);
    });

    test('handles very small values', async () => {
      const result = await convert('area', 'squareinch', 'squarekilometer', 0.000001);
      expect(result.success).toBe(true);
      expect(result.result.value).toBeGreaterThan(0);
    });

    // Add these tests to the area conversions section
    describe('area unit name variations', () => {
      const variations = [
        { input: 'squareKilometer', expected: 1e-6 },
        { input: 'square kilometer', expected: 1e-6 },
        { input: 'square_kilometer', expected: 1e-6 },
        { input: 'sq.kilometer', expected: 1e-6 },
        { input: 'sq kilometer', expected: 1e-6 },
        { input: 'Square Kilometers', expected: 1e-6 },
        { input: 'square kilometres', expected: 1e-6 }
      ];

      test.each(variations)(
        'converts from squaremeter to $input',
        async ({ input, expected }) => {
          const result = await convert('area', 'squaremeter', input, 1);
          expect(result.success).toBe(true);
          expect(result.result.value).toBeCloseTo(expected, 8);
        }
      );

      test.each(variations)(
        'converts from $input to squaremeter',
        async ({ input, expected }) => {
          const result = await convert('area', input, 'squaremeter', 1);
          expect(result.success).toBe(true);
          expect(result.result.value).toBeCloseTo(1/expected, 8);
        }
      );
    });
  });

  // Test response structure
  test('returns correct response structure', async () => {
    const result = await convert('length', 'meter', 'foot', 1);
    expect(result).toEqual({
      success: true,
      result: {
        value: expect.any(Number),
        formatted: expect.any(String),
        formula: expect.any(String),
        steps: expect.arrayContaining([
          expect.any(String),
          expect.any(String),
          expect.any(String)
        ])
      }
    });
  });

  // Test error cases
  describe('error handling', () => {
    test('handles invalid category', async () => {
      await expect(convert('invalid', 'meter', 'foot', 1))
        .rejects
        .toThrow(/Unsupported category/);
    });

    test('handles null/undefined values', async () => {
      await expect(convert('length', null, 'foot', 1))
        .rejects
        .toThrow(/Invalid unit/);
    });

    test('handles empty string values', async () => {
      await expect(convert('length', '', 'foot', 1))
        .rejects
        .toThrow(/Invalid unit/);
    });
  });
}); 
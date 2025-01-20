const UnitConverter = require('../UnitConverter');

describe('UnitConverter Service', () => {
  describe('getCategories', () => {
    it('should return all available categories with their base units', () => {
      const categories = UnitConverter.getCategories();
      expect(categories).toBeInstanceOf(Array);
      expect(categories.find(c => c.id === 'length')).toBeDefined();
      expect(categories.find(c => c.id === 'weight')).toBeDefined();
      expect(categories.find(c => c.id === 'volume')).toBeDefined();
      expect(categories.find(c => c.id === 'length').baseUnit).toBe('meter');
    });
  });

  describe('getUnits', () => {
    it('should return all units for a specific category', () => {
      const lengthUnits = UnitConverter.getUnits('length');
      expect(lengthUnits.baseUnit).toBe('meter');
      expect(lengthUnits.units.find(u => u.id === 'meter')).toBeDefined();
      expect(lengthUnits.units.find(u => u.id === 'kilometer')).toBeDefined();
    });

    it('should throw error for invalid category', () => {
      expect(() => {
        UnitConverter.getUnits('invalid_category');
      }).toThrow("Category 'invalid_category' not found");
    });
  });

  describe('convert', () => {
    it('should convert meter to foot correctly', () => {
      const result = UnitConverter.convert('length', 'meter', 'foot', 1);
      expect(result.to.value).toBeCloseTo(3.28084, 4);
    });

    it('should convert kilogram to pound correctly', () => {
      const result = UnitConverter.convert('weight', 'kilogram', 'pound', 1);
      expect(result.to.value).toBeCloseTo(2.20462, 4);
    });

    it('should handle zero values', () => {
      const result = UnitConverter.convert('length', 'meter', 'foot', 0);
      expect(result.to.value).toBe(0);
    });

    it('should handle negative values', () => {
      const result = UnitConverter.convert('length', 'meter', 'foot', -1);
      expect(result.to.value).toBeCloseTo(-3.28084, 4);
    });

    it('should throw error for invalid units', () => {
      expect(() => {
        UnitConverter.convert('length', 'invalid_unit', 'foot', 1);
      }).toThrow("Unit 'invalid_unit' not found in category 'length'");
    });

    it('should throw error for invalid value', () => {
      expect(() => {
        UnitConverter.convert('length', 'meter', 'foot', 'invalid');
      }).toThrow('Value must be a number');
    });
  });

  describe('getConversionFormula', () => {
    it('should return correct conversion formula', () => {
      const formula = UnitConverter.getConversionFormula('length', 'meter', 'foot');
      expect(formula.formula).toBe('3.280840');
      expect(formula.explanation.split('\n')).toHaveLength(2);
    });

    it('should handle same unit conversion', () => {
      const formula = UnitConverter.getConversionFormula('length', 'meter', 'meter');
      expect(formula.formula).toBe('1');
      expect(formula.explanation).toBe('No conversion needed - both units are meter');
    });
  });
}); 
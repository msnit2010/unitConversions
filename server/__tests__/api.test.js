const setupTestApp = require('./setup');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const conversionRoutes = require('../routes/conversions');

// Create Express app for testing
const app = setupTestApp();

describe('Conversion API Endpoints', () => {
  describe('GET /api/convert', () => {
    it('should convert meter to foot correctly', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'foot',
          value: '1'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeCloseTo(3.28084, 4);
      expect(response.body.formula).toBeDefined();
    });

    it('should convert weight units correctly', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'weight',
          fromUnit: 'kilogram',
          toUnit: 'pound',
          value: '1'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeCloseTo(2.20462, 4);
    });

    it('should handle same unit conversion', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'meter',
          value: '1'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(1);
    });

    it('should handle zero values', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'foot',
          value: '0'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(0);
    });

    it('should handle negative values', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'foot',
          value: '-1'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeCloseTo(-3.28084, 4);
    });

    it('should handle large numbers', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'kilometer',
          value: '1000000'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(1000);
    });

    it('should handle small numbers', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'kilometer',
          toUnit: 'meter',
          value: '0.000001'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(0.001);  // 0.000001 km = 0.001 m
    });

    // Error cases
    it('should return 400 when missing required parameters', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter'
          // Missing toUnit and value
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Missing required parameters');
      expect(response.body.required).toContain('toUnit');
      expect(response.body.required).toContain('value');
    });

    it('should return 400 for invalid category', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'invalid',
          fromUnit: 'meter',
          toUnit: 'foot',
          value: '1'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Category');
    });

    it('should return 400 for invalid unit', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'invalid',
          toUnit: 'foot',
          value: '1'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Unit');
    });

    it('should return 400 for invalid numeric value', async () => {
      const response = await request(app)
        .get('/api/convert')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'foot',
          value: 'abc'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('number');
    });
  });

  describe('GET /api/categories', () => {
    it('should return all available categories', async () => {
      const response = await request(app)
        .get('/api/categories');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.categories).toHaveProperty('length');
      expect(response.body.categories).toHaveProperty('weight');
      expect(response.body.categories).toHaveProperty('volume');
    });
  });

  describe('GET /api/units/:category', () => {
    it('should return all units for a valid category', async () => {
      const response = await request(app)
        .get('/api/units/length');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.base).toBe('meter');
      expect(response.body.units).toHaveProperty('meter');
      expect(response.body.units).toHaveProperty('foot');
    });

    it('should return 400 for invalid category', async () => {
      const response = await request(app)
        .get('/api/units/invalid');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Category');
    });
  });

  describe('GET /api/formula', () => {
    it('should return conversion formula for valid units', async () => {
      const response = await request(app)
        .get('/api/formula')
        .query({
          category: 'length',
          fromUnit: 'meter',
          toUnit: 'foot'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.formula).toBe('1 meter = 3.280840 foot');
      expect(response.body.steps).toHaveLength(2);
    });

    it('should return 400 for missing parameters', async () => {
      const response = await request(app)
        .get('/api/formula')
        .query({
          category: 'length',
          fromUnit: 'meter'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Missing required parameters');
    });
  });

  describe('Server Health', () => {
    it('should respond to health check', async () => {
      const response = await request(app)
        .get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        success: true
      });
    });
  });

  // Add cleanup after all tests
  afterAll(done => {
    done();
  });
}); 
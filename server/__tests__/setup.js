const request = require('supertest');
const express = require('express');
const cors = require('cors');
const conversionRoutes = require('../routes/conversions');
const { redisClient, connectRedis } = require('../config/redis');

// Jest setup file
require('dotenv').config();

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};

global.localStorage = localStorageMock;

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console errors during tests
console.error = jest.fn();
console.warn = jest.fn();

const setupTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', conversionRoutes);
  return app;
};

beforeAll(async () => {
  await connectRedis();
});

afterAll(async () => {
  await redisClient.quit();
});

// Clean up after each test
afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

module.exports = setupTestApp; 
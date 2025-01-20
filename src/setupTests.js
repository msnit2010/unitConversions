// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia before any tests run
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock translations response
global.mockTranslations = {
  en: {
    common: {
      enterValue: 'Enter value',
      from: 'From',
      to: 'To',
      swap: 'Swap',
      convert: 'Convert',
      clear: 'Clear',
      loading: 'Loading...'
    },
    errors: {
      required: 'This field is required',
      invalidNumber: 'Please enter a valid number',
      networkError: 'Network error occurred'
    }
  }
}; 
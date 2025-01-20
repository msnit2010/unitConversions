import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { LanguageProvider } from '../../../contexts/LanguageContext';
import createTheme from '../../../theme';
import ConverterForm from '../ConverterForm';

// Mock window.matchMedia
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

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock the fetch function
global.fetch = jest.fn();

// Mock translations response
const mockTranslations = {
  en: {
    converter: {
      inputPlaceholder: 'Enter value',
      resultPlaceholder: 'Result',
      swapButton: 'Swap',
      errorMessages: {
        invalidNumber: 'Please enter a valid number',
        networkError: 'Network error occurred'
      }
    }
  }
};

// Helper function to render component with providers
const renderWithProviders = (ui) => {
  // Mock successful translations fetch
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(global.mockTranslations)
    })
  );

  const theme = createTheme('light');

  return render(
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          {ui}
        </LanguageProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

describe('ConverterForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it('renders the converter form with correct elements', async () => {
    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/enter value/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
    });
  });

  it('initializes with default units', async () => {
    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(() => {
      const selects = screen.getAllByRole('combobox');
      expect(selects).toHaveLength(2);
      expect(selects[0]).toHaveValue('meter');
      expect(selects[1]).toHaveValue('foot');
    });
  });

  it('performs conversion when input value changes', async () => {
    // Mock successful API response
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(global.mockTranslations)
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            result: 3.28084,
            formula: {
              formula: '1 meter = 3.28084 feet'
            }
          })
        })
      );

    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const input = screen.getByLabelText(/enter value/i);
      await userEvent.type(input, '1');
      expect(screen.getByDisplayValue('3.28084')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock API error response
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(global.mockTranslations)
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({
            success: false,
            error: 'Conversion failed'
          })
        })
      );

    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const input = screen.getByLabelText(/enter value/i);
      await userEvent.type(input, '1');
      expect(screen.getByText('Conversion failed')).toBeInTheDocument();
    });
  });

  it('swaps units when swap button is clicked', async () => {
    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const selects = screen.getAllByRole('combobox');
      const fromSelect = selects[0];
      const toSelect = selects[1];
      const swapButton = screen.getByRole('button', { name: /swap/i });

      expect(fromSelect).toHaveValue('meter');
      expect(toSelect).toHaveValue('foot');

      await userEvent.click(swapButton);

      expect(fromSelect).toHaveValue('foot');
      expect(toSelect).toHaveValue('meter');
    });
  });

  it('validates numeric input', async () => {
    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const input = screen.getByLabelText(/enter value/i);
      await userEvent.type(input, 'abc');
      expect(input).toHaveValue('');
    });
  });

  it('updates conversion when units change', async () => {
    // Mock successful API responses
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(global.mockTranslations)
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            result: 3.28084,
            formula: {
              formula: '1 meter = 3.28084 feet'
            }
          })
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            result: 0.0254,
            formula: {
              formula: '1 meter = 0.0254 inches'
            }
          })
        })
      );

    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const input = screen.getByLabelText(/enter value/i);
      const toUnitSelect = screen.getAllByRole('combobox')[1];

      await userEvent.type(input, '1');
      await userEvent.selectOptions(toUnitSelect, 'inch');

      expect(screen.getByDisplayValue('0.0254')).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    // Mock network error
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(global.mockTranslations)
        })
      )
      .mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    await renderWithProviders(<ConverterForm category="length" />);
    
    await waitFor(async () => {
      const input = screen.getByLabelText(/enter value/i);
      await userEvent.type(input, '1');
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });
}); 
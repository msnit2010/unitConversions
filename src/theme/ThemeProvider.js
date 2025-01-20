import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from './theme';

const ThemeContext = createContext({
  mode: 'light',
  systemPreference: 'light',
  setMode: () => {},
  toggleMode: () => {}
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get system color scheme preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const [systemPreference, setSystemPreference] = useState(
    prefersDarkMode.matches ? 'dark' : 'light'
  );

  // Get saved theme preference from localStorage or use system preference
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || systemPreference;
  });

  // Update theme when system preference changes
  useEffect(() => {
    const handleChange = (e) => {
      const newMode = e.matches ? 'dark' : 'light';
      setSystemPreference(newMode);
      // Only update mode if user hasn't set a preference
      if (!localStorage.getItem('themeMode')) {
        setMode(newMode);
      }
    };

    prefersDarkMode.addEventListener('change', handleChange);
    return () => prefersDarkMode.removeEventListener('change', handleChange);
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Update document color scheme for iOS system UI
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  // Create theme based on current mode
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    mode,
    systemPreference,
    setMode,
    toggleMode
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 
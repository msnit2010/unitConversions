import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#2563eb' : '#1e40af',
        light: mode === 'dark' ? '#3b82f6' : '#3730a3',
        dark: mode === 'dark' ? '#1d4ed8' : '#1e3a8a',
      },
      secondary: {
        main: mode === 'dark' ? '#4f46e5' : '#3730a3',
        light: mode === 'dark' ? '#6366f1' : '#4f46e5',
        dark: mode === 'dark' ? '#4338ca' : '#312e81',
      },
      background: {
        default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
        paper: mode === 'dark' ? '#121212' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
        secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
    },
  });
};

export default getTheme; 
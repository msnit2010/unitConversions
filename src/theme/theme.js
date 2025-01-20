import { createTheme } from '@mui/material/styles';

// Apple's system font stack
const systemFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'SF Pro Text',
  'SF Pro Display',
  'Helvetica Neue',
  'Arial',
  'sans-serif'
].join(',');

// Apple's recommended touch target size (44x44px)
const touchTargetSize = 44;

// Color palette following Apple's guidelines
const colors = {
  light: {
    primary: {
      main: '#007AFF', // iOS blue
      dark: '#0062CC',
      light: '#3395FF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#5856D6', // iOS purple
      dark: '#4641BE',
      light: '#7674E1',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF3B30', // iOS red
      dark: '#D63429',
      light: '#FF6961',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FF9500', // iOS orange
      dark: '#CC7A00',
      light: '#FFAA33',
      contrastText: '#000000'
    },
    info: {
      main: '#64D2FF', // iOS light blue
      dark: '#47B8E0',
      light: '#89DFFF',
      contrastText: '#000000'
    },
    success: {
      main: '#34C759', // iOS green
      dark: '#2BA149',
      light: '#5AD27A',
      contrastText: '#FFFFFF'
    },
    grey: {
      50: '#F9F9F9',
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#3A3A3C'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F2F2F7',
      elevated: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: '#6C6C70',
      disabled: '#AEAEB2'
    },
    divider: 'rgba(0, 0, 0, 0.12)'
  },
  dark: {
    primary: {
      main: '#0A84FF', // iOS blue (dark mode)
      dark: '#0066CC',
      light: '#409CFF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#5E5CE6', // iOS purple (dark mode)
      dark: '#4A48B8',
      light: '#7A78FF',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF453A', // iOS red (dark mode)
      dark: '#CC372F',
      light: '#FF6961',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FF9F0A', // iOS orange (dark mode)
      dark: '#CC7F08',
      light: '#FFB340',
      contrastText: '#000000'
    },
    info: {
      main: '#64D2FF', // iOS light blue (dark mode)
      dark: '#47B8E0',
      light: '#89DFFF',
      contrastText: '#000000'
    },
    success: {
      main: '#30D158', // iOS green (dark mode)
      dark: '#26A746',
      light: '#5AD27A',
      contrastText: '#FFFFFF'
    },
    grey: {
      50: '#1C1C1E',
      100: '#2C2C2E',
      200: '#3A3A3C',
      300: '#48484A',
      400: '#636366',
      500: '#8E8E93',
      600: '#AEAEB2',
      700: '#C7C7CC',
      800: '#D1D1D6',
      900: '#E5E5EA'
    },
    background: {
      default: '#000000',
      paper: '#1C1C1E',
      elevated: '#2C2C2E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AEAEB2',
      disabled: '#636366'
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  }
};

// Create theme factory
const createAppTheme = (mode = 'light') => {
  const colorMode = mode === 'dark' ? colors.dark : colors.light;

  return createTheme({
    palette: {
      mode,
      ...colorMode
    },
    typography: {
      fontFamily: systemFontStack,
      h1: {
        fontSize: '34px',
        fontWeight: 700,
        letterSpacing: '-0.022em',
        lineHeight: 1.2
      },
      h2: {
        fontSize: '28px',
        fontWeight: 700,
        letterSpacing: '-0.021em',
        lineHeight: 1.25
      },
      h3: {
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '-0.020em',
        lineHeight: 1.3
      },
      h4: {
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: '-0.019em',
        lineHeight: 1.35
      },
      h5: {
        fontSize: '17px',
        fontWeight: 600,
        letterSpacing: '-0.019em',
        lineHeight: 1.4
      },
      h6: {
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '-0.018em',
        lineHeight: 1.4
      },
      body1: {
        fontSize: '17px',
        letterSpacing: '-0.019em',
        lineHeight: 1.5
      },
      body2: {
        fontSize: '15px',
        letterSpacing: '-0.018em',
        lineHeight: 1.5
      },
      button: {
        fontSize: '17px',
        fontWeight: 600,
        letterSpacing: '-0.019em',
        textTransform: 'none'
      },
      caption: {
        fontSize: '13px',
        letterSpacing: '-0.017em',
        lineHeight: 1.4
      }
    },
    shape: {
      borderRadius: 10
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: touchTargetSize,
            borderRadius: 10,
            padding: '0 16px',
            transition: 'all 0.2s ease-in-out',
            '&:active': {
              transform: 'scale(0.98)'
            }
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 12,
            borderRadius: '50%',
            transition: 'all 0.2s ease-in-out',
            '&:active': {
              transform: 'scale(0.95)'
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              minHeight: touchTargetSize,
              borderRadius: 10
            }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            minHeight: touchTargetSize,
            borderRadius: 10
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          },
          rounded: {
            borderRadius: 10
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundImage: 'none'
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'dark' ? '#636366' : '#8E8E93',
            fontSize: '13px',
            padding: '8px 12px',
            borderRadius: 8
          }
        }
      }
    }
  });
};

export default createAppTheme; 
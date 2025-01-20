import React from 'react';
import { AppBar, Toolbar, Container, Box, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../../contexts/LanguageContext';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          padding: isMobile ? '8px 16px' : '0 24px',
          gap: isMobile ? '8px' : '0'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'space-between'
          }}>
            <Navigation />
            {isMobile && (
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <ThemeToggle />
                <LanguageSelector 
                  currentLanguage={currentLanguage}
                  onLanguageChange={changeLanguage}
                />
              </Box>
            )}
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <ThemeToggle />
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container 
        component="main" 
        sx={{ 
          flex: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Outlet />
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          mt: 'auto',
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: isMobile ? '16px' : '0'
          }}>
            <Box>© 2024 Unit Converter. All rights reserved.</Box>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: '12px', sm: '24px' },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/sitemap">Sitemap</a>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 
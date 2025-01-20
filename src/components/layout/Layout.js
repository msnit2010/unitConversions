import React from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Header />
      <Container 
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: isMobile ? 2 : 4,
          px: isMobile ? 2 : 3,
          '@media (max-width: 600px)': {
            // iOS safe area insets
            paddingTop: 'calc(env(safe-area-inset-top) + 16px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
            paddingLeft: 'calc(env(safe-area-inset-left) + 16px)',
            paddingRight: 'calc(env(safe-area-inset-right) + 16px)'
          }
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 
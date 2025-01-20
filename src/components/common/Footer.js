import React from 'react';
import { Box, Container, Grid, Link, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default  // Changed from paper to default
          : theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : theme.palette.text.primary,
                mb: 2 
              }}
            >
              About
            </Typography>
            <Link 
              component={RouterLink} 
              to="/about" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              About Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : theme.palette.text.primary,
                mb: 2 
              }}
            >
              Legal
            </Typography>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Privacy Policy
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : theme.palette.text.primary,
                mb: 2 
              }}
            >
              Contact
            </Typography>
            <Link 
              component={RouterLink} 
              to="/contact" 
              sx={{ 
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Typography 
          variant="body2" 
          align="center"
          sx={{
            mt: 4,
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.7)'
              : theme.palette.text.secondary,
          }}
        >
          © {new Date().getFullYear()} Unit Converter. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import GradientBackground from '../components/common/GradientBackground';
import Card from '../components/common/Card';
import { useTheme } from '@mui/material/styles';

const AboutPage = () => {
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <Box>
      <GradientBackground
        variant="mesh"
        sx={{ 
          py: { xs: 4, md: 8 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1"
            sx={{ 
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              fontWeight: 800,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)'
                : 'linear-gradient(45deg, #1e40af 30%, #3730a3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              textShadow: theme.palette.mode === 'dark'
                ? 'none'
                : '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              mb: 3,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.7)',
            }}
          >
            Welcome to our unit converter website
          </Typography>
        </Container>
      </GradientBackground>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card
              variant="default"
              sx={{ p: 2.5 }}
            >
              <Typography variant="body1" paragraph>
                Welcome to our unit converter website, a platform built with passion and purpose by a small team of dedicated individuals. Our mission is simple yet ambitious: to create the most user-friendly, accurate, and modern unit conversion tool available online.
              </Typography>
              
              <Typography variant="body1" paragraph>
                We understand that precise and efficient unit conversions are essential in many aspects of life, from academic studies and professional projects to everyday tasks. That's why we've worked tirelessly to design a website that combines speed, simplicity, and reliability, ensuring you get the answers you need, exactly when you need them.
              </Typography>
              
              <Typography variant="body1" paragraph>
                Unlike large corporations, we are a small, independent team driven by our commitment to serving our users. We're not just building a website; we're crafting a tool that we hope will make your day-to-day life easier. Every feature, from real-time calculations to our intuitive interface, has been thoughtfully designed with you in mind.
              </Typography>
              
              <Typography variant="body1" paragraph>
                We're also deeply invested in continuous improvement. We actively collect feedback through user surveys, contact forms, and feature requests submitted on our website. This feedback is carefully analyzed to identify areas for enhancement, and we prioritize updates and new features based on your needs. By doing so, we aim to make our platform more efficient, user-friendly, and aligned with what you expect from a modern conversion tool.
              </Typography>
              
              <Typography variant="body1">
                Thank you for choosing our website. Whether you're converting units for work, study, or personal projects, we're here to help you every step of the way.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              variant="gradient"
              gradientColors={['#4f46e522', '#6366f122']}
              sx={{ p: 2.5, mb: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2">
                To create the most user-friendly, accurate, and modern unit conversion tool available online, making your day-to-day calculations simpler and more efficient.
              </Typography>
            </Card>
            
            <Card
              variant="gradient"
              gradientColors={['#2563eb22', '#3b82f622']}
              sx={{ p: 2.5 }}
            >
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body2">
                Your feedback helps us improve. Feel free to reach out with suggestions, questions, or comments about our service.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage; 
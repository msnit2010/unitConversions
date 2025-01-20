import React from 'react';
import { Container, Paper, Typography, Box, Grid, Link, useTheme } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';
import GradientBackground from '../components/common/GradientBackground';
import Icon, { ICONS } from '../components/common/Icon';

const SitemapPage = () => {
  const { t } = useLanguage();
  const theme = useTheme();

  const categories = [
    {
      name: 'length',
      icon: ICONS.LENGTH,
      units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch']
    },
    {
      name: 'weight',
      icon: ICONS.WEIGHT,
      units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton']
    },
    {
      name: 'volume',
      icon: ICONS.VOLUME,
      units: ['liter', 'milliliter', 'cubic-meter', 'gallon', 'quart', 'pint', 'cup']
    },
    {
      name: 'temperature',
      icon: ICONS.TEMPERATURE,
      units: ['celsius', 'fahrenheit', 'kelvin']
    },
    {
      name: 'area',
      icon: ICONS.AREA,
      units: ['square-meter', 'square-kilometer', 'hectare', 'acre', 'square-foot', 'square-inch']
    },
    {
      name: 'speed',
      icon: ICONS.SPEED,
      units: ['meters-per-second', 'kilometers-per-hour', 'miles-per-hour', 'knot']
    },
    {
      name: 'time',
      icon: ICONS.TIME,
      units: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
    },
    {
      name: 'pressure',
      icon: ICONS.PRESSURE,
      units: ['pascal', 'bar', 'psi', 'atmosphere']
    },
    {
      name: 'energy',
      icon: ICONS.ENERGY,
      units: ['joule', 'calorie', 'kilowatt-hour', 'electron-volt']
    },
    {
      name: 'power',
      icon: ICONS.POWER,
      units: ['watt', 'kilowatt', 'horsepower', 'megawatt']
    },
    {
      name: 'data',
      icon: ICONS.DATA,
      units: ['bit', 'byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
    },
    {
      name: 'fuel',
      icon: ICONS.FUEL,
      units: ['miles-per-gallon', 'kilometers-per-liter', 'liters-per-100km']
    }
  ];

  const pages = [
    { name: 'home', path: '/', icon: ICONS.HOME },
    { name: 'about', path: '/about', icon: ICONS.INFO },
    { name: 'contact', path: '/contact', icon: ICONS.EMAIL },
    { name: 'privacy', path: '/privacy', icon: ICONS.SHIELD }
  ];

  return (
    <Box>
      <GradientBackground
        variant="mesh"
        sx={{ 
          py: { xs: 6, md: 12 },
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
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            {t('sitemap.title')}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            {t('sitemap.subtitle')}
          </Typography>
        </Container>
      </GradientBackground>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Main Pages */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              mb: 4,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('sitemap.mainPages')}
          </Typography>
          <Grid container spacing={2}>
            {pages.map((page) => (
              <Grid item xs={12} sm={6} md={3} key={page.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}
                >
                  <Link
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      textDecoration: 'none',
                      color: 'text.primary'
                    }}
                  >
                    <Icon name={page.icon} size={24} color="primary" />
                    <Typography variant="h6">
                      {t(`nav.${page.name}`)}
                    </Typography>
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Conversion Categories */}
        <Typography 
          variant="h4" 
          component="h2"
          sx={{ 
            mb: 4,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {t('sitemap.conversionCategories')}
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Icon name={category.icon} size={32} color="primary" />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {t(`categories.${category.name}`)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.units.map((unit) => (
                    <Link
                      key={unit}
                      component={RouterLink}
                      to={`/convert/${category.name}/${unit}`}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        backgroundColor: 'action.hover',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText'
                        }
                      }}
                    >
                      {unit.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Link>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tools and Resources */}
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              mb: 4,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('sitemap.tools')}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  {t('sitemap.calculators')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link 
                    href="/bmi-calculator" 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.CALCULATOR} size={20} />
                    BMI Calculator
                  </Link>
                  <Link 
                    href="/percentage-calculator"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.PERCENTAGE} size={20} />
                    Percentage Calculator
                  </Link>
                  <Link 
                    href="/scientific-calculator"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.SCIENTIFIC} size={20} />
                    Scientific Calculator
                  </Link>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  {t('sitemap.resources')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link 
                    href="/conversion-formulas"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.FORMULA} size={20} />
                    Conversion Formulas
                  </Link>
                  <Link 
                    href="/unit-definitions"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.DEFINITION} size={20} />
                    Unit Definitions
                  </Link>
                  <Link 
                    href="/conversion-tables"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Icon name={ICONS.TABLE} size={20} />
                    Conversion Tables
                  </Link>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SitemapPage; 
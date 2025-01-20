import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  useTheme,
  Button,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import GradientBackground from '../components/common/GradientBackground';
import Card from '../components/common/Card';
import CategoryGrid from '../components/common/CategoryGrid';
import Icon, { ICONS } from '../components/common/Icon';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const FEATURED_CONVERSIONS = [
  {
    titleKey: 'categories.length',
    descriptionKey: 'home.featured.length',
    icon: ICONS.LENGTH,
    path: '/convert/length',
    gradient: ['#3b82f633', '#2563eb33']
  },
  {
    titleKey: 'categories.weight',
    descriptionKey: 'home.featured.weight',
    icon: ICONS.WEIGHT,
    path: '/convert/weight',
    gradient: ['#4f46e533', '#6366f133']
  },
  {
    titleKey: 'categories.temperature',
    descriptionKey: 'home.featured.temperature',
    icon: ICONS.TEMPERATURE,
    path: '/convert/temperature',
    gradient: ['#db277833', '#ef444433']
  }
];

const ALL_CATEGORIES = [
  'length', 'weight', 'volume', 'temperature', 
  'area', 'speed', 'time', 'pressure',
  'energy', 'power', 'dataStorage', 'fuelEconomy'
];

const HomePage = () => {
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Box>
      <GradientBackground
        variant="hero"
        sx={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1"
            sx={{ 
              mb: 2,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)'
                : 'linear-gradient(45deg, #1e40af 30%, #3730a3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.palette.mode === 'dark'
                ? 'none'
                : '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {t('home.hero.title')}
          </Typography>
          <Typography 
            variant="h2"
            component="p"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              fontWeight: 400,
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.7)',
            }}
          >
            {t('home.hero.subtitle')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/convert/length')}
            startIcon={<Icon name={ICONS.CONVERT} />}
            sx={{ px: 3, py: 1.25 }}
          >
            {t('common.convert')}
          </Button>
        </Container>
      </GradientBackground>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            mb: 3,
            textAlign: 'center',
            fontSize: { xs: '1.75rem', sm: '2rem' },
            fontWeight: 600,
            py: 2
          }}
        >
          {t('home.featured.title')}
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {FEATURED_CONVERSIONS.map((conversion) => (
            <Grid item xs={12} sm={6} md={4} key={conversion.path}>
              <Card
                variant="gradient"
                gradient={conversion.gradient}
                onClick={() => navigate(conversion.path)}
                sx={{ 
                  height: '100%',
                  minHeight: '160px'
                }}
              >
                <Box sx={{ 
                  p: 2.5,
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}>
                  <Icon 
                    name={conversion.icon}
                    size={32}
                    sx={{ mb: 1.5 }}
                  />
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {t(conversion.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {t(conversion.descriptionKey)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
            {t('home.allCategories.title')}
          </Typography>
          <CategoryGrid categories={ALL_CATEGORIES} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 
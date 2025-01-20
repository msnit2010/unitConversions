import React from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const ConversionHeader = ({ category, icon, name }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();

  // Map of category icons to emoji
  const categoryEmojis = {
    'STRAIGHTEN': '📏',
    'SCALE': '⚖️',
    'WATER_DROP': '💧',
    'THERMOSTAT': '🌡️',
    'SQUARE_FOOT': '📐',
    'SPEED': '🏃',
    'TIMER': '⏱️',
    'COMPRESS': '🔄',
    'BOLT': '⚡',
    'POWER': '💪',
    'STORAGE': '💾',
    'LOCAL_GAS_STATION': '⛽'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: isMobile ? 1 : 2,
        py: isMobile ? 1 : 1.5
      }}
    >
      <IconButton
        onClick={() => navigate('/categories')}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }}
      >
        <ArrowBackIcon fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
      
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        component="h1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 500,
          color: theme.palette.text.primary
        }}
      >
        <span role="img" aria-label={name}>
          {categoryEmojis[icon] || '🔄'}
        </span>
        {t(`categories.${category}`)}
      </Typography>
    </Box>
  );
};

export default ConversionHeader; 
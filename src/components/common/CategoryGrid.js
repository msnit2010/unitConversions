import React from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from './Card';
import Icon, { ICONS } from './Icon';

const CategoryCard = ({ category, onClick }) => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  const getIcon = (category) => {
    const iconMap = {
      length: ICONS.LENGTH,
      weight: ICONS.WEIGHT,
      volume: ICONS.VOLUME,
      temperature: ICONS.TEMPERATURE,
      area: ICONS.AREA,
      speed: ICONS.SPEED,
      pressure: ICONS.PRESSURE,
      energy: ICONS.ENERGY,
      power: ICONS.POWER,
      time: ICONS.TIME,
      data: ICONS.DATA,
      fuel: ICONS.FUEL
    };
    return iconMap[category] || ICONS.CONVERT;
  };
  
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      sx={{
        height: '100%',
        minHeight: 180,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: theme.palette.primary.main + '11',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            <Icon
              name={getIcon(category)}
              size={28}
              color="primary"
            />
          </Box>
          <Typography variant="h6" component="h3">
            {t(`categories.${category}`)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {t(`categories.${category}Description`)}
        </Typography>
      </Box>
      <Box sx={visuallyHidden}>
        {t('common.aria.categoryCard', { category: t(`categories.${category}`) })}
      </Box>
    </Card>
  );
};

const CategoryGrid = ({ categories }) => {
  const navigate = useNavigate();
  
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category}>
          <CategoryCard
            category={category}
            onClick={() => navigate(`/convert/${category}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid; 
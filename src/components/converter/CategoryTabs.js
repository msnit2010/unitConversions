import React from 'react';
import { Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useLanguage } from '../../contexts/LanguageContext';

const CategoryTabs = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();

  const handleChange = (event, newValue) => {
    navigate(`/convert/${newValue}`);
  };

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
        borderBottom: 1, 
        borderColor: 'divider',
        mb: 2
      }}
    >
      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          minHeight: isMobile ? 40 : 48,
          '& .MuiTab-root': {
            minHeight: isMobile ? 40 : 48,
            py: 0.5,
            px: isMobile ? 1 : 2,
            minWidth: 'auto',
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            textTransform: 'none'
          }
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            value={category.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span role="img" aria-label={category.name}>
                  {categoryEmojis[category.icon] || '🔄'}
                </span>
                <span>{t(`categories.${category.id}`)}</span>
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs; 
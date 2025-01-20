import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Icon, { ICONS } from './Icon';

const CATEGORIES = [
  { id: 'length', label: 'Length', icon: ICONS.LENGTH },
  { id: 'temperature', label: 'Temperature', icon: ICONS.TEMPERATURE },
  { id: 'area', label: 'Area', icon: ICONS.AREA },
  { id: 'volume', label: 'Volume', icon: ICONS.VOLUME },
  { id: 'weight', label: 'Weight', icon: ICONS.WEIGHT },
  { id: 'time', label: 'Time', icon: ICONS.TIME },
];

const TabSystem = ({ activeTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        mb: 4,
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          gap: 1,
          minWidth: isMobile ? 'max-content' : 'auto',
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        {CATEGORIES.map(({ id, label, icon }) => (
          <Box
            key={id}
            onClick={() => onTabChange(id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 2,
              borderRadius: 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              bgcolor: activeTab === id ? `${theme.palette.primary.main}11` : 'transparent',
              color: activeTab === id ? 'primary.main' : 'text.secondary',
              '&:hover': {
                bgcolor: activeTab === id 
                  ? `${theme.palette.primary.main}22`
                  : 'action.hover',
              },
              position: 'relative',
              ...(activeTab === id && {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  ...(isMobile ? {
                    bottom: 0,
                    left: '10%',
                    width: '80%',
                    height: 2,
                  } : {
                    right: 0,
                    top: '10%',
                    width: 2,
                    height: '80%',
                  }),
                  bgcolor: 'primary.main',
                  borderRadius: 4,
                },
              }),
            }}
          >
            <Icon
              name={icon}
              size={24}
              color={activeTab === id ? 'primary' : 'action'}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: activeTab === id ? 600 : 500,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TabSystem; 
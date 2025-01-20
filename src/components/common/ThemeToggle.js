import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import Icon, { ICONS } from './Icon';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Tooltip
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      arrow
      placement="bottom"
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          p: 1.5,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${muiTheme.palette.primary.main}11, ${muiTheme.palette.secondary.main}11)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          
          '&:hover': {
            borderColor: 'primary.main',
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${muiTheme.palette.primary.main}22`,
            
            '&::before': {
              opacity: 1,
            },
            
            '& .MuiSvgIcon-root': {
              transform: 'rotate(360deg) scale(1.1)',
            },
          },
          
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        <Icon
          name={isDark ? ICONS.LIGHT_MODE : ICONS.DARK_MODE}
          size={24}
          color="primary"
          sx={{
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 
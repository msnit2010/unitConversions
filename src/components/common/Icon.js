import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = ({
  name,
  size = 24,
  color = 'inherit',
  animate,
  sx = {},
  ...props
}) => {
  const getAnimation = () => {
    switch (animate) {
      case 'pulse':
        return `${pulseAnimation} 2s ease-in-out infinite`;
      case 'spin':
        return `${spinAnimation} 1s linear infinite`;
      default:
        return 'none';
    }
  };

  return (
    <Box
      component="span"
      className="material-icons"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size,
        color,
        transition: 'all 0.2s ease-in-out',
        animation: getAnimation(),
        userSelect: 'none',
        '&:hover': {
          transform: props.onClick ? 'scale(1.1)' : 'none',
        },
        ...sx,
      }}
      {...props}
    >
      {name}
    </Box>
  );
};

// Common icon names used in the application
export const ICONS = {
  // Navigation
  MENU: 'menu',
  CLOSE: 'close',
  BACK: 'arrow_back',
  FORWARD: 'arrow_forward',
  
  // Actions
  CONVERT: 'swap_horiz',
  SWAP: 'swap_vert',
  COPY: 'content_copy',
  RESET: 'refresh',
  SETTINGS: 'settings',
  
  // Categories
  LENGTH: 'straighten',
  WEIGHT: 'monitor_weight',
  VOLUME: 'water_drop',
  TEMPERATURE: 'device_thermostat',
  TIME: 'schedule',
  SPEED: 'speed',
  AREA: 'square_foot',
  PRESSURE: 'compress',
  
  // Feedback
  SUCCESS: 'check_circle',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'sync',
  
  // Theme
  LIGHT_MODE: 'light_mode',
  DARK_MODE: 'dark_mode',
  
  // Language
  LANGUAGE: 'language',
  
  // Social
  GITHUB: 'code',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  
  // Misc
  HELP: 'help',
  SEARCH: 'search',
  SHARE: 'share',
  FAVORITE: 'favorite',
  MORE: 'more_vert'
};

export default Icon; 
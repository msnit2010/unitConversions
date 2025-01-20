import React from 'react';
import { Paper as MuiPaper, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const Paper = ({
  children,
  elevation = 0,
  variant = 'elevation',
  square = false,
  transparent = false,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  const baseStyles = {
    p: { xs: 2, sm: 3 },
    borderRadius: theme.shape.borderRadius,
    backgroundColor: transparent 
      ? 'transparent'
      : theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease-in-out',
    '@media (max-width: 600px)': transparent ? {
      border: 'none',
      p: 2,
      backgroundColor: 'transparent'
    } : undefined,
    '&:hover': variant === 'interactive' ? {
      backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[50],
      borderColor: theme.palette.primary.main
    } : undefined,
    '&:active': variant === 'interactive' ? {
      backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
      transform: 'scale(0.99)'
    } : undefined
  };

  return (
    <MuiPaper
      elevation={elevation}
      square={square}
      sx={{
        ...baseStyles,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiPaper>
  );
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['elevation', 'outlined', 'interactive']),
  square: PropTypes.bool,
  transparent: PropTypes.bool,
  sx: PropTypes.object
};

export default Paper; 
import React from 'react';
import { Paper, Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const hoverAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  }
  50% {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12);
  }
  100% {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
  }
`;

const Card = ({
  children,
  variant = 'default', // default, gradient, interactive
  gradient,
  gradientColors,
  onClick,
  ariaLabel,
  role = 'region',
  tabIndex,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getBackgroundStyle = () => {
    if (variant === 'gradient' && gradient) {
      return {
        background: `linear-gradient(135deg, ${gradient.join(', ')})`,
        backdropFilter: 'blur(8px)',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: isDark 
            ? 'linear-gradient(45deg, rgba(255,255,255,0.05), transparent)'
            : 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent)',
          borderRadius: 'inherit',
        }
      };
    }

    if (variant === 'gradient' && gradientColors) {
      return {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        backdropFilter: 'blur(8px)',
      };
    }

    // Default style for light/dark modes
    return isDark
      ? {
          background: theme.palette.background.paper,
          boxShadow: getShadow(theme)
        }
      : {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(231, 235, 240, 0.8)',
          boxShadow: getShadow(theme),
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
            borderRadius: 'inherit',
          }
        };
  };

  const getShadow = (theme) => {
    const shadowColor = isDark 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(0, 0, 0, 0.1)';
    
    const hoverShadowColor = isDark
      ? 'rgba(0, 0, 0, 0.6)'
      : 'rgba(0, 0, 0, 0.15)';
    
    return onClick
      ? `0 4px 12px ${shadowColor}, 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, ${isDark ? '0.05' : '0.1'})`
      : `0 2px 8px ${shadowColor}, inset 0 1px 1px rgba(255, 255, 255, ${isDark ? '0.05' : '0.1'})`;
  };

  const handleKeyDown = (event) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  // Set appropriate ARIA roles and attributes
  const getAriaProps = () => {
    if (onClick) {
      return {
        role: 'button',
        tabIndex: tabIndex ?? 0,
        'aria-label': ariaLabel,
        onKeyDown: handleKeyDown,
      };
    }
    return {
      role: role,
      'aria-label': ariaLabel,
    };
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        ...getBackgroundStyle(),
        '&:hover': onClick ? {
          animation: `${hoverAnimation} 0.3s forwards`,
          '& .card-content': {
            transform: 'scale(1.01)',
          }
        } : {},
        '&:active': onClick ? {
          transform: 'scale(0.98)',
        } : {},
        '&:focus': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        ...sx,
      }}
      {...getAriaProps()}
      {...props}
    >
      <Box
        className="card-content"
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 1,
          transition: 'transform 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Card; 
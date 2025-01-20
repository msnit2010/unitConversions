import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientBackground = ({
  children,
  variant = 'default', // default, animated, mesh, hero
  colors,
  direction = '135deg',
  animate = false,
  overlay = false,
  role = 'region',
  ariaLabel,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getGradientColors = () => {
    if (colors) return colors;
    
    if (variant === 'hero') {
      return isDark 
        ? [
            alpha(theme.palette.primary.main, 0.15),
            alpha(theme.palette.secondary.main, 0.15),
            alpha(theme.palette.primary.main, 0.1)
          ]
        : [
            alpha(theme.palette.primary.main, 0.1),
            alpha(theme.palette.secondary.main, 0.1),
            alpha(theme.palette.primary.main, 0.05)
          ];
    }
    
    return ['transparent', 'transparent'];
  };

  const gradientColors = getGradientColors();

  // Ensure sufficient contrast for text content
  const getContrastColor = (color) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)';
  };

  const getGradient = () => {
    switch (variant) {
      case 'mesh':
        return {
          backgroundImage: `
            linear-gradient(${direction}, ${gradientColors[0]} 0%, transparent 100%),
            radial-gradient(at 0% 0%, ${gradientColors[1]} 0%, transparent 50%),
            radial-gradient(at 100% 100%, ${gradientColors[2]} 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        };
      case 'animated':
        return {
          backgroundImage: `linear-gradient(${direction}, ${gradientColors.join(', ')})`,
          backgroundSize: '200% 200%',
          animation: animate ? `${gradientShift} 15s ease infinite` : 'none',
        };
      default:
        return {
          backgroundImage: `linear-gradient(${direction}, ${gradientColors.join(', ')})`,
        };
    }
  };

  // Add mesh pattern for more visual interest
  const getMeshGradient = () => {
    const colors = getGradientColors();
    return {
      backgroundImage: `
        linear-gradient(${direction}, ${colors[0]} 0%, transparent 100%),
        radial-gradient(at 0% 0%, ${colors[1]} 0%, transparent 50%),
        radial-gradient(at 100% 100%, ${colors[2]} 0%, transparent 50%)
      `,
      backgroundSize: '200% 200%',
      animation: animate ? `${gradientShift} 15s ease infinite` : 'none',
    };
  };

  return (
    <Box
      role={role}
      aria-label={ariaLabel}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: theme.transitions.create(['background-color']),
        backdropFilter: 'blur(8px)',
        ...getGradient(),
        color: getContrastColor(gradientColors[0]), // Ensure text contrast
        '& *': {
          // Ensure all child elements maintain contrast
          position: 'relative',
          zIndex: 2,
        },
        '&::before': overlay ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'inherit',
          filter: 'blur(20px) saturate(150%)',
          margin: '-40px',
          zIndex: 0,
        } : {},
        // Add a semi-transparent overlay to ensure text contrast
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(255, 255, 255, 0.1)',
          zIndex: 1,
        },
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        boxShadow: isDark 
          ? 'none'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        ...sx,
      }}
      {...props}
    >
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            zIndex: 0
          }}
        />
      )}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          backdropFilter: overlay ? 'blur(8px)' : 'none',
          // Ensure proper contrast for text content
          '& .MuiTypography-root': {
            color: 'inherit',
            position: 'relative',
            zIndex: 2,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GradientBackground; 
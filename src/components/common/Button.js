import React from 'react';
import { Button as MuiButton, CircularProgress, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  // Size mappings following Apple's guidelines
  const sizeMap = {
    small: {
      height: 32,
      fontSize: theme.typography.button.fontSize,
      padding: '0 12px'
    },
    medium: {
      height: 44, // Apple's minimum touch target size
      fontSize: theme.typography.button.fontSize,
      padding: '0 16px'
    },
    large: {
      height: 50,
      fontSize: '20px',
      padding: '0 20px'
    }
  };

  // Style overrides based on variant
  const variantStyles = {
    contained: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette[color].dark
      },
      '&:active': {
        transform: 'scale(0.98)',
        backgroundColor: theme.palette[color].dark
      }
    },
    outlined: {
      borderWidth: 2,
      '&:hover': {
        borderWidth: 2,
        backgroundColor: theme.palette.action.hover
      },
      '&:active': {
        transform: 'scale(0.98)',
        borderWidth: 2,
        backgroundColor: theme.palette.action.selected
      }
    },
    text: {
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      },
      '&:active': {
        transform: 'scale(0.98)',
        backgroundColor: theme.palette.action.selected
      }
    }
  };

  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      sx={{
        ...sizeMap[size],
        ...variantStyles[variant],
        position: 'relative',
        fontWeight: theme.typography.button.fontWeight,
        letterSpacing: theme.typography.button.letterSpacing,
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        transition: 'all 0.2s ease-in-out',
        ...sx
      }}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress
            size={24}
            color="inherit"
            sx={{
              position: 'absolute',
              left: '50%',
              marginLeft: '-12px'
            }}
          />
          <span style={{ opacity: 0 }}>{children}</span>
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  sx: PropTypes.object
};

export default Button; 
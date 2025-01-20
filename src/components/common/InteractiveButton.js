import React, { useState } from 'react';
import { 
  Button, 
  CircularProgress, 
  Box,
  Tooltip,
  Zoom,
  TouchRipple
} from '@mui/material';
import { keyframes } from '@mui/system';
import Icon from './Icon';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

const successAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const InteractiveButton = ({
  children,
  loading = false,
  success = false,
  disabled = false,
  tooltip,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  successDuration = 1500,
  ...props
}) => {
  const [rippleCenter, setRippleCenter] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [touchRippleRef, setTouchRippleRef] = useState(null);

  const getIconSize = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 24;
      default: return 20;
    }
  };

  const handleClick = async (event) => {
    if (loading || disabled) return;

    // Calculate ripple center
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRippleCenter({ x, y });

    // Trigger ripple effect
    if (touchRippleRef) {
      touchRippleRef.start({ center: { x, y } });
    }

    try {
      if (onClick) {
        await onClick(event);
      }
      
      // Show success state
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), successDuration);
    } catch (error) {
      console.error('Button click error:', error);
    } finally {
      if (touchRippleRef) {
        touchRippleRef.stop();
      }
    }
  };

  const buttonContent = (
    <>
      {loading && (
        <CircularProgress
          size={getIconSize()}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `-${getIconSize() / 2}px`,
            marginLeft: `-${getIconSize() / 2}px`,
          }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          opacity: loading ? 0 : 1,
          animation: success && showSuccess
            ? `${successAnimation} 0.3s ease-in-out`
            : loading
            ? `${pulseAnimation} 1.5s ease-in-out infinite`
            : 'none',
        }}
      >
        {startIcon && (
          <Icon
            name={startIcon}
            size={getIconSize()}
            sx={{
              marginRight: -0.5,
              marginLeft: size === 'small' ? -0.25 : -0.5,
              transition: 'transform 0.2s ease-in-out',
              ...(success && showSuccess && {
                color: 'success.main',
                transform: 'scale(1.2)',
              }),
            }}
          />
        )}
        {children}
        {endIcon && (
          <Icon
            name={endIcon}
            size={getIconSize()}
            sx={{
              marginRight: size === 'small' ? -0.25 : -0.5,
              marginLeft: -0.5,
            }}
          />
        )}
      </Box>
      <TouchRipple
        ref={(instance) => setTouchRippleRef(instance)}
        center={false}
      />
    </>
  );

  const button = (
    <Button
      variant={variant}
      color={showSuccess ? 'success' : color}
      disabled={loading || disabled}
      onClick={handleClick}
      size={size}
      fullWidth={fullWidth}
      sx={{
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
        '&.Mui-disabled': {
          opacity: 0.7,
          transform: 'none',
        },
      }}
      {...props}
    >
      {buttonContent}
    </Button>
  );

  return tooltip ? (
    <Tooltip 
      title={tooltip} 
      arrow 
      TransitionComponent={Zoom}
      enterDelay={500}
    >
      {button}
    </Tooltip>
  ) : button;
};

export default InteractiveButton; 
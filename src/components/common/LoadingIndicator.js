import React from 'react';
import { CircularProgress, LinearProgress, Box, Typography, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import Icon, { ICONS } from './Icon';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingIndicator = ({ 
  type = 'circular',
  size = 'medium',
  text,
  progress,
  color = 'primary',
  overlay = false,
  delay = 500, // Delay showing loader to prevent flashing
  showIcon = false // Show an icon alongside the loading indicator
}) => {
  const theme = useTheme();
  
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 48;
      default: return 32;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  };

  const loader = type === 'circular' ? (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        size={getSize()}
        color={color}
        variant={progress ? 'determinate' : 'indeterminate'}
        value={progress}
        sx={{
          animation: `${fadeInScale} 0.3s ease-in-out`,
        }}
      />
      {showIcon && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Icon
            name={ICONS.LOADING}
            size={getIconSize()}
            color={theme.palette[color].main}
            animate="spin"
            sx={{
              opacity: 0.8,
            }}
          />
        </Box>
      )}
    </Box>
  ) : (
    <Box sx={{ width: '100%', maxWidth: 300 }}>
      <LinearProgress
        color={color}
        variant={progress ? 'determinate' : 'indeterminate'}
        value={progress}
        sx={{
          height: size === 'small' ? 4 : 6,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette[color].light + '40',
          '& .MuiLinearProgress-bar': {
            borderRadius: theme.shape.borderRadius,
          }
        }}
      />
      {progress !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, gap: 1 }}>
          {showIcon && (
            <Icon
              name={ICONS.LOADING}
              size={getIconSize()}
              color="text.secondary"
              animate="spin"
            />
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    </Box>
  );

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        ...(overlay && {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: theme.zIndex.modal,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[8],
          backdropFilter: 'blur(4px)',
        })
      }}
    >
      {loader}
      {text && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
            textAlign: 'center',
            maxWidth: 200,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );

  return overlay ? (
    <Fade in timeout={300}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: theme.zIndex.modal - 1,
        }}
      >
        {content}
      </Box>
    </Fade>
  ) : content;
};

export default LoadingIndicator; 
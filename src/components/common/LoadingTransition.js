import React from 'react';
import { 
  Fade,
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
  useTheme
} from '@mui/material';
import { keyframes } from '@mui/system';

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

const LoadingTransition = ({
  loading = false,
  error = null,
  children,
  type = 'fade', // fade, skeleton, progress
  loadingComponent,
  errorComponent,
  delay = 300,
  minDuration = 500,
  progressProps = {},
  skeletonProps = {},
  containerProps = {},
  showProgressBar = false,
  loadingText,
  progress,
  fullscreen = false,
}) => {
  const theme = useTheme();
  const [shouldShow, setShouldShow] = React.useState(false);
  const [showContent, setShowContent] = React.useState(!loading);
  const loadingTimer = React.useRef(null);
  const minDurationTimer = React.useRef(null);

  React.useEffect(() => {
    if (loading) {
      loadingTimer.current = setTimeout(() => {
        setShouldShow(true);
        setShowContent(false);
      }, delay);

      minDurationTimer.current = setTimeout(() => {
        if (!loading) {
          setShouldShow(false);
          setShowContent(true);
        }
      }, delay + minDuration);
    } else {
      setShouldShow(false);
      setShowContent(true);
    }

    return () => {
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      if (minDurationTimer.current) clearTimeout(minDurationTimer.current);
    };
  }, [loading, delay, minDuration]);

  const defaultLoadingComponent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullscreen ? '100vh' : 200,
        width: '100%',
        gap: 2,
        ...containerProps.sx,
      }}
    >
      <CircularProgress color="primary" {...progressProps} />
      {loadingText && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
            textAlign: 'center',
          }}
        >
          {loadingText}
        </Typography>
      )}
      {showProgressBar && (
        <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
          <LinearProgress
            variant={progress !== undefined ? 'determinate' : 'indeterminate'}
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.action.hover,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              },
            }}
          />
          {progress !== undefined && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block', textAlign: 'center' }}
            >
              {Math.round(progress)}%
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );

  const defaultErrorComponent = error && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullscreen ? '100vh' : 200,
        width: '100%',
        gap: 2,
        color: 'error.main',
      }}
    >
      <Typography variant="h6" color="error">
        Error
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error.message || 'An error occurred'}
      </Typography>
    </Box>
  );

  return (
    <Fade in={!shouldShow} timeout={300}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {showContent && children}
        <Fade in={shouldShow} timeout={300}>
          <Box
            sx={{
              position: fullscreen ? 'fixed' : 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: fullscreen ? 'background.default' : 'transparent',
              zIndex: fullscreen ? theme.zIndex.modal : 1,
            }}
          >
            {error
              ? errorComponent || defaultErrorComponent
              : loadingComponent || defaultLoadingComponent}
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
};

export default LoadingTransition; 
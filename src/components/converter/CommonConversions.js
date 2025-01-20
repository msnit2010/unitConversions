import React, { memo } from 'react';
import {
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import PropTypes from 'prop-types';
import { commonConversions } from '../../data/commonConversions';
import Paper from '../common/Paper';

const CommonConversions = ({ onSelect, sx = {} }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Memoize the handler to prevent unnecessary re-renders
  const handleSelect = React.useCallback((conversion) => {
    onSelect(conversion);
  }, [onSelect]);

  return (
    <Paper
      elevation={0}
      role="region"
      aria-label={t('common.commonConversions')}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        ...sx
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontSize: theme.typography.h6.fontSize,
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}
      >
        {t('common.commonConversions')}
      </Typography>
      <Grid 
        container 
        spacing={2}
        role="list"
        aria-label={t('common.commonConversions')}
      >
        {commonConversions.map((conversion, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            key={`${conversion.category}-${conversion.from}-${conversion.to}`}
            role="listitem"
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSelect(conversion)}
              aria-label={t('converter.convertFrom', {
                from: t(`units.${conversion.from.toLowerCase()}`),
                to: t(`units.${conversion.to.toLowerCase()}`)
              })}
              sx={{
                height: 44,
                justifyContent: 'flex-start',
                textAlign: 'left',
                borderRadius: theme.shape.borderRadius,
                borderWidth: 1,
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[900] 
                  : theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? theme.palette.grey[800]
                    : theme.palette.grey[50],
                  borderColor: theme.palette.primary.main
                },
                '&:active': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? theme.palette.grey[800]
                    : theme.palette.grey[100],
                  transform: 'scale(0.98)'
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2
                }
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: 500,
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  {t(`units.${conversion.from.toLowerCase()}`)} → {t(`units.${conversion.to.toLowerCase()}`)}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  sx={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.text.secondary,
                    display: 'block',
                    mt: 0.5
                  }}
                >
                  {t(`categories.${conversion.category}`)}
                </Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

CommonConversions.propTypes = {
  onSelect: PropTypes.func.isRequired,
  sx: PropTypes.object
};

export default memo(CommonConversions); 
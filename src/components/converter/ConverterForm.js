import React, { useState, useEffect, lazy, Suspense } from 'react';
import { categories } from '../../data/categories';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Alert,
  Collapse,
  Grid,
  CircularProgress
} from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Button from '../common/Button';
import TextField from '../common/TextField';
import Select from '../common/Select';
import Paper from '../common/Paper';
import ConversionService from '../../services/ConversionService';

// Lazy load non-critical components
const ConversionDetails = lazy(() => import('./ConversionDetails'));
const CommonConversions = lazy(() => import('./CommonConversions'));

// Loading fallback component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress />
  </Box>
);

// Debounce function for performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Update API base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL); // Add logging for debugging

const ConverterForm = ({ category, onFormulaUpdate }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [error, setError] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Find category data case-insensitively
  const categoryData = categories.find(cat => 
    cat.id.toLowerCase() === category?.toLowerCase()
  );
  const availableUnits = categoryData?.commonUnits || [];

  // Debounced conversion handler
  const debouncedConvert = React.useCallback(
    debounce(() => {
      if (fromValue && fromUnit && toUnit && validateNumber(fromValue)) {
        handleConvert();
      }
    }, 300),
    [fromValue, fromUnit, toUnit]
  );

  useEffect(() => {
    debouncedConvert();
    return () => debouncedConvert.cancel?.();
  }, [fromValue, fromUnit, toUnit]);

  // Cache unit options
  const unitOptions = React.useMemo(() => 
    availableUnits.map(unit => ({
      value: unit,
      label: t(`units.${unit.toLowerCase()}`)
    })),
    [availableUnits, t]
  );

  useEffect(() => {
    // Handle navigation state for common conversions
    if (location.state?.fromUnit && location.state?.toUnit) {
      setFromUnit(location.state.fromUnit);
      setToUnit(location.state.toUnit);
      // Clear the navigation state
      navigate(location.pathname, { replace: true });
    }
    // If no state, set default units
    else if (availableUnits.length > 0 && !fromUnit && !toUnit) {
      setFromUnit(availableUnits[0]);
      setToUnit(availableUnits[1]);
    }
  }, [availableUnits, location.state, navigate, location.pathname]);

  const validateNumber = (value) => {
    if (!value || value.trim() === '') return false;
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  };

  const handleConvert = async () => {
    if (!validateNumber(fromValue) || !fromUnit || !toUnit) {
      setError(t('errors.invalidNumber'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await ConversionService.convert(fromValue, fromUnit, toUnit, category);
      
      setToValue(data.result.value.toString());
      setConversionResult({
        from: {
          unit: fromUnit,
          value: parseFloat(fromValue),
          formatted: `${fromValue} ${t(`units.${fromUnit.toLowerCase()}`)}`
        },
        to: {
          unit: toUnit,
          value: data.result.value,
          formatted: data.result.formatted || `${data.result.value} ${t(`units.${toUnit.toLowerCase()}`)}`
        },
        formula: data.formula,
        steps: data.steps
      });

      if (onFormulaUpdate && data.formula) {
        onFormulaUpdate(data.formula);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setError(error.message || t('errors.conversionFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateNumber(fromValue)) {
      setError(t('errors.invalidNumber'));
      return;
    }

    handleConvert();
  };

  const handleSwapUnits = () => {
    const oldFromValue = fromValue;
    const oldToValue = toValue;
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(oldToValue);
    setToValue(oldFromValue);
  };

  const handleCommonConversionSelect = (conversion) => {
    if (conversion.category !== category) {
      // If the conversion is from a different category, navigate to that category
      navigate(`/convert/${conversion.category}`, { 
        state: { 
          fromUnit: conversion.from,
          toUnit: conversion.to
        }
      });
      return;
    }
    
    // If it's the same category, just update the units
    setFromUnit(conversion.from);
    setToUnit(conversion.to);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        width: '100%',
        maxWidth: 600,
        mx: 'auto'
      }}
      role="main"
      aria-label={t('converter.title')}
    >
      <Paper
        elevation={0}
        transparent={isMobile}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          '@media (max-width: 600px)': {
            border: 'none',
            p: 2,
            backgroundColor: 'transparent'
          }
        }}
      >
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('converter.value')}
              value={fromValue}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                  setFromValue(value);
                  setError('');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              error={!!error}
              helperText={error}
              type="text"
              inputMode="decimal"
              placeholder="0"
              aria-label={t('converter.value')}
              aria-invalid={!!error}
              aria-describedby={error ? 'value-error' : undefined}
              fullWidth
              autoFocus
            />
            {error && (
              <div id="value-error" role="alert" style={{ display: 'none' }}>
                {error}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label={t('converter.fromUnit')}
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              options={unitOptions}
              size="medium"
              fullWidth
              aria-label={t('converter.fromUnit')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </Grid>
          <Grid 
            item 
            xs={12} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              py: { xs: 1, sm: 1.5 }
            }}
          >
            <Tooltip title={t('converter.swap')} arrow>
              <IconButton
                onClick={handleSwapUnits}
                aria-label={t('converter.swap')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSwapUnits();
                  }
                }}
                sx={{
                  p: 1.5,
                  width: 44,
                  height: 44,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  },
                  '&:active': {
                    backgroundColor: theme.palette.action.selected,
                    transform: 'scale(0.95)'
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2
                  }
                }}
              >
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label={t('converter.toUnit')}
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              options={unitOptions}
              size="medium"
              fullWidth
              aria-label={t('converter.toUnit')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !fromValue || !fromUnit || !toUnit || !validateNumber(fromValue)}
              loading={loading}
              size="large"
              type="submit"
              aria-label={t('converter.convert')}
              aria-busy={loading}
              sx={{
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2
                }
              }}
            >
              {t('converter.convert')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Suspense fallback={<LoadingFallback />}>
        {conversionResult && (
          <ConversionDetails 
            result={conversionResult} 
            sx={{ 
              mt: 3,
              '@media (max-width: 600px)': {
                mx: 0
              }
            }} 
          />
        )}
        
        <CommonConversions
          onSelect={handleCommonConversionSelect}
          sx={{ 
            mt: 4,
            '@media (max-width: 600px)': {
              mx: 0
            }
          }}
        />
      </Suspense>
    </Box>
  );
};

export default ConverterForm; 
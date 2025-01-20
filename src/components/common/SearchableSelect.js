import React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import Icon, { ICONS } from './Icon';

const SearchableSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select a unit...',
  error,
  helperText,
  disabled = false,
}) => {
  const theme = useTheme();

  const getUnitIcon = (unit) => {
    // Map units to their respective icons
    if (unit?.toLowerCase().includes('meter') || unit?.toLowerCase().includes('mile')) {
      return ICONS.LENGTH;
    }
    if (unit?.toLowerCase().includes('celsius') || unit?.toLowerCase().includes('fahrenheit')) {
      return ICONS.TEMPERATURE;
    }
    if (unit?.toLowerCase().includes('square')) {
      return ICONS.AREA;
    }
    if (unit?.toLowerCase().includes('liter') || unit?.toLowerCase().includes('gallon')) {
      return ICONS.VOLUME;
    }
    if (unit?.toLowerCase().includes('gram') || unit?.toLowerCase().includes('pound')) {
      return ICONS.WEIGHT;
    }
    if (unit?.toLowerCase().includes('second') || unit?.toLowerCase().includes('minute')) {
      return ICONS.TIME;
    }
    return ICONS.CONVERT;
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={options}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            sx: {
              '& .MuiAutocomplete-input': {
                fontSize: '1.1rem',
                py: 1.5,
              },
            },
          }}
          sx={{
            '& .MuiInputLabel-root': {
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&.Mui-focused': {
                color: 'primary.main',
                fontWeight: 500,
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            '&.MuiAutocomplete-option': {
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minHeight: 48,
              transition: 'all 0.2s ease',
              borderRadius: 1,
              mx: 0.5,
              
              '&[aria-selected="true"]': {
                bgcolor: `${theme.palette.primary.main}15`,
                color: 'primary.main',
                fontWeight: 500,
                
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                },
                
                '&.Mui-focused': {
                  bgcolor: `${theme.palette.primary.main}25`,
                },
              },
              
              '&.Mui-focused': {
                bgcolor: 'action.hover',
                
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
              
              '&:hover': {
                bgcolor: 'action.hover',
                
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            },
          }}
        >
          <Icon
            name={getUnitIcon(option)}
            size={20}
            color={props['aria-selected'] ? 'primary' : 'action'}
            sx={{
              transition: 'all 0.2s ease',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: props['aria-selected'] ? 500 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {option}
          </Typography>
        </Box>
      )}
      ListboxProps={{
        sx: {
          maxHeight: 280,
          '& .MuiAutocomplete-listbox': {
            padding: '6px',
          },
          '::-webkit-scrollbar': {
            width: '8px',
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            background: theme.palette.divider,
            borderRadius: '8px',
            '&:hover': {
              background: theme.palette.action.hover,
            },
          },
        },
      }}
      popupIcon={
        <Icon
          name={ICONS.CHEVRON_DOWN}
          size={20}
          color="action"
          sx={{
            transition: 'transform 0.2s ease',
            '.Mui-focused &': {
              transform: 'rotate(180deg)',
            },
          }}
        />
      }
      clearIcon={
        <Icon
          name={ICONS.CLOSE}
          size={20}
          color="action"
          sx={{
            opacity: 0.7,
            transition: 'all 0.2s ease',
            '&:hover': {
              opacity: 1,
              transform: 'scale(1.1)',
            },
          }}
        />
      }
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          transition: 'all 0.2s ease',
          '&.Mui-focused': {
            borderColor: 'primary.main',
            boxShadow: `0 4px 12px ${theme.palette.primary.main}22`,
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
              borderColor: 'primary.main',
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiAutocomplete-endAdornment': {
          right: 8,
        },
      }}
    />
  );
};

export default SearchableSelect; 
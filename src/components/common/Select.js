import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  useTheme,
  FormHelperText
} from '@mui/material';
import PropTypes from 'prop-types';

const Select = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  fullWidth = true,
  size = 'medium',
  disabled = false,
  required = false,
  labelId,
  sx = {},
  SelectProps = {},
  ...props
}) => {
  const theme = useTheme();

  // Size mappings following Apple's guidelines
  const sizeMap = {
    small: {
      height: 32,
      fontSize: theme.typography.body2.fontSize,
      padding: '6px 12px'
    },
    medium: {
      height: 44, // Apple's minimum touch target size
      fontSize: theme.typography.body1.fontSize,
      padding: '8px 16px'
    },
    large: {
      height: 50,
      fontSize: '20px',
      padding: '10px 20px'
    }
  };

  const baseStyles = {
    '& .MuiInputBase-root': {
      height: sizeMap[size].height,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.grey[900] 
        : theme.palette.background.paper,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[50]
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.background.paper
      }
    },
    '& .MuiSelect-select': {
      fontSize: sizeMap[size].fontSize,
      padding: sizeMap[size].padding
    },
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
      '&.Mui-focused': {
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      fontSize: theme.typography.caption.fontSize
    }
  };

  const uniqueLabelId = labelId || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      required={required}
      sx={{
        ...baseStyles,
        ...sx
      }}
    >
      {label && (
        <InputLabel id={uniqueLabelId}>{label}</InputLabel>
      )}
      <MuiSelect
        labelId={uniqueLabelId}
        value={value}
        onChange={onChange}
        label={label}
        {...SelectProps}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              minHeight: sizeMap[size].height,
              fontSize: sizeMap[size].fontSize,
              py: 1
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired
    })
  ).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  labelId: PropTypes.string,
  sx: PropTypes.object,
  SelectProps: PropTypes.object
};

export default Select; 
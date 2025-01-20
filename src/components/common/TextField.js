import React from 'react';
import { TextField as MuiTextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  value,
  onChange,
  error,
  helperText,
  type = 'text',
  fullWidth = true,
  size = 'medium',
  disabled = false,
  required = false,
  multiline = false,
  rows,
  placeholder,
  startAdornment,
  endAdornment,
  inputMode,
  sx = {},
  InputProps = {},
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
      height: multiline ? 'auto' : sizeMap[size].height,
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
    '& .MuiInputBase-input': {
      fontSize: sizeMap[size].fontSize,
      padding: sizeMap[size].padding,
      '&::placeholder': {
        color: theme.palette.text.secondary,
        opacity: 0.7
      }
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

  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      inputMode={inputMode}
      InputProps={{
        startAdornment,
        endAdornment,
        ...InputProps
      }}
      sx={{
        ...baseStyles,
        ...sx
      }}
      {...props}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  inputMode: PropTypes.string,
  sx: PropTypes.object,
  InputProps: PropTypes.object
};

export default TextField; 
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ConversionService from '../services/ConversionService';

const ConversionForm = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only convert if we have all required values
    if (value && fromUnit && toUnit && category) {
      handleConvert();
    }
  }, [value, fromUnit, toUnit, category]); // Add dependencies

  const handleConvert = async () => {
    try {
      const response = await ConversionService.convert(category, fromUnit, toUnit, value);
      if (response.success && response.result) {
        setResult(response.result);
        setError(null);
      } else {
        setError(response.error || 'Conversion failed');
        setResult(null);
      }
    } catch (error) {
      setError(error.message || 'Conversion failed');
      setResult(null);
    }
  };

  // Remove the convert button from the JSX if you want to rely only on auto-conversion
  return (
    <Box>
      {/* ... other form elements ... */}
      {/* Optional: Keep or remove the convert button */}
      {/* <Button onClick={handleConvert}>Convert</Button> */}
      {/* ... result display ... */}
    </Box>
  );
};

export default ConversionForm; 
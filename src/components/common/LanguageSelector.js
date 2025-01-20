import React from 'react';
import { Select, MenuItem, FormControl, Box } from '@mui/material';

// Only show languages that have translation files
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <FormControl size="small">
      <Select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        sx={{
          minWidth: '150px',
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingY: '8px'
          }
        }}
        renderValue={(selected) => {
          const lang = languages.find(l => l.code === selected);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box component="span" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>
                {lang?.flag}
              </Box>
              <span>{lang?.name}</span>
            </Box>
          );
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px'
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                fontSize: '1.2rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {lang.flag}
            </Box>
            <span>{lang.name}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector; 
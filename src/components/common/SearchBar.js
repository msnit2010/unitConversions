import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Fade,
  ClickAwayListener,
  useTheme,
} from '@mui/material';
import Icon, { ICONS } from './Icon';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  placeholder = 'Search for conversions...',
  categories = [],
  units = {},
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Generate search suggestions based on categories and units
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const searchLower = searchTerm.toLowerCase();
    const results = [];

    // Search in categories
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'category',
          text: category,
          icon: ICONS[category.toUpperCase()] || ICONS.CONVERT,
          path: `/${category.toLowerCase()}`,
        });
      }
    });

    // Search in units
    Object.entries(units).forEach(([category, categoryUnits]) => {
      categoryUnits.forEach(unit => {
        if (unit.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'unit',
            text: unit,
            category,
            icon: ICONS[category.toUpperCase()] || ICONS.CONVERT,
            path: `/${category.toLowerCase()}`,
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to 8 suggestions
  }, [searchTerm, categories, units]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setAnchorEl(event.currentTarget);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setAnchorEl(null);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(suggestion.path);
    handleClear();
  };

  const handleKeyDown = (event) => {
    if (!suggestions.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        handleClear();
        break;
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  const handleClickAway = () => {
    setAnchorEl(null);
    setSelectedIndex(-1);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon 
                  name={ICONS.SEARCH}
                  color="action"
                  size={20}
                />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear search"
                  onClick={handleClear}
                  edge="end"
                  size="small"
                >
                  <Icon name={ICONS.CLOSE} size={20} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              pr: 1,
              transition: 'all 0.2s ease',
              '&.Mui-focused': {
                boxShadow: `0 4px 12px ${theme.palette.primary.main}22`,
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          }}
        />

        <Popper
          open={Boolean(anchorEl) && suggestions.length > 0}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          style={{ width: anchorEl?.offsetWidth }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper
                elevation={3}
                sx={{
                  mt: 1,
                  border: 1,
                  borderColor: 'divider',
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                <List sx={{ py: 1 }}>
                  {suggestions.map((suggestion, index) => (
                    <ListItem
                      key={`${suggestion.type}-${suggestion.text}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      selected={index === selectedIndex}
                      sx={{
                        py: 0.75,
                        px: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        '&.Mui-selected': {
                          bgcolor: `${theme.palette.primary.main}11`,
                          '&:hover': {
                            bgcolor: `${theme.palette.primary.main}22`,
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Icon
                          name={suggestion.icon}
                          size={20}
                          color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={suggestion.text}
                        secondary={
                          suggestion.type === 'unit' && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="span"
                            >
                              in {suggestion.category}
                            </Typography>
                          )
                        }
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar; 
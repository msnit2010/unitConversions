import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSelector from '../common/LanguageSelector';

const Header = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
    { label: t('nav.privacy'), path: '/privacy' },
    { label: t('nav.sitemap'), path: '/sitemap' }
  ];

  const handleMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        '@supports (backdrop-filter: blur(10px))': {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          [theme.breakpoints.down('sm')]: {
            height: '44px' // iOS standard header height
          }
        }
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: isMobile ? '44px' : '64px',
          px: isMobile ? 1 : 2
        }}
      >
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label={t('nav.aria.mainMenu')}
              onClick={handleMenuClick}
              sx={{ 
                mr: 1,
                color: theme.palette.text.primary,
                '&:active': {
                  backgroundColor: theme.palette.action.selected
                }
              }}
            >
              {mobileMenuAnchor ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 200,
                  border: `1px solid ${theme.palette.divider}`,
                  '@supports (backdrop-filter: blur(10px))': {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }
                }
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:active': {
                      backgroundColor: theme.palette.action.selected
                    }
                  }}
                >
                  <Typography variant="body1">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Typography
                key={item.path}
                variant="body1"
                sx={{
                  cursor: 'pointer',
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageSelector />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
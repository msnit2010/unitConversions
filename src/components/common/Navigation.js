import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fade,
  Collapse
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Navigation = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navItems = [
    { name: 'home', path: '/', icon: 'home', ariaLabel: t('nav.aria.home') },
    { name: 'about', path: '/about', icon: 'info', ariaLabel: t('nav.aria.about') },
    { name: 'contact', path: '/contact', icon: 'mail', ariaLabel: t('nav.aria.contact') },
    { name: 'privacy', path: '/privacy', icon: 'security', ariaLabel: t('nav.aria.privacy') },
    { name: 'sitemap', path: '/sitemap', icon: 'map', ariaLabel: t('nav.aria.sitemap') }
  ];

  // Close drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Handle keyboard navigation
  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index + 1) % navItems.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(index === 0 ? navItems.length - 1 : index - 1);
        break;
      case 'Escape':
        setMobileOpen(false);
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    if (!mobileOpen) {
      // Reset focus to first item when opening
      setActiveIndex(0);
    }
  };

  const drawer = (
    <List 
      role="menu" 
      aria-label={t('nav.aria.mainMenu')}
      sx={{ 
        width: '100%',
        maxWidth: 360,
        padding: theme.spacing(1)
      }}
    >
      {navItems.map((item, index) => (
        <Fade 
          in={true} 
          timeout={300} 
          style={{ transitionDelay: `${index * 50}ms` }}
          key={item.name}
        >
          <ListItem 
            component={RouterLink} 
            to={item.path}
            onClick={handleDrawerToggle}
            onKeyDown={(e) => handleKeyDown(e, index)}
            selected={activeIndex === index}
            tabIndex={0}
            role="menuitem"
            aria-label={item.ariaLabel}
            sx={{ 
              minHeight: '48px',
              borderRadius: '8px',
              mb: 0.5,
              transition: theme.transitions.create(['background-color', 'transform'], {
                duration: theme.transitions.duration.shorter,
              }),
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'translateX(4px)'
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
                '&:hover': {
                  backgroundColor: theme.palette.action.selected
                }
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px'
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40,
                color: 'inherit'
              }}
            >
              <span className="material-icons" aria-hidden="true">{item.icon}</span>
            </ListItemIcon>
            <ListItemText 
              primary={t(`nav.${item.name}`)}
              primaryTypographyProps={{
                fontSize: '1rem',
                fontWeight: location.pathname === item.path ? 600 : 400
              }}
            />
          </ListItem>
        </Fade>
      ))}
    </List>
  );

  return (
    <Box component="nav" role="navigation">
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label={mobileOpen ? t('nav.aria.closeMenu') : t('nav.aria.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-haspopup="true"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { md: 'none' },
              padding: '12px',
              marginRight: '8px',
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px'
              }
            }}
          >
            <span className="material-icons" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </IconButton>
          <Drawer
            id="mobile-nav-menu"
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
              closeAfterTransition: true
            }}
            SlideProps={{
              timeout: {
                enter: 300,
                exit: 200
              }
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: '100%',
                maxWidth: { xs: '100%', sm: 360 },
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                transition: theme.transitions.create(['transform', 'width'], {
                  duration: theme.transitions.duration.standard,
                  easing: theme.transitions.easing.sharp,
                })
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Collapse in={true} timeout={500}>
          <Box 
            className="hidden md:flex items-center space-x-2"
            role="menubar"
            aria-label={t('nav.aria.mainMenu')}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                color="inherit"
                role="menuitem"
                aria-label={item.ariaLabel}
                startIcon={<span className="material-icons" aria-hidden="true">{item.icon}</span>}
                className="normal-case"
                sx={{ 
                  minHeight: '48px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: theme.transitions.create(['background-color', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px'
                  },
                  ...(location.pathname === item.path && {
                    backgroundColor: theme.palette.action.selected,
                    fontWeight: 600
                  })
                }}
              >
                {t(`nav.${item.name}`)}
              </Button>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default Navigation; 
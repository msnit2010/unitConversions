import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import GradientBackground from './GradientBackground';
import Icon, { ICONS } from './Icon';

const MENU_ITEMS = [
  { label: 'Home', path: '/', icon: ICONS.HOME },
  { label: 'Length', path: '/convert/length', icon: ICONS.LENGTH },
  { label: 'Weight', path: '/convert/weight', icon: ICONS.WEIGHT },
  { label: 'Temperature', path: '/convert/temperature', icon: ICONS.TEMPERATURE },
  { label: 'About', path: '/about', icon: ICONS.INFO },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const renderNavItems = (mobile = false) => {
    return MENU_ITEMS.map((item) => {
      const isActive = isCurrentPath(item.path);
      
      if (mobile) {
        return (
          <ListItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={isActive}
            sx={{
              borderRadius: 1,
              my: 0.5,
              color: isActive ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <Icon
                name={item.icon}
                color={isActive ? 'primary' : 'inherit'}
              />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        );
      }

      return (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          color={isActive ? 'primary' : 'inherit'}
          sx={{
            minWidth: 'auto',
            px: 2,
            position: 'relative',
            '&::after': isActive ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '10%',
              width: '80%',
              height: 2,
              bgcolor: 'primary.main',
              borderRadius: 1,
            } : {},
          }}
          startIcon={<Icon name={item.icon} />}
        >
          {item.label}
        </Button>
      );
    });
  };

  return (
    <GradientBackground
      variant="animated"
      colors={['#2563eb11', '#4f46e511', '#2563eb11']}
      animate={true}
      sx={{ mb: 2 }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              px: { xs: 0, sm: 2 },
            }}
          >
            {/* Logo */}
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                textTransform: 'none',
                gap: 1,
              }}
              startIcon={
                <Icon
                  name={ICONS.CONVERT}
                  size={28}
                  sx={{ color: 'primary.main' }}
                />
              }
            >
              Unit Converter
            </Button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Icon name={ICONS.MENU} />
              </IconButton>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {renderNavItems()}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              onClick={handleDrawerToggle}
              startIcon={<Icon name={ICONS.CONVERT} />}
            >
              Unit Converter
            </Button>
            <IconButton
              onClick={handleDrawerToggle}
              aria-label="close menu"
            >
              <Icon name={ICONS.CLOSE} />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ pt: 2 }}>
            {renderNavItems(true)}
          </List>
        </Box>
      </Drawer>
    </GradientBackground>
  );
};

export default Header; 
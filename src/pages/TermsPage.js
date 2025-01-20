import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  useTheme,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import GradientBackground from '../components/common/GradientBackground';
import Icon, { ICONS } from '../components/common/Icon';

const TermsPage = () => {
  const { t } = useLanguage();
  const theme = useTheme();

  const sections = [
    {
      icon: ICONS.AGREEMENT,
      titleKey: 'terms.acceptance.title',
      contentKey: 'terms.acceptance.content',
      delay: 0
    },
    {
      icon: ICONS.LICENSE,
      titleKey: 'terms.usage.title',
      contentKey: 'terms.usage.content',
      delay: 100
    },
    {
      icon: ICONS.SHIELD,
      titleKey: 'terms.intellectual.title',
      contentKey: 'terms.intellectual.content',
      delay: 200
    },
    {
      icon: ICONS.WARNING,
      titleKey: 'terms.disclaimer.title',
      contentKey: 'terms.disclaimer.content',
      delay: 300
    },
    {
      icon: ICONS.BLOCK,
      titleKey: 'terms.liability.title',
      contentKey: 'terms.liability.content',
      delay: 400
    },
    {
      icon: ICONS.LINK,
      titleKey: 'terms.links.title',
      contentKey: 'terms.links.content',
      delay: 500
    },
    {
      icon: ICONS.UPDATE,
      titleKey: 'terms.modifications.title',
      contentKey: 'terms.modifications.content',
      delay: 600
    },
    {
      icon: ICONS.GAVEL,
      titleKey: 'terms.governing.title',
      contentKey: 'terms.governing.content',
      delay: 700
    }
  ];

  return (
    <Box>
      <GradientBackground
        variant="mesh"
        sx={{ 
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <Typography 
                variant="h1" 
                component="h1"
                sx={{ 
                  mb: 2,
                  textAlign: 'center',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #2563eb 30%, #4f46e5 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('terms.title')}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                {t('terms.subtitle')}
              </Typography>
            </Box>
          </Fade>
        </Container>
      </GradientBackground>

      <Container 
        maxWidth="md" 
        sx={{ 
          py: { xs: 6, md: 12 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              alignItems: 'center'
            }
          }}
        >
          {t('terms.effectiveDate')}
        </Alert>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            backgroundColor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(45deg, #2563eb, #4f46e5)'
            }
          }}
        >
          <List sx={{ '& > li': { px: 0 } }}>
            {sections.map((section, index) => (
              <React.Fragment key={index}>
                <Fade in timeout={1000} style={{ transitionDelay: `${section.delay}ms` }}>
                  <ListItem 
                    alignItems="flex-start"
                    sx={{ 
                      flexDirection: 'column',
                      mb: 4
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 2,
                        width: '100%'
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          minWidth: 'auto',
                          mr: 2,
                          color: 'primary.main'
                        }}
                      >
                        <Icon 
                          name={section.icon} 
                          size={32}
                          animate="pulse"
                        />
                      </ListItemIcon>
                      <Typography 
                        variant="h4" 
                        component="h2"
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.5rem', sm: '1.75rem' }
                        }}
                      >
                        {t(section.titleKey)}
                      </Typography>
                    </Box>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{ 
                            lineHeight: 1.7,
                            pl: { sm: 6 }
                          }}
                        >
                          {t(section.contentKey)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Fade>
                {index < sections.length - 1 && (
                  <Divider 
                    sx={{ 
                      my: 4,
                      opacity: 0.1
                    }} 
                  />
                )}
              </React.Fragment>
            ))}
          </List>

          <Box 
            sx={{ 
              mt: 6,
              pt: 4,
              borderTop: `1px solid ${theme.palette.divider}`,
              opacity: 0.7
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              {t('terms.lastUpdated')}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsPage; 
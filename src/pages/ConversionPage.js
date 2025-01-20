import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  useTheme,
  Grid,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import GradientBackground from '../components/common/GradientBackground';
import Card from '../components/common/Card';
import Icon, { ICONS } from '../components/common/Icon';
import LoadingTransition from '../components/common/LoadingTransition';
import ConverterForm from '../components/converter/ConverterForm';
import UnitTabs from '../components/converter/UnitTabs';
import { useLanguage } from '../contexts/LanguageContext';
import { commonConversions } from '../data/categories';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const ConversionPage = () => {
  const { category } = useParams();
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formula, setFormula] = useState('');

  // Get common conversions for this category
  const categoryConversions = commonConversions.filter(conv => conv.category === category);

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'length': return ICONS.LENGTH;
      case 'weight': return ICONS.WEIGHT;
      case 'volume': return ICONS.VOLUME;
      case 'temperature': return ICONS.TEMPERATURE;
      case 'time': return ICONS.TIME;
      case 'speed': return ICONS.SPEED;
      case 'area': return ICONS.AREA;
      case 'pressure': return ICONS.PRESSURE;
      default: return ICONS.CONVERT;
    }
  };

  const handleFormulaUpdate = (newFormula) => {
    setFormula(newFormula);
  };

  return (
    <LoadingTransition loading={loading} error={error}>
      <Box>
        {/* Header Section */}
        <GradientBackground
          variant="mesh"
          colors={['#2563eb22', '#4f46e522', '#2563eb22']}
          overlay={true}
          sx={{ mb: 3 }}
        >
          <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Button
                startIcon={<Icon name={ICONS.BACK} />}
                onClick={() => navigate('/')}
                color="inherit"
                sx={{ fontWeight: 500 }}
              >
                {t('common.back')}
              </Button>
            </Box>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  <Icon
                    name={getCategoryIcon()}
                    size={32}
                    color="primary"
                  />
                  {t(`categories.${category}`)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{
                    mb: 2,
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {t(`categories.${category}Description`)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                  variant="gradient"
                  gradientColors={['#2563eb22', '#4f46e522']}
                  sx={{ p: 2.5 }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('common.quickTip')}
                  </Typography>
                  <Typography variant="body2">
                    {t('common.quickTipText')}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </GradientBackground>

        {/* Tab Navigation */}
        <Container maxWidth="lg">
          <UnitTabs />
        </Container>

        {/* Conversion Form Section */}
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card
                variant="default"
                sx={{ p: 2.5 }}
              >
                <ConverterForm 
                  category={category}
                  onFormulaUpdate={handleFormulaUpdate}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: theme.spacing(2) }}>
                <Card
                  variant="gradient"
                  gradientColors={['#4f46e522', '#6366f122']}
                  sx={{ p: 2.5, mb: 2 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {t('common.commonConversions')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {categoryConversions.map((conv) => (
                      <Button
                        key={conv.id}
                        variant="text"
                        color="inherit"
                        startIcon={<Icon name={ICONS.CONVERT} size={20} />}
                        sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                        onClick={() => {
                          if (conv.category !== category) {
                            navigate(`/convert/${conv.category}`, {
                              state: { fromUnit: conv.from, toUnit: conv.to }
                            });
                          } else {
                            // Update the form directly if we're already on the right category
                            setFormula('');  // Clear formula while converting
                            navigate(`/convert/${category}`, {
                              state: { fromUnit: conv.from, toUnit: conv.to },
                              replace: true
                            });
                          }
                        }}
                      >
                        {conv.name}
                      </Button>
                    ))}
                  </Box>
                </Card>
                <Card
                  variant="gradient"
                  gradientColors={['#2563eb22', '#3b82f622']}
                  sx={{ p: 2.5 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {t('common.formula')}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {formula || t('common.selectUnitsForFormula')}
                  </Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LoadingTransition>
  );
};

export default ConversionPage; 
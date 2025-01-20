import React from 'react';
import { 
  Tabs, 
  Tab, 
  Box, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Icon, { ICONS } from '../common/Icon';

const CATEGORIES = [
  { id: 'length', icon: ICONS.LENGTH },
  { id: 'temperature', icon: ICONS.TEMPERATURE },
  { id: 'area', icon: ICONS.AREA },
  { id: 'volume', icon: ICONS.VOLUME },
  { id: 'weight', icon: ICONS.WEIGHT },
  { id: 'time', icon: ICONS.TIME }
];

const UnitTabs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { category } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChange = (event, newValue) => {
    navigate(`/convert/${newValue}`);
  };

  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        mb: 4
      }}
    >
      <Tabs
        value={category || CATEGORIES[0].id}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        centered={!isMobile}
        sx={{
          '& .MuiTab-root': {
            minHeight: 72,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            px: { xs: 2, sm: 3 },
            '&.Mui-selected': {
              color: 'primary.main',
              fontWeight: 600
            }
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0'
          }
        }}
      >
        {CATEGORIES.map((cat) => (
          <Tab
            key={cat.id}
            value={cat.id}
            label={t(`categories.${cat.id}`)}
            icon={<Icon name={cat.icon} size={24} />}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default UnitTabs; 
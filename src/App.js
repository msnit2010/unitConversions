import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import SitemapPage from './pages/SitemapPage';
import ConversionPage from './pages/ConversionPage';
import './styles/global.css';
import { getTheme } from './theme';

// Create a wrapper component that handles the Material-UI theme
const ThemedApp = () => {
  const { mode } = useTheme();
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="sitemap" element={<SitemapPage />} />
              <Route path="convert/:category" element={<ConversionPage />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </MuiThemeProvider>
  );
};

// Main App component that provides the theme context
const App = () => {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
};

export default App; 
import React, { createContext, useState, useContext, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get language from localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) return savedLang;

    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    // Only include languages we have translations for
    const supportedLanguages = ['en', 'es', 'fr'];
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  });

  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`Loading translations for ${currentLanguage}...`);
        // Use the public locales directory
        const response = await fetch(`/locales/${currentLanguage}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${currentLanguage} translations (status: ${response.status})`);
        }
        
        const data = await response.json();
        console.log('Loaded translations:', data);
        
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Translation file is empty');
        }
        
        setTranslations(data);
        console.log('Translations set successfully');
        
        // Update document language and direction
        document.documentElement.lang = currentLanguage;
        document.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
        
        // Save preference
        localStorage.setItem('preferredLanguage', currentLanguage);
      } catch (error) {
        console.error('Error loading translations:', error);
        setError(error.message);
        
        // Only fallback to English if we're not already trying to load English
        if (currentLanguage !== 'en') {
          console.log('Falling back to English');
          setCurrentLanguage('en');
        } else {
          // If we're already on English and still failing, try to load a hardcoded minimal translation
          console.log('Loading fallback translations');
          setTranslations({
            nav: {
              home: 'Home',
              about: 'About',
              contact: 'Contact',
              privacy: 'Privacy',
              sitemap: 'Sitemap',
              aria: {
                mainMenu: 'Main navigation menu',
                home: 'Go to home page',
                about: 'Go to about page',
                contact: 'Go to contact page',
                privacy: 'Go to privacy policy',
                sitemap: 'Go to sitemap'
              }
            }
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const changeLanguage = async (langCode) => {
    try {
      setIsLoading(true);
      // Use the public locales directory
      const response = await fetch(`/locales/${langCode}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${langCode} translations`);
      }
      const data = await response.json();
      setTranslations(data);
      setCurrentLanguage(langCode);
      setError(null);
      
      // Save to localStorage
      localStorage.setItem('preferredLanguage', langCode);
      
      // Update document language
      document.documentElement.lang = langCode;
      document.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Error changing language:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key, params = {}) => {
    if (!translations || Object.keys(translations).length === 0) {
      return key;
    }

    try {
      const keys = key.split('.');
      let translation = translations;
      
      for (const k of keys) {
        translation = translation[k];
        if (translation === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      // Replace parameters in translation string
      let result = translation;
      Object.entries(params).forEach(([param, value]) => {
        result = result.replace(`{${param}}`, value);
      });

      return result;
    } catch (error) {
      console.warn(`Error translating key: ${key}`, error);
      return key;
    }
  };

  const formatNumber = (number, options = {}) => {
    try {
      return new Intl.NumberFormat(currentLanguage, options).format(number);
    } catch (error) {
      console.warn('Error formatting number:', error);
      return number.toString();
    }
  };

  const formatDate = (date, options = {}) => {
    try {
      return new Intl.DateTimeFormat(currentLanguage, options).format(date);
    } catch (error) {
      console.warn('Error formatting date:', error);
      return date.toLocaleDateString();
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    formatNumber,
    formatDate,
    isLoading,
    error,
    translations
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && currentLanguage === 'en') {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        color="error.main"
      >
        Error loading translations: {error}
      </Box>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import GradientBackground from '../components/common/GradientBackground';
import Icon, { ICONS } from '../components/common/Icon';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5001/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }

        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    }
  };

  return (
    <Box>
      <GradientBackground
        variant="mesh"
        sx={{ py: 8 }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1"
            sx={{ 
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '2.5rem', sm: '3.5rem' },
              fontWeight: 700
            }}
          >
            {t('contact.getInTouch')}
          </Typography>
        </Container>
      </GradientBackground>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('contact.form.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('contact.form.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.subject')}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.message')}
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {errors.submit && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.submit}
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Icon name={ICONS.SEND} />}
                    >
                      {t('contact.form.submit')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {t('contact.followUs')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Icon name={ICONS.TWITTER} />}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Icon name={ICONS.GITHUB} />}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Icon name={ICONS.LINKEDIN} />}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert 
          onClose={() => setSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {t('contact.success')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage; 
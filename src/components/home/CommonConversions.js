import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { commonConversions } from '../../data/commonConversions';

const CommonConversions = () => {
  return (
    <Grid container spacing={3}>
      {commonConversions.map((conversion) => (
        <Grid item xs={12} sm={6} md={4} key={conversion.id}>
          <Card 
            component={Link}
            to={`/category/${conversion.category}?from=${conversion.from}&to=${conversion.to}`}
            sx={{ 
              textDecoration: 'none',
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {conversion.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick conversion from {conversion.from} to {conversion.to}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommonConversions; 
import React from 'react';
import { Grid, Card, CardContent, Typography, Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const CategoryList = () => {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <Card 
            component={Link} 
            to={`/category/${category.id}`}
            sx={{ 
              textDecoration: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Icon>{category.icon}</Icon>
                </div>
                <Typography variant="h6" component="h2">
                  {category.name}
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList; 
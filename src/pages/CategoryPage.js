import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ConverterForm from '../components/converter/ConverterForm';
import { categories } from '../data/categories';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Category not found
          </h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name} Converter
        </h1>
        <p className="text-gray-600">
          {category.description}
        </p>
      </div>
      
      <ConverterForm category={categoryId} />
    </div>
  );
};

export default CategoryPage; 
import { NextApiRequest, NextApiResponse } from 'next';
import { convert } from '../../utils/converter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, fromUnit, toUnit, value } = req.body;

    if (!category || !fromUnit || !toUnit || value === undefined) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    const result = await convert(category, fromUnit, toUnit, parseFloat(value));
    
    res.status(200).json({
      result: result.value,
      formula: result.formula
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to convert' 
    });
  }
} 
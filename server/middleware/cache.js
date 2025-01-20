const { redisClient, isRedisEnabled, isRedisConnected } = require('../config/redis');

// Cache duration in seconds (1 hour)
const CACHE_TTL = 60 * 60;

// Generate cache key from request parameters
const generateCacheKey = (category, fromUnit, toUnit, value) => {
  return `convert:${category}:${fromUnit}:${toUnit}:${value}`;
};

// Middleware to check cache before processing request
const checkCache = async (req, res, next) => {
  if (!isRedisEnabled() || !isRedisConnected()) {
    return next();
  }

  try {
    const key = `convert:${req.method}:${JSON.stringify(req.method === 'GET' ? req.query : req.body)}`;
    req.cacheKey = key;

    const cachedResult = await redisClient.get(key);
    if (cachedResult) {
      console.log('Cache hit for:', key);
      res.setHeader('Content-Type', 'application/json');
      return res.json(JSON.parse(cachedResult));
    }
    next();
  } catch (error) {
    console.error('Cache error:', error);
    // Continue without cache on error
    next();
  }
};

// Helper function to set cache result
const setCacheResult = async (key, result) => {
  if (!isRedisEnabled() || !isRedisConnected()) {
    return;
  }

  try {
    await redisClient.set(key, JSON.stringify(result), {
      EX: CACHE_TTL // Cache for 1 hour
    });
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

module.exports = {
  checkCache,
  setCacheResult
}; 
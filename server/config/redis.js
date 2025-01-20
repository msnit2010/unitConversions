const Redis = require('redis');

// Make Redis optional
const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true';

let redisClient = null;

if (REDIS_ENABLED) {
  redisClient = Redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 10) {
          console.warn('Too many redis connection attempts, disabling Redis');
          return false;
        }
        return Math.min(retries * 50, 1000);
      }
    }
  });

  redisClient.on('error', (err) => {
    console.warn('Redis connection error:', err);
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });
}

const connectRedis = async () => {
  if (!REDIS_ENABLED) {
    console.log('Redis is disabled, skipping connection');
    return;
  }

  try {
    if (redisClient && !redisClient.isOpen) {
      await redisClient.connect();
      console.log('Redis connection established');
    }
  } catch (err) {
    console.error('Redis connection error:', err);
    // Don't throw - allow app to work without Redis
  }
};

// Helper to check if Redis is available
const isRedisConnected = () => {
  return redisClient?.isOpen || false;
};

module.exports = { 
  redisClient, 
  connectRedis,
  isRedisConnected,
  isRedisEnabled: () => REDIS_ENABLED
}; 
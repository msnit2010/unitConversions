const express = require('express');
const router = express.Router();
const { isRedisEnabled, isRedisConnected } = require('../config/redis');

router.get('/', async (req, res) => {
  try {
    const redisStatus = isRedisEnabled() 
      ? {
          enabled: true,
          status: isRedisConnected() ? 'connected' : 'disconnected',
          ...(isRedisConnected() ? { ping: 'OK' } : { error: 'Redis client not ready' })
        }
      : {
          enabled: false,
          status: 'disabled'
        };

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        redis: redisStatus
      },
      memory: {
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

module.exports = router; 
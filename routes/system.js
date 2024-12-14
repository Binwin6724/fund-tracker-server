const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// @route   GET /api/healthcheck
// @desc    Check system health
// @access  Public
router.get('/healthcheck', async (req, res) => {
  try {
    // Check MongoDB connection
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      throw new Error('Database not connected');
    }

    // Basic health metrics
    const healthMetrics = {
      status: 'healthy',
      timestamp: new Date(),
      database: {
        status: 'connected',
        type: 'MongoDB'
      },
      server: {
        status: 'running',
        uptime: process.uptime()
      }
    };

    res.json(healthMetrics);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date(),
      error: error.message
    });
  }
});

module.exports = router;

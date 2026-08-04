const express = require('express');
const pincodeRoutes = require('./pincodeRoutes');
const historyRoutes = require('./historyRoutes');

const router = express.Router();

/**
 * Aggregates all API route modules under /api.
 * server.js mounts this once at `/api`.
 */
router.use('/pincode', pincodeRoutes);
router.use('/history', historyRoutes);

module.exports = router;

const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getSearchHistory } = require('../controllers/historyController');

const router = express.Router();

/**
 * GET /api/history
 * Returns the latest 10 successful searches.
 */
router.get('/', asyncHandler(getSearchHistory));

module.exports = router;

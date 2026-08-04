const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const validatePincode = require('../middleware/validatePincode');
const { getPincodeDetails } = require('../controllers/pincodeController');

const router = express.Router();

/**
 * GET /api/pincode/:pin
 * Pipeline: validate Bangalore pin → controller → service
 */
router.get('/:pin', validatePincode, asyncHandler(getPincodeDetails));

module.exports = router;

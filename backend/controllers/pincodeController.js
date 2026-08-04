const pincodeService = require('../services/pincodeService');

/**
 * GET /api/pincode/:pin
 * Assumes validatePincode middleware has already set req.validatedPincode.
 */
const getPincodeDetails = async (req, res) => {
  const data = await pincodeService.lookupPincode(req.validatedPincode);

  res.status(200).json({
    success: true,
    data,
  });
};

module.exports = {
  getPincodeDetails,
};

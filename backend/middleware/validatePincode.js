const AppError = require('../utils/AppError');

/**
 * Validates :pin as a Bangalore pincode before the controller/service runs.
 * Rules: exactly 6 digits, numeric only, must begin with 560.
 */
const validatePincode = (req, res, next) => {
  const pin = String(req.params.pin ?? '').trim();

  if (!pin) {
    return next(new AppError('Please enter a pincode.', 400));
  }

  if (!/^\d+$/.test(pin)) {
    return next(new AppError('Pincode must contain numbers only.', 400));
  }

  if (pin.length !== 6) {
    return next(new AppError('Pincode must be exactly 6 digits.', 400));
  }

  if (!pin.startsWith('560')) {
    return next(
      new AppError(
        'Only Bangalore pincodes are supported. Bangalore pincodes start with 560.',
        400
      )
    );
  }

  // Normalized value for controllers/services
  req.validatedPincode = pin;
  next();
};

module.exports = validatePincode;

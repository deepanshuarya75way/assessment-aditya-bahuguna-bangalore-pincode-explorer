const AppError = require('../utils/AppError');

/**
 * Catch-all for unmatched routes.
 * Must be registered after all valid routes and before the error handler.
 */
const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = notFound;

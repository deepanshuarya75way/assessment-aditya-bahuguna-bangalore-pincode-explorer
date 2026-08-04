/**
 * Operational error class for expected failures (validation, not found, upstream API issues).
 * Distinguishes "known" errors from unexpected crashes so the error middleware can respond safely.
 */
class AppError extends Error {
  /**
   * @param {string} message - User-facing error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

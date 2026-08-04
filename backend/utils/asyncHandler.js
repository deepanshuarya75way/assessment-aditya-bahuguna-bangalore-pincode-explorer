/**
 * Wraps async Express route handlers so rejected promises
 * are forwarded to the central error-handling middleware.
 *
 * Without this, an unhandled rejection in an async controller
 * would crash the process or hang the request.
 *
 * Usage: router.get('/path', asyncHandler(controllerFn));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

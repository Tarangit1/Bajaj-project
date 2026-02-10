/**
 * middleware/errorHandler.js
 * ───────────────────────────────────────────────
 * Global error-handling middleware.
 * Catches ALL unhandled errors and returns a
 * consistent { is_success: false } envelope.
 */

const { OFFICIAL_EMAIL } = require("../config");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  // Log the full error on the server side for debugging
  console.error("Unhandled error:", err);

  // Determine the right status code
  const status = err.statusCode || err.status || 500;

  return res.status(status).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: err.message || "Internal server error",
  });
}

module.exports = errorHandler;

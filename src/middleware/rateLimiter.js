/**
 * middleware/rateLimiter.js
 * ───────────────────────────────────────────────
 * Protects the API against brute-force / abuse.
 * 100 requests per IP per 15-minute window.
 */

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    is_success: false,
    error: "Too many requests – please try again later.",
  },
});

module.exports = limiter;

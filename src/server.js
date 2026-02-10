/**
 * server.js
 * ═══════════════════════════════════════════════
 * Entry point for the Bajaj Qualifier REST API.
 *
 * Middleware chain (order matters):
 *   1. Helmet  – secure HTTP headers
 *   2. CORS    – cross-origin access
 *   3. Rate-limiter – abuse protection
 *   4. JSON body parser
 *   5. Routes
 *   6. 404 catch-all
 *   7. Global error handler
 * ═══════════════════════════════════════════════
 */

// ── 0. Config (validates env vars on import) ──
const { PORT, OFFICIAL_EMAIL } = require("./config");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

// Route modules
const bfhlRoutes = require("./routes/bfhl");
const healthRoutes = require("./routes/health");

const app = express();

// ── 1. Security headers ──────────────────────
app.use(helmet());

// ── 2. CORS ──────────────────────────────────
app.use(cors());

// ── 3. Rate limiting ─────────────────────────
app.use(rateLimiter);

// ── 4. Body parsing ──────────────────────────
app.use(express.json({ limit: "1mb" }));

// ── 5. Routes ────────────────────────────────
app.use("/bfhl", bfhlRoutes);
app.use("/health", healthRoutes);

// Root route – convenience redirect / info
app.get("/", (_req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    message: "Bajaj Qualifier API is running. Use POST /bfhl or GET /health.",
  });
});

// ── 6. 404 catch-all ─────────────────────────
app.use((_req, _res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

// ── 7. Global error handler (MUST be last) ───
app.use(errorHandler);

// ── Start listening ──────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`official_email = ${OFFICIAL_EMAIL}`);
});

module.exports = app; // export for testing

/**
 * routes/bfhl.js
 * ───────────────────────────────────────────────
 * POST /bfhl  – core qualifier endpoint
 * GET  /bfhl  – alias for GET /health
 *
 * Delegates to the appropriate service based on
 * the single key present in the validated body.
 */

const { Router } = require("express");
const validateBfhl = require("../middleware/validate");
const { OFFICIAL_EMAIL } = require("../config");
const { fibonacci, filterPrimes, lcm, hcf } = require("../services/math");
const { askGemini } = require("../services/ai");

const router = Router();

// ── POST /bfhl ────────────────────────────────

router.post("/", validateBfhl, async (req, res, next) => {
  try {
    const body = req.validatedBody;
    let data;

    // Exactly one key will be present (enforced by Joi)
    if ("fibonacci" in body) {
      const n = body.fibonacci;
      data = { fibonacci_series: fibonacci(n) };
    } else if ("prime" in body) {
      const primes = filterPrimes(body.prime);
      data = { primes };
    } else if ("lcm" in body) {
      data = { lcm: lcm(body.lcm) };
    } else if ("hcf" in body) {
      data = { hcf: hcf(body.hcf) };
    } else if ("AI" in body) {
      const answer = await askGemini(body.AI);
      data = { ai_response: answer };
    }

    return res.json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data,
    });
  } catch (err) {
    next(err); // let the global error handler respond
  }
});

// ── GET /bfhl (convenience health alias) ──────

router.get("/", (_req, res) => {
  return res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL,
  });
});

module.exports = router;

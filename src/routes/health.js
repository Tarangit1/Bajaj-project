/**
 * routes/health.js
 * ───────────────────────────────────────────────
 * GET /health – simple liveness / readiness probe.
 */

const { Router } = require("express");
const { OFFICIAL_EMAIL } = require("../config");

const router = Router();

router.get("/", (_req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL,
  });
});

module.exports = router;

/**
 * config/index.js
 * ───────────────────────────────────────────────
 * Centralised environment-variable loader.
 * Fails fast if a required variable is missing.
 */

require("dotenv").config();

// Hardcoded official email (not from env)
const OFFICIAL_EMAIL = "tarangit0904.be23@chitkara.edu.in";

const REQUIRED = ["GEMINI_API_KEY"];

for (const key of REQUIRED) {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`);
    process.exit(1);
  }
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  OFFICIAL_EMAIL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

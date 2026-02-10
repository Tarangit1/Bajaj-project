/**
 * config/index.js
 * ───────────────────────────────────────────────
 * Centralised environment-variable loader.
 * Fails fast if a required variable is missing.
 */

require("dotenv").config();

const REQUIRED = ["OFFICIAL_EMAIL", "GEMINI_API_KEY"];

for (const key of REQUIRED) {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`);
    process.exit(1);
  }
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  OFFICIAL_EMAIL: process.env.OFFICIAL_EMAIL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

/**
 * middleware/validate.js
 * ───────────────────────────────────────────────
 * Joi schema for the POST /bfhl body.
 *
 * Rules
 * ─────
 * • Exactly ONE of the following keys must be present:
 *     fibonacci  (integer ≥ 0)
 *     prime      (array of integers)
 *     lcm        (array of integers)
 *     hcf        (array of integers)
 *     AI         (non-empty string)
 *
 * • No extra keys allowed (stripUnknown is NOT used –
 *   unknown keys trigger a 400).
 */

const Joi = require("joi");

// ── Individual field schemas ──────────────────

const fibonacciSchema = Joi.object({
  fibonacci: Joi.number().integer().min(0).required(),
}).label("fibonacci body");

const primeSchema = Joi.object({
  prime: Joi.array().items(Joi.number().integer()).required(),
}).label("prime body");

const lcmSchema = Joi.object({
  lcm: Joi.array().items(Joi.number().integer()).min(1).required(),
}).label("lcm body");

const hcfSchema = Joi.object({
  hcf: Joi.array().items(Joi.number().integer()).min(1).required(),
}).label("hcf body");

const aiSchema = Joi.object({
  AI: Joi.string().trim().min(1).required(),
}).label("AI body");

// ── Composite: exactly one key ────────────────

const bfhlSchema = Joi.alternatives()
  .try(fibonacciSchema, primeSchema, lcmSchema, hcfSchema, aiSchema)
  .match("one")
  .messages({
    "alternatives.any":
      "Request body must contain exactly one key: fibonacci, prime, lcm, hcf, or AI.",
    "alternatives.one":
      "Request body must contain exactly one key: fibonacci, prime, lcm, hcf, or AI.",
  });

/**
 * Express middleware – validates req.body against
 * the schema and attaches the cleaned value to
 * req.validatedBody.
 */
function validateBfhl(req, res, next) {
  const { error, value } = bfhlSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const err = new Error(
      error.details.map((d) => d.message).join("; ") ||
        "Invalid request body."
    );
    err.statusCode = 400;
    return next(err);
  }

  req.validatedBody = value;
  next();
}

module.exports = validateBfhl;

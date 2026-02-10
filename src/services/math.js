/**
 * services/math.js
 * ───────────────────────────────────────────────
 * Pure-function math utilities.
 * ALL arithmetic is done with BigInt to avoid
 * precision loss on very large integers.
 */

// ── Fibonacci ─────────────────────────────────

/**
 * Generate the first `n` Fibonacci numbers.
 *
 * F(0) = 0, F(1) = 1, F(k) = F(k-1) + F(k-2)
 *
 * @param {number} n – count of terms (≥ 0)
 * @returns {string[]} – each term as a string (safe for large values)
 */
function fibonacci(n) {
  if (n === 0) return [];
  if (n === 1) return ["0"];

  const seq = [0n, 1n];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq.map(String); // BigInt → string for JSON safety
}

// ── Prime filter ──────────────────────────────

/**
 * Return the subset of `nums` that are prime.
 * Negative numbers and 0/1 are never prime.
 *
 * @param {number[]} nums
 * @returns {string[]}
 */
function filterPrimes(nums) {
  return nums.filter(isPrime).map(String);
}

/**
 * Deterministic primality check using BigInt.
 * Works correctly for very large values.
 */
function isPrime(n) {
  const big = BigInt(n);
  if (big < 2n) return false;
  if (big === 2n || big === 3n) return true;
  if (big % 2n === 0n || big % 3n === 0n) return false;
  for (let i = 5n; i * i <= big; i += 6n) {
    if (big % i === 0n || big % (i + 2n) === 0n) return false;
  }
  return true;
}

// ── LCM ───────────────────────────────────────

/**
 * Compute the LCM of an array of integers.
 * Uses the identity: lcm(a, b) = |a * b| / gcd(a, b)
 *
 * @param {number[]} nums – at least one element
 * @returns {string}
 */
function lcm(nums) {
  const bigNums = nums.map((n) => absBigInt(BigInt(n)));
  const result = bigNums.reduce((acc, val) => lcmPair(acc, val));
  return result.toString();
}

// ── HCF (GCD) ─────────────────────────────────

/**
 * Compute the HCF (GCD) of an array of integers.
 *
 * @param {number[]} nums – at least one element
 * @returns {string}
 */
function hcf(nums) {
  const bigNums = nums.map((n) => absBigInt(BigInt(n)));
  const result = bigNums.reduce((acc, val) => gcd(acc, val));
  return result.toString();
}

// ── Helpers ───────────────────────────────────

function absBigInt(n) {
  return n < 0n ? -n : n;
}

function gcd(a, b) {
  a = absBigInt(a);
  b = absBigInt(b);
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcmPair(a, b) {
  if (a === 0n && b === 0n) return 0n;
  return absBigInt(a * b) / gcd(a, b);
}

module.exports = { fibonacci, filterPrimes, lcm, hcf };

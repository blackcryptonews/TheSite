/**
 * Simple in-memory rate limiter for serverless functions
 * Tracks requests per IP address with sliding window
 */

interface RateLimitStore {
  [key: string]: number[]
}

const store: RateLimitStore = {}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Rate limit checker
 * @param identifier - Usually IP address
 * @param limit - Max requests allowed
 * @param window - Time window in seconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): RateLimitResult {
  const now = Date.now()
  const windowMs = window * 1000

  // Initialize or get existing timestamps for this identifier
  if (!store[identifier]) {
    store[identifier] = []
  }

  // Remove timestamps outside the current window
  store[identifier] = store[identifier].filter(timestamp => now - timestamp < windowMs)

  // Check if limit exceeded
  const requestCount = store[identifier].length
  const allowed = requestCount < limit

  if (allowed) {
    // Add current request timestamp
    store[identifier].push(now)
  }

  // Calculate reset time (when oldest request expires)
  const oldestTimestamp = store[identifier][0] || now
  const reset = Math.ceil((oldestTimestamp + windowMs) / 1000)

  return {
    success: allowed,
    limit,
    remaining: Math.max(0, limit - requestCount - (allowed ? 1 : 0)),
    reset,
  }
}

/**
 * Get IP address from request
 */
export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}

/**
 * Clean up old entries from store (run periodically)
 * This prevents memory leaks in long-running instances
 */
export function cleanup(maxAge: number = 3600000) {
  const now = Date.now()

  for (const key in store) {
    store[key] = store[key].filter(timestamp => now - timestamp < maxAge)

    // Remove empty entries
    if (store[key].length === 0) {
      delete store[key]
    }
  }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cleanup(), 600000)
}

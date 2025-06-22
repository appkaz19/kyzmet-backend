// Simple in-memory rate limiter
// For production, consider using Redis for distributed rate limiting
const rateLimitStore = new Map();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.resetTime > 0) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

function createRateLimit(maxRequests, windowMs, message) {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return next();
    }

    const data = rateLimitStore.get(key);
    
    if (now > data.resetTime) {
      // Reset the window
      data.count = 1;
      data.resetTime = now + windowMs;
      return next();
    }

    if (data.count >= maxRequests) {
      return res.status(429).json({
        error: message || 'Too many requests',
        retryAfter: Math.ceil((data.resetTime - now) / 1000)
      });
    }

    data.count++;
    next();
  };
}

// Auth endpoints rate limiting
export const authRateLimit = createRateLimit(
  5, // 5 requests
  15 * 60 * 1000, // per 15 minutes
  'Too many authentication attempts, please try again later'
);

// Password reset rate limiting (more restrictive)
export const passwordResetRateLimit = createRateLimit(
  3, // 3 requests
  60 * 60 * 1000, // per hour
  'Too many password reset attempts, please try again later'
);

// General API rate limiting
export const generalRateLimit = createRateLimit(
  100, // 100 requests
  15 * 60 * 1000, // per 15 minutes
  'Too many requests, please slow down'
);
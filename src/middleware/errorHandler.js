// Centralized error handling for auth operations
export function handleAuthError(error, operation = 'Authentication') {
  console.error(`🔥 ${operation} error:`, error);

  // Known error types
  const errorMap = {
    'User already exists': { status: 409, message: 'User already exists' },
    'Invalid credentials': { status: 401, message: 'Invalid credentials' },
    'User not verified': { status: 403, message: 'User not verified' },
    'User not found': { status: 404, message: 'User not found' },
    'Phone is required': { status: 400, message: 'Phone is required' },
    'Password is required': { status: 400, message: 'Password is required' },
    'Email is required': { status: 400, message: 'Email is required' },
    'Validation failed': { status: 400, message: error.message }
  };

  const errorInfo = errorMap[error.message];
  
  if (errorInfo) {
    return {
      status: errorInfo.status,
      error: errorInfo.message
    };
  }

  // Database connection errors
  if (error.code === 'P2002') {
    return {
      status: 409,
      error: 'Resource already exists'
    };
  }

  if (error.code === 'P2025') {
    return {
      status: 404,
      error: 'Resource not found'
    };
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return {
      status: 401,
      error: 'Invalid token'
    };
  }

  if (error.name === 'TokenExpiredError') {
    return {
      status: 401,
      error: 'Token expired'
    };
  }

  // Default error
  return {
    status: 500,
    error: 'Internal server error'
  };
}

// Async error wrapper to avoid try-catch repetition
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Express error handling middleware
export function errorMiddleware(err, req, res, next) {
  const { status, error } = handleAuthError(err);
  res.status(status).json({ error });
}
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.error('🔥 Auth Middleware error: Invalid format');
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    console.log('✅ [middleware] Auth:', payload.userId);
    next();
  } catch (err) {
    console.error('🔥 Auth Middleware error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

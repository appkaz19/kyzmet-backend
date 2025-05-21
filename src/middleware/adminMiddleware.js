import jwt from 'jsonwebtoken';

export function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    console.error('🔥 Admin Middleware error: Invalid format');
    return res.status(401).json({ error: 'Admin token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Not an admin' });
    }

    req.admin = { adminId: payload.adminId };
    console.log('✅ [middleware] Admin authenticated:', payload.adminId);
    next();
  } catch (err) {
    console.error('🔥 Admin Middleware error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

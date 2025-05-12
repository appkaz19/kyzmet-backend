import jwt from 'jsonwebtoken';

export function requireOtpToken(expectedPurpose) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('🔥 OTP Middleware error: Invalid format');
      return res.status(401).json({ error: 'OTP token missing' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.purpose !== expectedPurpose) {
        return res.status(403).json({ error: 'Invalid OTP token purpose' });
      }
      req.otp = payload;
      console.log('✅ [middleware] OTP requested:', payload.purpose);
      next();
    } catch (err) {
      console.error('🔥 OTP Middleware error:', err);
      return res.status(403).json({ error: 'Invalid or expired OTP token' });
    }
  };
}

export function validateRegistration(req, res, next) {
  const { phone, password } = req.body;
  const errors = [];

  // Phone validation
  if (!phone) {
    errors.push('Phone is required');
  } else if (typeof phone !== 'string') {
    errors.push('Phone must be a string');
  } else if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
    errors.push('Phone must be a valid international format');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (typeof password !== 'string') {
    errors.push('Password must be a string');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  } else if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validateLogin(req, res, next) {
  const { phone, password } = req.body;
  const errors = [];

  if (!phone || typeof phone !== 'string') {
    errors.push('Phone is required and must be a string');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required and must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validatePasswordReset(req, res, next) {
  const { phone, newPassword } = req.body;
  const errors = [];

  // Phone validation
  if (!phone || typeof phone !== 'string') {
    errors.push('Phone is required and must be a string');
  }

  // New password validation
  if (!newPassword) {
    errors.push('New password is required');
  } else if (typeof newPassword !== 'string') {
    errors.push('New password must be a string');
  } else if (newPassword.length < 6) {
    errors.push('New password must be at least 6 characters');
  } else if (newPassword.length > 128) {
    errors.push('New password must be less than 128 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validateAdminLogin(req, res, next) {
  const { login, password } = req.body;
  const errors = [];

  // Login validation
  if (!login) {
    errors.push('Login is required');
  } else if (typeof login !== 'string') {
    errors.push('Login must be a string');
  } else if (login.length < 3) {
    errors.push('Login must be at least 3 characters');
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    errors.push('Password is required and must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validateAttachGoogle(req, res, next) {
  const { firebaseGoogleId } = req.body;
  const errors = [];

  if (!firebaseGoogleId || typeof firebaseGoogleId !== 'string') {
    errors.push('Firebase Google ID is required and must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validatePhoneOnly(req, res, next) {
  const { phone } = req.body;
  const errors = [];

  if (!phone) {
    errors.push('Phone is required');
  } else if (typeof phone !== 'string') {
    errors.push('Phone must be a string');
  } else if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
    errors.push('Phone must be a valid international format');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validateOTP(req, res, next) {
  const { phone, otp } = req.body;
  const errors = [];

  if (!phone || typeof phone !== 'string') {
    errors.push('Phone is required and must be a string');
  }

  if (!otp) {
    errors.push('OTP is required');
  } else if (typeof otp !== 'string') {
    errors.push('OTP must be a string');
  } else if (!otp.match(/^\d{4,6}$/)) {
    errors.push('OTP must be 4-6 digits');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

export function validateResetToken(req, res, next) {
  const { resetToken, newPassword } = req.body;
  const errors = [];

  if (!resetToken || typeof resetToken !== 'string') {
    errors.push('Reset token is required and must be a string');
  }

  if (!newPassword) {
    errors.push('New password is required');
  } else if (typeof newPassword !== 'string') {
    errors.push('New password must be a string');
  } else if (newPassword.length < 6) {
    errors.push('New password must be at least 6 characters');
  } else if (newPassword.length > 128) {
    errors.push('New password must be less than 128 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}
import * as authService from './auth.service.js';

export async function register(req, res) {
  try {
    const { phone, password } = req.body;
    const result = await authService.register(phone, password);
    res.json(result);
  } catch (error) {
    console.error('🔥 Register error:', error);

    if (error.message === 'User already exists') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function verifyOtp(req, res) {
  try {
    const { phone, otp } = req.body;
    const result = await authService.verifyOtp(phone, otp);
    res.json(result);
  } catch (error) {
    console.error('🔥 Verify OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function login(req, res) {
  try {
    const { phone, password } = req.body;
    const result = await authService.login(phone, password);
    res.json(result);
  } catch (error) {
    console.error('🔥 Login error:', error);

    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function attachGoogle(req, res) {
  try {
    const { userId, firebaseGoogleId } = req.body;
    const result = await authService.attachGoogle(userId, firebaseGoogleId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Attach Google error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function requestResetPassword(req, res) {
  try {
    const { phone } = req.body;
    const result = await authService.requestResetPassword(phone);
    res.json(result);
  } catch (error) {
    console.error('🔥 Request Reset Password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function verifyResetOtp(req, res) {
  try {
    const { phone, otp } = req.body;
    const result = await authService.verifyResetOtp(phone, otp);

    if (result.status && result.message) {
      return res.status(result.status).json({ message: result.message });
    }

    res.json(result);
  } catch (error) {
    console.error('🔥 Verify Reset OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { phone, otp, newPassword } = req.body;
    const result = await authService.resetPassword(phone, otp, newPassword);
    res.json(result);
  } catch (error) {
    console.error('🔥 Reset Password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

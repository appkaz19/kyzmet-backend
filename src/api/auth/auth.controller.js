import * as authService from './auth.service.js';

export async function register(req, res) {
  try {
    const { phone, password } = req.body;
    const result = await authService.register(phone, password);
    console.log('✅ [auth] User registered:', result.user?.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Register error:', error);
    if (error.message === 'User already exists') return res.status(400).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function verifyOtp(req, res) {
  try {
    const { phone, otp } = req.body;
    const result = await authService.verifyOtp(phone, otp);
    console.log('✅ [auth] OTP verified:', result.user?.id);
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
    console.log('✅ [auth] User logined:', result.user?.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Login error:', error);
    if (error.message === 'Invalid credentials') return res.status(401).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function attachGoogle(req, res) {
  try {
    const userId = req.user.userId;
    const { firebaseGoogleId } = req.body;
    const result = await authService.attachGoogle(userId, firebaseGoogleId);
    console.log('✅ [auth] Google attached:', result.user?.id);
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
    console.log('✅ [auth] Password reset requested:', result.user?.id);
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
    console.log('✅ [auth] User registered:', result.user?.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Verify Reset OTP error:', error);
    if (error.message === 'User not found') return res.status(404).json({ message: error.message });
    if (error.message === 'Invalid OTP') return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const result = await authService.resetPassword(req.otp, newPassword);
    console.log('✅ [auth] Password resetted:', result.user?.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Reset Password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.adminLogin(email, password);
    console.log('✅ [auth] Admin logged in:', result.admin?.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Admin login error:', error);
    if (error.message === 'Invalid credentials') return res.status(401).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

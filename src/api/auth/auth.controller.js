import * as authService from './auth.service.js';

export async function register(req, res) {
  try {
    const { phone, password } = req.body;
    const result = await authService.register(phone, password);
    console.log('✅ [auth] User registered:', result.user.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Register error:', error);
    if (error.message === 'User already exists') return res.status(400).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function login(req, res) {
  try {
    const { phone, password } = req.body;
    const result = await authService.login(phone, password);
    console.log('✅ [auth] User logged in:', result.user.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Login error:', error);
    if (error.message === 'Invalid credentials') return res.status(401).json({ error: error.message });
    if (error.message === 'User not verified') return res.status(403).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function attachGoogle(req, res) {
  try {
    const userId = req.user.userId;
    const { firebaseGoogleId } = req.body;
    const result = await authService.attachGoogle(userId, firebaseGoogleId);
    console.log('✅ [auth] Google attached for user:', userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Attach Google error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function resetPassword(req, res) {
  try {
    const { phone, newPassword } = req.body;
    const result = await authService.resetPassword(phone, newPassword);
    console.log('✅ [auth] Password reset for user:', result.user.id);
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

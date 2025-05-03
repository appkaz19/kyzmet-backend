import * as userService from './users.service.js';

export async function getMyProfile(req, res) {
  try {
    const userId = req.user.userId;
    const result = await userService.getUserById(userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get My Profile error:', error);

    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateMyProfile(req, res) {
  try {
    const userId = req.user.userId;
    const data = req.body;
    const result = await userService.updateUser(userId, data);
    res.json(result);
  } catch (error) {
    console.error('🔥 Update My Profile error:', error);

    if (error.message === 'No valid fields provided for update') {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get User By ID error:', error);

    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

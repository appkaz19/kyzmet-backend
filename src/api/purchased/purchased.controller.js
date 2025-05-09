import * as purchasedService from './purchased.service.js';

export async function getMyPurchasedContacts(req, res) {
  try {
    const userId = req.user.userId;
    const result = await purchasedService.getByUser(userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Purchased Contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch purchased contacts' });
  }
}
import * as purchasedService from './purchased.service.js';

export async function getMyPurchasedContacts(req, res) {
  try {
    const contacts = await purchasedService.getByUser(req.user.userId);
    res.json(contacts);
  } catch (error) {
    console.error('🔥 Get Purchased Contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch purchased contacts' });
  }
}
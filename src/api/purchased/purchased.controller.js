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

export async function getTariffs(req, res) {
  try {
    const tariffs = await purchasedService.getTariffs();
    res.json(tariffs);
  } catch (error) {
    console.error('🔥 Get Tariffs error:', error);
    res.status(500).json({ error: 'Failed to fetch tariffs' });
  }
}

export async function createTariff(req, res) {
  try {
    const tariff = await purchasedService.createTariff(req.body);
    res.json(tariff);
  } catch (error) {
    console.error('🔥 Create Tariff error:', error);
    res.status(500).json({ error: 'Failed to create tariff' });
  }
}

export async function updateTariff(req, res) {
  try {
    const tariff = await purchasedService.updateTariff(req.params.id, req.body);
    res.json(tariff);
  } catch (error) {
    console.error('🔥 Update Tariff error:', error);
    res.status(500).json({ error: 'Failed to update tariff' });
  }
}
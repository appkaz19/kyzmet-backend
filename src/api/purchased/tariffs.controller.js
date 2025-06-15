import * as tariffsService from './tariffs.service.js';

export async function listTariffs(req, res) {
  try {
    const result = await tariffsService.getTariffs();
    res.json(result);
  } catch (error) {
    console.error('🔥 List Tariffs error:', error);
    res.status(500).json({ error: 'Failed to fetch tariffs' });
  }
}

export async function createTariff(req, res) {
  try {
    const result = await tariffsService.createTariff(req.body);
    res.json(result);
  } catch (error) {
    console.error('🔥 Create Tariff error:', error);
    res.status(400).json({ error: 'Failed to create tariff' });
  }
}

export async function updateTariff(req, res) {
  try {
    const result = await tariffsService.updateTariff(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error('🔥 Update Tariff error:', error);
    res.status(400).json({ error: 'Failed to update tariff' });
  }
}

export async function deleteTariff(req, res) {
  try {
    await tariffsService.deleteTariff(req.params.id);
    res.json({ message: 'Tariff deleted' });
  } catch (error) {
    console.error('🔥 Delete Tariff error:', error);
    res.status(400).json({ error: 'Failed to delete tariff' });
  }
}

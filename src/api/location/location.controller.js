import * as locationService from './location.service.js';

export async function getAll(req, res) {
  try {
    const locations = await locationService.getAll();
    res.json(locations);
  } catch (err) {
    console.error('🔥 Location fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

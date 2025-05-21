import * as locationService from './location.service.js';

export async function getAllRegions(req, res) {
  try {
    const language = req.query.lang || 'ru';
    const regions = await locationService.getAllRegions(language);
    res.json(regions);
  } catch (err) {
    console.error('🔥 Get regions error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getCitiesByRegion(req, res) {
  try {
    const { regionId } = req.params;
    const language = req.query.lang || 'ru';
    const cities = await locationService.getCitiesByRegion(regionId, language);
    res.json(cities);
  } catch (err) {
    console.error('🔥 Get cities by region error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

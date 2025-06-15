import * as serviceService from './services.service.js';

export async function createService(req, res) {
  try {
    const result = await serviceService.createService(req.user.userId, req.body);
    res.json(result);
  } catch (error) {
    console.error('🔥 Create Service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
}

export async function getServiceById(req, res) {
  try {
    const result = await serviceService.getServiceById(req.params.id, req.user.userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Service By ID error:', error);
    res.status(404).json({ error: error.message });
  }
}

export async function getServices(req, res) {
  try {
    const result = await serviceService.getServices(req.query);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}

export async function updateService(req, res) {
  try {
    const result = await serviceService.updateService(req.user.userId, req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error('🔥 Update Service error:', error);
    res.status(403).json({ error: error.message });
  }
}

export async function promoteService(req, res) {
  try {
    const { tariffId } = req.body;
    const result = await serviceService.promoteService(req.user.userId, req.params.id, tariffId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Promote Service error:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function buyProviderContact(req, res) {
  try {
    const result = await serviceService.buyProviderContact(req.user.userId, req.params.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Buy Provider Contact error:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function getMyServices(req, res) {
  try {
    const result = await serviceService.getMyServices(req.user.userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get My Services error:', error);
    res.status(500).json({ error: 'Failed to fetch my services' });
  }
}

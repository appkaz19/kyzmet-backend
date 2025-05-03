import * as serviceService from './services.service.js';

export async function createService(req, res) {
  try {
    const userId = req.user.userId;
    const serviceData = req.body;
    const result = await serviceService.createService(userId, serviceData);
    res.json(result);
  } catch (error) {
    console.error('🔥 Create Service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
}

export async function getServiceById(req, res) {
  try {
    const serviceId = req.params.id;
    const result = await serviceService.getServiceById(serviceId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Service By ID error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}

export async function getServices(req, res) {
  try {
    const filters = req.query;
    const result = await serviceService.getServices(filters);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}

export async function updateService(req, res) {
  try {
    const userId = req.user.userId;
    const serviceId = req.params.id;
    const serviceData = req.body;
    const result = await serviceService.updateService(userId, serviceId, serviceData);
    res.json(result);
  } catch (error) {
    console.error('🔥 Update Service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
}

export async function promoteService(req, res) {
  try {
    const userId = req.user.userId;
    const serviceId = req.params.id;
    const { days } = req.body;
    const result = await serviceService.promoteService(userId, serviceId, days);
    res.json(result);
  } catch (error) {
    console.error('🔥 Promote Service error:', error);
    res.status(500).json({ error: 'Failed to promote service' });
  }
}

export async function buyProviderContact(req, res) {
  try {
    const userId = req.user.userId;
    const serviceId = req.params.id;
    const result = await serviceService.buyProviderContact(userId, serviceId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Buy Provider Contact error:', error);
    res.status(500).json({ error: 'Failed to buy provider contact' });
  }
}

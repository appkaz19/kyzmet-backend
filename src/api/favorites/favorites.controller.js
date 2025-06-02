import * as favoritesService from './favorites.service.js';

export async function getFavoriteServices(req, res) {
  try {
    const result = await favoritesService.getFavoriteServices(req.user.userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Favorite Services error:', error);
    res.status(500).json({ error: 'Failed to fetch favorite services' });
  }
}

export async function addFavoriteService(req, res) {
  try {
    const serviceId = parseInt(req.params.id);
    const result = await favoritesService.addFavoriteService(req.user.userId, serviceId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Add Favorite Service error:', error);
    res.status(500).json({ error: 'Failed to add favorite service' });
  }
}

export async function removeFavoriteService(req, res) {
  try {
    const serviceId = parseInt(req.params.id);
    await favoritesService.removeFavoriteService(req.user.userId, serviceId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('🔥 Remove Favorite Service error:', error);
    res.status(500).json({ error: 'Failed to remove favorite service' });
  }
}

export async function getFavoriteJobs(req, res) {
  try {
    const result = await favoritesService.getFavoriteJobs(req.user.userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Favorite Jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch favorite jobs' });
  }
}

export async function addFavoriteJob(req, res) {
  try {
    const jobId = parseInt(req.params.id);
    const result = await favoritesService.addFavoriteJob(req.user.userId, jobId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Add Favorite Job error:', error);
    res.status(500).json({ error: 'Failed to add favorite job' });
  }
}

export async function removeFavoriteJob(req, res) {
  try {
    const jobId = parseInt(req.params.id);
    await favoritesService.removeFavoriteJob(req.user.userId, jobId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('🔥 Remove Favorite Job error:', error);
    res.status(500).json({ error: 'Failed to remove favorite job' });
  }
}

import * as jobService from './jobs.service.js';

export async function createJob(req, res) {
  try {
    const result = await jobService.createJob(req.user.userId, req.body);
    res.json(result);
  } catch (error) {
    console.error('🔥 Create Job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
}

export async function getJobs(req, res) {
  try {
    const result = await jobService.getJobs(req.query);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export async function getJobById(req, res) {
  try {
    const result = await jobService.getJobById(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Job By ID error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

export async function promoteJob(req, res) {
  try {
    const { tariffId } = req.body;
    const result = await jobService.promoteJob(req.user.userId, req.params.id, tariffId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Promote Job error:', error);
    res.status(500).json({ error: 'Failed to promote job' });
  }
}

export async function buyEmployerContact(req, res) {
  try {
    const result = await jobService.buyEmployerContact(req.user.userId, req.params.id);
    res.json(result);
  } catch (error) {
    console.error('🔥 Buy Employer Contact error:', error);
    res.status(500).json({ error: 'Failed to buy employer contact' });
  }
}

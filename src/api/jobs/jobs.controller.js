import * as jobService from './jobs.service.js';

export async function createJob(req, res) {
  try {
    const userId = req.user.userId;
    const jobData = req.body;
    const result = await jobService.createJob(userId, jobData);
    res.json(result);
  } catch (error) {
    console.error('🔥 Create Job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
}

export async function getJobs(req, res) {
  try {
    const filters = req.query;
    const result = await jobService.getJobs(filters);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export async function getJobById(req, res) {
  try {
    const jobId = req.params.id;
    const result = await jobService.getJobById(jobId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Job By ID error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

export async function promoteJob(req, res) {
  try {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const { days } = req.body;
    const result = await jobService.promoteJob(userId, jobId, days);
    res.json(result);
  } catch (error) {
    console.error('🔥 Promote Job error:', error);
    res.status(500).json({ error: 'Failed to promote job' });
  }
}

export async function buyEmployerContact(req, res) {
  try {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const result = await jobService.buyEmployerContact(userId, jobId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Buy Employer Contact error:', error);
    res.status(500).json({ error: 'Failed to buy employer contact' });
  }
}

import * as reviewService from './reviews.service.js';

export async function submitReview(req, res) {
  try {
    const review = await reviewService.submitReview(req.user.userId, req.body);
    res.json(review);
  } catch (error) {
    console.error('🔥 Submit Review Error:', error);
    if (error.message === 'Review already submitted for this service') return res.status(400).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getReviews(req, res) {
  try {
    const serviceId = req.query.serviceId;
    if (!serviceId) {
      return res.status(400).json({ error: 'serviceId is required' });
    }
    const reviews = await reviewService.getReviewsByService(serviceId);
    res.json(reviews);
  } catch (error) {
    console.error('🔥 Fetch Reviews Error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

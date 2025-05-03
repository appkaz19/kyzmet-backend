import * as reviewService from './reviews.service.js';

export async function submitReview(req, res) {
  try {
    const userId = req.user.userId;
    const review = await reviewService.submitReview(userId, req.body);
    res.json(review);
  } catch (error) {
    console.error('🔥 Submit review error:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getReviews(req, res) {
  try {
    const reviews = await reviewService.getReviewsByService(req.query.serviceId);
    res.json(reviews);
  } catch (error) {
    console.error('🔥 Fetch reviews error:', error);
    res.status(500).json({ error: error.message });
  }
}

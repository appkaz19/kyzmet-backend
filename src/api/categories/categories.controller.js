import * as categoryService from './categories.service.js';

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('🔥 Get Categories error:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

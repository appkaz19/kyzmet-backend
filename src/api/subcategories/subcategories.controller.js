import * as subcategoryService from './subcategories.service.js';

export async function getByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const result = await subcategoryService.getByCategory(categoryId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Subcategories error:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
}
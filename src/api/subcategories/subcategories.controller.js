import * as subcategoryService from './subcategories.service.js';

export async function getSubcategoriesByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const language = req.query.lang || 'ru';
    const subcategories = await subcategoryService.getSubcategoriesByCategory(categoryId, language);
    res.json(subcategories);
  } catch (error) {
    console.error('🔥 Get Subcategories error:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
}

export async function createSubcategory(req, res) {
  try {
    const data = req.body;
    const subcategory = await subcategoryService.createSubcategory(data);
    res.json(subcategory);
  } catch (error) {
    console.error('🔥 Create Subcategory error:', error);
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
}

export async function updateSubcategory(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const subcategory = await subcategoryService.updateSubcategory(id, data);
    res.json(subcategory);
  } catch (error) {
    console.error('🔥 Update Subcategory error:', error);
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
}

export async function deleteSubcategory(req, res) {
  try {
    const { id } = req.params;
    await subcategoryService.deleteSubcategory(id);
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('🔥 Delete Subcategory error:', error);
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
}

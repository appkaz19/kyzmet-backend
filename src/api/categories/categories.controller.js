import * as categoryService from './categories.service.js';

export async function getAllCategories(req, res) {
  try {
    const language = req.query.lang || 'ru';
    const categories = await categoryService.getAllCategories(language);
    res.json(categories);
  } catch (error) {
    console.error('🔥 Get Categories error:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

export async function createCategory(req, res) {
  try {
    const data = req.body;
    const category = await categoryService.createCategory(data);
    res.json(category);
  } catch (error) {
    console.error('🔥 Create Category error:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const category = await categoryService.updateCategory(id, data);
    res.json(category);
  } catch (error) {
    console.error('🔥 Update Category error:', error);
    res.status(500).json({ message: 'Failed to update category' });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('🔥 Delete Category error:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
}

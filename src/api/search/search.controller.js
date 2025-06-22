import * as searchService from './search.service.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const globalSearch = asyncHandler(async (req, res) => {
  const { 
    q: query, 
    type = 'all',
    limit = 5,
    regionId,
    cityId
  } = req.query;

  const results = await searchService.globalSearch({
    query,
    type,
    limit: parseInt(limit) || 5,
    regionId,
    cityId
  });

  console.log(`✅ [search] Global search for: "${query}", type: ${type}`);
  res.json(results);
});

export const searchSuggestions = asyncHandler(async (req, res) => {
  const { q: query, limit = 10 } = req.query;

  const suggestions = await searchService.getSearchSuggestions(
    query, 
    parseInt(limit) || 10
  );

  console.log(`✅ [search] Suggestions for: "${query}"`);
  res.json(suggestions);
});
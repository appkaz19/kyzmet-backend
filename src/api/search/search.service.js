import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { serialize } from '../../utils/serialize.js';

/**
 * Global search across services, jobs, and categories
 * @param {string} query - Search query
 * @param {string} type - Search type: 'all', 'services', 'jobs', 'categories'
 * @param {number} limit - Max results per type (default: 5)
 * @param {string} regionId - Optional region filter
 * @param {string} cityId - Optional city filter
 */
export async function globalSearch({
  query,
  type = 'all',
  limit = 5,
  regionId,
  cityId
}) {
  if (!query || query.trim().length < 2) {
    throw new Error('Search query must be at least 2 characters');
  }

  const searchTerm = query.trim();
  const results = {};

  // Common where clause for location filtering
  const locationWhere = {};
  if (regionId) locationWhere.regionId = regionId;
  if (cityId) locationWhere.cityId = cityId;

  // Search services
  if (type === 'all' || type === 'services') {
    const services = await prisma.service.findMany({
      where: {
        ...locationWhere,
        isDeleted: false,
        expiresAt: { gte: new Date() },
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true
          }
        },
        category: {
          include: {
            CategoryTranslation: true
          }
        },
        subcategory: {
          include: {
            SubcategoryTranslation: true
          }
        },
        region: true,
        city: true
      },
      orderBy: [
        { promotedUntil: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });

    // Calculate ratings
    const servicesWithRatings = await Promise.all(
      services.map(async (service) => {
        const reviews = await prisma.review.findMany({
          where: { serviceId: service.id },
          select: { rating: true }
        });

        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

        return {
          ...service,
          rating: avgRating,
          reviewCount: reviews.length,
          providerName: `${service.user.firstName || ''} ${service.user.lastName || ''}`.trim()
        };
      })
    );

    results.services = servicesWithRatings;
  }

  // Search jobs
  if (type === 'all' || type === 'jobs') {
    const jobs = await prisma.job.findMany({
      where: {
        ...locationWhere,
        isDeleted: false,
        expiresAt: { gte: new Date() },
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        region: true,
        city: true
      },
      orderBy: [
        { promotedUntil: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });

    results.jobs = jobs.map(job => ({
      ...job,
      authorName: job.user ? 
        `${job.user.firstName || ''} ${job.user.lastName || ''}`.trim() || 'Аноним' : 
        'Аноним'
    }));
  }

  // Search categories
  if (type === 'all' || type === 'categories') {
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          {
            CategoryTranslation: {
              some: {
                OR: [
                  { nameRu: { contains: searchTerm, mode: 'insensitive' } },
                  { nameKk: { contains: searchTerm, mode: 'insensitive' } },
                  { nameUz: { contains: searchTerm, mode: 'insensitive' } }
                ]
              }
            }
          }
        ]
      },
      include: {
        CategoryTranslation: true,
        subcategory: {
          include: {
            SubcategoryTranslation: true
          }
        }
      },
      take: limit
    });

    // Also search subcategories
    const subcategories = await prisma.subcategory.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          {
            SubcategoryTranslation: {
              some: {
                OR: [
                  { nameRu: { contains: searchTerm, mode: 'insensitive' } },
                  { nameKk: { contains: searchTerm, mode: 'insensitive' } },
                  { nameUz: { contains: searchTerm, mode: 'insensitive' } }
                ]
              }
            }
          }
        ]
      },
      include: {
        SubcategoryTranslation: true,
        category: {
          include: {
            CategoryTranslation: true
          }
        }
      },
      take: limit
    });

    results.categories = categories;
    results.subcategories = subcategories;
  }

  // Count total results
  const totalCounts = {};
  
  if (type === 'all') {
    totalCounts.services = await prisma.service.count({
      where: {
        ...locationWhere,
        isDeleted: false,
        expiresAt: { gte: new Date() },
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      }
    });

    totalCounts.jobs = await prisma.job.count({
      where: {
        ...locationWhere,
        isDeleted: false,
        expiresAt: { gte: new Date() },
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      }
    });

    totalCounts.categories = results.categories?.length || 0;
    totalCounts.subcategories = results.subcategories?.length || 0;
  }

  return serialize({
    query: searchTerm,
    type,
    results,
    totalCounts,
    hasMore: Object.values(totalCounts).some(count => count > limit)
  });
}

/**
 * Get search suggestions based on query
 * @param {string} query - Partial search query
 * @param {number} limit - Max suggestions (default: 10)
 */
export async function getSearchSuggestions(query, limit = 10) {
  if (!query || query.trim().length < 1) {
    return { suggestions: [] };
  }

  const searchTerm = query.trim();
  const suggestions = new Set();

  // Get service titles
  const serviceTitles = await prisma.service.findMany({
    where: {
      title: { startsWith: searchTerm, mode: 'insensitive' },
      isDeleted: false,
      expiresAt: { gte: new Date() }
    },
    select: { title: true },
    take: Math.floor(limit / 3)
  });

  serviceTitles.forEach(s => suggestions.add(s.title));

  // Get job titles
  const jobTitles = await prisma.job.findMany({
    where: {
      title: { startsWith: searchTerm, mode: 'insensitive' },
      isDeleted: false,
      expiresAt: { gte: new Date() }
    },
    select: { title: true },
    take: Math.floor(limit / 3)
  });

  jobTitles.forEach(j => suggestions.add(j.title));

  // Get category names
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { name: { startsWith: searchTerm, mode: 'insensitive' } },
        {
          CategoryTranslation: {
            some: {
              OR: [
                { nameRu: { startsWith: searchTerm, mode: 'insensitive' } },
                { nameKk: { startsWith: searchTerm, mode: 'insensitive' } },
                { nameUz: { startsWith: searchTerm, mode: 'insensitive' } }
              ]
            }
          }
        }
      ]
    },
    include: { CategoryTranslation: true },
    take: Math.floor(limit / 3)
  });

  categories.forEach(c => {
    suggestions.add(c.name);
    c.CategoryTranslation.forEach(t => {
      if (t.nameRu) suggestions.add(t.nameRu);
      if (t.nameKk) suggestions.add(t.nameKk);
      if (t.nameUz) suggestions.add(t.nameUz);
    });
  });

  return {
    suggestions: Array.from(suggestions).slice(0, limit)
  };
}
// Cache configuration constants
export const CACHE_TIMES = {
  PRODUCTS: 60, // 1 minute
  SEARCH: 30, // 30 seconds
  FILTERS: 300, // 5 minutes
  STREAM: 120, // 2 minutes
  STATIC: 3600, // 1 hour
} as const;

export const CACHE_TAGS = {
  PRODUCTS: 'products',
  FILTERS: 'filters',
  STREAM: 'stream',
} as const;

export const getCacheConfig = (type: keyof typeof CACHE_TIMES) => ({
  next: {
    revalidate: CACHE_TIMES[type],
    tags:
      type === 'PRODUCTS'
        ? [CACHE_TAGS.PRODUCTS]
        : type === 'FILTERS'
          ? [CACHE_TAGS.FILTERS]
          : type === 'STREAM'
            ? [CACHE_TAGS.STREAM]
            : [],
  },
});

export const getApiCacheHeaders = (type: keyof typeof CACHE_TIMES) => ({
  'Cache-Control': `public, s-maxage=${CACHE_TIMES[type]}, stale-while-revalidate=${CACHE_TIMES[type] * 2}`,
  'CDN-Cache-Control': `public, s-maxage=${CACHE_TIMES[type]}`,
  'Vercel-CDN-Cache-Control': `public, s-maxage=${CACHE_TIMES[type]}`,
});

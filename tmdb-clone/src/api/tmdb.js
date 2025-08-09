// TMDB API Configuration
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
if (!API_KEY) {
  console.warn('⚠️ TMDB API Key not found in .env file. Please set REACT_APP_TMDB_API_KEY');
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to handle API requests with caching
async function makeRequest(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  // Create cache key
  const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
  const now = Date.now();

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && (now - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }

  // Build URL with API key and parameters
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');
  url.searchParams.append('region', 'US');
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.status_message || 'API request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    // Cache the successful response
    cache.set(cacheKey, {
      data,
      timestamp: now
    });

    return data;
  } catch (error) {
    console.error('TMDB API Error:', {
      endpoint,
      params,
      error: error.message,
      status: error.status
    });
    throw error;
  }
}

/**
 * Fetches trending movies or TV shows
 * @param {string} mediaType - 'all', 'movie', 'tv', 'person'
 * @param {string} timeWindow - 'day' or 'week'
 * @param {Object} options - Additional options
 * @param {number} options.page - Page number (default: 1)
 * @param {string} options.region - ISO 3166-1 alpha-2 country code (default: 'US')
 * @returns {Promise<Object>} - Trending data
 */
export async function fetchTrending(
  mediaType = 'all',
  timeWindow = 'day',
  { page = 1, region = 'US' } = {}
) {
  try {
    const data = await makeRequest(`/trending/${mediaType}/${timeWindow}`, {
      page,
      region,
    });

    console.debug(`Fetched ${data.results.length} trending ${mediaType} items`);
    return data;
  } catch (error) {
    console.error('Failed to fetch trending data:', error);
    // Return empty results on error to prevent UI breakage
    return { 
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0 
    };
  }
}

/**
 * Builds a complete image URL
 * @param {string} path - Image path
 * @param {string} size - Image size (default: 'w500')
 * @returns {string} Complete image URL
 */
export function getPosterUrl(path, size = 'w500') {
  if (!path) return '/no-poster.png'; // Your fallback image
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${IMG_BASE}/${size}/${cleanPath}`;
}

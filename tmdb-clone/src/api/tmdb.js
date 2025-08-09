// TMDB API helper for trending
// NOTE: You must set your TMDB API key in the .env file as REACT_APP_TMDB_API_KEY

// Prefer .env; fallback to dev key to avoid api_key=undefined during local dev
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '2828f985811a0d5bafec62603aef829c';
console.log('TMDB key loaded from .env?', !!process.env.REACT_APP_TMDB_API_KEY);
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export async function fetchTrending(mediaType = 'all', timeWindow = 'day') {
  if (!API_KEY) {
    console.error('❌ Missing TMDB API Key. Check your .env file.');
    return { results: [] };
  }
  const url = `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch trending: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('⚠️ Error fetching TMDB trending:', error);
    return { results: [] };
  }
}

// Build poster URL safely
export function getPosterUrl(path) {
  return path ? `${IMG_BASE}${path}` : '/no-poster.png'; // use your own fallback image
}

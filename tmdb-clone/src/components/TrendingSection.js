import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChevronRight, FaChevronLeft, FaExclamationTriangle } from 'react-icons/fa';
import { fetchTrending, getPosterUrl } from '../api/tmdb';

// Hide scrollbar globally
const globalStyles = `
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
`;

// Optional: mock fallback if API fails
const mockMovies = [
  { id: 1, title: 'Fallback Movie', poster_path: '/abc123.jpg', vote_average: 7.5, release_date: '2025-07-01' },
];

const TrendingSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('day');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const prevTabRef = useRef();

  // Memoized fetch function with retry logic
  const fetchTrendingData = useCallback(async (tab, retryCount = 0) => {
    // Don't refetch if we're already on this tab and not forcing a refresh
    if (prevTabRef.current === tab && retryCount === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchTrending('movie', tab, {
        region: 'US', // You can make this configurable
        page: 1
      });
      
      if (data?.results?.length) {
        // TMDB already sorts by popularity, but we'll keep this as a safeguard
        const sortedResults = [...data.results].sort((a, b) => b.popularity - a.popularity);
        setMovies(sortedResults);
      } else if (retryCount < 2) {
        // Retry once if no results
        console.log(`No results, retrying... (${retryCount + 1}/2)`);
        return fetchTrendingData(tab, retryCount + 1);
      } else {
        setMovies([]);
        setError('No trending movies found. The API might be rate limited or there might be no trending content.');
      }
      
      prevTabRef.current = tab;
    } catch (err) {
      console.error('Error in fetchTrendingData:', err);
      if (retryCount < 2) {
        // Retry on error
        console.log(`Error occurred, retrying... (${retryCount + 1}/2)`);
        return fetchTrendingData(tab, retryCount + 1);
      }
      setError('Failed to load trending movies. Please check your internet connection and try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data when tab changes
  useEffect(() => {
    fetchTrendingData(activeTab);
  }, [activeTab, fetchTrendingData]);

  // Add a refresh button handler with loading state
  const handleRefresh = () => {
    if (isLoading) return; // Prevent multiple clicks
    prevTabRef.current = null; // Force refetch
    fetchTrendingData(activeTab);
    
    // Show a brief loading state even if cached
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    if (rating >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Sort movies by popularity to match TMDB's default order
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  // Render loading state
  if (isLoading && !movies.length) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-[1800px] mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading trending movies...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-[1800px] mx-auto text-center py-20">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg inline-flex items-center">
            <FaExclamationTriangle className="mr-2" />
            {error}
          </div>
          <button 
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Trending</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {activeTab === 'day' ? 'Trending today' : 'Trending this week'}
              <button 
                onClick={handleRefresh}
                className="ml-3 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                title="Refresh data"
              >
                Refresh
              </button>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg">
              <button
                onClick={() => setActiveTab('day')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === 'day'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md hover:shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-pressed={activeTab === 'day'}
              >
                <span className="relative">
                  Today
                  {activeTab === 'day' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></span>
                  )}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('week')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === 'week'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md hover:shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-pressed={activeTab === 'week'}
              >
                <span className="relative">
                  This Week
                  {activeTab === 'week' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto pb-10 -mx-4 px-4 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
            }}
          >
            {sortedMovies.map((movie) => {
              const title = movie.title || movie.name;
              const date = movie.release_date || movie.first_air_date || '';
              const rating = movie.vote_average?.toFixed(1) || 'N/A';

              return (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-[300px] transform transition-all duration-300 hover:scale-[1.02] group/card snap-start hover:z-10 mx-1"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-800 h-full flex flex-col border border-gray-200/10 hover:border-gray-200/30 transition-all duration-300 group-hover/card:shadow-3xl group-hover/card:border-gray-200/40 group-hover/card:ring-2 group-hover/card:ring-blue-500/20">
                    {/* Poster Image with Hover Effects */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/30 z-10 pointer-events-none" />
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={getPosterUrl(movie.poster_path, 'w500')}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />

                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover/card:scale-110 z-20">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRatingColor(movie.vote_average)}/95 text-white font-bold text-sm shadow-2xl border-2 border-white/30 backdrop-blur-sm`}>
                          <div className="flex flex-col items-center">
                            <span className="text-base font-bold leading-none drop-shadow-md">{rating}</span>
                            <span className="text-[9px] font-medium leading-none -mt-0.5 opacity-90">RATING</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Action Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-blue-500/40 group/play">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover/play:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="bg-white/90 hover:bg-white text-gray-900 rounded-full w-14 h-14 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-white/20 group/info">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover/info:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex-grow flex flex-col relative overflow-hidden">
                      {/* Subtle texture overlay */}
                      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
                      <h3 
                        className="font-bold text-lg mb-3 line-clamp-2 leading-tight text-white tracking-tight group-hover/card:text-blue-400 transition-colors duration-300 relative z-10" 
                        title={title}
                      >
                        {title}
                      </h3>
                      <div className="flex flex-wrap items-center text-gray-300 text-[13px] mb-5 gap-2 relative z-10">
                        <span className="font-medium text-gray-200 bg-gray-800/70 px-2 py-1 rounded-md border border-gray-700/50">
                          {date ? new Date(date).getFullYear() : 'N/A'}
                        </span>
                        <div className="flex items-center bg-gray-800/90 px-2.5 py-1 rounded-md border border-gray-700/50">
                          <FaStar className="text-yellow-400 mr-1.5 text-xs" />
                          <span className="font-semibold text-white">{rating}</span>
                          <span className="text-gray-400 text-[11px] ml-0.5">/10</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-800/50 relative z-10">
                        <button 
                          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] group/button relative overflow-hidden"
                          onClick={() => navigate(`/details/${movie.media_type || 'movie'}/${movie.id}`)}
                        >
                          <span className="relative z-10 flex items-center">
                            View Details
                            <FaChevronRight className="ml-2 mt-0.5 transition-transform duration-300 group-hover/button:translate-x-1" size={11} />
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none backdrop-blur-sm hover:scale-110 hover:shadow-xl"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none backdrop-blur-sm hover:scale-110 hover:shadow-xl"
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

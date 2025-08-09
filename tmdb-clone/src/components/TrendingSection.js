import React, { useEffect, useState } from 'react';
import { fetchTrending, getPosterUrl } from '../api/tmdb';

// Optional: mock fallback if API fails
const mockMovies = [
  { id: 1, title: 'Fallback Movie', poster_path: '/abc123.jpg', vote_average: 7.5, release_date: '2025-07-01' },
];

const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState('day');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrending('movie', activeTab).then((data) => {
      if (data.results?.length) {
        setMovies(data.results);
      } else {
        setMovies(mockMovies); // fallback
      }
    });
  }, [activeTab]);

  // No arrow controls; users can scroll horizontally

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending</h2>
          <div className="flex gap-3">
            <button 
              className={`px-5 py-2 border-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'day' 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:bg-gray-100'
              }`} 
              onClick={() => setActiveTab('day')}
            >
              Today
            </button>
            <button 
              className={`px-5 py-2 border-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'week' 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:bg-gray-100'
              }`} 
              onClick={() => setActiveTab('week')}
            >
              This Week
            </button>
          </div>
        </div>

        <div id="movie-row" className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2">
          {movies.map((movie) => {
            const title = movie.title || movie.name;
            const date = movie.release_date || movie.first_air_date || '';
            return (
              <div key={movie.id} className="flex-shrink-0 w-[220px] group">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={getPosterUrl(movie.poster_path)} 
                    alt={title} 
                    className="w-full h-[320px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 px-1">
                  <h3 className="text-lg font-bold text-gray-900 truncate" title={title}>{title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

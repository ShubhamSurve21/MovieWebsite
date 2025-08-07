import React, { useState } from 'react';
import MovieCard from './MovieCard';

// Example mock trending data (replace with API integration if needed)
const trendingToday = [
  {
    id: 1,
    title: 'Jurassic World Rebirth',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/8rpDcsfLJypbO6vREc0547VKqEv.jpg',
    vote_average: 6.4,
    release_date: 'Jul 04, 2025',
  },
  {
    id: 2,
    title: 'Wednesday',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg',
    vote_average: 8.4,
    release_date: 'Nov 23, 2022',
  },
  {
    id: 3,
    title: 'The Pickup',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/9ZlGs31gZpT3u1r8q5bJcK7QYqC.jpg',
    vote_average: 5.4,
    release_date: 'Jul 27, 2025',
  },
  {
    id: 4,
    title: 'Ne Zha 2',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/7IJ7F8tX7IAkpUdaGovOBJqORnJ.jpg',
    vote_average: 8.0,
    release_date: 'Jan 29, 2025',
  },
  {
    id: 5,
    title: 'Sorry, Baby',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/3C2rQWIO4D3r5A6h3hP6yF2sQ8B.jpg',
    vote_average: 6.4,
    release_date: 'Jun 27, 2025',
  },
  {
    id: 6,
    title: 'Weapons',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4woSOUD0equAYzvwhWBHIJDCM88.jpg',
    vote_average: 8.1,
    release_date: 'Aug 06, 2025',
  },
  {
    id: 7,
    title: 'Platonic',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/6gIJuFHh5Lj4dNaPG3TzIMl7L68.jpg',
    vote_average: 6.9,
    release_date: 'May 23, 2023',
  },
  {
    id: 8,
    title: '28 Years',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/8V97rD2m6uA5u1n0lqkY2pA2n5b.jpg',
    vote_average: 6.9,
    release_date: 'Jun 20, 2025',
  },
];

const trendingWeek = trendingToday; // For demo, reuse same data

const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState('today');
  const trendingData = activeTab === 'today' ? trendingToday : trendingWeek;

  return (
    <section className="bg-white w-full py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-tmdb-dark mr-6">Trending</h2>
          <div className="flex gap-2">
            <button
              className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-150 ${activeTab === 'today' ? 'bg-tmdb-blue text-white border-tmdb-blue' : 'bg-white text-tmdb-blue border-tmdb-blue hover:bg-tmdb-blue/10'}`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-150 ${activeTab === 'week' ? 'bg-tmdb-blue text-white border-tmdb-blue' : 'bg-white text-tmdb-blue border-tmdb-blue hover:bg-tmdb-blue/10'}`}
              onClick={() => setActiveTab('week')}
            >
              This Week
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-2">
            {trendingData.map((movie) => (
              <div key={movie.id} className="min-w-[180px] max-w-[220px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

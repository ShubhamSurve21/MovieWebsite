import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import MovieGrid from '../components/MovieGrid';
import TVGrid from '../components/TVGrid';
import { mockMovies, mockTVShows, trendingData } from '../data/mockData';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrendingSection />
      <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-tmdb-light-blue/10 via-white to-tmdb-light/60 rounded-b-lg">
        {/* Popular Movies Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-tmdb-dark mb-2 tracking-tight">Popular Movies</h2>
            <button className="text-tmdb-blue hover:text-tmdb-dark-blue font-semibold">
              View All
            </button>
          </div>
          <MovieGrid movies={mockMovies} />
        </section>

        {/* Trending TV Shows Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-tmdb-dark mb-2 tracking-tight">Trending TV Shows</h2>
            <button className="text-tmdb-blue hover:text-tmdb-dark-blue font-semibold">
              View All
            </button>
          </div>
          <TVGrid tvShows={mockTVShows} />
        </section>

        {/* Upcoming Releases Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-tmdb-dark mb-2 tracking-tight">Upcoming Releases</h2>
            <button className="text-tmdb-blue hover:text-tmdb-dark-blue font-semibold">
              View All
            </button>
          </div>
          <MovieGrid movies={mockMovies.slice(0, 4)} />
        </section>
      </div>
    </div>
  );
};

export default Home;

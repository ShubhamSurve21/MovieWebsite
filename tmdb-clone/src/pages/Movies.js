import React from 'react';

import { mockMovies } from '../data/mockData';

const Movies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Popular Movies</h1>
          <p className="text-gray-600">Discover the most popular movies right now.</p>
        </div>
        <div className="text-center text-gray-500">Movie grid coming soon.</div>
      </div>
    </div>
  );
};

export default Movies;

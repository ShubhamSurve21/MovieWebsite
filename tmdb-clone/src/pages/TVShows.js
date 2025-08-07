import React from 'react';
import TVGrid from '../components/TVGrid';
import { mockTVShows } from '../data/mockData';

const TVShows = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Popular TV Shows</h1>
          <p className="text-gray-600">Discover the most popular TV shows right now.</p>
        </div>
        
        <TVGrid tvShows={mockTVShows} />
      </div>
    </div>
  );
};

export default TVShows;

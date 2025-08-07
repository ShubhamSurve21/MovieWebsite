import React from 'react';
import TVCard from './TVCard';

const TVGrid = ({ tvShows }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {tvShows.map((show) => (
        <TVCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default TVGrid;

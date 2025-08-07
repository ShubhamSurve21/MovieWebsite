import React from 'react';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-xl border border-tmdb-blue/10 shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden group cursor-pointer relative hover:-translate-y-1 hover:scale-105">
      <div className="relative">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-tmdb-blue text-white px-2 py-1 rounded text-xs font-bold opacity-90 flex items-center space-x-1">
          <FaStar className="text-yellow-400" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-extrabold text-lg text-tmdb-dark mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2 truncate">{movie.release_date}</p>
        <button className="text-tmdb-blue hover:underline text-sm font-semibold">More Info</button>
      </div>
    </div>
  );
};

export default MovieCard;

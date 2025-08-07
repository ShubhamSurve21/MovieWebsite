import React from 'react';
import { FaStar } from 'react-icons/fa';

const TVCard = ({ show }) => {
  return (
    <div className="bg-white rounded-xl border border-tmdb-blue/10 shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden group cursor-pointer relative hover:-translate-y-1 hover:scale-105">
      <div className="relative">
        <img
          src={show.poster_path}
          alt={show.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-tmdb-blue text-white px-2 py-1 rounded text-xs font-bold opacity-90 flex items-center space-x-1">
          <FaStar className="text-yellow-400" />
          <span>{show.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-extrabold text-lg text-tmdb-dark mb-1 truncate">{show.name}</h3>
        <p className="text-gray-600 text-sm mb-2 truncate">{show.first_air_date}</p>
        <button className="text-tmdb-blue hover:underline text-sm font-semibold">More Info</button>
      </div>
    </div>
  );
};

export default TVCard;

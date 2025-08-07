import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[420px] h-[50vh] md:h-[60vh] flex items-center justify-center bg-tmdb-dark-blue overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.themoviedb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg"
          alt="TMDB Hero Background"
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-tmdb-blue/80 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-2 md:px-0">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 drop-shadow-lg">
          Welcome.
        </h1>
        <p className="text-white text-lg md:text-2xl text-center mb-8 font-semibold drop-shadow">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form className="w-full max-w-2xl flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person......"
            className="w-full rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-tmdb-blue bg-white text-gray-900 shadow-md"
          />
          <button
            type="submit"
            className="ml-2 px-8 py-4 rounded-full bg-tmdb-blue text-white font-bold text-lg shadow-md hover:bg-tmdb-lightBlue transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
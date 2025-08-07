import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import TVGrid from '../components/TVGrid';
import PeopleGrid from '../components/PeopleGrid';
import { mockMovies, mockTVShows, mockPeople } from '../data/mockData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // Mock search results - in a real app, this would filter based on the query
  const searchResults = {
    movies: mockMovies.slice(0, 3),
    tvShows: mockTVShows.slice(0, 2),
    people: mockPeople.slice(0, 2)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            Found {searchResults.movies.length + searchResults.tvShows.length + searchResults.people.length} results
          </p>
        </div>

        {/* Movies Results */}
        {searchResults.movies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Movies</h2>
            <MovieGrid movies={searchResults.movies} />
          </section>
        )}

        {/* TV Shows Results */}
        {searchResults.tvShows.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">TV Shows</h2>
            <TVGrid tvShows={searchResults.tvShows} />
          </section>
        )}

        {/* People Results */}
        {searchResults.people.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">People</h2>
            <PeopleGrid people={searchResults.people} />
          </section>
        )}

        {/* No Results */}
        {searchResults.movies.length === 0 && 
         searchResults.tvShows.length === 0 && 
         searchResults.people.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
            <p className="text-gray-600">Try searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

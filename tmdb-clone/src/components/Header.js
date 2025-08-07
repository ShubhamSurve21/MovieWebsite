import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-tmdb-dark-blue text-white sticky top-0 z-50 border-b border-tmdb-blue/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-tmdb-blue px-4 py-1 rounded font-extrabold text-2xl tracking-wide shadow-md">
              TMDB
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link 
                to="/movies" 
                className="hover:text-tmdb-blue hover:bg-tmdb-blue/10 px-3 py-2 rounded transition-colors duration-200 font-semibold"
              >
                Movies
              </Link>
            </div>
            <div className="relative group">
              <Link 
                to="/tv" 
                className="hover:text-tmdb-blue hover:bg-tmdb-blue/10 px-3 py-2 rounded transition-colors duration-200 font-semibold"
              >
                TV Shows
              </Link>
            </div>
            <div className="relative group">
              <Link 
                to="/people" 
                className="hover:text-tmdb-blue hover:bg-tmdb-blue/10 px-3 py-2 rounded transition-colors duration-200 font-semibold"
              >
                People
              </Link>
            </div>
            <div className="relative group">
              <span className="hover:text-tmdb-blue transition-colors duration-200 font-semibold cursor-pointer">
                More
              </span>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a movie, tv show, person..."
                className="bg-white text-gray-900 px-4 py-2 pr-10 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-tmdb-blue shadow-md"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-tmdb-blue"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-tmdb-blue transition-colors duration-200"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-tmdb-dark-blue border-t border-gray-700">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-white text-gray-900 px-4 py-2 pr-10 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-tmdb-blue"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-tmdb-blue"
                >
                  <FaSearch />
                </button>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link 
                  to="/movies" 
                  className="block py-2 hover:text-tmdb-blue transition-colors duration-200 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Movies
                </Link>
                <Link 
                  to="/tv" 
                  className="block py-2 hover:text-tmdb-blue transition-colors duration-200 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TV Shows
                </Link>
                <Link 
                  to="/people" 
                  className="block py-2 hover:text-tmdb-blue transition-colors duration-200 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  People
                </Link>
                <span className="block py-2 hover:text-tmdb-blue transition-colors duration-200 font-semibold cursor-pointer">
                  More
                </span>
              </nav>

              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

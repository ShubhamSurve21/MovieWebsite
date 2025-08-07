import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-tmdb-dark text-white border-t-4 border-tmdb-blue/50 shadow-inner">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-tmdb-blue px-4 py-1 rounded font-extrabold text-2xl tracking-wide shadow-md">
                TMDB
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Movie Database (TMDB) is a community built movie and TV database. 
              Every piece of data has been added by our amazing community dating back to 2008.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-tmdb-blue transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tmdb-blue transition-colors duration-200">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tmdb-blue transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tmdb-blue transition-colors duration-200">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* The Basics */}
          <div>
            <h3 className="font-extrabold text-lg mb-4 tracking-wide">The Basics</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  About TMDB
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Support Forums
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-extrabold text-lg mb-4 tracking-wide">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Contribution Bible
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Add New Movie
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Add New TV Show
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-extrabold text-lg mb-4 tracking-wide">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Discussions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 TMDB Clone. Built with React.js for educational purposes.
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                Terms of Use
              </Link>
              <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-300 hover:text-tmdb-blue hover:underline transition-colors duration-200 text-sm">
                DMCA Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

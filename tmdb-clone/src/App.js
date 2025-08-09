import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import People from './pages/People';
import SearchResults from './pages/SearchResults';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/people" element={<People />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;

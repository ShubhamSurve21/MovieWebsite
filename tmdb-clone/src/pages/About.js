import React from 'react';

const About = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-tmdb-dark-blue mb-6">About TMDB Clone</h1>
      <p className="text-lg text-gray-700 mb-4">
        This is a static, pixel-perfect clone of <a href="https://www.themoviedb.org" className="text-tmdb-blue underline" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a> built with React.js and Tailwind CSS for educational purposes.
      </p>
      <ul className="list-disc pl-8 text-gray-700">
        <li>All data is mock/static and no backend is used.</li>
        <li>All UI elements, layout, and interactions are closely modeled after the original TMDB site.</li>
        <li>Responsive design and modern UI/UX practices are used throughout.</li>
      </ul>
      <div className="mt-8">
        <a href="/" className="text-tmdb-blue hover:underline">Back to Home</a>
      </div>
    </div>
  </div>
);

export default About;

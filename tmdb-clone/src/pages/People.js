import React from 'react';

import { mockPeople } from '../data/mockData';

const People = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Popular People</h1>
          <p className="text-gray-600">Discover the most popular people in entertainment.</p>
        </div>
        
        <div className="text-center text-gray-500">People grid coming soon.</div>
      </div>
    </div>
  );
};

export default People;

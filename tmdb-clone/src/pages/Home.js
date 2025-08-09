import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrendingSection />
    </div>
  );
};

export default Home;

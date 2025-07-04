// src/pages/Home.jsx
import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCourses from './FeaturedCourses';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturedCourses />
    </div>
  );
};

export default Home;

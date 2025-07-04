// src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  const navigate = useNavigate();

  const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const onChange = e => setDarkMode(e.matches);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center transition-colors duration-700 ease-in-out
        // ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}
    >
      {/* Dark Mode Toggle Button
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:ring-2 ring-blue-500 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button> */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight pb-2.5
            ${darkMode
              ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text'
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text'}`}
        >
          LearnHub: AI-Powered Live Course Streaming
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className={`text-xl sm:text-2xl mb-8
            ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          <Typewriter
            words={[
              'Stream live courses enhanced with AI-generated transcripts and smart summaries.',
              'Engage learners with dynamic quizzes and contextual AI chatbots.',
              'Track progress seamlessly and deliver immersive learning experiences.',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
            }}
            whileFocus={{
              outline: 'none',
              boxShadow: '0 0 10px 3px rgba(59, 130, 246, 0.9)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 focus:outline-none"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
            }}
            whileFocus={{
              outline: 'none',
              boxShadow: '0 0 10px 3px rgba(59, 130, 246, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg focus:outline-none"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-blue-600 cursor-pointer z-10"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
      >
        <ChevronDown size={36} />
      </motion.div>
    </section>
  );
};

export default HeroSection;

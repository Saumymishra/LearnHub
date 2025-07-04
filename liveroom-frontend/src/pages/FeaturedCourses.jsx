// src/components/FeaturedCourses.jsx
import React from 'react';
import { Users, Clock, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCourses = () => {
  const navigate = useNavigate();

  const featuredCourses = [
    { id: 1, title: 'React Fundamentals',  instructor: 'John Doe',  rating: 4.8, students: 1200, duration: '8 weeks' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', rating: 4.9, students: 800,  duration: '12 weeks' },
    { id: 3, title: 'Python for Beginners', instructor: 'Mike Johnson', rating: 4.7, students: 1500, duration: '10 weeks' },
  ];

  return (
    <section className="py-16 min-h-[100vh] bg-gray-50 dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <motion.div
              key={course.id}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 28px rgba(59, 130, 246, 0.25)',
                y: -4,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-600" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">by {course.instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/courses/${course.id}`);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll‑down arrow */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-blue-600 cursor-pointer z-10"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down"
        tabIndex={0}
        onKeyDown={e => {
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

export default FeaturedCourses;

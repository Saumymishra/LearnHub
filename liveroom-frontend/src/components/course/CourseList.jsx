import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion'; // <-- import motion here
import CourseCard from './CourseCard';
import Loading from '../common/Loading';
import htmlCssImg from '../../assets/html.jpeg';
import jsImg from '../../assets/javascript.jpeg';
import reactImg from '../../assets/react.jpeg';

const CourseList = ({ 
  courses = [],
  loading = false,
  onCourseClick,
  onEnroll,
  onContinue,
  showFilters = true,
  showSearch = true,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentViewMode, setCurrentViewMode] = useState(viewMode);

  // Sample categories and levels
  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  // Sample fallback courses when filteredCourses is empty
  const sampleCourses = [
    {
      id: 'sample-1',
      title: 'Intro to HTML & CSS',
      instructor: 'Jane Developer',
      rating: 4.5,
      students: 1200,
      duration: '6 weeks',
      category: 'Programming',
      level: 'Beginner',
      description: 'Learn the basics of web design with HTML and CSS.',
      image: htmlCssImg,
    },
    {
      id: 'sample-2',
      title: 'JavaScript Essentials',
      instructor: 'John Script',
      rating: 4.7,
      students: 950,
      duration: '8 weeks',
      category: 'Programming',
      level: 'Beginner',
      description: 'Master the fundamentals of JavaScript programming.',
      image: jsImg,
    },
    {
      id: 'sample-3',
      title: 'React for Beginners',
      instructor: 'React Ninja',
      rating: 4.8,
      students: 1500,
      duration: '10 weeks',
      category: 'Programming',
      level: 'Intermediate',
      description: 'Build dynamic UIs with React.js.',
      image: reactImg,
    }
  ];

  // Filter and sort courses
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'price' || sortBy === 'rating') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortBy === 'students') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy, sortOrder]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-16">
        <Loading size="large" text="Loading courses..." />
      </div>
    );
  }

  const displayedCourses = filteredCourses.length > 0 ? filteredCourses : sampleCourses;

  return (
    <div className="space-y-6 pb-24"> {/* padding bottom for footer spacing */}
      {(showSearch || showFilters) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4">
            {showSearch && (
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {showFilters && (
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="students">Students</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    aria-label="Toggle sort order"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={currentViewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
      >
        {displayedCourses.map(course => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CourseCard 
              course={course} 
              onClick={() => onCourseClick && onCourseClick(course)} 
              onEnroll={() => onEnroll && onEnroll(course)} 
              onContinue={() => onContinue && onContinue(course)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

import React from 'react';
import { Clock, Users, Star, BookOpen, Play } from 'lucide-react';

const CourseCard = ({ 
  course = {
    id: 1,
    title: 'Complete React Development Course',
    description: 'Learn React from scratch with hands-on projects and real-world applications.',
    instructor: 'John Smith',
    duration: '12 hours',
    students: 1234,
    rating: 4.8,
    reviews: 156,
    price: 99.99,
    image: 'https://via.placeholder.com/300x200?text=Course+Image',
    level: 'Beginner',
    category: 'Programming',
    lessons: 45,
    isEnrolled: false,
    progress: 0
  },
  onEnroll,
  onContinue,
  onClick
}) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    if (onEnroll) {
      onEnroll(course);
    }
  };

  const handleContinueClick = (e) => {
    e.stopPropagation();
    if (onContinue) {
      onContinue(course);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Course Image */}
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-gray-800 bg-opacity-75 text-white text-xs font-medium rounded-full">
            {course.category}
          </span>
        </div>
        {course.isEnrolled && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white bg-opacity-90 rounded-full p-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">
                {course.progress}% Complete
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Instructor */}
        <p className="text-sm text-gray-700 mb-3">
          by <span className="font-medium text-blue-600">{course.instructor}</span>
        </p>

        {/* Course Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
  <Users className="h-4 w-4" />
  <span>{course.students ? course.students.toLocaleString() : '0'}</span>
</div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(course.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {course.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({course.reviews} reviews)
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              ${course.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${(course.price * 1.5).toFixed(2)}
            </span>
          </div>
          
          {course.isEnrolled ? (
            <button
              onClick={handleContinueClick}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Continue</span>
            </button>
          ) : (
            <button
              onClick={handleEnrollClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
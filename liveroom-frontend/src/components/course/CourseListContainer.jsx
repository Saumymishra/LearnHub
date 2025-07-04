// src/components/CourseListContainer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseList from './CourseList';

const CourseListContainer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <CourseList
        courses={courses}
        loading={loading}
        onCourseClick={(course) => console.log('Clicked:', course.title)}
        onEnroll={(course) => console.log('Enrolled in:', course.title)}
        onContinue={(course) => console.log('Continue:', course.title)}
      />
    </div>
  );
};

export default CourseListContainer;

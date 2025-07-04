import React, { useState } from "react";
import VideoPlayer from "../components/course/VideoPlayer"; // adjust path if needed

const sampleCourses = [
  { id: 1, title: "React Fundamentals", progress: 75, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, title: "Advanced JavaScript", progress: 40, videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { id: 3, title: "Python for Beginners", progress: 90, videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
];

const Dashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const totalCourses = sampleCourses.length;
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmarkAdd = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Courses List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">My Courses</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You are enrolled in {totalCourses} courses.</p>
            
            <ul className="space-y-4">
              {sampleCourses.map(course => (
                <li 
                  key={course.id} 
                  className={`cursor-pointer p-2 rounded ${selectedCourse?.id === course.id ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                  onClick={() => {
                    setSelectedCourse(course);
                    setBookmarks([]); // clear bookmarks on course change
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{course.title}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Player + Progress Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 md:col-span-2">
            {selectedCourse ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{selectedCourse.title}</h3>
                <VideoPlayer
                  videoUrl={selectedCourse.videoUrl}
                  title={selectedCourse.title}
                  allowDownload={true}
                  bookmarks={bookmarks}
                  onBookmarkAdd={handleBookmarkAdd}
                />
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Select a course to start watching the video.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

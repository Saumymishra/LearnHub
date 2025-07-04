import React, { useState, useEffect } from "react";
import { FaAward, FaBookOpen, FaClock, FaStar } from "react-icons/fa";

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHours: 0,
    certificates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch enrolled courses and stats from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const [coursesRes, statsRes] = await Promise.all([
          fetch("https://liveroom-backend.onrender.com/api/user/dashboard/enrolled-courses", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch("https://liveroom-backend.onrender.com/api/user/dashboard/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!coursesRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const coursesData = await coursesRes.json();
        const statsData = await statsRes.json();

        setEnrolledCourses(
          coursesData.map((course) => ({
            id: course._id,
            title: course.title,
            progress: course.progress || 0,
            nextLesson: course.nextLesson || "Start Learning",
          }))
        );

        setStats({
          coursesCompleted: statsData.coursesCompleted || 0,
          coursesInProgress: statsData.coursesInProgress || 0,
          totalHours: statsData.totalHours || 0,
          certificates: statsData.certificates || 0,
        });

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "courses"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              My Courses
            </button>
          </div>
        </div>

        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: <FaAward className="h-6 w-6" />,
                label: "Completed",
                value: stats.coursesCompleted,
                color: "green",
              },
              {
                icon: <FaBookOpen className="h-6 w-6" />,
                label: "In Progress",
                value: stats.coursesInProgress,
                color: "blue",
              },
              {
                icon: <FaClock className="h-6 w-6" />,
                label: "Total Hours",
                value: stats.totalHours,
                color: "purple",
              },
              {
                icon: <FaStar className="h-6 w-6" />,
                label: "Certificates",
                value: stats.certificates,
                color: "yellow",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-800`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Courses Section */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.length === 0 ? (
                <p className="text-gray-500">You are not enrolled in any courses yet.</p>
              ) : (
                enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Next: {course.nextLesson}
                    </p>
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                      Continue Learning
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the stored token
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">John Doe</h2>
          <p className="text-gray-600 dark:text-gray-300">john@example.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">About</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Enthusiastic learner and educator. Loves sharing knowledge and collaborating on new ideas.
          </p>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, LogOut } from "lucide-react";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const updateToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("auth", updateToken);
    return () => window.removeEventListener("auth", updateToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileFocus: {
      outline: "none",
      boxShadow: "0 0 10px 3px rgba(59, 130, 246, 0.9)",
    },
    transition: { type: "spring", stiffness: 300 },
    tabIndex: 0,
  };

  const buttonStyle = ({ isActive }) =>
    `px-6 py-2 rounded-full transition duration-300 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "bg-gray-100 text-gray-700 hover:bg-blue-200 hover:text-blue-800"
    }`;

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div>
        <NavLink
          to="/"
          className="flex items-center space-x-2 font-bold text-xl text-blue-600"
        >
          <Brain className="w-7 h-7 text-blue-600" />
          <span>LearnHub</span>
        </NavLink>
      </div>

      <div className="space-x-2 flex items-center">
        <motion.span {...motionProps}>
          <NavLink to="/" className={buttonStyle}>
            Home
          </NavLink>
        </motion.span>

        <motion.span {...motionProps}>
          <NavLink to="/courses" className={buttonStyle}>
            Courses
          </NavLink>
        </motion.span>

        {!token ? (
          <>
            <motion.span {...motionProps}>
              <NavLink to="/login" className={buttonStyle}>
                Login
              </NavLink>
            </motion.span>

            <motion.span {...motionProps}>
              <NavLink to="/register" className={buttonStyle}>
                Register
              </NavLink>
            </motion.span>
          </>
        ) : (
          <>
            <motion.span {...motionProps}>
              <NavLink to="/dashboard" className={buttonStyle}>
                Dashboard
              </NavLink>
            </motion.span>

            <motion.span {...motionProps}>
              <NavLink to="/upload" className={buttonStyle}>
                Upload
              </NavLink>
            </motion.span>

            {/* Logout Icon Button */}
            <motion.button
              {...motionProps}
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-300 flex items-center justify-center"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

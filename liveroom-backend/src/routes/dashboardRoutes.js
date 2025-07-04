const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const {
  getEnrolledCourses,
  getUserStats
} = require('../controllers/dashboardController');

// /api/user/dashboard/enrolled-courses
router.get('/enrolled-courses', protect, getEnrolledCourses);

// /api/user/dashboard/stats
router.get('/stats', protect, getUserStats);

module.exports = router;

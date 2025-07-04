const Enrollment = require('../models/Enrollment');

/**
 * GET /api/user/dashboard/enrolled-courses
 * Returns all courses the logged‑in user is enrolled in
 */
const getEnrolledCourses = async (req, res) => {
  const enrollments = await Enrollment
    .find({ user: req.user._id })
    .populate('course', 'title');           // only pull course title

  const data = enrollments.map(en => ({
    _id:        en.course._id,
    title:      en.course.title,
    progress:   en.progress,
    nextLesson: en.nextLesson
  }));

  res.json(data);
};

/**
 * GET /api/user/dashboard/stats
 * Returns aggregate stats for the logged‑in user
 */
const getUserStats = async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id });

  const coursesCompleted   = enrollments.filter(e =>  e.completed).length;
  const coursesInProgress  = enrollments.filter(e => !e.completed).length;
  const totalHours         = enrollments.reduce((sum, e) => sum + (e.totalHours || 0), 0);
  const certificates       = enrollments.filter(e => e.certificate).length;

  res.json({ coursesCompleted, coursesInProgress, totalHours, certificates });
};

module.exports = { getEnrolledCourses, getUserStats };

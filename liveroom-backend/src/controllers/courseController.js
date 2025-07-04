const Course = require('../models/Course');

// Upload course video (with validation and saving media blob)
const uploadCourseVideo = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // 15 MB limit
    if (req.file.size > 15 * 1024 * 1024) {
      return res.status(400).json({ message: 'File too large. Max 15 MB allowed.' });
    }

    course.media = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      fileName: req.file.originalname,
    };

    await course.save();

    res.status(200).json({ message: 'Course video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading course video:', error);
    res.status(500).json({ message: 'Server error while uploading video' });
  }
};

const { uploadTranscriptAndGenerateAI } = require('./aiController'); // if in a separate file

module.exports = {
  uploadCourseVideo,
  uploadTranscriptAndGenerateAI, // if in same file, or re-exported
};

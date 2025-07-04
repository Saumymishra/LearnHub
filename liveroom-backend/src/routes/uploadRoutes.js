// routes/courseMediaUpload.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');       // multer setup
const { protect } = require('../middleware/auth');    // auth middleware
const Course = require('../models/courses');          // your Course model

// Upload media file to course by course ID
router.post('/:id/upload', protect, upload.single('file'), async (req, res) => {
  try {
    console.log('Uploading media for course ID:', req.params.id);

    // Find course by ID
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Optional: Check file size limit (15 MB)
    if (req.file.size > 15 * 1024 * 1024) {
      return res.status(400).json({ message: 'File too large. Max 15 MB allowed.' });
    }

    console.log('Received file:', req.file.originalname, 'size:', req.file.size);

    // Update course media
    course.media = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      fileName: req.file.originalname,
    };

    // Save course
    await course.save();
    console.log('Media saved successfully');

    res.status(200).json({ message: 'Media uploaded to course successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error while uploading media' });
  }
});

module.exports = router;

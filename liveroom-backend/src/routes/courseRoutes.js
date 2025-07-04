// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const Course = require('../models/courses');  // <-- make sure this matches your filename exactly

// CREATE a course
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: 'Description must be a string' });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    const course = await Course.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Server error while creating course', error: err.message });
  }
});

// LIST all courses
router.get('/', async (_req, res) => {
  try {
    const courses = await Course.find().select('-media.data');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error while listing courses' });
  }
});

// GET a single course metadata only
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('-media.data');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Server error while fetching course' });
  }
});

// UPLOAD media to a course (blob storage)
router.post('/:id/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    // 15 MB max file size guard
    if (req.file.size > 15 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: 'File too large. Max 15 MB allowed.' });
    }

    course.media = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      fileName: req.file.originalname,
    };

    await course.save();
    res.status(200).json({ message: 'Media uploaded to course' });
  } catch (err) {
    console.error('Error uploading media:', err);
    res.status(500).json({ message: 'Server error while uploading media' });
  }
});

// STREAM media inline
router.get('/:id/stream', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.media || !course.media.data) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.set({
      'Content-Type': course.media.contentType,
      'Content-Disposition': `inline; filename="${course.media.fileName}"`,
    });

    res.send(course.media.data);
  } catch (err) {
    console.error('Error streaming media:', err);
    res.status(500).json({ message: 'Server error while streaming media' });
  }
});

// DOWNLOAD media as attachment
router.get('/:id/download', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.media || !course.media.data) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.set({
      'Content-Type': course.media.contentType,
      'Content-Disposition': `attachment; filename="${course.media.fileName}"`,
    });

    res.send(course.media.data);
  } catch (err) {
    console.error('Error downloading media:', err);
    res.status(500).json({ message: 'Server error while downloading media' });
  }
});

module.exports = router;

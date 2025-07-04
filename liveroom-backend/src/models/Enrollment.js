const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },

    // learning progress fields
    progress:   { type: Number, default: 0 },         // 0–100 %
    nextLesson: { type: String, default: 'Start Lesson 1' },

    // helpful for stats
    completed:   { type: Boolean, default: false },
    totalHours:  { type: Number, default: 0 },        // hours spent on course
    certificate: { type: Boolean, default: false }    // did we issue a cert?
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);

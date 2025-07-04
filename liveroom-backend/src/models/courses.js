const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  media: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  transcript: String,
  summary: String,
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

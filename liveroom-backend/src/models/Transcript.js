const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  videoUrl: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transcript', transcriptSchema);

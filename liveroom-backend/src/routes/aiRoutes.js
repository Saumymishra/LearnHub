const express = require('express');
const router = express.Router();
const {
  generateSummaryFromTranscript,
  generateQuizFromTranscript,
} = require('../controllers/aiController');

router.post('/summary', generateSummaryFromTranscript);
router.post('/quiz', generateQuizFromTranscript);

module.exports = router;

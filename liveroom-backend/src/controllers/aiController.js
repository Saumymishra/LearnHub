const { generateWithOpenAI } = require('../services/openaiService');

const generateSummaryFromTranscript = async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' });
    }
    const summaryPrompt = `Summarize the following transcript:\n\n${transcript}`;
    const summary = await generateWithOpenAI(summaryPrompt);
    res.json({ summary });
  } catch (error) {
    console.error('OpenAI summary error:', error);
    res.status(500).json({ message: 'Failed to generate summary', error: error.message });
  }
};

const generateQuizFromTranscript = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    const quiz = await generateWithOpenAI(prompt);
    res.json({ quiz });
  } catch (err) {
    console.error('OpenAI quiz error:', err);
    res.status(500).json({ message: 'Failed to generate quiz', error: err.message });
  }
};

module.exports = {
  generateSummaryFromTranscript,
  generateQuizFromTranscript,
};

const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Example Gemini usage
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateWithGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

const generateSummary = async (transcript) => {
  const prompt = `Summarize this course transcript into key bullet points:\n\n${transcript}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-4o'
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  return res.choices[0].message.content.trim();
};

const generateQuiz = async (transcript) => {
  const prompt = `
Create 3 multiple-choice questions based on this transcript:

"${transcript}"

Respond ONLY with valid JSON in this exact structure:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "string"
    }
  ]
}
  `;

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-4o'
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.6,
  });

  try {
    return JSON.parse(res.choices[0].message.content);
  } catch (err) {
    console.error('Failed to parse quiz JSON:', err, 'Response:', res.choices[0].message.content);
    throw new Error('Failed to parse quiz JSON from OpenAI response');
  }
};

async function generateWithOpenAI(prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-4o' if you have access
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 1024,
  });
  return response.choices[0].message.content.trim();
}

module.exports = {
  generateSummary,
  generateQuiz,
  generateWithOpenAI,
};

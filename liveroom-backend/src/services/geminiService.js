const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateWithGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent([prompt]);
  if (
    result &&
    result.response &&
    result.response.candidates &&
    result.response.candidates[0] &&
    result.response.candidates[0].content &&
    result.response.candidates[0].content.parts &&
    result.response.candidates[0].content.parts[0] &&
    result.response.candidates[0].content.parts[0].text
  ) {
    return result.response.candidates[0].content.parts[0].text;
  } else {
    throw new Error('Gemini API did not return expected response structure');
  }
}

module.exports = { generateWithGemini };
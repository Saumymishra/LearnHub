const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const generateTranscript = async (filePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('model', 'whisper-1');

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  return response.data.text;
};

module.exports = { generateTranscript };

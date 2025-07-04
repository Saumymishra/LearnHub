const path = require('path');
const fs = require('fs');

const saveFile = (file) => {
  // Example: save file to uploads folder
  const uploadPath = path.join(__dirname, '../uploads', file.originalname);
  fs.writeFileSync(uploadPath, file.buffer);
  return uploadPath;
};

module.exports = { saveFile };

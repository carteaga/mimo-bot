const fs = require('fs');
const path = require('path');

const getFilesInFolder = (folderPath) => {
  const normalizedPath = path.join(__dirname, '..', folderPath);

  return fs.readdirSync(normalizedPath).map((file) => {
    const [name] = file.split('.');
    return { file, name };
  });
};

module.exports = getFilesInFolder;

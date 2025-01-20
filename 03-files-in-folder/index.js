const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  files.forEach((file) => {
    const fileStats = fs.statSync(path.join(filePath, file));
    if (fileStats.isFile()) {
      const fileName = path.parse(file).name;
      const fileExtension = path.parse(file).ext.slice(1);
      const fileSize = (fileStats.size / 1024).toFixed(3) + 'kb';
      console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
    }
  });
});

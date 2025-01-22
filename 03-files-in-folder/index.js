const path = require('path');
const fs = require('fs').promises;
const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath)
  .then((files) => {
    files.forEach((file) => {
      fs.stat(path.join(filePath, file))
        .then((fileStats) => {
          if (fileStats.isFile()) {
            const fileName = path.parse(file).name;
            const fileExtension = path.parse(file).ext.slice(1);
            const fileSize = (fileStats.size / 1024).toFixed(3) + 'kb';

            console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

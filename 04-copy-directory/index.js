const fs = require('fs').promises;
const path = require('path');
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const srcFiles = await fs.readdir(srcDir);
    const destFiles = await fs.readdir(destDir);

    for (const file of destFiles) {
      if (!srcFiles.includes(file)) {
        await fs.unlink(path.join(destDir, file));
      }
    }

    for (const file of srcFiles) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      const stats = await fs.stat(srcFile);

      if (stats.isFile()) {
        await fs.copyFile(srcFile, destFile);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();

const fs = require('fs').promises;
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundleFile = path.join(distDir, 'bundle.css');

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesDir);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    const styles = await Promise.all(
      cssFiles.map((file) => {
        const filePath = path.join(stylesDir, file);
        return fs.readFile(filePath, 'utf8');
      }),
    );

    await fs.writeFile(bundleFile, styles.join('\n'));
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();

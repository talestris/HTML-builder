const fs = require('fs').promises;
const path = require('path');

const templateFile = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');
const indexFile = path.join(distDir, 'index.html');
const styleFile = path.join(distDir, 'style.css');

async function buildPage() {
  try {
    await fs.mkdir(distDir, { recursive: true });
    let template = await fs.readFile(templateFile, 'utf-8');
    const tags = template.match(/{{(.*?)}}/g);

    for (const tag of tags) {
      const componentName = tag.replace(/{{|}}/g, '');
      const componentFile = path.join(componentsDir, `${componentName}.html`);
      const componentContent = await fs.readFile(componentFile, 'utf-8');
      template = template.replace(tag, componentContent);
    }

    await fs.writeFile(indexFile, template);

    const styles = await fs.readdir(stylesDir);
    const styleContent = await Promise.all(
      styles.map((style) => {
        const styleFile = path.join(stylesDir, style);
        return fs.readFile(styleFile, 'utf-8');
      }),
    );
    await fs.writeFile(styleFile, styleContent.join('\n'));

    await copyDir(assetsDir, path.join(distDir, 'assets'));
  } catch (err) {
    console.error(err);
  }
}

async function copyDir(srcDir, destDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      const stats = await fs.stat(srcFile);
      if (stats.isFile()) {
        await fs.copyFile(srcFile, destFile);
      } else if (stats.isDirectory()) {
        await copyDir(srcFile, destFile);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

buildPage();

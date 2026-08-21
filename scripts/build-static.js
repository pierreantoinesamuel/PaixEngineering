const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const entries = [
  'index.html',
  'about.html',
  'contact.html',
  'consultation.html',
  'privacy.html',
  'process.html',
  'services.html',
  'terms.html',
  'styles.css',
  'script.js',
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of entries) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, file));
  }
}

const assetDirs = ['assets'];
for (const dir of assetDirs) {
  const srcDir = path.join(root, dir);
  const destDir = path.join(dist, dir);
  if (!fs.existsSync(srcDir)) continue;

  fs.mkdirSync(destDir, { recursive: true });
  copyDir(srcDir, destDir);
}

function copyDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log(`Built static site into ${path.relative(root, dist)}`);

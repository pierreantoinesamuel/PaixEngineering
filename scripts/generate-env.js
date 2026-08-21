const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const outputPath = path.join(root, 'assets', 'env.js');

const parseEnv = (content) => {
  const values = {};

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separator = trimmed.indexOf('=');
    if (separator === -1) return;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  });

  return values;
};

const env = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {};
const publicConfig = {
  CALENDLY_URL: env.CALENDLY_URL || '',
};

fs.writeFileSync(
  outputPath,
  `window.PAIX_CONFIG = ${JSON.stringify(publicConfig, null, 2)};\n`,
);

console.log(`Wrote ${path.relative(root, outputPath)}`);

import fs from 'fs';
import path from 'path';

const outputFile = path.resolve('src/icons.json');
const outlinedIconsDir = path.resolve('node_modules/@material-symbols/svg-400/outlined');
const files = fs.readdirSync(outlinedIconsDir).filter(file => file.endsWith('.svg'));
const icons = {};

for (const filename of files) {
    const nameWithoutExt = filename.replace('.svg', '');
    const identifier = nameWithoutExt.replace(/-/g, '_');
    const filePath = path.join(outlinedIconsDir, filename);

    icons[identifier] = fs.readFileSync(filePath, 'utf-8');
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(icons), 'utf-8');

console.info(`⚡️ Generated ${ outputFile } with ${ files.length } icons ⚡️`);

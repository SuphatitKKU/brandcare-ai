import {cp, mkdir, readdir, rm, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
// The output is always the dist directory within this project.
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Unexpected build output directory');
}
await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
let files = 0;

async function copyFiles(relative = '') {
  for (const entry of await readdir(path.join(root, relative), {withFileTypes: true})) {
    const source = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      if (!relative && !['assets', 'shared'].includes(entry.name)) continue;
      await copyFiles(source);
      continue;
    }
    if (!entry.isFile()) continue;
    const allowed = relative
      ? /\.(css|js|woff2?|png|jpe?g|svg|webp|avif|gif|ico)$/i.test(entry.name)
      : entry.name === 'index.html' || /\.(css|js)$/.test(entry.name);
    if (!allowed) continue;
    const destination = path.join(output, source);
    await mkdir(path.dirname(destination), {recursive: true});
    await cp(path.join(root, source), destination);
    files++;
  }
}

await copyFiles();
await stat(path.join(output, 'index.html'));
console.log(`Built ${files} public website files in dist/`);

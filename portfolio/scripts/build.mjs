import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage, notFoundPage, projectPage, projectsList } from '../src/render.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

async function writePage(relativePath, html) {
  const target = join(dist, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

export async function build() {
  await rm(dist, { recursive: true, force: true });
  await cp(join(root, 'public'), dist, { recursive: true });

  const pages = [
    ['index.html', homePage('vi')],
    ['en/index.html', homePage('en')],
    ['404.html', notFoundPage('vi')]
  ];

  for (const lang of ['vi', 'en']) {
    const prefix = lang === 'en' ? 'en/' : '';
    for (const project of projectsList) {
      pages.push([`${prefix}work/${project.slug}/index.html`, projectPage(lang, project.slug)]);
    }
  }

  for (const [path, html] of pages) await writePage(path, html);
  await writeFile(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  return pages.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = await build();
  console.log(`Built ${count} static pages → portfolio/dist`);
}

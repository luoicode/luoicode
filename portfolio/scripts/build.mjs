import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { content, homePage, projectPage, notFoundPage } from '../src/render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
export async function build() {
  await mkdir(dist, { recursive: true });
  await cp(resolve(root, 'public'), dist, { recursive: true });
  const pages = [];
  for (const lang of ['vi', 'en']) {
    const prefix = lang === 'en' ? 'en/' : '';
    pages.push([`${prefix}index.html`, homePage(lang)]);
    for (const project of content[lang].projects) pages.push([`${prefix}work/${project.slug}/index.html`, projectPage(lang, project.slug)]);
  }
  pages.push(['404.html', notFoundPage()]);
  for (const [path, html] of pages) {
    const destination = resolve(dist, path);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html);
  }
  await writeFile(resolve(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  console.log(`Built ${pages.length} static pages → portfolio/dist`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await rm(dist, { recursive: true, force: true });
  await build();
}

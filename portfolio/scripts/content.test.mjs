import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { content, homePage, projectPage, notFoundPage, route, escape } from '../src/render.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
test('both languages retain the four real projects with stable counterpart routes', () => {
  assert.deepEqual(content.vi.projects.map(p=>p.slug), ['dasshu','vnb-global','vibio','miz-workspace']);
  assert.deepEqual(content.en.projects.map(p=>p.slug),content.vi.projects.map(p=>p.slug));
  for(const lang of ['vi','en']) {
    const html=homePage(lang);
    assert.match(html,new RegExp(`<html lang="${lang}">`));
    for(const p of content[lang].projects) assert.ok(html.includes(`href="${route(lang,p.slug)}"`));
    assert.equal((html.match(/data-category=/g)||[]).length,4);
  }
});
test('every published media reference is self-hosted and exists', async () => {
  for(const lang of ['vi','en']) {
    for(const project of content[lang].projects) assert.ok(content[lang].media.some(m=>m.id===project.coverId));
    for(const media of content[lang].media) {
      assert.match(media.url,/^\/media\/[a-z0-9-]+\.(webp|jpg)$/);
      await access(resolve(root,'public',media.url.slice(1)));
    }
  }
});
test('English pages display the same real covers as their Vietnamese counterparts', () => {
  const home = homePage('en');
  for (const project of content.vi.projects) {
    const cover = content.vi.media.find(media => media.id === project.coverId);
    assert.ok(home.includes(`src="${cover.url}"`));
    assert.ok(projectPage('en', project.slug).includes(`src="${cover.url}"`));
  }
});
test('project pages include real narratives and do not invent unverified results', () => {
  for(const lang of ['vi','en']) for(const p of content[lang].projects) {
    const html=projectPage(lang,p.slug);
    assert.ok(html.includes(escape(p.overview)));
    assert.ok(html.includes(`href="${route(lang==='vi'?'en':'vi',p.slug)}"`));
    assert.ok(html.includes('class="next-project shell"'));
    if(!p.resultsVerified) assert.ok(!html.includes(`<h2>${escape(content[lang].settings.copy.caseResults)}</h2>`));
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  }
});
test('the published CV, email, and phone are preserved in both languages', () => {
  for(const lang of ['vi','en']) {
    const html=homePage(lang);
    assert.ok(html.includes('mailto:huyhn045@gmail.com'));
    assert.ok(html.includes('tel:0966962608'));
    assert.ok(html.includes('export?format=pdf'));
    assert.ok(html.includes('rel="noopener noreferrer"'));
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  }
});
test('content is escaped before being inserted into HTML', () => {
  assert.equal(escape('<script>"x" & \'y\'</script>'),'&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;');
  const original=content.vi.projects[0].summary;
  try {
    content.vi.projects[0].summary='<img src=x onerror="alert(1)">';
    assert.ok(!projectPage('vi','dasshu').includes('<img src=x'));
    assert.ok(projectPage('vi','dasshu').includes('&lt;img src=x'));
  } finally {content.vi.projects[0].summary=original;}
});
test('missing projects render a noindex recovery page', () => {
  const html=projectPage('vi','does-not-exist');
  assert.equal(html,notFoundPage('vi'));
  assert.ok(html.includes('<meta name="robots" content="noindex">'));
  assert.ok(html.includes('href="/"'));
});
test('navigation and metadata work without client JavaScript', async () => {
  for(const lang of ['vi','en']) {
    const html=homePage(lang);
    for(const id of ['main','work','about','contact']) assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes('hreflang="vi"'));
    assert.ok(html.includes('hreflang="en"'));
    assert.ok(html.includes('class="skip-link"'));
  }
  const headers=await readFile(resolve(root,'public/_headers'),'utf8');
  assert.ok(headers.includes("script-src 'self'"));
  assert.ok(headers.includes("frame-ancestors 'none'"));
});

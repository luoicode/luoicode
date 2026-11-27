import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { content, escape, homePage, notFoundPage, projectPage, projectsList, route } from '../src/render.mjs';
import { skillGroups, filterList } from '../src/data/upgrade.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

describe('upgraded portfolio positioning & expertise', () => {
  it('renders upgraded positioning and tagline in both languages', () => {
    for (const lang of ['vi', 'en']) {
      const html = homePage(lang);
      assert.match(html, /Performance Marketing Specialist | AI &amp; Automation Builder/);
      assert.match(html, /Marketing with data. Creativity with purpose. Technology that scales./);
    }
  });

  it('organizes skills into 5 structured groups without percentage bars', () => {
    for (const lang of ['vi', 'en']) {
      assert.equal(skillGroups[lang].length, 5);
      const html = homePage(lang);
      assert.doesNotMatch(html, /90%|85%|70%/);
      for (const group of skillGroups[lang]) {
        assert.ok(html.includes(escape(group.title)), `Missing skill group: ${group.title}`);
      }
    }
  });

  it('preserves Dasshu and VNB Global in experience without duplicating them in upgraded projects', () => {
    for (const lang of ['vi', 'en']) {
      const html = homePage(lang);
      assert.match(html, /Dasshu/);
      assert.match(html, /VNB Global/);
    }
    assert.ok(!projectsList.some(p => p.slug === 'dasshu' || p.slug === 'vnb-global'));
    assert.ok(!projectsList.some(p => p.slug === 'ex-download'), 'Unverified Ex-Download must not be published');
  });
});

describe('7 flagship projects & bilingual case studies', () => {
  it('publishes the 7 selected projects in exact order with 6 filters', () => {
    assert.equal(filterList.length, 6);
    assert.deepEqual(
      projectsList.map(p => p.slug),
      [
        'vibio', 'katakill-thailand', 'ai-creative-film-studio', 'fb-browser-post-tool',
        'koc-finder-local', 'miz-workspace', 'huy-os'
      ]
    );
  });

  it('renders all 7 case studies in VI and EN with local media and zero invented metrics', () => {
    for (const p of projectsList) {
      assert.ok(existsSync(join(publicDir, p.cover.replace(/^\//, ''))), `Missing cover asset: ${p.cover}`);
      for (const lang of ['vi', 'en']) {
        const html = projectPage(lang, p.slug);
        assert.ok(html.includes(escape(p[lang].name)));
        assert.ok(html.includes(escape(p[lang].subtitle)));
        assert.ok(html.includes(route(lang === 'vi' ? 'en' : 'vi', p.slug)));
        assert.match(html, /lightbox-trigger/);
      }
    }
  });

  it('preserves contact links, international phone dialing, CV PDF export, and security headers', () => {
    const html = homePage('vi');
    assert.match(html, /mailto:huyhn045@gmail\.com/);
    assert.match(html, /tel:\+84966962608/);
    assert.match(html, /export\?format=pdf/);
    assert.match(notFoundPage('vi'), /<meta name="robots" content="noindex">/);
    const headers = readFileSync(join(publicDir, '_headers'), 'utf8');
    assert.match(headers, /Content-Security-Policy/);
    assert.match(headers, /frame-ancestors 'none'/);
  });

  it('escapes HTML safely', () => {
    assert.equal(escape('<script>"&\'' + '</script>'), '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;');
  });
});

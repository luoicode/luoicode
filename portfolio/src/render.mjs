import vi from './content/vi.json' with { type: 'json' };
import en from './content/en.json' with { type: 'json' };

// The old English endpoint omits shared media. Reuse the published assets,
// keeping only text localized rather than dropping every English cover.
export const content = {
  vi,
  en: {
    ...en,
    media: vi.media,
    projects: en.projects.map(project => ({
      ...project,
      coverId: project.coverId || vi.projects.find(shared => shared.slug === project.slug)?.coverId || ''
    }))
  }
};

export const escape = (value = '') =>
  String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const e = escape;

const arrowUpRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const arrowRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const sunIcon = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const moonIcon = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';

const portrait = '/media/b711c802-4f85-41ed-8f5b-bb58867ab1c4.webp';

const copy = {
  vi: {
    work: 'Dự án', about: 'Về tôi', expertise: 'Chuyên môn', process: 'Quy trình', contactCta: 'Liên hệ',
    menu: 'Mở menu', close: 'Đóng menu', skip: 'Đến nội dung chính',
    hero1: 'Tư duy sáng tạo.', hero2: 'Hiệu quả thực tế.', view: 'Xem dự án', cv: 'Tải CV',
    selected: 'Dự án tiêu biểu', workHeading: 'Ý tưởng có mục đích, nội dung tạo tác động.',
    workIntro: 'Những dự án tôi trực tiếp nghiên cứu khách hàng, phát triển thông điệp và triển khai quảng cáo.',
    all: 'Tất cả', detail: 'Chi tiết', showing: 'dự án',
    aboutLabel: 'Về tôi', aboutHeading: 'Xin chào, mình là Huy.', journey: 'Kinh nghiệm làm việc',
    expertiseLabel: 'Chuyên môn', expertiseHeading: 'Sáng tạo từ bản năng, chiến lược từ tư duy.',
    processLabel: 'Quy trình', processHeading: 'Bắt đầu từ tò mò, tiến bước bằng quy trình.',
    contactLabel: 'Liên hệ', contactEmailLabel: 'Email', contactPhoneLabel: 'Điện thoại / Zalo',
    contactCvLabel: 'Hồ sơ năng lực', contactCvVal: 'Tải bản CV (PDF)', copyBtn: 'Sao chép', copiedBtn: 'Đã chép',
    back: 'Đầu trang', home: 'Tất cả dự án', role: 'Vai trò', industry: 'Lĩnh vực', period: 'Thời gian',
    next: 'Dự án tiếp theo', notFound: 'Không tìm thấy trang',
    notFoundBody: 'Đường dẫn này không tồn tại hoặc đã thay đổi. Quay về trang chủ để xem toàn bộ dự án.',
    goHome: 'Về trang chủ', light: 'Chuyển giao diện sáng', dark: 'Chuyển giao diện tối'
  },
  en: {
    work: 'Work', about: 'About', expertise: 'Capabilities', process: 'Process', contactCta: 'Contact',
    menu: 'Open menu', close: 'Close menu', skip: 'Skip to content',
    hero1: 'Creative thinking.', hero2: 'Real-world impact.', view: 'View work', cv: 'Download CV',
    selected: 'Selected Work', workHeading: 'Ideas with purpose, content that converts.',
    workIntro: 'Selected campaigns where I led audience research, messaging, creative production, and performance execution.',
    all: 'All', detail: 'Case study', showing: 'projects',
    aboutLabel: 'About', aboutHeading: 'Hey there, I’m Huy.', journey: 'Experience',
    expertiseLabel: 'Capabilities', expertiseHeading: 'Instinctive creativity, strategic execution.',
    processLabel: 'Process', processHeading: 'Driven by curiosity, built on process.',
    contactLabel: 'Contact', contactEmailLabel: 'Email', contactPhoneLabel: 'Phone / Zalo',
    contactCvLabel: 'Resume', contactCvVal: 'Download CV (PDF)', copyBtn: 'Copy', copiedBtn: 'Copied',
    back: 'Top', home: 'All projects', role: 'Role', industry: 'Industry', period: 'Timeline',
    next: 'Next project', notFound: 'Page not found',
    notFoundBody: 'This route does not exist or may have moved. Head back to the homepage to explore all projects.',
    goHome: 'Back to home', light: 'Switch to light theme', dark: 'Switch to dark theme'
  }
};

const num = n => String(n).padStart(2, '0');
export const route = (lang, slug) => (lang === 'en' ? '/en' : '') + (slug ? '/work/' + slug + '/' : '/');
const cv = url => url.replace(/\/edit(?:\?.*)?$/, '/export?format=pdf');
const media = (data, id) => data.media.find(m => m.id === id);
const formatTel = phone => phone.replace(/\s+/g, '').replace(/^0/, '+84');

function sectionHead(index, label, title, intro) {
  return `<div class="section-head">
    <div class="section-kicker"><span>${index}</span><span>${e(label)}</span></div>
    <div class="section-head-row">
      <h2>${e(title)}</h2>
      ${intro ? '<p class="section-intro">' + e(intro) + '</p>' : ''}
    </div>
  </div>`;
}

function header(lang, activeProject) {
  const t = copy[lang];
  const home = route(lang);
  const languageLink = other => route(other, activeProject?.slug);
  return `<a href="#main" class="skip-link">${t.skip}</a>
<header class="header">
  <div class="shell header-inner">
    <a class="wordmark" href="${home}">Nguyễn Hữu Huy</a>
    <nav id="navigation" class="navigation" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}">
      <a href="${home}#work">${t.work}</a>
      <a href="${home}#about">${t.about}</a>
      <a href="${home}#expertise">${t.expertise}</a>
      <a href="${home}#process">${t.process}</a>
      <a class="mobile-contact" href="${home}#contact">${t.contactCta}</a>
    </nav>
    <div class="header-tools">
      <div class="languages" role="group" aria-label="${lang === 'vi' ? 'Ngôn ngữ' : 'Language'}">
        <a href="${languageLink('vi')}" lang="vi" ${lang === 'vi' ? 'aria-current="page"' : ''}>VI</a>
        <span class="lang-sep" aria-hidden="true">/</span>
        <a href="${languageLink('en')}" lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
      </div>
      <button class="theme-toggle" type="button" aria-label="${t.dark}" data-light="${t.light}" data-dark="${t.dark}" aria-pressed="false">${moonIcon}${sunIcon}</button>
      <a class="btn btn-solid btn-sm header-contact" href="${home}#contact">${t.contactCta}</a>
      <button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false" aria-label="${t.menu}" data-open="${t.menu}" data-close="${t.close}"><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer(lang) {
  const t = copy[lang];
  const s = content[lang].settings;
  const telHref = formatTel(s.phone);
  return `<footer id="contact" class="contact-section">
  <div class="shell">
    <div class="contact-head">
      <div class="section-kicker"><span>05</span><span>${t.contactLabel}</span></div>
      <div class="status-line"><i aria-hidden="true"></i>${e(s.availability)}</div>
    </div>
    <h2 class="contact-title">${e(s.contactHeadline)}</h2>
    <div class="contact-grid">
      <div class="contact-item">
        <span class="contact-label">${t.contactEmailLabel}</span>
        <div class="contact-row">
          <a class="contact-value" href="mailto:${e(s.email)}">${e(s.email)}</a>
          <button type="button" class="copy-chip" data-copy="${e(s.email)}" data-label="${t.copyBtn}" data-copied="${t.copiedBtn}">${t.copyBtn}</button>
        </div>
      </div>
      <a class="contact-item contact-link" href="tel:${e(telHref)}">
        <span class="contact-label">${t.contactPhoneLabel}</span>
        <div class="contact-row">
          <span class="contact-value">${e(s.phone)}</span>
          ${arrowUpRight}
        </div>
      </a>
      <a class="contact-item contact-link" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">
        <span class="contact-label">${t.contactCvLabel}</span>
        <div class="contact-row">
          <span class="contact-value">${t.contactCvVal}</span>
          ${arrowUpRight}
        </div>
      </a>
    </div>
    <div class="footer-bar">
      <span>© ${new Date().getUTCFullYear()} ${e(s.name)}</span>
      <span>${e(s.footer)}</span>
      <a class="back-top" href="#top">${t.back} ↑</a>
    </div>
  </div>
</footer>`;
}

function projectCard(p, i, lang) {
  const d = content[lang];
  const t = copy[lang];
  const cover = media(d, p.coverId);
  return `<article class="project" data-category="${e(p.category)}">
    <a class="project-stage" href="${route(lang, p.slug)}" aria-label="${t.detail}: ${e(p.name)}">
      <div class="stage-media">
        ${cover ? '<img src="' + e(cover.url) + '" alt="' + e(cover.alt || p.name) + '" width="800" height="800" loading="lazy" decoding="async">' : '<span>' + e(p.name) + '</span>'}
      </div>
    </a>
    <div class="project-body">
      <div class="project-meta">
        <span>${num(i + 1)}</span>
        <span>${e(p.category)}</span>
        <span>${e(p.period)}</span>
      </div>
      <div class="project-title-row">
        <h3><a href="${route(lang, p.slug)}">${e(p.name)}</a></h3>
        <a class="project-arrow" href="${route(lang, p.slug)}" aria-label="${t.detail}: ${e(p.name)}">${arrowUpRight}</a>
      </div>
      <p class="project-role">${e(p.role)}</p>
      <p class="project-summary">${e(p.summary)}</p>
      <p class="project-tags">${p.tags.map(tag => e(tag)).join(' · ')}</p>
    </div>
  </article>`;
}

export function homePage(lang) {
  const d = content[lang];
  const s = d.settings;
  const t = copy[lang];
  const categories = [...new Set(d.projects.map(p => p.category))];
  const body = `<main id="main">
  <section class="hero shell">
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="status-line"><i aria-hidden="true"></i>${e(s.availability)} — ${e(s.location)}</div>
        <h1>${t.hero1}<br><span class="h1-sub">${t.hero2}</span></h1>
        <p class="hero-intro">${e(s.intro)}</p>
        <div class="hero-actions">
          <a class="btn btn-solid" href="#work">${t.view}${arrowRight}</a>
          <a class="btn btn-outline" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">${t.cv}${arrowUpRight}</a>
        </div>
      </div>
      <figure class="hero-portrait">
        <div class="portrait-frame">
          <img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" fetchpriority="high">
        </div>
        <figcaption><strong>${e(s.name)}</strong><span>${e(s.title)}</span></figcaption>
      </figure>
    </div>
  </section>
  <section id="work" class="section shell">
    ${sectionHead('01', t.selected, t.workHeading, t.workIntro)}
    <div class="work-toolbar">
      <div class="filters" role="group" aria-label="${lang === 'vi' ? 'Lọc dự án' : 'Filter projects'}">
        <button type="button" class="filter active" data-filter="all" aria-pressed="true">${t.all} (${d.projects.length})</button>
        ${categories.map(c => '<button type="button" class="filter" data-filter="' + e(c) + '" aria-pressed="false">' + e(c) + '</button>').join('')}
      </div>
      <span class="work-count" aria-live="polite" data-suffix="${t.showing}">${num(d.projects.length)} ${t.showing}</span>
    </div>
    <div class="project-grid">
      ${d.projects.map((p, i) => projectCard(p, i, lang)).join('')}
    </div>
  </section>
  <section id="about" class="section shell">
    ${sectionHead('02', t.aboutLabel, t.aboutHeading, '')}
    <div class="about-grid">
      <div class="about-bio">
        <p class="about-text">${e(s.about)}</p>
        <dl class="about-facts">
          <div><dt>${lang === 'vi' ? 'Địa điểm' : 'Location'}</dt><dd>${e(s.location)}</dd></div>
          <div><dt>${lang === 'vi' ? 'Thị trường' : 'Markets'}</dt><dd>${lang === 'vi' ? 'Việt Nam, Philippines' : 'Vietnam, Philippines'}</dd></div>
          <div><dt>${lang === 'vi' ? 'Trọng tâm' : 'Focus'}</dt><dd>${e(s.title)}</dd></div>
        </dl>
      </div>
      <div class="experience-wrap">
        <p class="sub-label">${t.journey}</p>
        <div class="experience-list">
          ${s.experience.map((x, idx) => '<details class="experience-item" ' + (idx === 0 ? 'open' : '') + '><summary><div class="exp-main"><strong>' + e(x.company) + '</strong><span>' + e(x.role) + '</span></div><span class="exp-period">' + e(x.period) + '</span><span class="plus" aria-hidden="true">+</span></summary><p>' + e(x.description) + '</p></details>').join('')}
        </div>
      </div>
    </div>
  </section>
  <section id="expertise" class="section shell">
    ${sectionHead('03', t.expertiseLabel, t.expertiseHeading, '')}
    <div class="skills-grid">
      ${s.skills.map((skill, i) => '<div class="skill-cell"><span>' + num(i + 1) + '</span><h3>' + e(skill) + '</h3></div>').join('')}
    </div>
  </section>
  <section id="process" class="section shell">
    ${sectionHead('04', t.processLabel, t.processHeading, '')}
    <div class="process-grid">
      ${s.process.map((step, i) => '<article class="process-cell"><span>' + num(i + 1) + '</span><h3>' + e(step.name) + '</h3><p>' + e(step.description) + '</p></article>').join('')}
    </div>
  </section>
</main>`;
  return documentPage(lang, body);
}

function paragraphs(value) {
  return value.split('\n').filter(Boolean).map(line => (line.startsWith('- ') ? '<p class="bullet">' + e(line.slice(2)) + '</p>' : '<p>' + e(line) + '</p>')).join('');
}

export function projectPage(lang, slug) {
  const d = content[lang];
  const t = copy[lang];
  const p = d.projects.find(item => item.slug === slug);
  if (!p) return notFoundPage(lang);
  const cover = media(d, p.coverId);
  const i = d.projects.indexOf(p);
  const next = d.projects[(i + 1) % d.projects.length];
  const sections = [
    ['overview', 'caseOverview'], ['challenge', 'caseChallenge'], ['objectives', 'caseObjectives'],
    ['insights', 'caseInsights'], ['strategy', 'caseStrategy'], ['angles', 'caseAngles'],
    ['execution', 'caseExecution'], ['results', 'caseResults'], ['learnings', 'caseLearnings']
  ].filter(([key]) => p[key]?.trim() && (key !== 'results' || p.resultsVerified));
  const body = `<main id="main" class="case-main">
  <section class="case-hero shell">
    <a class="back-link" href="${route(lang)}#work">← ${t.home}</a>
    <div class="section-kicker"><span>${num(i + 1)} / ${num(d.projects.length)}</span><span>${e(p.category)}</span></div>
    <h1>${e(p.name)}</h1>
    <p class="case-intro">${e(p.summary)}</p>
    <div class="case-meta">
      <div><span>${t.role}</span><strong>${e(p.role)}</strong></div>
      <div><span>${t.industry}</span><strong>${e(p.industry)}</strong></div>
      <div><span>${t.period}</span><strong>${e(p.period)}</strong></div>
    </div>
    <div class="case-cover">
      <div class="stage-media">
        ${cover ? '<img src="' + e(cover.url) + '" alt="' + e(cover.alt || p.name) + '" width="1000" height="1000">' : e(p.name)}
      </div>
    </div>
  </section>
  <div class="case-body shell">
    ${sections.map(([key, labelKey], j) => '<section class="case-section"><div class="case-section-label"><span>' + num(j + 1) + '</span><h2>' + e(d.settings.copy[labelKey]) + '</h2></div><div class="case-section-copy">' + paragraphs(p[key]) + '</div></section>').join('')}
  </div>
  <section class="next-project shell">
    <a class="next-card" href="${route(lang, next.slug)}">
      <div><span class="sub-label">${t.next}</span><h2>${e(next.name)}</h2><p>${e(next.industry)} · ${e(next.period)}</p></div>
      <span class="next-arrow">${arrowUpRight}</span>
    </a>
  </section>
</main>`;
  return documentPage(lang, body, p);
}

export function notFoundPage(lang = 'vi') {
  const t = copy[lang];
  return documentPage(lang, `<main id="main" class="not-found shell"><span class="sub-label">404</span><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="btn btn-solid" href="${route(lang)}">${t.goHome}${arrowRight}</a></main>`, null, true);
}

function documentPage(lang, body, project = null, noindex = false) {
  const s = content[lang].settings;
  const title = project?.seoTitle || s.seoTitle;
  const description = project?.seoDescription || s.seoDescription;
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="theme-color" content="#ffffff"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}"><link rel="alternate" hreflang="vi" href="${route('vi', project?.slug)}"><link rel="alternate" hreflang="en" href="${route('en', project?.slug)}"><link rel="alternate" hreflang="x-default" href="${route('vi', project?.slug)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts/font.css"><link rel="stylesheet" href="/style.css"><script src="/theme.js"></script><script type="module" src="/app.js"></script></head><body id="top">${header(lang, project)}${body}${footer(lang)}</body></html>`;
}

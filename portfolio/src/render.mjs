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

const sparkleIcon = '<svg class="sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>';
const arrowUpRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const arrowRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

const portrait = '/media/b711c802-4f85-41ed-8f5b-bb58867ab1c4.webp';

const copy = {
  vi: {
    work: 'Dự án', about: 'Về tôi', expertise: 'Chuyên môn', process: 'Quy trình', contactCta: 'Liên hệ',
    menu: 'Mở menu', close: 'Đóng menu', skip: 'Đến nội dung chính',
    welcomeBadge: 'Creative × Performance Portfolio',
    hero1: 'Tư duy', heroAccent1: 'sáng tạo.', hero2: 'Hiệu quả', heroAccent2: 'thực tế.',
    view: 'Khám phá dự án', cv: 'Tải CV',
    selected: 'Dự án tiêu biểu', workHeading: 'Các dự án đã triển khai',
    workIntro: 'Kết hợp chiến lược nội dung, kịch bản video, AI và quảng cáo hướng đến chuyển đổi thực tế.',
    all: 'Tất cả', detail: 'Xem case study', showing: 'dự án',
    aboutLabel: 'Về tôi', aboutHeading: 'Xin chào, mình là Huy.', journey: 'Hành trình kinh nghiệm',
    expertiseLabel: 'Chuyên môn cốt lõi', expertiseHeading: 'Sáng tạo từ bản năng, chiến lược từ tư duy',
    expertiseSub: 'Kết nối nội dung thuyết phục, công cụ AI và phân tích dữ liệu.',
    processLabel: 'Quy trình vận hành', processHeading: 'Hiệu suất & Quy trình',
    processSub: 'Mỗi chiến dịch đều đi qua 6 bước kiểm chứng và tối ưu liên tục.',
    contactLabel: 'Kết nối hợp tác', contactEmailLabel: 'EMAIL TRỰC TIẾP', contactPhoneLabel: 'ĐIỆN THOẠI / ZALO',
    contactCvLabel: 'HỒ SƠ NĂNG LỰC', contactCvVal: 'Tải bản CV (PDF)', copyBtn: 'Sao chép', copiedBtn: 'Đã chép',
    back: 'Về đầu trang', home: 'Quay lại dự án', role: 'Vai trò', industry: 'Lĩnh vực', period: 'Thời gian',
    next: 'Dự án tiếp theo', notFound: 'Không tìm thấy trang',
    notFoundBody: 'Đường dẫn này không tồn tại hoặc đã thay đổi. Quay về trang chủ để xem toàn bộ dự án.',
    goHome: 'Về trang chủ'
  },
  en: {
    work: 'Projects', about: 'About', expertise: 'Skills', process: 'Process', contactCta: 'Contact',
    menu: 'Open menu', close: 'Close menu', skip: 'Skip to content',
    welcomeBadge: 'Creative × Performance Portfolio',
    hero1: 'Creative', heroAccent1: 'thinking.', hero2: 'Real-world', heroAccent2: 'impact.',
    view: 'Explore projects', cv: 'Download CV',
    selected: 'Selected Work', workHeading: 'My Projects',
    workIntro: 'Combining content strategy, video scripting, AI workflows, and performance advertising.',
    all: 'All', detail: 'View case study', showing: 'projects',
    aboutLabel: 'About Me', aboutHeading: 'Hey there, I’m Huy.', journey: 'Experience Timeline',
    expertiseLabel: 'Core Capabilities', expertiseHeading: 'Instinctive creativity, strategic execution',
    expertiseSub: 'Merging persuasive storytelling, AI production workflows, and performance analytics.',
    processLabel: 'Workflow System', processHeading: 'Performance & Process',
    processSub: 'Every campaign runs through a 6-step research, creative, testing, and iteration loop.',
    contactLabel: 'Get In Touch', contactEmailLabel: 'DIRECT EMAIL', contactPhoneLabel: 'PHONE / ZALO',
    contactCvLabel: 'RESUME / CV', contactCvVal: 'Download CV (PDF)', copyBtn: 'Copy', copiedBtn: 'Copied',
    back: 'Back to top', home: 'All projects', role: 'Role', industry: 'Industry', period: 'Timeline',
    next: 'Next project', notFound: 'Page not found',
    notFoundBody: 'This route does not exist or may have moved. Head back to the homepage to explore all projects.',
    goHome: 'Back to home'
  }
};

const num = n => String(n).padStart(2, '0');
export const route = (lang, slug) => (lang === 'en' ? '/en' : '') + (slug ? '/work/' + slug + '/' : '/');
const cv = url => url.replace(/\/edit(?:\?.*)?$/, '/export?format=pdf');
const media = (data, id) => data.media.find(m => m.id === id);
const formatTel = phone => phone.replace(/\s+/g, '').replace(/^0/, '+84');

function header(lang, activeProject) {
  const t = copy[lang];
  const home = route(lang);
  const languageLink = other => route(other, activeProject?.slug);
  return `<a href="#main" class="skip-link">${t.skip}</a>
<canvas id="stars-canvas" aria-hidden="true"></canvas>
<div class="cosmic-horizon" aria-hidden="true"></div>
<header class="header">
  <div class="shell header-inner">
    <a class="wordmark" href="${home}">
      <span class="brand-orb" aria-hidden="true">H</span>
      <span>Nguyễn Hữu Huy</span>
    </a>
    <nav id="navigation" class="navigation" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}">
      <a href="${home}#about">${t.about}</a>
      <a href="${home}#expertise">${t.expertise}</a>
      <a href="${home}#work">${t.work}</a>
      <a href="${home}#process">${t.process}</a>
      <a class="mobile-contact" href="${home}#contact">${t.contactCta}</a>
    </nav>
    <div class="header-tools">
      <div class="languages" role="group" aria-label="${lang === 'vi' ? 'Ngôn ngữ' : 'Language'}">
        <a href="${languageLink('vi')}" lang="vi" ${lang === 'vi' ? 'aria-current="page"' : ''}>VI</a>
        <a href="${languageLink('en')}" lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
      </div>
      <a class="button-primary btn-sm header-contact" href="${home}#contact">${t.contactCta}</a>
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
    <div class="contact-panel">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.contactLabel} · ${e(s.availability)}</span></div>
      <h2 class="contact-title">${e(s.contactHeadline)}</h2>
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-card-head">
            <span class="contact-label">${t.contactEmailLabel}</span>
            <button type="button" class="copy-chip" data-copy="${e(s.email)}" data-label="${t.copyBtn}" data-copied="${t.copiedBtn}">${t.copyBtn}</button>
          </div>
          <a class="contact-value" href="mailto:${e(s.email)}">${e(s.email)}</a>
        </div>
        <a class="contact-card" href="tel:${e(telHref)}">
          <div class="contact-card-head">
            <span class="contact-label">${t.contactPhoneLabel}</span>
            <span class="contact-arrow">${arrowUpRight}</span>
          </div>
          <strong class="contact-value">${e(s.phone)}</strong>
        </a>
        <a class="contact-card" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">
          <div class="contact-card-head">
            <span class="contact-label">${t.contactCvLabel}</span>
            <span class="contact-arrow">${arrowUpRight}</span>
          </div>
          <strong class="contact-value">${t.contactCvVal}</strong>
        </a>
      </div>
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
      <span class="stage-index">${num(i + 1)} / ${num(d.projects.length)}</span>
      <span class="stage-badge">${e(p.category)}</span>
    </a>
    <div class="project-body">
      <div class="project-meta">
        <span>${e(p.period)}</span>
        <span>${e(p.role)}</span>
      </div>
      <h3><a href="${route(lang, p.slug)}">${e(p.name)}</a></h3>
      <p class="project-summary">${e(p.summary)}</p>
      <div class="project-foot">
        <div class="tags">${p.tags.map(tag => '<span>' + e(tag) + '</span>').join('')}</div>
        <a class="case-cta" href="${route(lang, p.slug)}">${t.detail}${arrowRight}</a>
      </div>
    </div>
  </article>`;
}

export function homePage(lang) {
  const d = content[lang];
  const s = d.settings;
  const t = copy[lang];
  const categories = [...new Set(d.projects.map(p => p.category))];
  const body = `<main id="main" class="page-content">
  <section class="hero shell">
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.welcomeBadge}</span></div>
        <h1>${t.hero1} <span class="cosmic-gradient">${t.heroAccent1}</span><br>${t.hero2} <span class="cosmic-gradient">${t.heroAccent2}</span></h1>
        <p class="hero-intro">${e(s.intro)}</p>
        <div class="hero-actions">
          <a class="button-primary" href="#work">${t.view}${arrowRight}</a>
          <a class="button-ghost" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">${t.cv}${arrowUpRight}</a>
        </div>
      </div>
      <div class="hero-stage">
        <div id="hero-3d" class="hero-3d"></div>
        <div class="hero-id-card">
          <img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" fetchpriority="high">
          <div>
            <strong>${e(s.name)}</strong>
            <span>${e(s.title)}</span>
            <small><i aria-hidden="true"></i>${e(s.availability)} · ${e(s.location)}</small>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="expertise" class="section shell">
    <div class="section-center">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.expertiseLabel}</span></div>
      <h2>${t.expertiseHeading}</h2>
      <p class="section-sub">${t.expertiseSub}</p>
    </div>
    <div class="skill-constellation">
      ${s.skills.map((skill, i) => '<div class="skill-orb"><span class="skill-num">' + num(i + 1) + '</span><strong>' + e(skill) + '</strong></div>').join('')}
    </div>
  </section>
  <section id="work" class="section shell">
    <div class="section-center">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.selected}</span></div>
      <h2 class="cosmic-gradient">${t.workHeading}</h2>
      <p class="section-sub">${t.workIntro}</p>
    </div>
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
    <div class="section-center">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.aboutLabel}</span></div>
      <h2>${t.aboutHeading}</h2>
    </div>
    <div class="about-grid">
      <div class="cosmic-panel about-card">
        <div class="about-profile">
          <img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" loading="lazy">
          <div>
            <strong>${e(s.name)}</strong>
            <span>${e(s.title)}</span>
            <small>${e(s.location)}</small>
          </div>
        </div>
        <p class="about-text">${e(s.about)}</p>
        <a class="button-primary" href="#contact">${e(s.copy.aboutCta)}${arrowRight}</a>
      </div>
      <div class="cosmic-panel timeline-card">
        <p class="panel-kicker">${t.journey}</p>
        <div class="experience-list">
          ${s.experience.map((x, idx) => '<details class="experience-item" ' + (idx === 0 ? 'open' : '') + '><summary><span class="timeline-dot" aria-hidden="true"></span><div class="exp-main"><strong>' + e(x.company) + '</strong><span>' + e(x.role) + '</span></div><span class="exp-period">' + e(x.period) + '</span><span class="plus" aria-hidden="true">+</span></summary><p>' + e(x.description) + '</p></details>').join('')}
        </div>
      </div>
    </div>
  </section>
  <section id="process" class="section shell">
    <div class="section-center">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.processLabel}</span></div>
      <h2>${t.processHeading}</h2>
      <p class="section-sub">${t.processSub}</p>
    </div>
    <div class="process-grid">
      ${s.process.map((step, i) => '<article class="cosmic-panel process-card"><span class="step-num">' + num(i + 1) + '</span><h3>' + e(step.name) + '</h3><p>' + e(step.description) + '</p></article>').join('')}
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
  const body = `<main id="main" class="page-content case-main">
  <section class="case-hero shell">
    <a class="back-link" href="${route(lang)}#work">← ${t.home}</a>
    <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${num(i + 1)} / ${num(d.projects.length)} · ${e(p.category)}</span></div>
    <h1>${e(p.name)}</h1>
    <p class="case-intro">${e(p.summary)}</p>
    <div class="case-meta">
      <div class="cosmic-panel meta-box"><span>${t.role}</span><strong>${e(p.role)}</strong></div>
      <div class="cosmic-panel meta-box"><span>${t.industry}</span><strong>${e(p.industry)}</strong></div>
      <div class="cosmic-panel meta-box"><span>${t.period}</span><strong>${e(p.period)}</strong></div>
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
    <a class="cosmic-panel next-card" href="${route(lang, next.slug)}">
      <div><span class="panel-kicker">${t.next}</span><h2>${e(next.name)}</h2><p>${e(next.industry)} · ${e(next.period)}</p></div>
      <span class="next-arrow">${arrowUpRight}</span>
    </a>
  </section>
</main>`;
  return documentPage(lang, body, p);
}

export function notFoundPage(lang = 'vi') {
  const t = copy[lang];
  return documentPage(lang, `<main id="main" class="page-content not-found shell"><div class="welcome-box">${sparkleIcon}<span class="welcome-text">ERROR 404</span></div><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="button-primary" href="${route(lang)}">${t.goHome}${arrowRight}</a></main>`, null, true);
}

function documentPage(lang, body, project = null, noindex = false) {
  const s = content[lang].settings;
  const title = project?.seoTitle || s.seoTitle;
  const description = project?.seoDescription || s.seoDescription;
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#030014"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}"><link rel="alternate" hreflang="vi" href="${route('vi', project?.slug)}"><link rel="alternate" hreflang="en" href="${route('en', project?.slug)}"><link rel="alternate" hreflang="x-default" href="${route('vi', project?.slug)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts/font.css"><link rel="stylesheet" href="/style.css"><script type="module" src="/app.js"></script><script type="module" src="/space.js"></script></head><body id="top">${header(lang, project)}${body}${footer(lang)}</body></html>`;
}

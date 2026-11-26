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

const arrowUpRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const arrowRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const sunIcon = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const moonIcon = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
const mailIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const fileIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h2"/></svg>';

const skillIcons = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-2v8l-4-2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 17 10 11l4 4 6-8"/><path d="M16 7h4v4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M9 18V5l10-2v11"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
];

const portrait = '/media/b711c802-4f85-41ed-8f5b-bb58867ab1c4.webp';

const copy = {
  vi: {
    work: 'Dự án', about: 'Về tôi', expertise: 'Chuyên môn', process: 'Quy trình', contact: 'Liên hệ', contactCta: 'Liên hệ hợp tác',
    menu: 'Mở menu', close: 'Đóng menu', skip: 'Đến nội dung chính', heroBadge: 'CREATIVE × PERFORMANCE',
    hero1: 'Tư duy sáng tạo.', hero2: 'Hiệu quả thực tế.', view: 'Khám phá dự án', cv: 'Tải CV',
    metricProjects: 'Dự án tiêu biểu', metricSkills: 'Chuyên môn cốt lõi', metricMarkets: 'Thị trường triển khai',
    specFocusLabel: 'TRỌNG TÂM', specFocusVal: 'Nội dung & Performance Ads',
    specMarketLabel: 'THỊ TRƯỜNG', specMarketVal: 'Việt Nam · Philippines',
    specStackLabel: 'CÔNG CỤ', specStackVal: 'Meta · TikTok · AI Workflow',
    specBaseLabel: 'ĐỊA ĐIỂM',
    selected: 'DỰ ÁN TIÊU BIỂU', workHeading: 'Ý tưởng có mục đích.', workSub: 'Nội dung tạo tác động.',
    workIntro: 'Từ thấu hiểu khách hàng đến triển khai thực tế — những dự án tôi trực tiếp xây dựng thông điệp, nội dung và hệ thống quảng cáo.',
    all: 'Tất cả', detail: 'Xem case study', showing: 'dự án',
    aboutLabel: 'VỀ TÔI', aboutHeading: 'Xin chào, mình là', aboutName: 'Huy.', journey: 'HÀNH TRÌNH KINH NGHIỆM',
    expertiseLabel: 'CHUYÊN MÔN', expertiseHeading: 'Sáng tạo từ bản năng.', expertiseAccent: 'Chiến lược từ tư duy.',
    expertiseIntro: 'Kết hợp nội dung thuyết phục, công cụ AI và phân tích dữ liệu để tối ưu chuyển đổi.',
    processLabel: 'QUY TRÌNH LÀM VIỆC', processHeading: 'Bắt đầu từ tò mò.', processAccent: 'Tiến bước bằng quy trình.',
    processIntro: 'Mọi chiến dịch hiệu quả đều đi qua một hệ thống kiểm chứng rõ ràng.',
    contactLabel: 'SẴN SÀNG HỢP TÁC', contactEmailLabel: 'EMAIL TRỰC TIẾP', contactPhoneLabel: 'ĐIỆN THOẠI / ZALO',
    contactCvLabel: 'HỒ SƠ NĂNG LỰC', contactCvVal: 'Tải bản CV (PDF)', copyBtn: 'Sao chép', copiedBtn: 'Đã chép',
    back: 'Về đầu trang', home: 'Quay lại dự án', role: 'VAI TRÒ', industry: 'LĨNH VỰC', period: 'THỜI GIAN',
    next: 'DỰ ÁN TIẾP THEO', notFound: 'Không tìm thấy trang',
    notFoundBody: 'Đường dẫn này không tồn tại hoặc đã thay đổi. Quay về trang chủ để xem toàn bộ dự án.',
    goHome: 'Về trang chủ', light: 'Chuyển giao diện sáng', dark: 'Chuyển giao diện tối'
  },
  en: {
    work: 'Work', about: 'About', expertise: 'Capabilities', process: 'Process', contact: 'Contact', contactCta: 'Start a project',
    menu: 'Open menu', close: 'Close menu', skip: 'Skip to content', heroBadge: 'CREATIVE × PERFORMANCE',
    hero1: 'Creative thinking.', hero2: 'Real-world impact.', view: 'Explore projects', cv: 'Download CV',
    metricProjects: 'Featured case studies', metricSkills: 'Core capabilities', metricMarkets: 'Active markets',
    specFocusLabel: 'FOCUS', specFocusVal: 'Creative & Performance Ads',
    specMarketLabel: 'MARKETS', specMarketVal: 'Vietnam · Philippines',
    specStackLabel: 'STACK', specStackVal: 'Meta · TikTok · AI Workflow',
    specBaseLabel: 'BASED IN',
    selected: 'SELECTED WORK', workHeading: 'Ideas with purpose.', workSub: 'Content that converts.',
    workIntro: 'From audience insight to campaign execution — selected work across agriculture, F&B, and marketing technology.',
    all: 'All work', detail: 'View case study', showing: 'projects',
    aboutLabel: 'ABOUT', aboutHeading: 'Hey there, I’m', aboutName: 'Huy.', journey: 'EXPERIENCE TIMELINE',
    expertiseLabel: 'CAPABILITIES', expertiseHeading: 'Instinctive creativity.', expertiseAccent: 'Strategic execution.',
    expertiseIntro: 'Combining persuasive storytelling, AI production workflows, and performance analytics.',
    processLabel: 'WORKFLOW', processHeading: 'Driven by curiosity.', processAccent: 'Built on process.',
    processIntro: 'A structured 6-step loop from research and scripting to live testing and iteration.',
    contactLabel: 'GET IN TOUCH', contactEmailLabel: 'DIRECT EMAIL', contactPhoneLabel: 'PHONE / ZALO',
    contactCvLabel: 'RESUME / CV', contactCvVal: 'Download CV (PDF)', copyBtn: 'Copy', copiedBtn: 'Copied',
    back: 'Back to top', home: 'All projects', role: 'ROLE', industry: 'INDUSTRY', period: 'TIMELINE',
    next: 'NEXT PROJECT', notFound: 'Page not found',
    notFoundBody: 'This route does not exist or may have moved. Head back to the homepage to explore all projects.',
    goHome: 'Back to home', light: 'Switch to light theme', dark: 'Switch to dark theme'
  }
};

const num = n => String(n).padStart(2, '0');
export const route = (lang, slug) => (lang === 'en' ? '/en' : '') + (slug ? '/work/' + slug + '/' : '/');
const cv = url => url.replace(/\/edit(?:\?.*)?$/, '/export?format=pdf');
const media = (data, id) => data.media.find(m => m.id === id);
const formatTel = phone => phone.replace(/\s+/g, '').replace(/^0/, '+84');

function sectionHead(index, label, title, accent, intro) {
  return `<div class="section-head">
    <div class="section-head-main">
      <div class="section-tag"><span class="mono-idx">${index}</span><span class="tag-sep">/</span><span>${e(label)}</span></div>
      <h2>${e(title)}${accent ? '<br><span class="text-gradient">' + e(accent) + '</span>' : ''}</h2>
    </div>
    ${intro ? '<p class="section-intro">' + e(intro) + '</p>' : ''}
  </div>`;
}

function header(lang, activeProject) {
  const t = copy[lang];
  const home = route(lang);
  const languageLink = other => route(other, activeProject?.slug);
  return `<a href="#main" class="skip-link">${t.skip}</a>
<header class="header" id="top">
  <div class="shell header-inner">
    <a class="wordmark" href="${home}" aria-label="Nguyễn Hữu Huy — ${lang === 'vi' ? 'Trang chủ' : 'Home'}">
      <span class="brand-mark" aria-hidden="true">H</span>
      <span class="brand-text">huy<span class="brand-dot">.</span></span>
    </a>
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
        <a href="${languageLink('en')}" lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a>
      </div>
      <button class="theme-toggle" type="button" aria-label="${t.light}" data-light="${t.light}" data-dark="${t.dark}" aria-pressed="false">${sunIcon}${moonIcon}</button>
      <a class="btn btn-primary btn-sm header-contact" href="${home}#contact">${t.contactCta}${arrowUpRight}</a>
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
    <div class="contact-panel spotlight-card">
      <div class="contact-glow" aria-hidden="true"></div>
      <div class="contact-top">
        <div class="section-tag"><span class="mono-idx">05</span><span class="tag-sep">/</span><span>${t.contactLabel}</span></div>
        <span class="status-pill"><i aria-hidden="true"></i>${e(s.availability)}</span>
      </div>
      <h2 class="contact-title">${e(s.contactHeadline)}</h2>
      <div class="contact-grid">
        <a class="contact-card" href="mailto:${e(s.email)}">
          <div class="contact-card-head">
            <span class="contact-icon">${mailIcon}</span>
            <button type="button" class="copy-chip" data-copy="${e(s.email)}" data-label="${t.copyBtn}" data-copied="${t.copiedBtn}">${t.copyBtn}</button>
          </div>
          <span class="contact-label">${t.contactEmailLabel}</span>
          <strong class="contact-value">${e(s.email)}</strong>
        </a>
        <a class="contact-card" href="tel:${e(telHref)}">
          <div class="contact-card-head">
            <span class="contact-icon">${phoneIcon}</span>
            <span class="contact-arrow">${arrowUpRight}</span>
          </div>
          <span class="contact-label">${t.contactPhoneLabel}</span>
          <strong class="contact-value">${e(s.phone)}</strong>
        </a>
        <a class="contact-card" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">
          <div class="contact-card-head">
            <span class="contact-icon">${fileIcon}</span>
            <span class="contact-arrow">${arrowUpRight}</span>
          </div>
          <span class="contact-label">${t.contactCvLabel}</span>
          <strong class="contact-value">${t.contactCvVal}</strong>
        </a>
      </div>
    </div>
    <div class="footer-bar">
      <span>© ${new Date().getUTCFullYear()} ${e(s.name)}</span>
      <span class="footer-tagline">${e(s.footer)}</span>
      <a class="back-top" href="#top">${t.back} ↑</a>
    </div>
  </div>
</footer>`;
}

function projectCard(p, i, lang) {
  const d = content[lang];
  const t = copy[lang];
  const cover = media(d, p.coverId);
  return `<article class="project spotlight-card" data-category="${e(p.category)}">
    <a class="project-stage project-${e(p.slug)}" href="${route(lang, p.slug)}" aria-label="${t.detail}: ${e(p.name)}">
      <div class="stage-grid" aria-hidden="true"></div>
      <div class="stage-media">
        ${cover ? '<img src="' + e(cover.url) + '" alt="' + e(cover.alt || p.name) + '" width="800" height="800" loading="lazy" decoding="async">' : '<span>' + e(p.name) + '</span>'}
      </div>
      <span class="stage-index">${num(i + 1)} / ${num(d.projects.length)}</span>
      <span class="stage-badge">${e(p.category)}</span>
    </a>
    <div class="project-body">
      <div class="project-meta-row">
        <span class="project-period">${e(p.period)}</span>
        <span class="project-role">${e(p.role)}</span>
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
  const body = `<main id="main">
  <section class="hero">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-grid-pattern"></div>
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
    </div>
    <div class="shell hero-layout">
      <div class="hero-copy">
        <div class="status-pill"><i aria-hidden="true"></i>${e(s.availability)} <span class="pill-divider">·</span> ${e(s.location)}</div>
        <h1>${t.hero1}<br><span class="text-gradient">${t.hero2}</span></h1>
        <p class="hero-intro">${e(s.intro)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#work">${t.view}${arrowRight}</a>
          <a class="btn btn-glass" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">${t.cv}${arrowUpRight}</a>
          <a class="hero-link" href="#contact">${t.contactCta}</a>
        </div>
        <div class="hero-signals" aria-label="${lang === 'vi' ? 'Tổng quan nhanh' : 'Quick overview'}">
          <div class="signal-item"><strong>${num(d.projects.length)}</strong><span>${t.metricProjects}</span></div>
          <div class="signal-item"><strong>${num(s.skills.length)}</strong><span>${t.metricSkills}</span></div>
          <div class="signal-item"><strong>VN · PH</strong><span>${t.metricMarkets}</span></div>
        </div>
      </div>
      <div class="hero-card spotlight-card">
        <div class="card-chrome">
          <div class="chrome-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span class="chrome-title">huy.profile</span>
          <span class="chrome-tag">${t.heroBadge}</span>
        </div>
        <div class="profile-visual">
          <img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" fetchpriority="high">
          <div class="profile-overlay">
            <strong>${e(s.name)}</strong>
            <span>${e(s.title)}</span>
          </div>
        </div>
        <div class="spec-grid">
          <div class="spec-cell"><span>${t.specFocusLabel}</span><strong>${t.specFocusVal}</strong></div>
          <div class="spec-cell"><span>${t.specMarketLabel}</span><strong>${t.specMarketVal}</strong></div>
          <div class="spec-cell"><span>${t.specStackLabel}</span><strong>${t.specStackVal}</strong></div>
          <div class="spec-cell"><span>${t.specBaseLabel}</span><strong>${e(s.location)}</strong></div>
        </div>
      </div>
    </div>
  </section>
  <div class="capability-rail" aria-label="${e(s.copy.expertiseLabel)}">
    <div class="shell rail-inner">
      ${s.skills.map(skill => '<span class="rail-chip">' + e(skill) + '</span>').join('')}
    </div>
  </div>
  <section id="work" class="section shell">
    ${sectionHead('01', t.selected, t.workHeading, t.workSub, t.workIntro)}
    <div class="work-toolbar">
      <div class="filters" role="group" aria-label="${lang === 'vi' ? 'Lọc dự án' : 'Filter projects'}">
        <button type="button" class="filter active" data-filter="all" aria-pressed="true">${t.all}<sup>${num(d.projects.length)}</sup></button>
        ${categories.map(c => '<button type="button" class="filter" data-filter="' + e(c) + '" aria-pressed="false">' + e(c) + '</button>').join('')}
      </div>
      <span class="work-count" aria-live="polite" data-suffix="${t.showing}">${num(d.projects.length)} ${t.showing}</span>
    </div>
    <div class="project-grid">
      ${d.projects.map((p, i) => projectCard(p, i, lang)).join('')}
    </div>
  </section>
  <section id="about" class="section about-section">
    <div class="shell">
      ${sectionHead('02', t.aboutLabel, t.aboutHeading, t.aboutName, '')}
      <div class="about-bento">
        <div class="about-card spotlight-card">
          <div class="about-card-top">
            <img class="about-avatar" src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" loading="lazy">
            <div>
              <strong>${e(s.name)}</strong>
              <p class="about-role">${e(s.title)}</p>
              <span class="about-loc">${e(s.location)}</span>
            </div>
          </div>
          <p class="about-text">${e(s.about)}</p>
          <a class="btn btn-glass" href="#contact">${e(s.copy.aboutCta)}${arrowRight}</a>
        </div>
        <div class="timeline-card spotlight-card">
          <div class="timeline-header">
            <span class="mono-label">${t.journey}</span>
            <span class="timeline-count">${num(s.experience.length)} ROLES</span>
          </div>
          <div class="timeline-list">
            ${s.experience.map((x, idx) => '<details class="experience-item" ' + (idx === 0 ? 'open' : '') + '><summary><span class="timeline-dot" aria-hidden="true"></span><div class="experience-head"><div class="experience-title-row"><strong>' + e(x.company) + '</strong><span class="experience-period">' + e(x.period) + '</span></div><small>' + e(x.role) + '</small></div><span class="plus" aria-hidden="true">+</span></summary><p>' + e(x.description) + '</p></details>').join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="expertise" class="section shell">
    ${sectionHead('03', t.expertiseLabel, t.expertiseHeading, t.expertiseAccent, t.expertiseIntro)}
    <div class="capability-grid">
      ${s.skills.map((skill, i) => '<div class="capability-card spotlight-card"><div class="capability-top"><span class="capability-icon">' + skillIcons[i % skillIcons.length] + '</span><span class="mono-idx">' + num(i + 1) + '</span></div><h3>' + e(skill) + '</h3></div>').join('')}
    </div>
  </section>
  <section id="process" class="section process-section">
    <div class="shell">
      ${sectionHead('04', t.processLabel, t.processHeading, t.processAccent, t.processIntro)}
      <div class="process-grid">
        ${s.process.map((step, i) => '<details class="process-card spotlight-card" open><summary><span class="step-badge">STEP ' + num(i + 1) + '</span><h3>' + e(step.name) + '</h3><span class="plus" aria-hidden="true">+</span></summary><p>' + e(step.description) + '</p></details>').join('')}
      </div>
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
    <div class="section-tag"><span class="mono-idx">${num(i + 1)} / ${num(d.projects.length)}</span><span class="tag-sep">·</span><span>${e(p.category)}</span></div>
    <h1>${e(p.name)}</h1>
    <p class="case-intro">${e(p.summary)}</p>
    <div class="case-meta">
      <div class="meta-box"><span>${t.role}</span><strong>${e(p.role)}</strong></div>
      <div class="meta-box"><span>${t.industry}</span><strong>${e(p.industry)}</strong></div>
      <div class="meta-box"><span>${t.period}</span><strong>${e(p.period)}</strong></div>
    </div>
    <div class="case-cover project-${e(p.slug)}">
      <div class="stage-grid" aria-hidden="true"></div>
      <div class="stage-media">
        ${cover ? '<img src="' + e(cover.url) + '" alt="' + e(cover.alt || p.name) + '" width="1000" height="1000">' : e(p.name)}
      </div>
    </div>
  </section>
  <div class="case-body shell">
    ${sections.map(([key, labelKey], j) => '<section class="case-section"><div class="case-section-label"><span class="mono-idx">' + num(j + 1) + '</span><h2>' + e(d.settings.copy[labelKey]) + '</h2></div><div class="case-section-copy">' + paragraphs(p[key]) + '</div></section>').join('')}
  </div>
  <section class="next-project shell">
    <a class="next-card spotlight-card" href="${route(lang, next.slug)}">
      <div><span class="mono-label">${t.next}</span><h2>${e(next.name)}</h2><p>${e(next.industry)} · ${e(next.period)}</p></div>
      <span class="next-arrow">${arrowUpRight}</span>
    </a>
  </section>
</main>`;
  return documentPage(lang, body, p);
}

export function notFoundPage(lang = 'vi') {
  const t = copy[lang];
  return documentPage(lang, `<main id="main" class="not-found shell"><span class="mono-label">ERROR 404</span><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="btn btn-primary" href="${route(lang)}">${t.goHome}${arrowRight}</a></main>`, null, true);
}

function documentPage(lang, body, project = null, noindex = false) {
  const s = content[lang].settings;
  const title = project?.seoTitle || s.seoTitle;
  const description = project?.seoDescription || s.seoDescription;
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="theme-color" content="#06070a"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}"><link rel="alternate" hreflang="vi" href="${route('vi', project?.slug)}"><link rel="alternate" hreflang="en" href="${route('en', project?.slug)}"><link rel="alternate" hreflang="x-default" href="${route('vi', project?.slug)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts/font.css"><link rel="stylesheet" href="/style.css"><script src="/theme.js"></script><script type="module" src="/app.js"></script></head><body>${header(lang, project)}${body}${footer(lang)}</body></html>`;
}

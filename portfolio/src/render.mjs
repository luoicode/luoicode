import vi from './content/vi.json' with { type: 'json' };
import en from './content/en.json' with { type: 'json' };
import { positioning, skillGroups, filterList, upgradedProjects } from './data/upgrade.mjs';

export const content = { vi, en: { ...en, media: vi.media } };
export const projectsList = upgradedProjects;

export const escape = (value = '') =>
  String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const e = escape;

const sparkleIcon = '<svg class="sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>';
const arrowUpRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const arrowRight = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

const groupIcons = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 17 10 11l4 4 6-8"/><path d="M16 7h4v4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
];

const portrait = '/media/b711c802-4f85-41ed-8f5b-bb58867ab1c4.webp';

const copy = {
  vi: {
    about: 'Về tôi', expertise: 'Chuyên môn', work: 'Dự án', experience: 'Kinh nghiệm', process: 'Quy trình', contactCta: 'Liên hệ',
    menu: 'Mở menu', close: 'Đóng menu', skip: 'Đến nội dung chính',
    view: 'Khám phá dự án', cv: 'Tải CV',
    aboutLabel: 'Giới thiệu', aboutHeading: 'Performance Marketing × AI × Automation',
    expertiseLabel: '5 Nhóm chuyên môn', expertiseHeading: 'Từ chiến lược quảng cáo đến hệ thống tự động hóa',
    expertiseSub: 'Kết hợp tư duy Marketing dữ liệu, sáng tạo nội dung AI và khả năng tự xây dựng sản phẩm công nghệ.',
    showMoreSkills: 'Xem đầy đủ kỹ năng',
    selected: 'Dự án tiêu biểu', workHeading: 'Dự án & Case Studies',
    workIntro: '10 dự án đã xác minh trải dài từ Performance Marketing, bản địa hóa quốc tế đến AI, Automation và Web Applications.',
    featuredBadge: 'Nổi bật', conceptBadge: 'Concept Preview', detail: 'Xem Case Study', showing: 'dự án',
    experienceLabel: 'Kinh nghiệm làm việc', experienceHeading: 'Hành trình thực chiến',
    processLabel: 'Quy trình làm việc', processHeading: 'Hiệu suất & Quy trình 6 bước',
    processSub: 'Mỗi chiến dịch và sản phẩm đều đi qua chu trình nghiên cứu, thử nghiệm và tối ưu bằng dữ liệu.',
    contactLabel: 'Kết nối hợp tác', contactEmailLabel: 'EMAIL TRỰC TIẾP', contactPhoneLabel: 'ĐIỆN THOẠI / ZALO',
    contactCvLabel: 'HỒ SƠ NĂNG LỰC', contactCvVal: 'Tải bản CV (PDF)', copyBtn: 'Sao chép', copiedBtn: 'Đã chép',
    back: 'Về đầu trang', home: 'Tất cả dự án', role: 'Vai trò', category: 'Danh mục', timeline: 'Thời gian / Trạng thái',
    secOverview: 'Tổng quan', secChallenge: 'Bài toán & Thách thức', secObjectives: 'Mục tiêu',
    secStrategy: 'Chiến lược & Cách tiếp cận', secExecution: 'Triển khai thực tế',
    secDeliverables: 'Tính năng chính / Deliverables', secStack: 'Công nghệ & Công cụ',
    secOutcome: 'Kết quả & Trạng thái dự án', secGallery: 'Thư viện hình ảnh',
    zoomHint: 'Nhấn để phóng to', related: 'Dự án liên quan', next: 'Dự án tiếp theo',
    notFound: 'Không tìm thấy trang', notFoundBody: 'Đường dẫn này không tồn tại hoặc đã thay đổi. Quay về trang chủ để xem toàn bộ dự án.', goHome: 'Về trang chủ'
  },
  en: {
    about: 'About', expertise: 'Expertise', work: 'Projects', experience: 'Experience', process: 'Process', contactCta: 'Contact',
    menu: 'Open menu', close: 'Close menu', skip: 'Skip to content',
    view: 'Explore projects', cv: 'Download CV',
    aboutLabel: 'About Me', aboutHeading: 'Performance Marketing × AI × Automation',
    expertiseLabel: '5 Core Capabilities', expertiseHeading: 'From performance strategy to scalable systems',
    expertiseSub: 'Combining data-driven marketing, AI-assisted creative production, and hands-on product & automation building.',
    showMoreSkills: 'View all skills',
    selected: 'Featured & All Work', workHeading: 'Projects & Case Studies',
    workIntro: '10 verified projects spanning Performance Marketing, international localization, AI tools, automation, and web applications.',
    featuredBadge: 'Featured', conceptBadge: 'Concept Preview', detail: 'View Case Study', showing: 'projects',
    experienceLabel: 'Work Experience', experienceHeading: 'Career Journey',
    processLabel: 'Working Process', processHeading: 'Performance & 6-Step Process',
    processSub: 'Every campaign and product follows a disciplined loop of research, experimentation, and data-led iteration.',
    contactLabel: 'Get In Touch', contactEmailLabel: 'DIRECT EMAIL', contactPhoneLabel: 'PHONE / ZALO',
    contactCvLabel: 'RESUME / CV', contactCvVal: 'Download CV (PDF)', copyBtn: 'Copy', copiedBtn: 'Copied',
    back: 'Back to top', home: 'All projects', role: 'Role', category: 'Category', timeline: 'Timeline / Status',
    secOverview: 'Overview', secChallenge: 'Challenge', secObjectives: 'Objectives',
    secStrategy: 'Strategy & Approach', secExecution: 'Execution',
    secDeliverables: 'Key Features / Deliverables', secStack: 'Technology Stack',
    secOutcome: 'Results / Project Status', secGallery: 'Visual Gallery',
    zoomHint: 'Click to expand', related: 'Related Projects', next: 'Next Project',
    notFound: 'Page not found', notFoundBody: 'This route does not exist or may have moved. Head back to the homepage to explore all projects.', goHome: 'Back to home'
  }
};

const num = n => String(n).padStart(2, '0');
export const route = (lang, slug) => (lang === 'en' ? '/en' : '') + (slug ? '/work/' + slug + '/' : '/');
const cv = url => url.replace(/\/edit(?:\?.*)?$/, '/export?format=pdf');
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
      <a href="${home}#experience">${t.experience}</a>
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
  const pos = positioning[lang];
  const telHref = formatTel(s.phone);
  return `<footer id="contact" class="contact-section">
  <div class="shell">
    <div class="contact-panel reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.contactLabel} · ${e(s.availability)}</span></div>
      <h2 class="contact-title">${e(s.contactHeadline)}</h2>
      <p class="contact-tagline">${e(pos.tagline)}</p>
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
      <span>${e(pos.tagline)}</span>
      <a class="back-top" href="#top">${t.back} ↑</a>
    </div>
  </div>
</footer>
<dialog id="lightbox" class="lightbox" aria-label="${lang === 'vi' ? 'Xem ảnh lớn' : 'Expanded image'}">
  <button type="button" class="lightbox-close" aria-label="${t.close}">×</button>
  <figure class="lightbox-figure">
    <img id="lightbox-img" src="" alt="">
    <figcaption id="lightbox-caption"></figcaption>
  </figure>
</dialog>`;
}

function projectCard(p, i, lang) {
  const t = copy[lang];
  const loc = p[lang];
  const tags = p.stack.slice(0, 4);
  return `<article class="project reveal" data-filters="${e(p.filters.join(','))}">
    <a class="project-stage" href="${route(lang, p.slug)}" aria-label="${t.detail}: ${e(loc.name)}">
      <div class="stage-media ${p.coverType === 'concept' ? 'is-mockup' : ''}">
        <img src="${e(p.cover)}" alt="${e(loc.name)} — ${e(loc.subtitle)}" width="960" height="600" loading="lazy" decoding="async">
      </div>
      <span class="stage-index">${num(i + 1)} / ${num(upgradedProjects.length)}</span>
      ${p.featured ? '<span class="stage-featured">' + t.featuredBadge + '</span>' : ''}
      <span class="stage-badge">${e(loc.category.split('/')[0].trim())}</span>
    </a>
    <div class="project-body">
      <div class="project-meta">
        <span>${e(p.timeline)}</span>
        <span>${e(loc.role)}</span>
      </div>
      <h3><a href="${route(lang, p.slug)}">${e(loc.name)}</a></h3>
      <p class="project-sub">${e(loc.subtitle)}</p>
      <p class="project-summary">${e(loc.summary)}</p>
      <div class="project-foot">
        <div class="tags">${tags.map(tag => '<span>' + e(tag) + '</span>').join('')}</div>
        <a class="case-cta" href="${route(lang, p.slug)}">${t.detail}${arrowRight}</a>
      </div>
    </div>
  </article>`;
}

export function homePage(lang) {
  const s = content[lang].settings;
  const pos = positioning[lang];
  const groups = skillGroups[lang];
  const t = copy[lang];
  const body = `<main id="main" class="page-content">
  <section class="hero shell">
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${e(pos.role)}</span></div>
        <h1>${e(pos.hero1)} <span class="cosmic-gradient">${e(pos.heroAccent1)}</span><br>${e(pos.hero2)} <span class="cosmic-gradient">${e(pos.heroAccent2)}</span></h1>
        <p class="hero-intro">${e(pos.intro)}</p>
        <p class="hero-tagline">${e(pos.tagline)}</p>
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
            <strong>${e(pos.name)}</strong>
            <span>${e(pos.role)}</span>
            <small><i aria-hidden="true"></i>${e(s.availability)} · ${e(s.location)}</small>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="section shell">
    <div class="section-center reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.aboutLabel}</span></div>
      <h2>${t.aboutHeading}</h2>
    </div>
    <div class="about-upgrade-grid">
      <div class="cosmic-panel about-story reveal">
        <div class="about-profile">
          <img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" loading="lazy">
          <div>
            <strong>${e(pos.name)}</strong>
            <span>${e(pos.role)}</span>
            <small>${e(s.location)}</small>
          </div>
        </div>
        ${pos.aboutParagraphs.map(p => '<p class="about-text">' + e(p) + '</p>').join('')}
      </div>
      <div class="pillar-stack">
        ${pos.pillars.map((pil, idx) => '<div class="cosmic-panel pillar-card reveal"><span class="step-num">' + num(idx + 1) + '</span><h3>' + e(pil.label) + '</h3><p>' + e(pil.desc) + '</p></div>').join('')}
      </div>
    </div>
  </section>

  <section id="expertise" class="section shell">
    <div class="section-center reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.expertiseLabel}</span></div>
      <h2>${t.expertiseHeading}</h2>
      <p class="section-sub">${t.expertiseSub}</p>
    </div>
    <div class="skill-groups-grid">
      ${groups.map((g, idx) => '<article class="cosmic-panel skill-group-card reveal"><div class="skill-group-head"><span class="skill-group-icon">' + groupIcons[idx % groupIcons.length] + '</span><span class="skill-domain-badge">' + e(g.domain) + '</span><span class="skill-num">' + e(g.index) + '</span></div><h3>' + e(g.title) + '</h3><p class="skill-group-desc">' + e(g.description) + '</p><div class="skill-chips">' + g.skills.slice(0, 5).map(sk => '<span>' + e(sk) + '</span>').join('') + '</div><details class="skill-more"><summary>' + t.showMoreSkills + ' (' + g.skills.length + ') <span class="plus" aria-hidden="true">+</span></summary><div class="skill-chips skill-chips-all">' + g.skills.slice(5).map(sk => '<span>' + e(sk) + '</span>').join('') + '</div><div class="skill-meta-block"><span class="skill-meta-label">' + e(g.metaLabel) + ':</span><div class="skill-meta-chips">' + g.metaItems.map(m => '<span>' + e(m) + '</span>').join('') + '</div></div></details></article>').join('')}
    </div>
  </section>

  <section id="work" class="section shell">
    <div class="section-center reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.selected}</span></div>
      <h2 class="cosmic-gradient">${t.workHeading}</h2>
      <p class="section-sub">${t.workIntro}</p>
    </div>
    <div class="work-toolbar">
      <div class="filters" role="group" aria-label="${lang === 'vi' ? 'Lọc dự án' : 'Filter projects'}">
        ${filterList.map((f, idx) => '<button type="button" class="filter' + (idx === 0 ? ' active' : '') + '" data-filter="' + e(f.id) + '" aria-pressed="' + (idx === 0 ? 'true' : 'false') + '">' + e(f[lang]) + (idx === 0 ? ' (' + upgradedProjects.length + ')' : '') + '</button>').join('')}
      </div>
      <span class="work-count" aria-live="polite" data-suffix="${t.showing}">${num(upgradedProjects.length)} ${t.showing}</span>
    </div>
    <div class="project-grid">
      ${upgradedProjects.map((p, i) => projectCard(p, i, lang)).join('')}
    </div>
  </section>

  <section id="experience" class="section shell">
    <div class="section-center reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.experienceLabel}</span></div>
      <h2>${t.experienceHeading}</h2>
    </div>
    <div class="cosmic-panel timeline-card reveal">
      <div class="experience-list">
        ${s.experience.map((x, idx) => '<details class="experience-item" ' + (idx === 0 ? 'open' : '') + '><summary><span class="timeline-dot" aria-hidden="true"></span><div class="exp-main"><strong>' + e(x.company) + '</strong><span>' + e(x.role) + '</span></div><span class="exp-period">' + e(x.period) + '</span><span class="plus" aria-hidden="true">+</span></summary><p>' + e(x.description) + '</p></details>').join('')}
      </div>
    </div>
  </section>

  <section id="process" class="section shell">
    <div class="section-center reveal">
      <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${t.processLabel}</span></div>
      <h2>${t.processHeading}</h2>
      <p class="section-sub">${t.processSub}</p>
    </div>
    <div class="process-grid">
      ${s.process.map((step, i) => '<article class="cosmic-panel process-card reveal"><span class="step-num">' + num(i + 1) + '</span><h3>' + e(step.name) + '</h3><p>' + e(step.description) + '</p></article>').join('')}
    </div>
  </section>
</main>`;
  return documentPage(lang, body);
}

function paragraphs(value) {
  return value.split('\n').filter(Boolean).map(line => (line.startsWith('- ') ? '<p class="bullet">' + e(line.slice(2)) + '</p>' : '<p>' + e(line) + '</p>')).join('');
}

export function projectPage(lang, slug) {
  const t = copy[lang];
  const p = upgradedProjects.find(item => item.slug === slug);
  if (!p) return notFoundPage(lang);
  const loc = p[lang];
  const idx = upgradedProjects.indexOf(p);
  const next = upgradedProjects[(idx + 1) % upgradedProjects.length];
  const related = upgradedProjects.filter(item => item.slug !== p.slug && item.filters.some(f => p.filters.includes(f))).slice(0, 3);

  const narrativeSections = [
    [t.secOverview, loc.overview],
    [t.secChallenge, loc.challenge],
    [t.secObjectives, loc.objectives],
    [t.secStrategy, loc.strategy],
    [t.secExecution, loc.execution]
  ];

  const body = `<main id="main" class="page-content case-main">
  <section class="case-hero shell">
    <a class="back-link" href="${route(lang)}#work">← ${t.home}</a>
    <div class="welcome-box">${sparkleIcon}<span class="welcome-text">${num(idx + 1)} / ${num(upgradedProjects.length)} · ${e(loc.category)}</span></div>
    <h1>${e(loc.name)}</h1>
    <p class="case-subtitle">${e(loc.subtitle)}</p>
    <p class="case-intro">${e(loc.summary)}</p>
    <div class="case-meta">
      <div class="cosmic-panel meta-box"><span>${t.role}</span><strong>${e(loc.role)}</strong></div>
      <div class="cosmic-panel meta-box"><span>${t.category}</span><strong>${e(loc.category)}</strong></div>
      <div class="cosmic-panel meta-box"><span>${t.timeline}</span><strong>${e(p.timeline)}</strong></div>
    </div>
    <a href="${e(p.cover)}" target="_blank" rel="noopener noreferrer" class="case-cover lightbox-trigger" data-src="${e(p.cover)}" data-caption="${e(loc.galleryCaption)}" aria-label="${t.zoomHint}: ${e(loc.name)}">
      <div class="stage-media ${p.coverType === 'concept' ? 'is-mockup' : ''}">
        <img src="${e(p.cover)}" alt="${e(loc.name)} — ${e(loc.subtitle)}" width="960" height="600">
      </div>
      <span class="zoom-pill">${t.zoomHint} ↗</span>
    </a>
  </section>

  <div class="case-body shell">
    ${narrativeSections.map(([label, textVal], j) => '<section class="case-section"><div class="case-section-label"><span>' + num(j + 1) + '</span><h2>' + e(label) + '</h2></div><div class="case-section-copy">' + paragraphs(textVal) + '</div></section>').join('')}
    <section class="case-section">
      <div class="case-section-label"><span>06</span><h2>${t.secDeliverables}</h2></div>
      <div class="case-section-copy"><ul class="deliverables-list">${loc.deliverables.map(item => '<li>' + e(item) + '</li>').join('')}</ul></div>
    </section>
    <section class="case-section">
      <div class="case-section-label"><span>07</span><h2>${t.secStack}</h2></div>
      <div class="case-section-copy"><div class="tags tags-lg">${p.stack.map(st => '<span>' + e(st) + '</span>').join('')}</div></div>
    </section>
    <section class="case-section">
      <div class="case-section-label"><span>08</span><h2>${t.secOutcome}</h2></div>
      <div class="case-section-copy"><div class="outcome-box">${paragraphs(loc.outcome)}</div></div>
    </section>
    <section class="case-section">
      <div class="case-section-label"><span>09</span><h2>${t.secGallery}</h2></div>
      <div class="case-section-copy">
        <a href="${e(p.cover)}" target="_blank" rel="noopener noreferrer" class="gallery-card lightbox-trigger" data-src="${e(p.cover)}" data-caption="${e(loc.galleryCaption)}">
          <img src="${e(p.cover)}" alt="${e(loc.galleryCaption)}" loading="lazy">
          <span>${e(loc.galleryCaption)} · <strong>${t.zoomHint}</strong></span>
        </a>
      </div>
    </section>
  </div>

  <section class="related-section shell">
    <p class="panel-kicker">${t.related}</p>
    <div class="related-grid">
      ${related.map(r => '<a class="cosmic-panel related-card" href="' + route(lang, r.slug) + '"><span class="step-num">' + e(r.timeline) + '</span><h3>' + e(r[lang].name) + '</h3><p>' + e(r[lang].subtitle) + '</p></a>').join('')}
    </div>
  </section>

  <section class="next-project shell">
    <a class="cosmic-panel next-card" href="${route(lang, next.slug)}">
      <div><span class="panel-kicker">${t.next}</span><h2>${e(next[lang].name)}</h2><p>${e(next[lang].subtitle)} · ${e(next.timeline)}</p></div>
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
  const pos = positioning[lang];
  const title = project ? project[lang].name + ' — ' + pos.name : pos.name + ' — ' + pos.role;
  const description = project ? project[lang].summary : pos.intro;
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#030014"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}"><link rel="alternate" hreflang="vi" href="${route('vi', project?.slug)}"><link rel="alternate" hreflang="en" href="${route('en', project?.slug)}"><link rel="alternate" hreflang="x-default" href="${route('vi', project?.slug)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts/font.css"><link rel="stylesheet" href="/style.css"><script type="module" src="/app.js"></script><script type="module" src="/space.js"></script></head><body id="top">${header(lang, project)}${body}${footer(lang)}</body></html>`;
}

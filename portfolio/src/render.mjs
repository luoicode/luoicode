import vi from './content/vi.json' with { type: 'json' };
import en from './content/en.json' with { type: 'json' };

// The old English endpoint omits shared media. Reuse the published assets,
// keeping only text localized rather than dropping every English cover.
export const content = { vi, en: {
  ...en,
  media: vi.media,
  projects: en.projects.map(project => ({
    ...project,
    coverId: project.coverId || vi.projects.find(shared => shared.slug === project.slug)?.coverId || ''
  }))
} };
export const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e = escape;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const star = '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="m44 0 12 0 0 32 23-23 9 9-23 23h35v13H66l24 24-9 9-25-25v38H44V65L19 90l-9-9 24-25H0V44h34L10 20l9-9 25 25z"/></svg>';
const portrait = '/media/b711c802-4f85-41ed-8f5b-bb58867ab1c4.webp';
const copy = {
  vi: {work:'Dự án',about:'Về tôi',contact:'Cùng hợp tác',menu:'Mở menu',close:'Đóng menu',skip:'Đến nội dung chính',available:'Sẵn sàng cho những ý tưởng mới',creative:'CREATIVE & PERFORMANCE MARKETER',hero1:'Tư duy',hero2:'sáng tạo.',hero3:'Hiệu quả',hero4:'thực tế.',intro:'Kết nối sự thấu hiểu, ý tưởng và dữ liệu. Tôi tạo nên nội dung không chỉ để được nhìn thấy — mà để tạo ra tác động.',view:'Khám phá dự án',cv:'Tải CV',scroll:'MỘT CHÚT VỀ TÔI, NHIỀU HƠN VỀ CÔNG VIỆC.',selected:'DỰ ÁN TIÊU BIỂU',work1:'Không chỉ là',work2:'ý tưởng hay.',workIntro:'Mỗi dự án là một bài toán khác nhau. Đây là cách tôi biến sự tò mò thành những giải pháp cụ thể.',all:'Tất cả',detail:'Khám phá dự án',aboutLabel:'NGƯỜI ĐỨNG SAU Ý TƯỞNG',about1:'Xin chào,',about2:'mình là Huy.',aboutNote:'Tò mò về con người. Nghiêm túc với sáng tạo.',journey:'HÀNH TRÌNH ĐÃ QUA',expertise:'TÔI CÓ THỂ GIÚP GÌ?',expertise1:'Sáng tạo có',expertise2:'cơ sở.',expertiseIntro:'Từ câu hỏi đầu tiên đến lần tối ưu tiếp theo.',process:'CÁCH TÔI LÀM VIỆC',process1:'Ý tưởng tốt.',process2:'Không đến ngẫu nhiên.',processIntro:'Một quy trình rõ ràng, dành chỗ cho những điều bất ngờ.',contactLabel:'BẠN ĐANG ẤP Ủ ĐIỀU GÌ?',contact1:'Cùng tạo nên',contact2:'điều khác biệt.',say:'Kể tôi nghe ý tưởng của bạn',back:'Về đầu trang',home:'Tất cả dự án',role:'VAI TRÒ',industry:'LĨNH VỰC',period:'THỜI GIAN',next:'DỰ ÁN TIẾP THEO',read:'Xem dự án',notFound:'Không tìm thấy trang',notFoundBody:'Có thể đường dẫn đã thay đổi. Mình quay về trang chủ nhé.',goHome:'Về trang chủ',showing:'dự án',light:'Chuyển giao diện sáng',dark:'Chuyển giao diện tối'},
  en: {work:'Selected work',about:'About me',contact:'Let’s talk',menu:'Open menu',close:'Close menu',skip:'Skip to content',available:'Open to new ideas & collaborations',creative:'CREATIVE & PERFORMANCE MARKETER',hero1:'Creative',hero2:'thinking.',hero3:'Real-world',hero4:'impact.',intro:'Connecting insight, ideas, and data. I create content that does more than get seen — it makes a difference.',view:'Explore my work',cv:'Download CV',scroll:'A LITTLE ABOUT ME. A LOT ABOUT THE WORK.',selected:'SELECTED WORK',work1:'More than',work2:'a good idea.',workIntro:'Every project is a different challenge. Here’s how I turn curiosity into considered, practical solutions.',all:'All work',detail:'Explore project',aboutLabel:'THE PERSON BEHIND THE IDEAS',about1:'Hey there,',about2:'I’m Huy.',aboutNote:'Curious about people. Serious about creativity.',journey:'THE JOURNEY SO FAR',expertise:'HOW I CAN HELP',expertise1:'Creativity.',expertise2:'With purpose.',expertiseIntro:'From the first question to the next iteration.',process:'HOW I WORK',process1:'Good ideas.',process2:'Not by accident.',processIntro:'A clear process, with room for the unexpected.',contactLabel:'HAVE SOMETHING IN MIND?',contact1:'Let’s make',contact2:'a difference.',say:'Tell me what you’re thinking',back:'Back to top',home:'All projects',role:'MY ROLE',industry:'INDUSTRY',period:'TIMELINE',next:'UP NEXT',read:'View project',notFound:'Page not found',notFoundBody:'This page may have moved. Let’s get you back to the good stuff.',goHome:'Back to home',showing:'projects',light:'Switch to light theme',dark:'Switch to dark theme'}
};
const num = n => String(n).padStart(2, '0');
export const route = (lang, slug) => `${lang === 'en' ? '/en' : ''}${slug ? `/work/${slug}/` : '/'}`;
const cv = url => url.replace(/\/edit(?:\?.*)?$/, '/export?format=pdf');
const media = (data, id) => data.media.find(m => m.id === id);
const label = (number, title) => `<div class="section-label"><span class="section-index">${number} /</span><span>${e(title)}</span></div>`;

function header(lang, activeProject) {
  const t = copy[lang], home = route(lang);
  const languageLink = other => route(other, activeProject?.slug);
  return `<a href="#main" class="skip-link">${t.skip}</a><header class="header" id="top"><div class="shell header-inner">
    <a class="wordmark" href="${home}" aria-label="Huy — ${lang === 'vi' ? 'Trang chủ' : 'Home'}">huy<span>®</span></a>
    <span class="header-caption">INDEPENDENT CREATIVE<br>HÀ NỘI, VIỆT NAM</span>
    <nav id="navigation" class="navigation" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}"><a href="${home}#work">${t.work}</a><a href="${home}#about">${t.about}</a><a class="mobile-contact" href="${home}#contact">${t.contact}</a></nav>
    <div class="header-tools"><div class="languages" aria-label="${lang === 'vi' ? 'Ngôn ngữ' : 'Language'}"><a href="${languageLink('vi')}" lang="vi" ${lang === 'vi' ? 'aria-current="page"' : ''}>VI</a><span>/</span><a href="${languageLink('en')}" lang="en" ${lang === 'en' ? 'aria-current="page"' : ''}>EN</a></div><button class="theme-toggle" type="button" aria-label="${t.dark}" data-light="${t.light}" data-dark="${t.dark}" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg></button><a class="button small header-contact" href="${home}#contact">${t.contact}${arrow}</a><button class="menu-toggle" aria-controls="navigation" aria-expanded="false" aria-label="${t.menu}" data-open="${t.menu}" data-close="${t.close}"><span></span><span></span></button></div>
  </div></header>`;
}

function footer(lang) {
  const t = copy[lang], s = content[lang].settings;
  return `<footer id="contact" class="contact"><div class="shell"><div class="contact-top">${label('05',t.contactLabel)}<span class="availability"><i></i>${e(s.availability)}</span></div><a class="contact-headline" href="mailto:${e(s.email)}"><h2>${t.contact1}<br><em>${t.contact2}</em></h2><span class="contact-arrow">${arrow}</span></a><div class="contact-links"><a href="mailto:${e(s.email)}">${e(s.email)}${arrow}</a><a href="tel:${e(s.phone.replace(/\s/g,'').replace(/^0/,'+84'))}">${e(s.phone)}${arrow}</a><a href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">${t.cv}${arrow}</a></div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${e(s.name)}</span><span>${e(s.footer)}</span><a href="#top">${t.back} ↑</a></div></div></footer>`;
}

function projectCard(p, i, lang) {
  const d = content[lang], t = copy[lang], cover = media(d,p.coverId);
  return `<article class="project" data-category="${e(p.category)}"><a class="project-image project-${e(p.slug)}" href="${route(lang,p.slug)}" aria-label="${t.detail}: ${e(p.name)}"><div class="project-image-inner">${cover ? `<img src="${e(cover.url)}" alt="${e(cover.alt || p.name)}" width="800" height="800" loading="lazy" decoding="async">` : `<span>${e(p.name)}</span>`}</div><span class="project-id">${num(i+1)} / ${num(d.projects.length)}</span><span class="project-arrow">${arrow}</span></a><div class="project-info"><div><p class="project-category">${e(p.category)} <span>·</span> ${e(p.period)}</p><h3><a href="${route(lang,p.slug)}">${e(p.name)}</a></h3></div><span class="project-role">${e(p.role)}</span></div><p class="project-summary">${e(p.summary)}</p><div class="tags">${p.tags.map(tag => `<span>${e(tag)}</span>`).join('')}</div></article>`;
}

export function homePage(lang) {
  const d=content[lang], s=d.settings, t=copy[lang];
  const categories=[...new Set(d.projects.map(p=>p.category))];
  const body=`<main id="main">
    <section class="hero shell"><div class="hero-kicker"><span class="availability"><i></i>${t.available}</span><span>PORTFOLIO — ${new Date().getUTCFullYear()}</span></div><div class="hero-grid"><div class="hero-content"><p class="eyebrow">${t.creative}</p><h1>${t.hero1}<br><span>${t.hero2}</span><br>${t.hero3} <em>${t.hero4}</em></h1><div class="hero-bottom"><span class="tiny-star">${star}</span><p>${t.intro}</p></div><div class="hero-actions"><a class="button" href="#work">${t.view}${arrow}</a><a class="text-link" href="${e(cv(s.cvUrl))}" target="_blank" rel="noopener noreferrer">${t.cv}<span>↗</span></a></div></div><div class="hero-art"><span class="art-orbit" aria-hidden="true"></span><span class="art-star" aria-hidden="true">${star}</span><div class="portrait-frame"><img class="hero-portrait" src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" fetchpriority="high"><div class="portrait-caption"><span>NGUYỄN HỮU HUY</span><span>CREATIVE MIND, CURIOUS SOUL ↗</span></div></div><div class="portrait-note"><span>01 /</span><strong>INSIGHT<br>MEETS<br><em>IMPACT.</em></strong></div><div class="art-coordinate">21°01′ N &nbsp; 105°50′ E<br>BASED IN HANOI, VIETNAM</div></div></div><div class="hero-footnote"><span>${t.scroll}</span><a href="#work" aria-label="${t.view}">↓</a></div></section>
    <div class="skill-strip" aria-label="${e(s.copy.expertiseLabel)}"><div class="shell">${[s.skills[0],s.skills[1],s.skills[2],'Meta & TikTok Ads'].map(x=>`<span>${e(x)}</span><b aria-hidden="true">✳</b>`).join('')}</div></div>
    <section id="work" class="work shell section">${label('01',t.selected)}<div class="section-heading"><h2>${t.work1}<br><em>${t.work2}</em></h2><p>${t.workIntro}</p></div><div class="work-tools"><div class="filters" role="group" aria-label="${lang==='vi'?'Lọc dự án':'Filter projects'}"><button type="button" class="filter active" data-filter="all" aria-pressed="true">${t.all}<sup>${num(d.projects.length)}</sup></button>${categories.map(c=>`<button type="button" class="filter" data-filter="${e(c)}" aria-pressed="false">${e(c)}</button>`).join('')}</div><span class="work-count" aria-live="polite" data-suffix="${t.showing}">${num(d.projects.length)} ${t.showing}</span></div><div class="project-grid">${d.projects.map((p,i)=>projectCard(p,i,lang)).join('')}</div></section>
    <section id="about" class="about"><div class="shell section">${label('02',t.aboutLabel)}<div class="about-grid"><div class="about-photo"><img src="${portrait}" alt="${e(s.name)}" width="1920" height="1440" loading="lazy"><div class="photo-label">${e(s.location)} <span>↗</span></div><span class="about-star" aria-hidden="true">${star}</span></div><div class="about-copy"><h2>${t.about1}<br><em>${t.about2}</em></h2><p class="about-lead">${t.aboutNote}</p><p>${e(s.about)}</p><a class="text-link" href="#contact">${e(s.copy.aboutCta)}${arrow}</a></div></div><div class="experience"><h3 class="eyebrow">${t.journey}</h3><div>${s.experience.map(x=>`<details class="experience-item"><summary><span class="experience-period">${e(x.period)}</span><span><strong>${e(x.company)}</strong><small>${e(x.role)}</small></span><span class="plus" aria-hidden="true">+</span></summary><p>${e(x.description)}</p></details>`).join('')}</div></div></div></section>
    <section class="expertise shell section">${label('03',t.expertise)}<div class="expertise-grid"><div><h2>${t.expertise1}<br><em>${t.expertise2}</em></h2><p class="section-intro">${t.expertiseIntro}</p><div class="expertise-symbol" aria-hidden="true">${star}</div></div><div class="skill-list">${s.skills.map((x,i)=>`<div><span>${num(i+1)}</span><h3>${e(x)}</h3>${arrow}</div>`).join('')}</div></div></section>
    <section class="process"><div class="shell section">${label('04',t.process)}<div class="section-heading"><h2>${t.process1}<br><em>${t.process2}</em></h2><p>${t.processIntro}</p></div><div class="process-list">${s.process.map((x,i)=>`<details name="process" ${i===0?'open':''}><summary><span>${num(i+1)}</span><h3>${e(x.name)}</h3><span class="plus" aria-hidden="true">+</span></summary><p>${e(x.description)}</p></details>`).join('')}</div></div></section>
  </main>`;
  return documentPage(lang,body);
}

function paragraphs(value) {
  return value.split('\n').filter(Boolean).map(line=>line.startsWith('- ')?`<p class="bullet">${e(line.slice(2))}</p>`:`<p>${e(line)}</p>`).join('');
}

export function projectPage(lang,slug) {
  const d=content[lang],t=copy[lang],p=d.projects.find(p=>p.slug===slug);
  if(!p) return notFoundPage(lang);
  const cover=media(d,p.coverId),i=d.projects.indexOf(p),next=d.projects[(i+1)%d.projects.length];
  const sections=[['overview','caseOverview'],['challenge','caseChallenge'],['objectives','caseObjectives'],['insights','caseInsights'],['strategy','caseStrategy'],['angles','caseAngles'],['execution','caseExecution'],['results','caseResults'],['learnings','caseLearnings']].filter(([key])=>p[key]?.trim() && (key!=='results'||p.resultsVerified));
  const body=`<main id="main" class="case-main"><section class="case-hero shell"><a class="back-link" href="${route(lang)}#work">← ${t.home}</a><div class="case-heading"><div><p class="eyebrow">${e(p.category)} / ${num(i+1)}</p><h1>${e(p.name)}</h1></div><span class="case-star" aria-hidden="true">${star}</span></div><p class="case-intro">${e(p.summary)}</p><div class="case-meta">${[[t.role,p.role],[t.industry,p.industry],[t.period,p.period]].map(([l,v])=>`<div><span class="eyebrow">${l}</span><p>${e(v)}</p></div>`).join('')}</div><div class="case-cover project-${e(p.slug)}">${cover?`<img src="${e(cover.url)}" alt="${e(cover.alt||p.name)}" width="1000" height="1000">`:e(p.name)}</div></section><div class="case-body shell">${sections.map(([key,labelKey],j)=>`<section class="case-section"><div class="section-label"><span class="section-index">${num(j+1)} /</span><h2>${e(d.settings.copy[labelKey])}</h2></div><div>${paragraphs(p[key])}</div></section>`).join('')}</div><section class="next-project shell"><p class="eyebrow">${t.next}</p><a href="${route(lang,next.slug)}"><h2>${e(next.name)}</h2>${arrow}</a></section></main>`;
  return documentPage(lang,body,p);
}

export function notFoundPage(lang='vi') {
  const t=copy[lang];return documentPage(lang,`<main id="main" class="not-found shell"><span class="eyebrow">404 /</span><h1>${t.notFound}</h1><p>${t.notFoundBody}</p><a class="button" href="${route(lang)}">${t.goHome}${arrow}</a></main>`,null,true);
}

function documentPage(lang,body,project=null,noindex=false) {
  const s=content[lang].settings,title=project?.seoTitle||s.seoTitle,description=project?.seoDescription||s.seoDescription;
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="theme-color" content="#f5f3eb"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang==='vi'?'vi_VN':'en_US'}"><link rel="alternate" hreflang="vi" href="${route('vi',project?.slug)}"><link rel="alternate" hreflang="en" href="${route('en',project?.slug)}"><link rel="alternate" hreflang="x-default" href="${route('vi',project?.slug)}">${noindex?'<meta name="robots" content="noindex">':''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts/font.css"><link rel="stylesheet" href="/style.css"><script src="/theme.js"></script><script type="module" src="/app.js"></script></head><body>${header(lang,project)}${body}${footer(lang)}</body></html>`;
}

/* VIEW · pages (build time)
   Page layouts and shell (navbar, footer, page heads) for every TR/EN page and
   the admin panel. Section content comes from views/render.js, data from
   models/content.js. tools/build.mjs writes the output to static HTML files. */
import "../models/content.js";
import "./render.js";
const D = globalThis.SITE_DEFAULTS;
const { R, u, fx, bigIcon, setBase } = globalThis.SiteRender;

const ICON = {
  menu: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0 16 8 8 16 0 8Zm0 4L4 8l4 4 4-4Z" fill="currentColor" fill-rule="evenodd"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
};
const MONO = `<svg class="mono-mark" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="ye-mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".55" stop-color="#ffb86b"/><stop offset="1" stop-color="#9d8cff"/></linearGradient></defs><path fill="url(#ye-mg)" fill-rule="evenodd" d="M32 1 63 32 32 63 1 32Zm0 6L7 32l25 25 25-25Z"/><path fill="#10131c" stroke="url(#ye-mg)" stroke-width="1.5" d="M32 12 52 32 32 52 12 32Z"/><text x="32" y="37.5" text-anchor="middle" font-family="Tektur, sans-serif" font-weight="800" font-size="14" fill="#f4f1ff" letter-spacing=".5">YE</text></svg>`;


/* ---------------- visual-show helpers ---------------- */
/* Infinite marquee: keywords + star/geometric icons, right to left */
const MQ = {
  tr: ["Python", "Yapay Zekâ", "Photoshop", "HTML · CSS", "JavaScript", "Görsel Tasarım", "Karakalem", "Smart Object", "Akdeniz Üniversitesi", "Antalya"],
  en: ["Python", "Artificial Intelligence", "Photoshop", "HTML · CSS", "JavaScript", "Visual Design", "Charcoal", "Smart Object", "Akdeniz University", "Antalya"],
};
const STAR4 = '<svg class="mq-ic" viewBox="0 0 24 24"><path d="M12 1c.8 5.6 5.4 10.2 11 11-5.6.8-10.2 5.4-11 11-.8-5.6-5.4-10.2-11-11C6.6 11.2 11.2 6.6 12 1Z"/></svg>';
const RINGIC = '<svg class="mq-ic mq-ring" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 5 18 16H6Z"/></svg>';
function marquee(L, variant = "", words = MQ[L]) {
  const icons = [STAR4, u("diamond", "u mq-ic"), RINGIC, u("star", "u mq-ic")];
  const seq = words.map((w, i) => `<span class="mq-item">${icons[i % icons.length]}<span>${w}</span></span>`).join("");
  return `<div class="marquee${variant ? " " + variant : ""}" aria-hidden="true"><div class="mq-track"><div class="mq-group">${seq}${seq}</div><div class="mq-group">${seq}${seq}</div></div></div>`;
}

/* ---------------- site map ----------------
   Paths are relative to the site root:
     index.html        English home (entry point)
     en/*.html         English sub-pages
     tr/*.html         Turkish pages (tr/index.html = Turkish home)
     admin/index.html  CMS panel  */
const PAGES = [
  { key: "home", unit: "diamond", tr: ["tr/index.html", "Anasayfa"], en: ["index.html", "Home"] },
  { key: "about", unit: "eye", tr: ["tr/hakkimda.html", "Hakkımda"], en: ["en/about.html", "About"] },
  { key: "projects", unit: "star", tr: ["tr/projeler.html", "Projeler"], en: ["en/projects.html", "Projects"] },
  { key: "gallery", unit: "knot", tr: ["tr/galeri.html", "Galeri"], en: ["en/gallery.html", "Gallery"] },
  { key: "blog", unit: "hook", tr: ["tr/blog.html", "Blog"], en: ["en/blog.html", "Blog"] },
  { key: "contact", unit: "cross", tr: ["tr/iletisim.html", "İletişim"], en: ["en/contact.html", "Contact"] },
];
const ADMIN = "admin/index.html";

/* The page currently being built (root-relative). Every link is emitted relative to it. */
let CUR = "index.html";
const dirOf = (file) => file.split("/").slice(0, -1);
const baseOf = (file) => "../".repeat(dirOf(file).length);
function rel(to) {
  const from = dirOf(CUR), parts = to.split("/");
  let i = 0;
  while (i < from.length && i < parts.length - 1 && from[i] === parts[i]) i++;
  return "../".repeat(from.length - i) + parts.slice(i).join("/");
}
/* root-relative asset path → path from the current page */
const A = (path) => baseOf(CUR) + path;
function begin(file) { CUR = file; setBase(baseOf(file)); }
const href = (key, L) => rel(PAGES.find((p) => p.key === key)[L][0]);
const T = (L, tr, en) => (L === "tr" ? tr : en);
const num = (i) => String(i).padStart(2, "0");

/* ---------------- shared chrome ---------------- */
function navList(L, current, extraCls = "") {
  return `<ol>${PAGES.map((p, i) => {
    const [file, label] = p[L];
    const cur = p.key === current ? ' aria-current="page"' : "";
    return `<li><a href="${rel(file)}"${cur}>${u(p.unit)}<span>${label}</span><span class="num">${num(i + 1)}</span></a></li>`;
  }).join("")}</ol>`;
}
function langSwitch(L, key) {
  const other = L === "tr" ? "en" : "tr";
  const trEl = L === "tr" ? `<span aria-current="true">TR</span>` : `<a href="${href(key, "tr")}" hreflang="tr" lang="tr" data-lang-switch title="Türkçe">TR</a>`;
  const enEl = L === "en" ? `<span aria-current="true">EN</span>` : `<a href="${href(key, "en")}" hreflang="en" lang="en" data-lang-switch title="English">EN</a>`;
  return `<div class="lang" role="group" aria-label="${T(L, "Dil seçimi", "Language")}">${trEl}${enEl}</div>`;
}
function shell(L, key, { title, desc, body }) {
  const idx = PAGES.findIndex((p) => p.key === key);
  const other = L === "tr" ? "en" : "tr";
  return `<!DOCTYPE html>
<html lang="${L}" data-base="${baseOf(CUR)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="author" content="Yunus Emre Ersoy">
<meta name="theme-color" content="#07080d">
<link rel="alternate" hreflang="${L}" href="${href(key, L)}">
<link rel="alternate" hreflang="${other}" href="${href(key, other)}">
<link rel="preload" href="${A("assets/fonts/tektur-latin.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%2310131c' d='M16 1 31 16 16 31 1 16Z'/%3E%3Cpath fill='%23ff6b6b' d='M16 9l7 7-7 7-7-7Z'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${A("assets/css/style.css")}">
<script>document.documentElement.classList.add("js");</script>
</head>
<body data-page="${key}">
<a class="skip" href="#main">${T(L, "İçeriğe geç", "Skip to content")}</a>
<div class="fx-layer" aria-hidden="true">
  <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="orb o4"></span>
  <canvas id="net"></canvas>
  <span class="grid-tex"></span><span class="grain"></span>
</div>
<div class="cursor-glow" aria-hidden="true"></div><div class="cursor-ring" aria-hidden="true"></div>
<div class="progress" aria-hidden="true"></div>
<header class="navbar">
  <a class="brand" href="${href("home", L)}">${MONO}<span class="brand-name">Yunus Emre<small> Ersoy</small></span></a>
  <nav class="nav main-nav" aria-label="${T(L, "Ana menü", "Main menu")}">${navList(L, key)}</nav>
  <div class="nav-tools">
    ${langSwitch(L, key)}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav">${ICON.menu}${T(L, "Menü", "Menu")}</button>
  </div>
</header>
<nav class="nav mobile-nav" id="mobile-nav" hidden aria-label="${T(L, "Mobil menü", "Mobile menu")}">${navList(L, key)}</nav>
<main id="main">
${body}
</main>
${footer(L)}
<script src="${A("app/models/content.js")}"></script>
<script src="${A("app/models/store.js")}"></script>
<script src="${A("app/views/render.js")}"></script>
<script src="${A("app/controllers/page.js")}"></script>
<script src="${A("app/controllers/site.js")}"></script>
</body>
</html>
`;
}
function footer(L) {
  return `<footer class="foot">
  ${marquee(L, "thin")}
  <div class="foot-mark" aria-hidden="true">Yunus Emre Ersoy</div>
  <div class="foot-inner">
    <div>
      <h2>Yunus Emre Ersoy</h2>
      <p>${T(L, "Akdeniz Üniversitesi Bilgisayar Programcılığı öğrencisi. Python, yapay zekâ ve görsel tasarım.", "Computer Programming student at Akdeniz University. Python, AI and visual design.")}</p>
      <div class="social-row" data-cms="footSocial">${R.footSocial(L, D)}</div>
    </div>
    <div><h3>${T(L, "Levhalar", "Plates")}</h3><ul class="cols2">${PAGES.map((p) => `<li><a href="${rel(p[L][0])}">${p[L][1]}</a></li>`).join("")}</ul></div>
    <div><h3>${T(L, "İletişim", "Contact")}</h3><ul data-cms="footContact">${R.footContact(L, D)}</ul></div>
  </div>
  <div class="foot-base"><span>© 2026 Yunus Emre Ersoy · ${T(L, "Tüm hakları saklıdır", "All rights reserved")}</span><span>${T(L, "Vize projesi · Akdeniz Üniversitesi", "Midterm project · Akdeniz University")}</span><a class="admin-link" href="${rel(ADMIN)}" rel="nofollow">Admin</a></div>
</footer>`;
}
const plateHead = (L, key, h1, lead) => {
  const i = PAGES.findIndex((x) => x.key === key);
  const p = PAGES[i];
  return `<header class="wrap plate-head">
  <div class="ph-copy"><p class="kicker"><span class="dot"></span>${T(L, "Levha", "Plate")} ${num(i + 1)} / ${num(PAGES.length)}</p><h1><span class="grad-text">${h1}</span></h1><p class="lead">${lead}</p></div>
  <div class="ph-orbit" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><i class="sat s1"></i><i class="sat s2"></i><i class="sat s3"></i>${u(p.unit, "u unit-big")}</div>
</header>
<div class="beam" aria-hidden="true"></div>`;
};
const secHead = (h2, extra = "") => `<div class="sec-head"><h2 class="h-section">${h2}</h2>${extra}<div class="divider" aria-hidden="true">${u("diamond")}</div></div>`;

/* ---------------- HOME ---------------- */
function home(L) {
  begin(PAGES.find((p) => p.key === "home")[L][0]);
  const portrait = `<img src="${A("assets/img/profile/portre-ceket.jpg")}" alt="${T(L, "Siyah ceketli Yunus Emre Ersoy portresi", "Portrait of Yunus Emre Ersoy in a black jacket")}" width="787" height="768" fetchpriority="high">`;
  const body = `<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="kicker"><span class="dot"></span>${T(L, "Bilgisayar Programcılığı · Python · Görsel Tasarım", "Computer Programming · Python · Visual Design")}</p>
    <h1 class="display" id="hero-title">Yunus Emre<br><span class="grad-text">Ersoy</span></h1>
    <div class="divider" aria-hidden="true">${u("diamond")}</div>
    <p class="role">Akdeniz ${T(L, "Üniversitesi", "University")} · Antalya</p>
    <p class="intro">${T(L,
      "Akdeniz Üniversitesi Bilgisayar Programcılığı bölümünde okuyorum. Python ve yapay zekâya odaklanıyor, boş kalan her saatimi Photoshop'ta renk ve ışıkla geçiriyorum. Burada kod ve tasarım çalışmalarımı, fotoğraflarımı ve yazılarımı bulacaksınız.",
      "I study Computer Programming at Akdeniz University. I focus on Python and artificial intelligence, and spend my spare hours on colour and light in Photoshop. Here you'll find my code and design work, my photos and my writing.")}</p>
    <div class="actions">
      <a class="btn" href="${href("projects", L)}">${u("diamond")}${T(L, "Çalışmalarımı gör", "See the work")}${u("diamond")}</a>
      <a class="link" href="${href("contact", L)}">${T(L, "Bana yazın", "Write to me")} ${u("diamond")}</a>
    </div>
    <ul class="hero-stats" data-cms="heroStats">${R.heroStats(L, D)}</ul>
  </div>
  <div class="hero-visual">
    <div class="orbits" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><i class="sat s1"></i><i class="sat s2"></i><i class="sat s3"></i></div>
    <figure class="portrait-frame">
      ${fx(`<div class="pfx-media">${portrait}</div>`, ["Python · AI", "Photoshop", T(L, "Antalya · 2006", "Antalya · 2006")], "big")}
      <figcaption><span>Yunus Emre Ersoy</span><span>Antalya · 2006</span></figcaption>
    </figure>
  </div>
  <a class="scroll-cue" href="#pr-title" aria-label="${T(L, "Aşağı kaydır", "Scroll down")}"><span></span></a>
</section>
<div class="marquee-duo">${marquee(L, "big")}${marquee(L, "alt", [...MQ[L]].reverse())}</div>

<section class="wrap sec bento-home" aria-labelledby="pr-title" data-cms="homeBento">${R.homeBento(L, D)}</section>
<div class="wrap pr-more glass"><span class="label" data-cms="featuredNote">${R.featuredNote(L, D)}</span><a class="link" href="${href("projects", L)}">${T(L, "Tüm projeler", "All projects")} ${u("diamond")}</a></div>

<section class="wrap sec" aria-labelledby="gal-title">
  ${secHead(`<span id="gal-title">${T(L, "Galeriden kareler", "From the gallery")}</span>`, `<a class="link" href="${href("gallery", L)}"><span>${T(L, "Galeriyi aç", "Open the gallery")} (<span data-cms="galleryCount">${R.galleryCount(L, D)}</span>)</span> ${u("diamond")}</a>`)}
  <div class="strip" data-cms="strip">${R.strip(L, D)}</div>
</section>`;
  return shell(L, "home", {
    title: T(L, "Yunus Emre Ersoy · Anasayfa", "Yunus Emre Ersoy · Home"),
    desc: T(L, "Yunus Emre Ersoy'un kişisel portfolyosu: Akdeniz Üniversitesi Bilgisayar Programcılığı öğrencisi; Python, yapay zekâ ve görsel tasarım çalışmaları.", "Personal portfolio of Yunus Emre Ersoy, Computer Programming student at Akdeniz University: Python, AI and visual design work."),
    body,
  });
}

/* ---------------- ABOUT ---------------- */
function about(L) {
  begin(PAGES.find((p) => p.key === "about")[L][0]);
  const body = `${plateHead(L, "about", T(L, "Hakkımda", "About me"), T(L, "Yaratıcı bir zihin, analitik çözümler ve bitmeyen bir öğrenme isteği.", "A creative mind, analytical solutions and a never-ending wish to learn."))}

<section class="wrap sec" aria-labelledby="intro-title">
  <div class="about-intro">
    <figure class="id-plate">${fx(`<div class="pfx-media"><img src="${A("assets/img/profile/vesikalik.jpg")}" alt="${T(L, "Yunus Emre Ersoy'un vesikalık fotoğrafı", "ID photo of Yunus Emre Ersoy")}" width="1152" height="1094"></div>`, [T(L, "Akdeniz Üni.", "Akdeniz Univ."), "2025 –", "Python · Photoshop"], "big")}<figcaption><span>Yunus Emre Ersoy</span><span>${T(L, "Vesikalık", "Portrait")}</span></figcaption></figure>
    <div>
      <h2 class="h-section" id="intro-title">${T(L, "Merhaba, ben Yunus Emre", "Hello, I'm Yunus Emre")}</h2>
      <div class="divider" aria-hidden="true">${u("diamond")}</div>
      <div class="prose" data-cms="bio">${R.bio(L, D)}</div>
      <div class="actions" style="margin-top:28px"><a class="btn" href="${href("projects", L)}">${u("diamond")}${T(L, "Çalışmalarıma göz at", "Browse my work")}${u("diamond")}</a></div>
    </div>
  </div>
</section>

<section class="wrap sec" style="padding-top:0" aria-labelledby="cv-title">
  ${secHead(`<span id="cv-title">${T(L, "Özgeçmiş", "Résumé")}</span>`)}
  <div class="two">
    <div class="glass panel tilt soft">
      <h3 class="h-sub" style="margin-bottom:18px">${T(L, "Eğitim", "Education")}</h3>
      <table class="cv">
        <caption class="sr-only">${T(L, "Eğitim geçmişi", "Education history")}</caption>
        <tbody data-cms="education">${R.education(L, D)}</tbody>
      </table>
    </div>
    <div class="glass panel tilt soft">
      <h3 class="h-sub" style="margin-bottom:18px">${T(L, "Kişisel bilgiler", "Personal details")}</h3>
      <table class="cv">
        <caption class="sr-only">${T(L, "Kişisel bilgiler", "Personal details")}</caption>
        <tbody data-cms="personal">${R.personal(L, D)}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="wrap sec" style="padding-top:0" id="yetenekler" aria-labelledby="skills-title">
  ${secHead(`<span id="skills-title">${T(L, "Yetenekler", "Skills")}</span>`, `<span class="label">${T(L, "Kendi değerlendirmem · 100 üzerinden", "Self-assessed · out of 100")}</span>`)}
  <ul class="skills glass panel" data-cms="skills">${R.skills(L, D)}</ul>
</section>

<section class="wrap sec" style="padding-top:0" aria-labelledby="int-title">
  ${secHead(`<span id="int-title">${T(L, "İlgi alanlarım", "Interests")}</span>`)}
  <ol class="ruled" data-cms="interests">${R.interests(L, D)}</ol>
</section>`;
  return shell(L, "about", {
    title: T(L, "Hakkımda · Yunus Emre Ersoy", "About · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy'un özgeçmişi, eğitimi (Akdeniz Üniversitesi Bilgisayar Programcılığı), yetenekleri ve ilgi alanları.", "Résumé, education (Akdeniz University, Computer Programming), skills and interests of Yunus Emre Ersoy."),
    body,
  });
}

/* ---------------- PROJECTS ---------------- */
function projects(L) {
  begin(PAGES.find((p) => p.key === "projects")[L][0]);
  const body = `${plateHead(L, "projects", T(L, "Projeler", "Projects"), T(L, "Fikir aşamasından bitmiş işe kadar üzerinde çalıştığım projeler. Her biri hem teknik gelişimimi hem de problem çözme yaklaşımımı gösteriyor.", "Projects I've worked on from idea to finished piece. Each one shows both my technical growth and how I approach a problem."))}
<section class="wrap sec" aria-label="${T(L, "Proje listesi", "Project list")}">
  <div class="sec-head" style="align-items:center">
    <div class="filters" role="group" aria-label="${T(L, "Projeleri filtrele", "Filter projects")}" data-filter-group="projects">
      <button type="button" data-filter="all" aria-pressed="true">${T(L, "Tümü", "All")}</button>
      <button type="button" data-filter="design" aria-pressed="false">${T(L, "Tasarım", "Design")}</button>
      <button type="button" data-filter="code" aria-pressed="false">${T(L, "Yazılım", "Code")}</button>
    </div>
    <p class="label" aria-live="polite" data-project-count data-template="${T(L, "{n} proje gösteriliyor", "Showing {n} projects")}">${R.projectCount(L, D)}</p>
  </div>
  <div class="grid-units bento" data-cms="projects">${R.projects(L, D)}</div>
</section>`;
  return shell(L, "projects", {
    title: T(L, "Projeler · Yunus Emre Ersoy", "Projects · Yunus Emre Ersoy"),
    desc: T(L, "Karakalem renklendirme, Smart Object, siyah beyaz kontrast, ürün tanıtımı, hesap makinesi ve yılan oyunu projeleri.", "Charcoal colorization, Smart Object, black and white contrast, product promotion, calculator and snake game projects."),
    body,
  });
}

/* ---------------- GALLERY ---------------- */
function gallery(L) {
  begin(PAGES.find((p) => p.key === "gallery")[L][0]);
  const body = `${plateHead(L, "gallery", T(L, "Galeri", "Gallery"), T(L, "Hayatımın farklı anlarından beni anlatan kareler. Büyütmek için fotoğrafa dokunun.", "Moments from different parts of my life. Tap a photo to enlarge it."))}
<section class="wrap sec" aria-label="${T(L, "Fotoğraflar", "Photos")}">
  <div class="gallery" data-cms="gallery">${R.gallery(L, D)}</div>
</section>
<dialog class="lightbox" id="lightbox" aria-label="${T(L, "Fotoğraf görüntüleyici", "Photo viewer")}">
  <div class="lb-bar"><span data-idx>01 / ${String(D.gallery.length).padStart(2, "0")}</span><button class="lb-btn" type="button" data-close aria-label="${T(L, "Kapat", "Close")}">${ICON.close}</button></div>
  <div class="lb-stage"><img src="${A("assets/img/gallery/calisma-masasi.jpg")}" alt="" loading="lazy"></div>
  <div class="lb-cap"><div><h2></h2><p></p></div><div class="lb-nav"><button class="lb-btn" type="button" data-prev aria-label="${T(L, "Önceki fotoğraf", "Previous photo")}">${ICON.prev}</button><button class="lb-btn" type="button" data-next aria-label="${T(L, "Sonraki fotoğraf", "Next photo")}">${ICON.next}</button></div></div>
</dialog>`;
  return shell(L, "gallery", {
    title: T(L, "Galeri · Yunus Emre Ersoy", "Gallery · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy'un fotoğraf galerisi: aile, futbol, basketbol, mezuniyet ve gündelik anlar.", "Photo gallery of Yunus Emre Ersoy: family, football, basketball, graduation and everyday moments."),
    body,
  });
}

/* ---------------- BLOG ---------------- */
function blog(L) {
  begin(PAGES.find((p) => p.key === "blog")[L][0]);
  const body = `<div class="blog">
<div class="post-list">
${plateHead(L, "blog", "Blog", T(L, "Yazılım, tasarım ve web üzerine notlarım. Bir kategoriye ya da etikete tıklayarak yazıları filtreleyebilirsiniz.", "Notes on software, design and the web. Click a category or tag to filter the articles."))}
<section class="wrap sec" aria-label="${T(L, "Yazılar", "Articles")}">
  <div class="post-index" data-cms="blogCards">${R.blogCards(L, D)}</div>
  <p class="filter-note" aria-live="polite"></p>
</section>
</div>
<div class="posts" data-cms="blogPosts">${R.blogPosts(L, D)}</div>
</div>`;
  return shell(L, "blog", {
    title: T(L, "Blog · Yunus Emre Ersoy", "Blog · Yunus Emre Ersoy"),
    desc: T(L, "Vibe coding, Photoshop'ta renk teorisi ve responsive tasarım ilkeleri üzerine yazılar.", "Articles on vibe coding, colour theory in Photoshop and responsive design principles."),
    body,
  });
}

/* ---------------- CONTACT ---------------- */
function contact(L) {
  begin(PAGES.find((p) => p.key === "contact")[L][0]);
  const body = `${plateHead(L, "contact", T(L, "İletişim", "Contact"), T(L, "Staj, proje fikri ya da bir soru: aşağıdaki formdan yazın veya doğrudan arayın.", "An internship, a project idea or a question: write through the form below or call me directly."))}
<section class="wrap sec" aria-label="${T(L, "İletişim bilgileri ve form", "Contact details and form")}">
  <div class="contact-grid">
    <div class="contact-info glass">
      ${bigIcon("person")}
      <h2 class="h-sub" style="margin-bottom:18px">${T(L, "Bilgiler", "Details")}</h2>
      <ul class="c-list" data-cms="contactList">${R.contactList(L, D)}</ul>
    </div>
    <div class="contact-form glass">
      <h2 class="h-sub" style="margin-bottom:8px">${T(L, "Mesaj gönderin", "Send a message")}</h2>
      <p class="muted" style="margin-bottom:22px">${T(L, "Gönder'e bastığınızda mesajınız kaydedilir ve e-posta uygulamanızda hazır olarak açılır.", "When you press Send, your message is saved and opens ready to go in your email app.")}</p>
      <form id="contact-form" class="form" novalidate>
        <div class="field"><label for="f-name">${T(L, "Adınız", "Your name")}</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name"><span class="err" id="e-name" aria-live="polite"></span></div>
        <div class="field"><label for="f-email">${T(L, "E-posta adresiniz", "Your email")}</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email" placeholder="${T(L, "ad@ornek.com", "name@example.com")}"><span class="err" id="e-email" aria-live="polite"></span></div>
        <div class="field full"><label for="f-subject">${T(L, "Konu", "Subject")}</label><input id="f-subject" name="subject" type="text" required aria-describedby="e-subject"><span class="err" id="e-subject" aria-live="polite"></span></div>
        <div class="field full"><label for="f-message">${T(L, "Mesajınız", "Your message")}</label><textarea id="f-message" name="message" rows="6" required aria-describedby="e-message"></textarea><span class="err" id="e-message" aria-live="polite"></span></div>
        <div class="form-foot"><button class="btn" type="submit">${u("diamond")}${T(L, "Gönder", "Send")}${u("diamond")}</button><p class="status" role="status"></p></div>
      </form>
    </div>
  </div>
  <figure class="map glass">
    <iframe data-cms-map src="${R.mapSrc(L, D).replace(/&/g, "&amp;")}" title="${R.mapTitle(L, D)}" referrerpolicy="no-referrer-when-downgrade" loading="lazy" allowfullscreen></iframe>
    <figcaption data-cms="mapCaption">${R.mapCaption(L, D)}</figcaption>
  </figure>
</section>`;
  return shell(L, "contact", {
    title: T(L, "İletişim · Yunus Emre Ersoy", "Contact · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy ile iletişim: Antalya / Kepez, telefon, e-posta, iletişim formu ve harita.", "Contact Yunus Emre Ersoy: Antalya / Kepez, phone, email, contact form and map."),
    body,
  });
}

/* ---------------- ADMIN (client-side CMS panel, Turkish UI) ---------------- */
function admin() {
  begin(ADMIN);
  const unitOpts = ["diamond", "eye", "star", "knot", "hook", "cross"].map((k) => `<option value="${k}">${k}</option>`).join("");
  const f = (id, label, input, cls = "") => `<div class="field${cls ? " " + cls : ""}"><label for="${id}">${label}</label>${input}</div>`;
  const inp = (id, name, extra = "") => `<input id="${id}" name="${name}" type="text" ${extra}>`;
  const ta = (id, name, rows, extra = "") => `<textarea id="${id}" name="${name}" rows="${rows}" ${extra}></textarea>`;
  const search = (kind, ph) => `<div class="adm-search"><label class="sr-only" for="s-${kind}">${ph}</label><input id="s-${kind}" type="search" data-search="${kind}" placeholder="${ph}" autocomplete="off"><span class="adm-search-n" data-search-count="${kind}" aria-live="polite"></span></div>`;
  const listCard = (kind, title, ph) => `<div class="adm-list glass panel"><div class="adm-list-head"><h2 class="h-sub">${title}</h2></div>${search(kind, ph)}<ol class="adm-items" data-list="${kind}"></ol></div>`;
  const formFoot = (label) => `<div class="form-foot"><button class="btn" type="submit">${u("diamond")}<span data-submit-label>${label}</span>${u("diamond")}</button><button class="adm-btn ghost" type="button" data-cancel hidden>Vazgeç</button><p class="status" role="status"></p></div>`;
  const stat = (key, icon, label) => `<div class="adm-stat glass" data-stat="${key}"><span class="adm-stat-ic">${u(icon)}</span><b data-stat-n>0</b><span class="adm-stat-l">${label}</span><small data-stat-sub></small></div>`;
  return `<!DOCTYPE html>
<html lang="tr" data-base="${baseOf(CUR)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Yönetim Paneli · Yunus Emre Ersoy</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#07080d">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%2310131c' d='M16 1 31 16 16 31 1 16Z'/%3E%3Cpath fill='%23ff6b6b' d='M16 9l7 7-7 7-7-7Z'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${A("assets/css/style.css")}">
<script>document.documentElement.classList.add("js");</script>
</head>
<body data-page="admin">
<a class="skip" href="#main">İçeriğe geç</a>
<div class="fx-layer" aria-hidden="true">
  <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="orb o4"></span>
  <canvas id="net"></canvas>
  <span class="grid-tex"></span><span class="grain"></span>
</div>
<div class="cursor-glow" aria-hidden="true"></div><div class="cursor-ring" aria-hidden="true"></div>
<header class="navbar">
  <a class="brand" href="${rel(PAGES[0].tr[0])}">${MONO}<span class="brand-name">Yunus Emre<small> Ersoy</small></span></a>
  <span class="label adm-badge">${u("diamond")}Yönetim paneli</span>
  <div class="nav-tools">
    <a class="link" href="${rel(PAGES[0].tr[0])}">Siteye dön ${u("diamond")}</a>
    <button class="adm-btn ghost" type="button" data-logout hidden>Çıkış</button>
  </div>
</header>
<main id="main" class="wrap admin">

<section class="adm-login glass panel" id="login" aria-labelledby="login-title">
  ${bigIcon("person")}
  <p class="kicker"><span class="dot"></span>İçerik yönetimi</p>
  <h1 id="login-title" class="h-section"><span class="grad-text">Giriş</span></h1>
  <form class="form adm-login-form" id="login-form" novalidate>
    ${f("l-user", "Kullanıcı adı", '<input id="l-user" name="user" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" required>', "full")}
    ${f("l-pass", "Şifre", '<input id="l-pass" name="pass" type="password" autocomplete="current-password" required>', "full")}
    <div class="form-foot"><button class="btn" type="submit">${u("diamond")}Giriş yap${u("diamond")}</button><p class="status bad" role="status" data-login-msg></p></div>
  </form>
  <p class="adm-note">Bu giriş yalnızca bu tarayıcıda çalışan basit bir kilittir; gerçek bir güvenlik katmanı değildir. Şifre sayfada açık metin olarak değil, SHA-256 özeti olarak tutulur. Arka arkaya 5 hatalı denemede giriş 30 saniye kilitlenir.</p>
</section>

<section class="adm-panel" id="panel" hidden aria-labelledby="panel-title">
  <header class="adm-head">
    <div>
      <p class="kicker"><span class="dot"></span>Yönetim paneli</p>
      <h1 id="panel-title" class="h-section"><span class="grad-text">İçerik yönetimi</span></h1>
      <p class="adm-status" data-status aria-live="polite"></p>
    </div>
    <div class="adm-tools">
      <button class="btn" type="button" data-save>${u("diamond")}Kaydet${u("diamond")}</button>
      <button class="adm-btn" type="button" data-export-json>JSON olarak dışa aktar</button>
      <button class="adm-btn" type="button" data-export-js>content.js olarak indir</button>
      <label class="adm-btn" for="import-file">JSON içe aktar</label><input class="sr-only" type="file" id="import-file" accept="application/json,.json">
      <button class="adm-btn danger" type="button" data-reset>Varsayılanlara sıfırla</button>
    </div>
  </header>

  <h2 class="sr-only">Özet</h2>
  <div class="adm-stats">
    ${stat("projects", "star", "Proje")}
    ${stat("blog", "hook", "Blog yazısı")}
    ${stat("gallery", "knot", "Galeri fotoğrafı")}
    <button type="button" class="adm-stat glass is-btn" data-stat="inbox" data-goto="tab-inbox"><span class="adm-stat-ic">${u("cross")}</span><b data-stat-n>0</b><span class="adm-stat-l">Okunmamış mesaj</span><small data-stat-sub></small></button>
  </div>

  <div class="adm-tabs" role="tablist" aria-label="Yönetim bölümleri">
    <button type="button" role="tab" id="tab-projects" aria-controls="pane-projects" aria-selected="true">Projeler <span data-count-of="projects"></span></button>
    <button type="button" role="tab" id="tab-blog" aria-controls="pane-blog" aria-selected="false" tabindex="-1">Blog <span data-count-of="blog"></span></button>
    <button type="button" role="tab" id="tab-gallery" aria-controls="pane-gallery" aria-selected="false" tabindex="-1">Galeri <span data-count-of="gallery"></span></button>
    <button type="button" role="tab" id="tab-profile" aria-controls="pane-profile" aria-selected="false" tabindex="-1">Hakkımda / Profil</button>
    <button type="button" role="tab" id="tab-inbox" aria-controls="pane-inbox" aria-selected="false" tabindex="-1">Gelen mesajlar <span class="adm-pill" data-unread hidden></span></button>
  </div>

  <div class="adm-pane" role="tabpanel" id="pane-projects" aria-labelledby="tab-projects">
    ${listCard("projects", "Mevcut projeler", "Projelerde ara…")}
    <form class="adm-form glass panel form" data-form="projects" novalidate>
      <h2 class="h-sub full" data-form-title data-add-title="Yeni proje ekle" data-edit-title="Projeyi düzenle">Yeni proje ekle</h2>
      ${f("p-title-tr", "Başlık (TR) *", inp("p-title-tr", "titleTr", "required"))}
      ${f("p-title-en", "Başlık (EN)", inp("p-title-en", "titleEn"))}
      ${f("p-desc-tr", "Açıklama (TR) *", ta("p-desc-tr", "descTr", 3, "required"), "full")}
      ${f("p-desc-en", "Açıklama (EN)", ta("p-desc-en", "descEn", 3), "full")}
      ${f("p-cat", "Kategori", '<select id="p-cat" name="cat"><option value="design">Tasarım</option><option value="code">Yazılım</option></select>')}
      ${f("p-tools", "Kullanılan araçlar", inp("p-tools", "tools", 'placeholder="Adobe Photoshop, Python…"'))}
      ${f("p-img", "Görsel bağlantısı (URL veya assets/… yolu) *", inp("p-img", "img", 'required inputmode="url" placeholder="https://… ya da assets/img/projects/…" data-preview="p-prev"'), "full")}
      <div class="adm-preview full" id="p-prev" hidden><span></span></div>
      ${f("p-alt-tr", "Görsel açıklaması / alt (TR)", inp("p-alt-tr", "altTr"))}
      ${f("p-alt-en", "Görsel açıklaması / alt (EN)", inp("p-alt-en", "altEn"))}
      <label class="adm-check full"><input type="checkbox" name="featured"> Anasayfada öne çıkar</label>
      ${formFoot("Projeyi ekle")}
    </form>
  </div>

  <div class="adm-pane" role="tabpanel" id="pane-blog" aria-labelledby="tab-blog" hidden>
    ${listCard("blog", "Mevcut yazılar", "Yazılarda ara (başlık, kategori, etiket)…")}
    <form class="adm-form glass panel form" data-form="blog" novalidate>
      <h2 class="h-sub full" data-form-title data-add-title="Yeni blog yazısı" data-edit-title="Yazıyı düzenle">Yeni blog yazısı</h2>
      ${f("b-title-tr", "Başlık (TR) *", inp("b-title-tr", "titleTr", "required"))}
      ${f("b-title-en", "Başlık (EN)", inp("b-title-en", "titleEn"))}
      ${f("b-cat-tr", "Kategori (TR) *", inp("b-cat-tr", "catTr", 'required placeholder="Yazılım Geliştirme"'))}
      ${f("b-cat-en", "Kategori (EN)", inp("b-cat-en", "catEn", 'placeholder="Software Development"'))}
      ${f("b-tags-tr", "Etiketler (TR, virgülle) *", inp("b-tags-tr", "tagsTr", 'required placeholder="Python, YapayZeka"'))}
      ${f("b-tags-en", "Etiketler (EN, virgülle)", inp("b-tags-en", "tagsEn", 'placeholder="Python, AI"'))}
      ${f("b-ex-tr", "Özet (TR) *", ta("b-ex-tr", "excerptTr", 2, "required"), "full")}
      ${f("b-ex-en", "Özet (EN)", ta("b-ex-en", "excerptEn", 2), "full")}
      ${f("b-body-tr", "İçerik (TR) *", ta("b-body-tr", "bodyTr", 10, "required"), "full")}
      ${f("b-body-en", "İçerik (EN)", ta("b-body-en", "bodyEn", 10), "full")}
      <p class="adm-hint full">Paragrafları boş satırla ayırın. <code>## Başlık</code> ara başlık, <code>- madde</code> liste, <code>1. madde</code> numaralı liste, <code>&gt; alıntı</code> alıntı, <code>**kalın**</code> ve <code>\`kod\`</code> desteklenir. HTML ile başlayan içerik güvenli etiketlere süzülerek olduğu gibi kullanılır.</p>
      ${f("b-date", "Tarih", '<input id="b-date" name="date" type="date">')}
      ${f("b-unit", "Kart ikonu", `<select id="b-unit" name="unit">${unitOpts}</select>`)}
      ${formFoot("Yazıyı yayınla")}
    </form>
  </div>

  <div class="adm-pane" role="tabpanel" id="pane-gallery" aria-labelledby="tab-gallery" hidden>
    ${listCard("gallery", "Galerideki fotoğraflar", "Fotoğraflarda ara…")}
    <form class="adm-form glass panel form" data-form="gallery" novalidate>
      <h2 class="h-sub full" data-form-title data-add-title="Galeriye fotoğraf ekle" data-edit-title="Fotoğrafı düzenle">Galeriye fotoğraf ekle</h2>
      ${f("g-img", "Fotoğraf bağlantısı (URL veya assets/… yolu) *", inp("g-img", "img", 'required inputmode="url" placeholder="https://… ya da assets/img/gallery/…" data-preview="g-prev"'), "full")}
      <div class="adm-preview full" id="g-prev" hidden><span></span></div>
      ${f("g-title-tr", "Başlık (TR) *", inp("g-title-tr", "titleTr", "required"))}
      ${f("g-title-en", "Başlık (EN)", inp("g-title-en", "titleEn"))}
      ${f("g-cap-tr", "Açıklama (TR) *", ta("g-cap-tr", "captionTr", 2, "required"), "full")}
      ${f("g-cap-en", "Açıklama (EN)", ta("g-cap-en", "captionEn", 2), "full")}
      ${f("g-tag-tr", "Etiket (TR)", inp("g-tag-tr", "tagTr", 'placeholder="Aile, Futbol…"'))}
      ${f("g-tag-en", "Etiket (EN)", inp("g-tag-en", "tagEn", 'placeholder="Family, Football…"'))}
      ${f("g-alt-tr", "Alternatif metin (TR)", inp("g-alt-tr", "altTr"))}
      ${f("g-alt-en", "Alternatif metin (EN)", inp("g-alt-en", "altEn"))}
      ${formFoot("Fotoğrafı ekle")}
    </form>
  </div>

  <div class="adm-pane adm-pane-wide" role="tabpanel" id="pane-profile" aria-labelledby="tab-profile" hidden>
    <form class="adm-form glass panel form" data-form="profile" novalidate>
      <h2 class="h-sub full">Hakkımda yazısı</h2>
      ${f("pr-sum-tr", "Kısa özet · anasayfa (TR) *", ta("pr-sum-tr", "summaryTr", 2, "required"))}
      ${f("pr-sum-en", "Kısa özet · anasayfa (EN)", ta("pr-sum-en", "summaryEn", 2))}
      ${f("pr-bio-tr", "Hakkımda metni (TR, paragrafları boş satırla ayırın) *", ta("pr-bio-tr", "bioTr", 9, "required"))}
      ${f("pr-bio-en", "Hakkımda metni (EN)", ta("pr-bio-en", "bioEn", 9))}

      <h2 class="h-sub full adm-sub">İletişim ve konum</h2>
      ${f("pr-loc-tr", "Konum (TR) *", inp("pr-loc-tr", "locTr", "required"))}
      ${f("pr-loc-en", "Konum (EN)", inp("pr-loc-en", "locEn"))}
      ${f("pr-map", "Harita konumu (Google Maps araması) *", inp("pr-map", "mapQuery", 'required placeholder="Kepez, Antalya, Türkiye"'))}
      ${f("pr-mail", "E-posta *", '<input id="pr-mail" name="email" type="email" required>')}
      ${f("pr-ph1", "Telefon 1", '<input id="pr-ph1" name="phone1" type="tel">')}
      ${f("pr-ph2", "Telefon 2", '<input id="pr-ph2" name="phone2" type="tel">')}
      ${f("pr-ig", "Instagram bağlantısı", '<input id="pr-ig" name="instagram" type="url" placeholder="https://www.instagram.com/…">')}
      ${f("pr-li", "LinkedIn bağlantısı", '<input id="pr-li" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…">')}

      <div class="full adm-skills-head"><h2 class="h-sub adm-sub">Yetenekler</h2><button class="adm-btn" type="button" data-add-skill>+ Yetenek ekle</button></div>
      <div class="full adm-skills" data-skills></div>
      ${formFoot("Profili uygula")}
    </form>
  </div>

  <div class="adm-pane adm-pane-wide" role="tabpanel" id="pane-inbox" aria-labelledby="tab-inbox" hidden>
    <div class="adm-list glass panel">
      <div class="adm-list-head"><h2 class="h-sub">Gelen mesajlar</h2>
        <div class="adm-inbox-tools"><button class="adm-btn ghost" type="button" data-inbox-readall>Tümünü okundu işaretle</button><button class="adm-btn ghost danger" type="button" data-inbox-clear>Tümünü sil</button></div>
      </div>
      ${search("inbox", "Mesajlarda ara (ad, e-posta, konu)…")}
      <ol class="adm-items adm-inbox" data-list="inbox"></ol>
      <p class="adm-note">Mesajlar iletişim sayfasındaki formdan gelir ve bu tarayıcının hafızasında saklanır; mesaj işlemleri anında kaydedilir.</p>
    </div>
  </div>

  <p class="adm-note">İçerik değişiklikleri yalnızca <strong>bu tarayıcıda</strong> görünür. Herkesin görmesi için “content.js olarak indir” ile aldığınız dosyayı projedeki <code>app/models/content.js</code> dosyasının yerine koyup <code>node tools/build.mjs .</code> komutunu çalıştırın ve siteyi yeniden yayınlayın.</p>
</section>
</main>
<div class="adm-toast" role="status" aria-live="polite" hidden></div>
<script src="${A("app/models/content.js")}"></script>
<script src="${A("app/models/store.js")}"></script>
<script src="${A("app/views/render.js")}"></script>
<script src="${A("app/controllers/page.js")}"></script>
<script src="${A("app/controllers/site.js")}"></script>
<script src="${A("app/controllers/admin.js")}"></script>
</body>
</html>
`;
}

export { PAGES };
export const BUILD = { home, about, projects, gallery, blog, contact };
export { admin, ADMIN };

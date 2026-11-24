import fs from "node:fs";
import path from "node:path";
const OUT = process.argv[2];

/* ---------------- ornament units ---------------- */
const U = {
  diamond: '<path fill-rule="evenodd" d="M16 1 31 16 16 31 1 16Zm0 6L7 16l9 9 9-9Z"/><path class="a" d="M16 11l5 5-5 5-5-5Z"/>',
  eye: '<path fill-rule="evenodd" d="M16 3 29 16 16 29 3 16Zm0 5-8 8 8 8 8-8Z"/><path d="M1 14h4v4H1zM27 14h4v4h-4zM14 1h4v4h-4zM14 27h4v4h-4z"/><path class="a" d="M16 13l3 3-3 3-3-3Z"/>',
  star: '<path d="M9 9h14v14H9z"/><path d="M16 5.5 26.5 16 16 26.5 5.5 16Z"/><path class="a" d="M16 12l4 4-4 4-4-4Z"/>',
  knot: '<path fill-rule="evenodd" d="M3 3h17v17H3Zm4 4v9h9V7Z"/><path fill-rule="evenodd" d="M12 12h17v17H12Zm4 4v9h9v-9Z"/><path class="a" d="M12 12h4v4h-4z"/>',
  hook: '<path fill-rule="evenodd" d="M16 4 28 16 16 28 4 16Zm0 6-6 6 6 6 6-6Z"/><path d="M13 1h6v3h-3v2h-3zM19 31h-6v-3h3v-2h3zM1 19v-6h3v3h2v3zM31 13v6h-3v-3h-2v-3z"/><path class="a" d="M16 13l3 3-3 3-3-3Z"/>',
  cross: '<path d="M14 2h4v4h-4zM9 7h4v4H9zM19 7h4v4h-4zM4 12h4v4H4zM24 12h4v4h-4zM9 17h4v4H9zM19 17h4v4h-4zM14 22h4v4h-4zM4 16h4v4H4zM24 16h4v4h-4z"/><path class="a" d="M14 12h4v8h-4z"/>',
};
const u = (n, cls = "u") => `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${U[n]}</svg>`;
const ICON = {
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.3-4.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>',
  li: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2.5 9h3v12h-3zM9 9h2.9v1.7c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.5 2.3 4.5 5.4V21h-3v-6c0-1.5-.3-3.1-2.2-3.1S12 13.3 12 15v6H9z"/></svg>',
  menu: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0 16 8 8 16 0 8Zm0 4L4 8l4 4 4-4Z" fill="currentColor" fill-rule="evenodd"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
};
const MONO = `<svg class="mono-mark" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="ye-mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".55" stop-color="#ffb86b"/><stop offset="1" stop-color="#9d8cff"/></linearGradient></defs><path fill="url(#ye-mg)" fill-rule="evenodd" d="M32 1 63 32 32 63 1 32Zm0 6L7 32l25 25 25-25Z"/><path fill="#10131c" stroke="url(#ye-mg)" stroke-width="1.5" d="M32 12 52 32 32 52 12 32Z"/><text x="32" y="37.5" text-anchor="middle" font-family="Tektur, sans-serif" font-weight="800" font-size="14" fill="#f4f1ff" letter-spacing=".5">YE</text></svg>`;

const IG = "https://www.instagram.com/e.mre0_0/";
const LI = "https://www.linkedin.com/in/yunus-emre-ersoy-2a3b2638a/";
const MAIL = "yeersoy.0715@gmail.com";

/* ---------------- visual-show helpers ---------------- */
/* Line-art ornaments that drift out of the photo corners on hover */
const DECO = {
  leaf: '<svg viewBox="0 0 48 48"><path d="M24 45V21"/><path d="M24 27c0-10 7-17 17-18 0 10-7 18-17 18Z"/><path d="M24 33C24 25 18 19 8 18c0 9 7 15 16 15Z"/></svg>',
  flower: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="4"/><path d="M24 20c-3-5-3-11 0-15 3 4 3 10 0 15ZM28 24c5-3 11-3 15 0-4 3-10 3-15 0ZM24 28c3 5 3 11 0 15-3-4-3-10 0-15ZM20 24c-5 3-11 3-15 0 4-3 10-3 15 0Z"/></svg>',
  diamond: '<svg viewBox="0 0 48 48"><path d="M24 3 45 24 24 45 3 24Z"/><path d="M24 14 34 24 24 34 14 24Z"/></svg>',
  spark: '<svg viewBox="0 0 48 48"><path d="M24 3c2 11 10 19 21 21-11 2-19 10-21 21-2-11-10-19-21-21C14 22 22 14 24 3Z"/></svg>',
  orbit: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M24 9 37 32H11Z"/></svg>',
};
const decoSvg = (n) => `<span class="pfx-deco" aria-hidden="true">${DECO[n]}</span>`;
/* Wraps a photo: rotating light border, corner ornaments, floating badges */
function fx(inner, badges = [], cls = "") {
  const set = ["leaf", "diamond", "spark", "flower"];
  return `<div class="pfx${cls ? " " + cls : ""}">
    <span class="pfx-ring" aria-hidden="true"></span>
    ${inner}
    ${set.map((n, i) => decoSvg(n).replace('pfx-deco"', `pfx-deco d${i + 1}"`)).join("")}
    ${badges.map((b, i) => `<span class="pfx-badge b${i + 1}" aria-hidden="true"><i></i>${b}</span>`).join("")}
  </div>`;
}
/* Large faded background icons for bento cards */
const BIG = {
  design: '<svg viewBox="0 0 100 100"><path d="M50 6 90 46 66 94H34L10 46Z"/><path d="M50 6v44"/><circle cx="50" cy="58" r="8"/><path d="M34 94h32"/></svg>',
  code: '<svg viewBox="0 0 100 100"><path d="M34 24 8 50l26 26M66 24l26 26-26 26M58 14 42 86"/></svg>',
  person: '<svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18"/><path d="M14 94c4-20 18-32 36-32s32 12 36 32"/><path d="M50 4 54 10 50 16 46 10Z"/></svg>',
};
const bigIcon = (k) => `<span class="bg-icon" aria-hidden="true">${BIG[k]}</span><span class="bg-pattern" aria-hidden="true"></span><span class="glare" aria-hidden="true"></span>`;
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

/* ---------------- site map ---------------- */
const PAGES = [
  { key: "home", unit: "diamond", tr: ["anasayfa.html", "Anasayfa"], en: ["index.html", "Home"] },
  { key: "about", unit: "eye", tr: ["hakkimda.html", "Hakkımda"], en: ["about.html", "About"] },
  { key: "projects", unit: "star", tr: ["projeler.html", "Projeler"], en: ["projects.html", "Projects"] },
  { key: "gallery", unit: "knot", tr: ["galeri.html", "Galeri"], en: ["gallery.html", "Gallery"] },
  { key: "blog", unit: "hook", tr: ["blog-tr.html", "Blog"], en: ["blog.html", "Blog"] },
  { key: "contact", unit: "cross", tr: ["iletisim.html", "İletişim"], en: ["contact.html", "Contact"] },
];
const href = (key, L) => PAGES.find((p) => p.key === key)[L][0];
const T = (L, tr, en) => (L === "tr" ? tr : en);
const num = (i) => String(i).padStart(2, "0");

/* ---------------- content ---------------- */
const PROJECTS = [
  { id: "karakalem", img: "boyum-sonrasi.png", cat: "design", tools: "Adobe Photoshop",
    tr: ["Karakalem Renklendirme", "İki aşamalı bir çalışma: önce karakalemle kontur ve form, ardından dijital fırçalarla katman katman renk. Işık ve gölgeyi renkle zenginleştirerek çizime derinlik ve canlılık kazandırdım.", "Wolverine karakterinin Photoshop'ta renklendirilmiş karakalem çizimi"],
    en: ["Charcoal Colorization", "A two-stage piece: first contour and form in charcoal, then colour added layer by layer with digital brushes. Enriching light and shadow with colour gave the drawing depth and life.", "Charcoal drawing of the Wolverine character, colorized in Photoshop"] },
  { id: "akilli-obje", img: "smart-obje.jpg", cat: "design", tools: "Adobe Photoshop",
    tr: ["Akıllı Obje", "Smart Object yöntemiyle hazırlanan uzay kompozisyonu. Bağlantılı katmanlar sayesinde tek bir düzenleme, aynı objeyi kullanan tüm tasarımları eşzamanlı günceller.", "Dünya yörüngesinde astronotlar ve uçan dairelerden oluşan Photoshop kompozisyonu"],
    en: ["Smart Object", "A space composition built with Photoshop Smart Objects. Thanks to linked layers, a single edit updates every design that uses the same object at once.", "Photoshop composition of astronauts and flying saucers above Earth"] },
  { id: "siyah-beyaz", img: "siyah-beyaz-sonrasi.jpg", cat: "design", tools: "Adobe Photoshop",
    tr: ["Siyah Beyaz Kontrast", "Görsel önce siyah beyaza çevrildi, ardından seçilen alanlar orijinal renklerine döndürüldü. Böylece göz, fotoğrafta öne çıkmasını istediğim noktaya yöneliyor.", "Siyah beyaz bir Amerikan futbolu fotoğrafında yalnızca oyuncunun renkli bırakıldığı çalışma"],
    en: ["Black & White Contrast", "The image was first turned black and white, then selected areas were restored to their original colours, so the eye goes straight to the part I wanted to highlight.", "Black and white American football photo with only the leaping player left in colour"] },
  { id: "urun-tanitimi", img: "urun-tanitimi.png", cat: "design", tools: "Adobe Photoshop",
    tr: ["Ürün Tanıtımı", "Photoshop'ta sıfırdan tasarlanan güneş kremi tanıtım afişi. Katman stilleri, maskeleme ve özel fırçalarla oluşturulan vurgular kullanıldı; sarı palet ürünün güneşle ilişkisini anlatıyor.", "Sarı zemin üzerinde güneş kremi tüpü ve slogan içeren ürün tanıtım afişi"],
    en: ["Product Promotion", "A sunscreen promotion poster designed from scratch in Photoshop, using layer styles, masking and highlights made with custom brushes; the yellow palette tells the product's story with the sun.", "Product promotion poster with a sunscreen tube and slogan on a yellow background"] },
  { id: "hesap-makinesi", img: "hesap-makinesi.jpg", cat: "code", tools: null,
    tr: ["Hesap Makinesi", "Temel matematik işlemlerini yapan basit bir hesap makinesi uygulaması. Sade arayüzü ile günlük hesaplamaları hızlı yapmayı amaçlıyor.", "Hesap makinesi uygulamasının simgesi"],
    en: ["Calculator", "A simple calculator app covering the basic arithmetic operations, with a clean interface for quick everyday calculations.", "Icon of the calculator app"] },
  { id: "yilan-oyunu", img: "yilan-oyunu.jpg", cat: "code", tools: "Python / JavaScript",
    tr: ["Yılan Oyunu", "Klasikler asla ölmez! Kodlamaya başladığımda yaptığım ilk oyunlardan biri. Yön tuşlarıyla yılanı yönlendir, kuyruğuna çarpma ve elmaları topla; skor takibi ve hız ayarı da var.", "Elmaya uzanan yeşil yılan çizimi"],
    en: ["Snake Game", "Classics never die! One of the first games I made when I started coding. Steer the snake with the arrow keys, don't hit your tail and collect the apples; with score tracking and speed settings.", "Illustration of a green snake reaching for an apple"] },
];

const PHOTOS = [
  { img: "calisma-masasi.jpg", w: 1600, h: 1073,
    tr: ["Çalışma Masam", "Kod ekranları açık, bilgisayar kucağımda: projelerimin çoğu bu masada doğuyor.", "Masa başı", "Ekran ve dizüstü bilgisayar başında gülümseyen Yunus Emre"],
    en: ["My Desk", "Code on the screens, laptop on my lap: most of my projects start at this desk.", "Workspace", "Yunus Emre smiling at a desk with monitors and a laptop"] },
  { img: "basketbol.jpg", w: 1309, h: 1600,
    tr: ["Sahilde Basketbol", "Palmiyeler ve deniz manzarası eşliğinde bir sahil sahasında turnike anı.", "Antalya sahili", "Palmiyelerle çevrili sahil sahasında potaya turnike atan Yunus Emre"],
    en: ["Basketball by the Sea", "Going for a layup on a seaside court, with palm trees and the sea behind.", "Antalya coast", "Yunus Emre going for a layup on a seaside court lined with palm trees"] },
  { img: "yegen-atakan.jpg", w: 1091, h: 997,
    tr: ["Yeğenim Atakan", "Omuzlarımda yeğenim Atakan. Bana dayılık görevi verildiğinden beri en sevdiğim unvan bu.", "Aile", "Gece parkta omuzlarında gülen yeğenini taşıyan Yunus Emre"],
    en: ["My Nephew Atakan", "My nephew Atakan on my shoulders. Being his uncle is my favourite title.", "Family", "Yunus Emre at night in a park carrying his laughing nephew on his shoulders"] },
  { img: "okul-takimi.jpg", w: 543, h: 543,
    tr: ["Okul Futbol Takımı", "Mavi beyaz formalarla takım arkadaşlarım ve ben; yıllar sonra bile unutulmayacak bir takım ruhu.", "Futbol", "Mavi beyaz çizgili formalı lise futbol takımı oyuncuları"],
    en: ["School Football Team", "My teammates and me in blue-and-white kits; a team spirit I won't forget even years later.", "Football", "High-school football players in blue-and-white striped kits"] },
  { img: "mezuniyet.jpg", w: 552, h: 1153,
    tr: ["Mezuniyet", "Lise diplomasını aldıktan sonra sahil yolunda. Sırada üniversite vardı.", "Lise mezuniyeti", "Deniz kenarındaki yürüyüş yolunda siyah takım elbiseli Yunus Emre"],
    en: ["Graduation", "On the seaside promenade after getting my high-school diploma. University was next.", "High-school graduation", "Yunus Emre in a black suit on a seaside promenade"] },
  { img: "kahve.jpg", w: 1600, h: 1521,
    tr: ["Kahve Molası", "Ders arasında sıcak bir kahve ve sakin bir an.", "Sosyal", "Bir kafede karton bardaktan kahve içen Yunus Emre"],
    en: ["Coffee Break", "A warm coffee and a quiet moment between classes.", "Social", "Yunus Emre drinking coffee from a paper cup in a café"] },
  { img: "motor-kask.jpg", w: 1123, h: 1600,
    tr: ["Motor Tutkusu", "Kask takıldı, yol başlıyor: dört duvar değil, asfalt.", "Yol", "Gece motosiklet kaskıyla çekilmiş yakın plan fotoğraf"],
    en: ["On Two Wheels", "Helmet on, the road begins: asphalt instead of four walls.", "On the road", "Night close-up of Yunus Emre wearing a motorcycle helmet"] },
  { img: "otopark.jpg", w: 604, h: 484,
    tr: ["Otopark Çekimi", "Gri betona inat renkli bir duruş; basketbol topu ve özgüvenle yakalanan bir kare.", "Fotoğraf çekimi", "Kapalı otoparkta basketbol topuyla çömelmiş, yüzü bandanalı Yunus Emre"],
    en: ["Car Park Shoot", "A colourful stance against the grey concrete, caught with a basketball and some confidence.", "Photo shoot", "Yunus Emre crouching with a basketball in an underground car park, face covered with a bandana"] },
  { img: "cocukluk.jpg", w: 424, h: 524,
    tr: ["Çocukluk", "İlkokul yıllarımdan bir kare; formayla poz vermek o zamandan başlamış.", "Anı", "Beyaz formalı, elleri belinde poz veren çocuk Yunus Emre"],
    en: ["Childhood", "A shot from my primary-school years; posing in a kit started early.", "Memory", "Young Yunus Emre posing in a white kit with hands on his hips"] },
  { img: "ayna.jpg", w: 1600, h: 1600,
    tr: ["Ayna Pozu", "Sade bir tişört ve ayna önünde gündelik bir kare.", "Gündelik", "Ayna karşısında telefonla fotoğraf çeken Yunus Emre"],
    en: ["Mirror Shot", "A plain T-shirt and an everyday shot in front of the mirror.", "Everyday", "Yunus Emre taking a mirror selfie with his phone"] },
];

/* ---------------- shared chrome ---------------- */
function navList(L, current, extraCls = "") {
  return `<ol>${PAGES.map((p, i) => {
    const [file, label] = p[L];
    const cur = p.key === current ? ' aria-current="page"' : "";
    return `<li><a href="${file}"${cur}>${u(p.unit)}<span>${label}</span><span class="num">${num(i + 1)}</span></a></li>`;
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
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="author" content="Yunus Emre Ersoy">
<meta name="theme-color" content="#07080d">
<link rel="alternate" hreflang="${L}" href="${href(key, L)}">
<link rel="alternate" hreflang="${other}" href="${href(key, other)}">
<link rel="preload" href="assets/fonts/tektur-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%2310131c' d='M16 1 31 16 16 31 1 16Z'/%3E%3Cpath fill='%23ff6b6b' d='M16 9l7 7-7 7-7-7Z'/%3E%3C/svg%3E">
<link rel="stylesheet" href="assets/css/style.css">
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
<script src="assets/js/site.js"></script>
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
      <div class="social-row"><a class="sq" href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a class="sq" href="${LI}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.li}</a></div>
    </div>
    <div><h3>${T(L, "Levhalar", "Plates")}</h3><ul class="cols2">${PAGES.map((p) => `<li><a href="${p[L][0]}">${p[L][1]}</a></li>`).join("")}</ul></div>
    <div><h3>${T(L, "İletişim", "Contact")}</h3><ul><li><a href="mailto:${MAIL}">${MAIL}</a></li><li><a href="tel:+905447391507">+90 544 739 15 07</a></li><li>Antalya / Burdur, ${T(L, "Türkiye", "Türkiye")}</li></ul></div>
  </div>
  <div class="foot-base"><span>© 2026 Yunus Emre Ersoy · ${T(L, "Tüm hakları saklıdır", "All rights reserved")}</span><span>${T(L, "Vize projesi · Akdeniz Üniversitesi", "Midterm project · Akdeniz University")}</span></div>
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

const BENTO = ["xl", "h", "h", "v", "v", "v"];
function unitCard(L, p, i, { lazy = true, headingTag = "h3" } = {}) {
  const [title, desc, alt] = p[L];
  const typ = p.cat === "design" ? T(L, "Tasarım", "Design") : T(L, "Yazılım", "Code");
  return `<article class="unit glass tilt ${BENTO[i] || "v"}" data-cat="${p.cat}" id="${p.id}">
  ${bigIcon(p.cat)}
  <div class="unit-media"><img src="assets/img/projects/${p.img}" alt="${alt}" width="800" height="600"${lazy ? ' loading="lazy"' : ""}></div>
  <div class="unit-side">
  <div class="unit-labels"><span class="no">U-${num(i + 1)}</span><span>${p.tools || T(L, "Uygulama", "App")}</span><span class="ty">${typ}</span></div>
  <div class="unit-body"><${headingTag}>${title}</${headingTag}><p>${desc}</p></div>
  </div>
</article>`;
}
function photoFig(L, ph, i, { lazy = true, button = true, h = "h3" } = {}) {
  const [title, cap, ticket, alt] = ph[L];
  const img = `<img src="assets/img/gallery/${ph.img}" alt="${alt}" width="${ph.w}" height="${ph.h}"${lazy ? ' loading="lazy"' : ""}>`;
  const media = button ? `<button type="button" class="pfx-media" data-photo aria-label="${T(L, "Büyüt", "Enlarge")}: ${title}">${img}</button>` : `<div class="pfx-media">${img}</div>`;
  return `<figure class="photo glass">
  ${fx(media, [ticket, `F-${num(i + 1)}`])}
  <figcaption><${h}>${title}</${h}><p>${cap}</p><div class="ticket"><span>${ticket}</span><b>F-${num(i + 1)}</b></div></figcaption>
</figure>`;
}

function plateUnit(L, p, i, n) {
  const [title, desc, alt] = p[L];
  const typ = p.cat === "design" ? T(L, "Tasarım", "Design") : T(L, "Yazılım", "Code");
  return `<article class="pr-unit glass tilt">
    ${bigIcon(p.cat)}
    <a class="pr-media" href="${href("projects", L)}#${p.id}" tabindex="-1" aria-hidden="true"><img src="assets/img/projects/${p.img}" alt="" width="800" height="600"></a>
    <h2><span class="pn">${num(n)}</span><a href="${href("projects", L)}#${p.id}">${title}</a></h2>
    <p>${desc}</p>
    <div class="pr-foot"><span class="no">U-${num(i + 1)}</span><span>${typ}</span></div>
  </article>`;
}

/* ---------------- HOME ---------------- */
function home(L) {
  const strip = [0, 1, 2, 3].map((i) => photoFig(L, PHOTOS[i], i, { button: false }));
  const portrait = `<img src="assets/img/profile/portre-ceket.jpg" alt="${T(L, "Siyah ceketli Yunus Emre Ersoy portresi", "Portrait of Yunus Emre Ersoy in a black jacket")}" width="787" height="768" fetchpriority="high">`;
  const stats = [
    [PROJECTS.length, T(L, "Proje", "Projects")],
    [PHOTOS.length, T(L, "Fotoğraf", "Photos")],
    [ARTICLES.length, T(L, "Blog yazısı", "Articles")],
    [86, "Python", "%"],
  ];
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
    <ul class="hero-stats">${stats.map(([n, l, s = ""]) => `<li><b><span data-count="${n}">${n}</span>${s}</b><span>${l}</span></li>`).join("")}</ul>
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

<section class="wrap sec bento-home" aria-labelledby="pr-title">
  <div class="pr-about glass tilt">
    ${bigIcon("person")}
    <h2 id="pr-title"><span class="pn">01</span>${T(L, "Kısaca ben", "Me, in short")}</h2>
    <ul class="facts">
      <li><span>${T(L, "Doğum", "Born")}</span>${T(L, "25.07.2006, Antalya", "25 July 2006, Antalya")}</li>
      <li><span>${T(L, "Okul", "School")}</span>${T(L, "Akdeniz Üniversitesi", "Akdeniz University")}</li>
      <li><span>${T(L, "Bölüm", "Program")}</span>${T(L, "Bilgisayar Programcılığı", "Computer Programming")}</li>
      <li><span>${T(L, "Odak", "Focus")}</span>Python · ${T(L, "Yapay zekâ", "AI")} · Photoshop</li>
    </ul>
    <p>${T(L, "Teknik altyapımı Python ve yapay zekâ araştırmalarıyla birleştiriyor, boş zamanımda Photoshop'ta tasarlıyorum.", "I combine my technical training with my own Python and AI research, and design in Photoshop in my spare time.")}</p>
    <a class="link" href="${href("about", L)}">${T(L, "Hakkımda", "About me")} ${u("diamond")}</a>
  </div>
  ${[0, 5, 3].map((i, k) => plateUnit(L, PROJECTS[i], i, k + 2)).join("")}
</section>
<div class="wrap pr-more glass"><span class="label">${T(L, "Öne çıkan 3 proje · toplam 6", "3 featured projects · 6 in total")}</span><a class="link" href="${href("projects", L)}">${T(L, "Tüm projeler", "All projects")} ${u("diamond")}</a></div>

<section class="wrap sec" aria-labelledby="gal-title">
  ${secHead(`<span id="gal-title">${T(L, "Galeriden kareler", "From the gallery")}</span>`, `<a class="link" href="${href("gallery", L)}">${T(L, "Galeriyi aç (10)", "Open the gallery (10)")} ${u("diamond")}</a>`)}
  <div class="strip">${strip.join("\n")}</div>
</section>`;
  return shell(L, "home", {
    title: T(L, "Yunus Emre Ersoy · Anasayfa", "Yunus Emre Ersoy · Home"),
    desc: T(L, "Yunus Emre Ersoy'un kişisel portfolyosu: Akdeniz Üniversitesi Bilgisayar Programcılığı öğrencisi; Python, yapay zekâ ve görsel tasarım çalışmaları.", "Personal portfolio of Yunus Emre Ersoy, Computer Programming student at Akdeniz University: Python, AI and visual design work."),
    body,
  });
}

/* ---------------- ABOUT ---------------- */
function about(L) {
  const skills = [
    ["Python", 86, T(L, "Yapay zekâ ve veri bilimi projelerinin temelinde ilerliyorum.", "Building the foundations for AI and data science projects.")],
    ["Photoshop", 80, T(L, "Görsel düzenleme ve dijital illüstrasyon.", "Photo editing and digital illustration.")],
    ["HTML · CSS", 73, T(L, "Web sitelerinin yapısı ve tasarım estetiği.", "Structure and visual design of websites.")],
    ["JavaScript", 25, T(L, "Web sayfalarına etkileşim kazandırmayı öğreniyorum.", "Learning to make web pages interactive.")],
  ];
  const stitch = (v) => `<span class="meter" aria-hidden="true" style="--v:${v}%"><i></i><b></b></span>`;
  const body = `${plateHead(L, "about", T(L, "Hakkımda", "About me"), T(L, "Yaratıcı bir zihin, analitik çözümler ve bitmeyen bir öğrenme isteği.", "A creative mind, analytical solutions and a never-ending wish to learn."))}

<section class="wrap sec" aria-labelledby="intro-title">
  <div class="about-intro">
    <figure class="id-plate">${fx(`<div class="pfx-media"><img src="assets/img/profile/vesikalik.jpg" alt="${T(L, "Yunus Emre Ersoy'un vesikalık fotoğrafı", "ID photo of Yunus Emre Ersoy")}" width="1152" height="1094"></div>`, [T(L, "Akdeniz Üni.", "Akdeniz Univ."), "2025 –", "Python · Photoshop"], "big")}<figcaption><span>Yunus Emre Ersoy</span><span>${T(L, "Vesikalık", "Portrait")}</span></figcaption></figure>
    <div>
      <h2 class="h-section" id="intro-title">${T(L, "Merhaba, ben Yunus Emre", "Hello, I'm Yunus Emre")}</h2>
      <div class="divider" aria-hidden="true">${u("diamond")}</div>
      <div class="prose">
        <p class="lead">${T(L, "25 Temmuz 2006'da Antalya'da doğdum. Yeniliklere açık, hem kod yazan hem tasarlayan bir uygulama geliştirici olmak için çalışıyorum.", "I was born in Antalya on 25 July 2006. I'm working to become an application developer who is open to new ideas and who both codes and designs.")}</p>
        <p>${T(L, "Akdeniz Üniversitesi Bilgisayar Programcılığı bölümünde edindiğim teknik altyapıyı Python ve yapay zekâ alanındaki kişisel araştırmalarımla birleştiriyorum. Amacım, karmaşık sorunlara estetik ve işlevsel yazılım çözümleri getirerek dijital dünyada fark yaratmak.", "I combine the technical foundation I'm building in Akdeniz University's Computer Programming program with my own research in Python and artificial intelligence. My goal is to make a difference in the digital world by bringing aesthetic and functional software solutions to complex problems.")}</p>
        <p>${T(L, "Kod yazmadığım zamanlarda Photoshop'ta karakalem çizimleri renklendiriyor, afiş ve kompozisyonlar hazırlıyorum. Sahada ise futbol ve basketbol oynuyorum; takım oyunundan öğrendiğim disiplin, projelerimde de işime yarıyor.", "When I'm not coding, I colorize charcoal drawings and build posters and compositions in Photoshop. On the pitch I play football and basketball; the discipline I learned from team sports helps in my projects too.")}</p>
      </div>
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
        <tbody>
          <tr><th scope="row">2025 –</th><td><strong>Akdeniz ${T(L, "Üniversitesi", "University")}</strong>${T(L, "Bilgisayar Programcılığı", "Computer Programming")}<span class="now">${u("diamond")}${T(L, "Devam ediyor", "Ongoing")}</span></td></tr>
          <tr><th scope="row">2019 – 2023</th><td><strong>Karatay ${T(L, "Anadolu Lisesi", "Anatolian High School")}</strong>${T(L, "Lise", "High school")}</td></tr>
          <tr><th scope="row">2011 – 2019</th><td><strong>Mareşal Fevzi Çakmak</strong>${T(L, "İlkokul ve Ortaokul", "Primary and secondary school")}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="glass panel tilt soft">
      <h3 class="h-sub" style="margin-bottom:18px">${T(L, "Kişisel bilgiler", "Personal details")}</h3>
      <table class="cv">
        <caption class="sr-only">${T(L, "Kişisel bilgiler", "Personal details")}</caption>
        <tbody>
          <tr><th scope="row">${T(L, "Ad Soyad", "Name")}</th><td>Yunus Emre Ersoy</td></tr>
          <tr><th scope="row">${T(L, "Doğum", "Born")}</th><td>${T(L, "25.07.2006, Antalya", "25 July 2006, Antalya")}</td></tr>
          <tr><th scope="row">${T(L, "Konum", "Location")}</th><td>Antalya / Burdur, Türkiye</td></tr>
          <tr><th scope="row">${T(L, "E-posta", "Email")}</th><td><a href="mailto:${MAIL}">${MAIL}</a></td></tr>
          <tr><th scope="row">${T(L, "Teknik", "Technical")}</th><td>${T(L, "Python ve algoritma · Web tasarım (HTML/CSS) · Veri analizi · Proje yönetimi", "Python and algorithms · Web design (HTML/CSS) · Data analysis · Project management")}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="wrap sec" style="padding-top:0" id="yetenekler" aria-labelledby="skills-title">
  ${secHead(`<span id="skills-title">${T(L, "Yetenekler", "Skills")}</span>`, `<span class="label">${T(L, "Kendi değerlendirmem · 100 üzerinden", "Self-assessed · out of 100")}</span>`)}
  <ul class="skills glass panel">
    ${skills.map(([n, v, d]) => `<li><span class="name">${n}<small>${d}</small></span>${stitch(v)}<span class="val">${v}<span class="sr-only"> / 100</span></span></li>`).join("\n    ")}
  </ul>
</section>

<section class="wrap sec" style="padding-top:0" aria-labelledby="int-title">
  ${secHead(`<span id="int-title">${T(L, "İlgi alanlarım", "Interests")}</span>`)}
  <ol class="ruled">
    <li class="glass tilt"><span class="glare" aria-hidden="true"></span><span class="no">I-01</span>${u("cross")}<h3>${T(L, "Futbol", "Football")}</h3><p><em>${T(L, "“Takım oyunu, bireysel yetenekten üstündür.”", "“Teamwork beats individual talent.”")}</em> ${T(L, "Amatör futbol geçmişim disiplin ve ekip çalışması kazandırdı. Basketbolu da seviyorum.", "My amateur football background taught me discipline and teamwork. I love basketball too.")}</p></li>
    <li class="glass tilt"><span class="glare" aria-hidden="true"></span><span class="no">I-02</span>${u("star")}<h3>${T(L, "Kodlama", "Coding")}</h3><p>${T(L, "Geleceği <code>Python</code> ve yapay zekâ teknolojileriyle inşa etmeye odaklanıyorum.", "I'm focused on building the future with <code>Python</code> and AI technologies.")}</p></li>
    <li class="glass tilt"><span class="glare" aria-hidden="true"></span><span class="no">I-03</span>${u("knot")}<h3>${T(L, "Dijital tasarım", "Digital design")}</h3><p>${T(L, "Photoshop'ta renklendirme, Smart Object ile kompozisyon ve ürün afişleri.", "Colorizing in Photoshop, Smart Object compositions and product posters.")}</p></li>
    <li class="glass tilt"><span class="glare" aria-hidden="true"></span><span class="no">I-04</span>${u("hook")}<h3>${T(L, "Diğer", "Other")}</h3><p>${T(L, "Bilim kurgu filmleri · Müzik dinlemek · Teknoloji blogları · Doğa yürüyüşleri · Motosiklet", "Sci-fi films · Listening to music · Tech blogs · Nature walks · Motorcycles")}</p></li>
  </ol>
</section>`;
  return shell(L, "about", {
    title: T(L, "Hakkımda · Yunus Emre Ersoy", "About · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy'un özgeçmişi, eğitimi (Akdeniz Üniversitesi Bilgisayar Programcılığı), yetenekleri ve ilgi alanları.", "Résumé, education (Akdeniz University, Computer Programming), skills and interests of Yunus Emre Ersoy."),
    body,
  });
}

/* ---------------- PROJECTS ---------------- */
function projects(L) {
  const body = `${plateHead(L, "projects", T(L, "Projeler", "Projects"), T(L, "Fikir aşamasından bitmiş işe kadar üzerinde çalıştığım projeler. Her biri hem teknik gelişimimi hem de problem çözme yaklaşımımı gösteriyor.", "Projects I've worked on from idea to finished piece. Each one shows both my technical growth and how I approach a problem."))}
<section class="wrap sec" aria-label="${T(L, "Proje listesi", "Project list")}">
  <div class="sec-head" style="align-items:center">
    <div class="filters" role="group" aria-label="${T(L, "Projeleri filtrele", "Filter projects")}" data-filter-group="projects">
      <button type="button" data-filter="all" aria-pressed="true">${T(L, "Tümü", "All")}</button>
      <button type="button" data-filter="design" aria-pressed="false">${T(L, "Tasarım", "Design")}</button>
      <button type="button" data-filter="code" aria-pressed="false">${T(L, "Yazılım", "Code")}</button>
    </div>
    <p class="label" aria-live="polite" data-project-count data-template="${T(L, "{n} proje gösteriliyor", "Showing {n} projects")}">${T(L, "6 proje gösteriliyor", "Showing 6 projects")}</p>
  </div>
  <div class="grid-units bento">${PROJECTS.map((p, i) => unitCard(L, p, i, { lazy: i > 2, headingTag: "h2" })).join("\n")}</div>
</section>`;
  return shell(L, "projects", {
    title: T(L, "Projeler · Yunus Emre Ersoy", "Projects · Yunus Emre Ersoy"),
    desc: T(L, "Karakalem renklendirme, Smart Object, siyah beyaz kontrast, ürün tanıtımı, hesap makinesi ve yılan oyunu projeleri.", "Charcoal colorization, Smart Object, black and white contrast, product promotion, calculator and snake game projects."),
    body,
  });
}

/* ---------------- GALLERY ---------------- */
function gallery(L) {
  const body = `${plateHead(L, "gallery", T(L, "Galeri", "Gallery"), T(L, "Hayatımın farklı anlarından beni anlatan kareler. Büyütmek için fotoğrafa dokunun.", "Moments from different parts of my life. Tap a photo to enlarge it."))}
<section class="wrap sec" aria-label="${T(L, "Fotoğraflar", "Photos")}">
  <div class="gallery">${PHOTOS.map((ph, i) => photoFig(L, ph, i, { lazy: i > 2, h: "h2" })).join("\n")}</div>
</section>
<dialog class="lightbox" id="lightbox" aria-label="${T(L, "Fotoğraf görüntüleyici", "Photo viewer")}">
  <div class="lb-bar"><span data-idx>01 / 10</span><button class="lb-btn" type="button" data-close aria-label="${T(L, "Kapat", "Close")}">${ICON.close}</button></div>
  <div class="lb-stage"><img src="assets/img/gallery/calisma-masasi.jpg" alt="" loading="lazy"></div>
  <div class="lb-cap"><div><h2></h2><p></p></div><div class="lb-nav"><button class="lb-btn" type="button" data-prev aria-label="${T(L, "Önceki fotoğraf", "Previous photo")}">${ICON.prev}</button><button class="lb-btn" type="button" data-next aria-label="${T(L, "Sonraki fotoğraf", "Next photo")}">${ICON.next}</button></div></div>
</dialog>`;
  return shell(L, "gallery", {
    title: T(L, "Galeri · Yunus Emre Ersoy", "Gallery · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy'un fotoğraf galerisi: aile, futbol, basketbol, mezuniyet ve gündelik anlar.", "Photo gallery of Yunus Emre Ersoy: family, football, basketball, graduation and everyday moments."),
    body,
  });
}

/* ---------------- BLOG ---------------- */
import { ARTICLES } from "./articles.mjs";
function blog(L) {
  const fmt = (d) => { const [y, m, dd] = d.split("-"); const mo = T(L, ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"], ["January","February","March","April","May","June","July","August","September","October","November","December"])[+m - 1]; return L === "tr" ? `${+dd} ${mo} ${y}` : `${+dd} ${mo} ${y}`; };
  const tagBtns = (a) => `<ul class="tags" aria-label="${T(L, "Etiketler", "Tags")}">${a[L].tags.map((t) => `<li><button type="button" class="tag" data-key="${t}" aria-pressed="false">${t}</button></li>`).join("")}</ul>`;
  const catBtn = (a) => `<button type="button" class="cat" data-key="${a[L].cat}" aria-pressed="false" style="border:0;cursor:pointer">${u("diamond")}${a[L].cat}</button>`;
  const cards = ARTICLES.map((a, i) => `<article class="post-card glass tilt soft" data-keys="${[a[L].cat, ...a[L].tags].join("|")}">
    <div class="meta"><time class="date" datetime="${a.date}">${fmt(a.date)}</time><span class="date">${a[L].read}</span></div>
    <div>
      ${catBtn(a)}
      <h2><a href="#${a.id}">${a[L].title}</a></h2>
      <p>${a[L].excerpt}</p>
      ${tagBtns(a)}
      <p style="margin:18px 0 0"><a class="link" href="#${a.id}">${T(L, "Yazıyı oku", "Read the article")} ${u("diamond")}</a></p>
    </div>
    <span class="glare" aria-hidden="true"></span>${u(a.unit, "u u-big")}
  </article>`).join("\n");
  const posts = ARTICLES.map((a) => `<article class="post wrap" id="${a.id}" aria-labelledby="${a.id}-t">
  <a class="link back" href="#">${T(L, "Tüm yazılar", "All articles")} ${u("diamond")}</a>
  <header class="post-head">
    <div class="row"><span class="cat">${u("diamond")}${a[L].cat}</span><time class="date label" datetime="${a.date}">${fmt(a.date)}</time><span class="label">${a[L].read}</span><span class="label">${T(L, "Yazar", "By")}: Yunus Emre Ersoy</span></div>
    <h1 id="${a.id}-t">${a[L].title}</h1>
    <div class="row"><span class="label">${T(L, "Etiketler", "Tags")}</span><ul class="tags">${a[L].tags.map((t) => `<li><button type="button" class="tag" data-key="${t}">${t}</button></li>`).join("")}</ul></div>
  </header>
  <div class="article glass">${a[L].body}</div>
  <footer class="post-foot"><span class="label">${T(L, "Kategori", "Category")}: ${a[L].cat}</span><a class="link" href="#">${T(L, "Tüm yazılara dön", "Back to all articles")} ${u("diamond")}</a></footer>
</article>`).join("\n");
  const body = `<div class="blog">
<div class="post-list">
${plateHead(L, "blog", "Blog", T(L, "Yazılım, tasarım ve web üzerine notlarım. Bir kategoriye ya da etikete tıklayarak yazıları filtreleyebilirsiniz.", "Notes on software, design and the web. Click a category or tag to filter the articles."))}
<section class="wrap sec" aria-label="${T(L, "Yazılar", "Articles")}">
  <div class="post-index">${cards}</div>
  <p class="filter-note" aria-live="polite"></p>
</section>
</div>
${posts}
</div>`;
  return shell(L, "blog", {
    title: T(L, "Blog · Yunus Emre Ersoy", "Blog · Yunus Emre Ersoy"),
    desc: T(L, "Vibe coding, Photoshop'ta renk teorisi ve responsive tasarım ilkeleri üzerine yazılar.", "Articles on vibe coding, colour theory in Photoshop and responsive design principles."),
    body,
  });
}

/* ---------------- CONTACT ---------------- */
function contact(L) {
  const body = `${plateHead(L, "contact", T(L, "İletişim", "Contact"), T(L, "Staj, proje fikri ya da bir soru: aşağıdaki formdan yazın veya doğrudan arayın.", "An internship, a project idea or a question: write through the form below or call me directly."))}
<section class="wrap sec" aria-label="${T(L, "İletişim bilgileri ve form", "Contact details and form")}">
  <div class="contact-grid">
    <div class="contact-info glass">
      ${bigIcon("person")}
      <h2 class="h-sub" style="margin-bottom:18px">${T(L, "Bilgiler", "Details")}</h2>
      <ul class="c-list">
        <li><span class="ic">${u("diamond")}</span><div><span class="label">${T(L, "Adres", "Address")}</span><span class="val">Antalya / Burdur, Türkiye</span></div></li>
        <li><span class="ic">${u("cross")}</span><div><span class="label">${T(L, "Telefon", "Phone")}</span><a href="tel:+905447391507">+90 544 739 15 07</a><a href="tel:+905393561899">+90 539 356 18 99</a></div></li>
        <li><span class="ic">${u("knot")}</span><div><span class="label">${T(L, "E-posta", "Email")}</span><a href="mailto:${MAIL}">${MAIL}</a></div></li>
        <li><span class="ic">${u("star")}</span><div><span class="label">${T(L, "Sosyal medya", "Social")}</span>
          <div class="social-cards">
            <a class="s-card ig tilt" href="${IG}" target="_blank" rel="noopener"><span class="glare" aria-hidden="true"></span><span class="s-ic">${ICON.ig}</span><span class="s-txt"><b>Instagram</b><small>@e.mre0_0</small></span><span class="s-arrow">${ICON.next}</span></a>
            <a class="s-card li tilt" href="${LI}" target="_blank" rel="noopener"><span class="glare" aria-hidden="true"></span><span class="s-ic">${ICON.li}</span><span class="s-txt"><b>LinkedIn</b><small>Yunus Emre Ersoy</small></span><span class="s-arrow">${ICON.next}</span></a>
          </div>
        </div></li>
      </ul>
    </div>
    <div class="contact-form glass">
      <h2 class="h-sub" style="margin-bottom:8px">${T(L, "Mesaj gönderin", "Send a message")}</h2>
      <p class="muted" style="margin-bottom:22px">${T(L, "Gönder'e bastığınızda mesajınız e-posta uygulamanızda hazır olarak açılır.", "When you press Send, your message opens ready to go in your email app.")}</p>
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
    <iframe src="https://maps.google.com/maps?q=Antalya%2C%20T%C3%BCrkiye&amp;z=8&amp;output=embed" title="${T(L, "Antalya haritası", "Map of Antalya")}" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    <figcaption><span>${T(L, "Konum · Antalya / Burdur, Türkiye", "Location · Antalya / Burdur, Türkiye")}</span><a href="https://www.google.com/maps/search/?api=1&amp;query=Antalya%2C%20T%C3%BCrkiye" target="_blank" rel="noopener">${T(L, "Google Haritalar'da aç", "Open in Google Maps")}</a></figcaption>
  </figure>
</section>`;
  return shell(L, "contact", {
    title: T(L, "İletişim · Yunus Emre Ersoy", "Contact · Yunus Emre Ersoy"),
    desc: T(L, "Yunus Emre Ersoy ile iletişim: Antalya / Burdur, telefon, e-posta, iletişim formu ve harita.", "Contact Yunus Emre Ersoy: Antalya / Burdur, phone, email, contact form and map."),
    body,
  });
}

const BUILD = { home, about, projects, gallery, blog, contact };
for (const p of PAGES) for (const L of ["tr", "en"]) {
  fs.writeFileSync(path.join(OUT, p[L][0]), BUILD[p.key](L), "utf8");
  console.log("wrote", p[L][0]);
}

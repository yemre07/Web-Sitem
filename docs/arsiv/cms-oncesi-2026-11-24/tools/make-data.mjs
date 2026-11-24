/* One-off migration: moves the content that used to live inside build.mjs / articles.mjs
   into the central data file assets/js/data.js. Run once: node tools/make-data.mjs */
import fs from "node:fs";
import { ARTICLES } from "./articles.mjs";

const src = fs.readFileSync(new URL("./build.mjs", import.meta.url), "utf8");
const grab = (name) => {
  const start = src.indexOf(`const ${name} = [`);
  const end = src.indexOf("\n];", start);
  return (0, eval)(src.slice(start + `const ${name} = `.length, end + 2));
};
const PROJECTS = grab("PROJECTS");
const PHOTOS = grab("PHOTOS");
const FEATURED = { karakalem: 1, "yilan-oyunu": 2, "urun-tanitimi": 3 };
const MAIL = "yeersoy.0715@gmail.com";

const data = {
  version: 1,
  projects: PROJECTS.map((p) => ({
    id: p.id,
    cat: p.cat,
    img: `assets/img/projects/${p.img}`,
    tools: p.tools || "",
    featured: FEATURED[p.id] || 0,
    tr: { title: p.tr[0], desc: p.tr[1], alt: p.tr[2] },
    en: { title: p.en[0], desc: p.en[1], alt: p.en[2] },
  })),
  gallery: PHOTOS.map((ph) => ({
    id: ph.img.replace(/\.\w+$/, ""),
    img: `assets/img/gallery/${ph.img}`,
    w: ph.w,
    h: ph.h,
    tr: { title: ph.tr[0], caption: ph.tr[1], tag: ph.tr[2], alt: ph.tr[3] },
    en: { title: ph.en[0], caption: ph.en[1], tag: ph.en[2], alt: ph.en[3] },
  })),
  blog: ARTICLES.map((a) => ({
    id: a.id,
    date: a.date,
    unit: a.unit,
    tr: { ...a.tr, body: a.tr.body.trim() },
    en: { ...a.en, body: a.en.body.trim() },
  })),
  about: {
    facts: [
      { tr: ["Doğum", "25.07.2006, Antalya"], en: ["Born", "25 July 2006, Antalya"] },
      { tr: ["Okul", "Akdeniz Üniversitesi"], en: ["School", "Akdeniz University"] },
      { tr: ["Bölüm", "Bilgisayar Programcılığı"], en: ["Program", "Computer Programming"] },
      { tr: ["Odak", "Python · Yapay zekâ · Photoshop"], en: ["Focus", "Python · AI · Photoshop"] },
    ],
    summary: {
      tr: "Teknik altyapımı Python ve yapay zekâ araştırmalarıyla birleştiriyor, boş zamanımda Photoshop'ta tasarlıyorum.",
      en: "I combine my technical training with my own Python and AI research, and design in Photoshop in my spare time.",
    },
    bio: {
      tr: [
        "25 Temmuz 2006'da Antalya'da doğdum. Yeniliklere açık, hem kod yazan hem tasarlayan bir uygulama geliştirici olmak için çalışıyorum.",
        "Akdeniz Üniversitesi Bilgisayar Programcılığı bölümünde edindiğim teknik altyapıyı Python ve yapay zekâ alanındaki kişisel araştırmalarımla birleştiriyorum. Amacım, karmaşık sorunlara estetik ve işlevsel yazılım çözümleri getirerek dijital dünyada fark yaratmak.",
        "Kod yazmadığım zamanlarda Photoshop'ta karakalem çizimleri renklendiriyor, afiş ve kompozisyonlar hazırlıyorum. Sahada ise futbol ve basketbol oynuyorum; takım oyunundan öğrendiğim disiplin, projelerimde de işime yarıyor.",
      ],
      en: [
        "I was born in Antalya on 25 July 2006. I'm working to become an application developer who is open to new ideas and who both codes and designs.",
        "I combine the technical foundation I'm building in Akdeniz University's Computer Programming program with my own research in Python and artificial intelligence. My goal is to make a difference in the digital world by bringing aesthetic and functional software solutions to complex problems.",
        "When I'm not coding, I colorize charcoal drawings and build posters and compositions in Photoshop. On the pitch I play football and basketball; the discipline I learned from team sports helps in my projects too.",
      ],
    },
    education: [
      { years: "2025 –", current: true, tr: { school: "Akdeniz Üniversitesi", program: "Bilgisayar Programcılığı" }, en: { school: "Akdeniz University", program: "Computer Programming" } },
      { years: "2019 – 2023", tr: { school: "Karatay Anadolu Lisesi", program: "Lise" }, en: { school: "Karatay Anatolian High School", program: "High school" } },
      { years: "2011 – 2019", tr: { school: "Mareşal Fevzi Çakmak", program: "İlkokul ve Ortaokul" }, en: { school: "Mareşal Fevzi Çakmak", program: "Primary and secondary school" } },
    ],
    personal: [
      { tr: ["Ad Soyad", "Yunus Emre Ersoy"], en: ["Name", "Yunus Emre Ersoy"] },
      { tr: ["Doğum", "25.07.2006, Antalya"], en: ["Born", "25 July 2006, Antalya"] },
      { tr: ["Konum", "Antalya / Burdur, Türkiye"], en: ["Location", "Antalya / Burdur, Türkiye"] },
      { tr: ["E-posta", MAIL], en: ["Email", MAIL], mail: true },
      { tr: ["Teknik", "Python ve algoritma · Web tasarım (HTML/CSS) · Veri analizi · Proje yönetimi"], en: ["Technical", "Python and algorithms · Web design (HTML/CSS) · Data analysis · Project management"] },
    ],
    skills: [
      { name: "Python", value: 86, tr: "Yapay zekâ ve veri bilimi projelerinin temelinde ilerliyorum.", en: "Building the foundations for AI and data science projects." },
      { name: "Photoshop", value: 80, tr: "Görsel düzenleme ve dijital illüstrasyon.", en: "Photo editing and digital illustration." },
      { name: "HTML · CSS", value: 73, tr: "Web sitelerinin yapısı ve tasarım estetiği.", en: "Structure and visual design of websites." },
      { name: "JavaScript", value: 25, tr: "Web sayfalarına etkileşim kazandırmayı öğreniyorum.", en: "Learning to make web pages interactive." },
    ],
    interests: [
      { unit: "cross", tr: { title: "Futbol", html: "<em>“Takım oyunu, bireysel yetenekten üstündür.”</em> Amatör futbol geçmişim disiplin ve ekip çalışması kazandırdı. Basketbolu da seviyorum." }, en: { title: "Football", html: "<em>“Teamwork beats individual talent.”</em> My amateur football background taught me discipline and teamwork. I love basketball too." } },
      { unit: "star", tr: { title: "Kodlama", html: "Geleceği <code>Python</code> ve yapay zekâ teknolojileriyle inşa etmeye odaklanıyorum." }, en: { title: "Coding", html: "I'm focused on building the future with <code>Python</code> and AI technologies." } },
      { unit: "knot", tr: { title: "Dijital tasarım", html: "Photoshop'ta renklendirme, Smart Object ile kompozisyon ve ürün afişleri." }, en: { title: "Digital design", html: "Colorizing in Photoshop, Smart Object compositions and product posters." } },
      { unit: "hook", tr: { title: "Diğer", html: "Bilim kurgu filmleri · Müzik dinlemek · Teknoloji blogları · Doğa yürüyüşleri · Motosiklet" }, en: { title: "Other", html: "Sci-fi films · Listening to music · Tech blogs · Nature walks · Motorcycles" } },
    ],
  },
};

const out = `/* Yunus Emre Ersoy · site content (the single source of truth).
   Default data for every page. The admin panel (admin.html) saves edits to
   localStorage on top of this; "data.js olarak indir" in the panel produces a
   replacement for this file so edits can be published for every visitor.
   Fields marked html/body may contain HTML; everything else is plain text. */
globalThis.SITE_DEFAULTS = ${JSON.stringify(data, null, 2)};
`;
fs.writeFileSync(new URL("../assets/js/data.js", import.meta.url), out, "utf8");
console.log("wrote assets/js/data.js", data.projects.length, "projects,", data.gallery.length, "photos,", data.blog.length, "posts");

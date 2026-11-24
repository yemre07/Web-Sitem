/* Shared content renderers.
   Used by tools/build.mjs (static, no-JS fallback baked into the HTML) and by
   assets/js/cms.js (live rendering from data.js + localStorage), so both produce
   exactly the same markup. Plain script, no modules, no libraries. */
(function (g) {
  "use strict";

  /* ---------- primitives ---------- */
  var U = {
    diamond: '<path fill-rule="evenodd" d="M16 1 31 16 16 31 1 16Zm0 6L7 16l9 9 9-9Z"/><path class="a" d="M16 11l5 5-5 5-5-5Z"/>',
    eye: '<path fill-rule="evenodd" d="M16 3 29 16 16 29 3 16Zm0 5-8 8 8 8 8-8Z"/><path d="M1 14h4v4H1zM27 14h4v4h-4zM14 1h4v4h-4zM14 27h4v4h-4z"/><path class="a" d="M16 13l3 3-3 3-3-3Z"/>',
    star: '<path d="M9 9h14v14H9z"/><path d="M16 5.5 26.5 16 16 26.5 5.5 16Z"/><path class="a" d="M16 12l4 4-4 4-4-4Z"/>',
    knot: '<path fill-rule="evenodd" d="M3 3h17v17H3Zm4 4v9h9V7Z"/><path fill-rule="evenodd" d="M12 12h17v17H12Zm4 4v9h9v-9Z"/><path class="a" d="M12 12h4v4h-4z"/>',
    hook: '<path fill-rule="evenodd" d="M16 4 28 16 16 28 4 16Zm0 6-6 6 6 6 6-6Z"/><path d="M13 1h6v3h-3v2h-3zM19 31h-6v-3h3v-2h3zM1 19v-6h3v3h2v3zM31 13v6h-3v-3h-2v-3z"/><path class="a" d="M16 13l3 3-3 3-3-3Z"/>',
    cross: '<path d="M14 2h4v4h-4zM9 7h4v4H9zM19 7h4v4h-4zM4 12h4v4H4zM24 12h4v4h-4zM9 17h4v4H9zM19 17h4v4h-4zM14 22h4v4h-4zM4 16h4v4H4zM24 16h4v4h-4z"/><path class="a" d="M14 12h4v8h-4z"/>'
  };
  var u = function (n, cls) {
    return '<svg class="' + (cls || "u") + '" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + (U[n] || U.diamond) + "</svg>";
  };
  var DECO = {
    leaf: '<svg viewBox="0 0 48 48"><path d="M24 45V21"/><path d="M24 27c0-10 7-17 17-18 0 10-7 18-17 18Z"/><path d="M24 33C24 25 18 19 8 18c0 9 7 15 16 15Z"/></svg>',
    flower: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="4"/><path d="M24 20c-3-5-3-11 0-15 3 4 3 10 0 15ZM28 24c5-3 11-3 15 0-4 3-10 3-15 0ZM24 28c3 5 3 11 0 15-3-4-3-10 0-15ZM20 24c-5 3-11 3-15 0 4-3 10-3 15 0Z"/></svg>',
    diamond: '<svg viewBox="0 0 48 48"><path d="M24 3 45 24 24 45 3 24Z"/><path d="M24 14 34 24 24 34 14 24Z"/></svg>',
    spark: '<svg viewBox="0 0 48 48"><path d="M24 3c2 11 10 19 21 21-11 2-19 10-21 21-2-11-10-19-21-21C14 22 22 14 24 3Z"/></svg>'
  };
  /* Photo wrapper: rotating light border, corner ornaments, floating badges */
  var fx = function (inner, badges, cls) {
    badges = badges || [];
    var set = ["leaf", "diamond", "spark", "flower"];
    return '<div class="pfx' + (cls ? " " + cls : "") + '">\n    <span class="pfx-ring" aria-hidden="true"></span>\n    ' + inner + "\n    " +
      set.map(function (n, i) { return '<span class="pfx-deco d' + (i + 1) + '" aria-hidden="true">' + DECO[n] + "</span>"; }).join("") + "\n    " +
      badges.map(function (b, i) { return '<span class="pfx-badge b' + (i + 1) + '" aria-hidden="true"><i></i>' + b + "</span>"; }).join("") + "\n  </div>";
  };
  var BIG = {
    design: '<svg viewBox="0 0 100 100"><path d="M50 6 90 46 66 94H34L10 46Z"/><path d="M50 6v44"/><circle cx="50" cy="58" r="8"/><path d="M34 94h32"/></svg>',
    code: '<svg viewBox="0 0 100 100"><path d="M34 24 8 50l26 26M66 24l26 26-26 26M58 14 42 86"/></svg>',
    person: '<svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18"/><path d="M14 94c4-20 18-32 36-32s32 12 36 32"/><path d="M50 4 54 10 50 16 46 10Z"/></svg>'
  };
  var bigIcon = function (k) {
    return '<span class="bg-icon" aria-hidden="true">' + (BIG[k] || BIG.design) + '</span><span class="bg-pattern" aria-hidden="true"></span><span class="glare" aria-hidden="true"></span>';
  };

  var T = function (L, tr, en) { return L === "tr" ? tr : en; };
  var num = function (i) { return String(i).padStart(2, "0"); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  /* Only http(s), protocol-relative, site-relative paths and inline images are allowed as image sources */
  var safeUrl = function (s) {
    s = String(s || "").trim();
    if (/^(https?:)?\/\//i.test(s) || /^data:image\/(png|jpe?g|gif|webp|avif);/i.test(s)) return esc(s);
    if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return "#";
    return esc(s);
  };
  /* Localised field with Turkish fallback (admin may leave English empty) */
  var loc = function (item, L, key) {
    var v = item && item[L] && item[L][key];
    var empty = v == null || v === "" || (Array.isArray(v) && !v.length);
    return empty ? (item && item.tr ? item.tr[key] : "") : v;
  };
  var PAGE = {
    projects: { tr: "projeler.html", en: "projects.html" },
    about: { tr: "hakkimda.html", en: "about.html" }
  };
  var BENTO = ["xl", "h", "h", "v", "v", "v"];
  var SOCIAL = {
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.3-4.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>',
    li: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2.5 9h3v12h-3zM9 9h2.9v1.7c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.5 2.3 4.5 5.4V21h-3v-6c0-1.5-.3-3.1-2.2-3.1S12 13.3 12 15v6H9z"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
  };
  /* Contact / location data (editable in the panel's Profile tab) */
  var prof = function (d) { return d.profile || {}; };
  var place = function (L, d) { var l = prof(d).location || {}; return l[L] || l.tr || ""; };
  var tel = function (p) { return "tel:" + String(p || "").replace(/[^\d+]/g, ""); };
  var linkUrl = function (s) { s = String(s || "").trim(); return /^https?:\/\//i.test(s) ? esc(s) : "#"; };
  var igHandle = function (url) { var m = /instagram\.com\/([^/?#]+)/i.exec(url || ""); return m ? "@" + m[1] : "Instagram"; };
  var mapQ = function (d) { return encodeURIComponent(prof(d).mapQuery || place("tr", d) || "Antalya"); };
  var typeLabel = function (L, cat) { return cat === "code" ? T(L, "Yazılım", "Code") : T(L, "Tasarım", "Design"); };
  var dims = function (o, fw, fh) {
    var w = +o.w || fw, h = +o.h || fh;
    return w && h ? ' width="' + w + '" height="' + h + '"' : "";
  };

  /* ---------- cards ---------- */
  function unitCard(L, p, i, lazy) {
    var cat = p.cat === "code" ? "code" : "design";
    return '<article class="unit glass tilt ' + (BENTO[i] || "v") + '" data-cat="' + cat + '" id="' + esc(p.id) + '">\n  ' + bigIcon(cat) +
      '\n  <div class="unit-media"><img src="' + safeUrl(p.img) + '" alt="' + esc(loc(p, L, "alt") || loc(p, L, "title")) + '"' + dims(p, 800, 600) + (lazy ? ' loading="lazy"' : "") + "></div>" +
      '\n  <div class="unit-side">\n  <div class="unit-labels"><span class="no">U-' + num(i + 1) + "</span><span>" + esc(p.tools || T(L, "Uygulama", "App")) + '</span><span class="ty">' + typeLabel(L, cat) + "</span></div>" +
      '\n  <div class="unit-body"><h2>' + esc(loc(p, L, "title")) + "</h2><p>" + esc(loc(p, L, "desc")) + "</p></div>\n  </div>\n</article>";
  }
  function photoFig(L, ph, i, o) {
    o = o || {};
    var h = o.h || "h3";
    var title = esc(loc(ph, L, "title")), cap = esc(loc(ph, L, "caption")), tag = esc(loc(ph, L, "tag") || T(L, "Galeri", "Gallery"));
    var img = '<img src="' + safeUrl(ph.img) + '" alt="' + esc(loc(ph, L, "alt") || loc(ph, L, "title")) + '"' + dims(ph) + (o.lazy ? ' loading="lazy"' : "") + ">";
    var media = o.button === false ? '<div class="pfx-media">' + img + "</div>" :
      '<button type="button" class="pfx-media" data-photo aria-label="' + T(L, "Büyüt", "Enlarge") + ": " + title + '">' + img + "</button>";
    return '<figure class="photo glass">\n  ' + fx(media, [tag, "F-" + num(i + 1)]) +
      "\n  <figcaption><" + h + ">" + title + "</" + h + "><p>" + cap + '</p><div class="ticket"><span>' + tag + "</span><b>F-" + num(i + 1) + "</b></div></figcaption>\n</figure>";
  }
  function plateUnit(L, p, i, n) {
    var cat = p.cat === "code" ? "code" : "design";
    var link = PAGE.projects[L] + "#" + esc(p.id);
    return '<article class="pr-unit glass tilt">\n    ' + bigIcon(cat) +
      '\n    <a class="pr-media" href="' + link + '" tabindex="-1" aria-hidden="true"><img src="' + safeUrl(p.img) + '" alt=""' + dims(p, 800, 600) + "></a>" +
      '\n    <h2><span class="pn">' + num(n) + '</span><a href="' + link + '">' + esc(loc(p, L, "title")) + "</a></h2>" +
      "\n    <p>" + esc(loc(p, L, "desc")) + "</p>" +
      '\n    <div class="pr-foot"><span class="no">U-' + num(i + 1) + "</span><span>" + typeLabel(L, cat) + "</span></div>\n  </article>";
  }
  var MONTHS = {
    tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var fmtDate = function (L, d) {
    var p = String(d || "").split("-");
    if (p.length !== 3) return esc(d);
    return +p[2] + " " + MONTHS[L][+p[1] - 1] + " " + p[0];
  };
  var featuredList = function (d) {
    var all = d.projects.map(function (p, i) { return { p: p, i: i }; });
    var picked = all.filter(function (x) { return +x.p.featured > 0; }).sort(function (a, b) { return a.p.featured - b.p.featured; });
    all.forEach(function (x) { if (picked.length < 3 && picked.indexOf(x) < 0) picked.push(x); });
    return picked.slice(0, 3);
  };

  /* ---------- section renderers (key = data-cms attribute) ---------- */
  var R = {
    heroStats: function (L, d) {
      var py = (d.about.skills || []).filter(function (s) { return /python/i.test(s.name); })[0];
      var stats = [
        [d.projects.length, T(L, "Proje", "Projects")],
        [d.gallery.length, T(L, "Fotoğraf", "Photos")],
        [d.blog.length, T(L, "Blog yazısı", "Articles")],
        [py ? py.value : 0, "Python", "%"]
      ];
      return stats.map(function (s) { return '<li><b><span data-count="' + (+s[0]) + '">' + (+s[0]) + "</span>" + (s[2] || "") + "</b><span>" + s[1] + "</span></li>"; }).join("");
    },
    homeBento: function (L, d) {
      var about = '<div class="pr-about glass tilt">\n    ' + bigIcon("person") +
        '\n    <h2 id="pr-title"><span class="pn">01</span>' + T(L, "Kısaca ben", "Me, in short") + "</h2>" +
        '\n    <ul class="facts">\n' + d.about.facts.map(function (f) { var x = f[L] || f.tr; return "      <li><span>" + esc(x[0]) + "</span>" + esc(x[1]) + "</li>"; }).join("\n") + "\n    </ul>" +
        "\n    <p>" + esc(d.about.summary[L] || d.about.summary.tr) + "</p>" +
        '\n    <a class="link" href="' + PAGE.about[L] + '">' + T(L, "Hakkımda", "About me") + " " + u("diamond") + "</a>\n  </div>";
      return "\n  " + about + "\n  " + featuredList(d).map(function (x, k) { return plateUnit(L, x.p, x.i, k + 2); }).join("") + "\n";
    },
    featuredNote: function (L, d) {
      var f = featuredList(d).length, n = d.projects.length;
      return T(L, "Öne çıkan " + f + " proje · toplam " + n, f + " featured projects · " + n + " in total");
    },
    galleryCount: function (L, d) { return String(d.gallery.length); },
    strip: function (L, d) {
      return d.gallery.slice(0, 4).map(function (ph, i) { return photoFig(L, ph, i, { button: false, lazy: true }); }).join("\n");
    },
    gallery: function (L, d) {
      return d.gallery.map(function (ph, i) { return photoFig(L, ph, i, { lazy: i > 2, h: "h2" }); }).join("\n");
    },
    projects: function (L, d) {
      return d.projects.map(function (p, i) { return unitCard(L, p, i, i > 2); }).join("\n");
    },
    projectCount: function (L, d) {
      return T(L, "{n} proje gösteriliyor", "Showing {n} projects").replace("{n}", d.projects.length);
    },
    blogCards: function (L, d) {
      return d.blog.map(function (a) {
        var cat = esc(loc(a, L, "cat")), tags = loc(a, L, "tags") || [], id = esc(a.id);
        return '<article class="post-card glass tilt soft" data-keys="' + esc([loc(a, L, "cat")].concat(tags).join("|")) + '">' +
          '\n    <div class="meta"><time class="date" datetime="' + esc(a.date) + '">' + fmtDate(L, a.date) + '</time><span class="date">' + esc(loc(a, L, "read")) + "</span></div>" +
          "\n    <div>\n      " + '<button type="button" class="cat" data-key="' + cat + '" aria-pressed="false" style="border:0;cursor:pointer">' + u("diamond") + cat + "</button>" +
          '\n      <h2><a href="#' + id + '">' + esc(loc(a, L, "title")) + "</a></h2>" +
          "\n      <p>" + esc(loc(a, L, "excerpt")) + "</p>" +
          '\n      <ul class="tags" aria-label="' + T(L, "Etiketler", "Tags") + '">' + tags.map(function (t) { return '<li><button type="button" class="tag" data-key="' + esc(t) + '" aria-pressed="false">' + esc(t) + "</button></li>"; }).join("") + "</ul>" +
          '\n      <p style="margin:18px 0 0"><a class="link" href="#' + id + '">' + T(L, "Yazıyı oku", "Read the article") + " " + u("diamond") + "</a></p>" +
          '\n    </div>\n    <span class="glare" aria-hidden="true"></span>' + u(a.unit, "u u-big") + "\n  </article>";
      }).join("\n");
    },
    blogPosts: function (L, d) {
      return d.blog.map(function (a) {
        var cat = esc(loc(a, L, "cat")), tags = loc(a, L, "tags") || [], id = esc(a.id);
        return '<article class="post wrap" id="' + id + '" aria-labelledby="' + id + '-t">' +
          '\n  <a class="link back" href="#">' + T(L, "Tüm yazılar", "All articles") + " " + u("diamond") + "</a>" +
          '\n  <header class="post-head">\n    <div class="row"><span class="cat">' + u("diamond") + cat + '</span><time class="date label" datetime="' + esc(a.date) + '">' + fmtDate(L, a.date) + '</time><span class="label">' + esc(loc(a, L, "read")) + '</span><span class="label">' + T(L, "Yazar", "By") + ": Yunus Emre Ersoy</span></div>" +
          '\n    <h1 id="' + id + '-t">' + esc(loc(a, L, "title")) + "</h1>" +
          '\n    <div class="row"><span class="label">' + T(L, "Etiketler", "Tags") + '</span><ul class="tags">' + tags.map(function (t) { return '<li><button type="button" class="tag" data-key="' + esc(t) + '">' + esc(t) + "</button></li>"; }).join("") + "</ul></div>\n  </header>" +
          '\n  <div class="article glass">' + (loc(a, L, "body") || "") + "</div>" +
          '\n  <footer class="post-foot"><span class="label">' + T(L, "Kategori", "Category") + ": " + cat + '</span><a class="link" href="#">' + T(L, "Tüm yazılara dön", "Back to all articles") + " " + u("diamond") + "</a></footer>\n</article>";
      }).join("\n");
    },
    bio: function (L, d) {
      var b = d.about.bio[L] || d.about.bio.tr;
      return "\n        " + b.map(function (p, i) { return (i === 0 ? '<p class="lead">' : "<p>") + esc(p) + "</p>"; }).join("\n        ") + "\n      ";
    },
    education: function (L, d) {
      return "\n" + d.about.education.map(function (e) {
        var x = e[L] || e.tr;
        return '          <tr><th scope="row">' + esc(e.years) + "</th><td><strong>" + esc(x.school) + "</strong>" + esc(x.program) +
          (e.current ? '<span class="now">' + u("diamond") + T(L, "Devam ediyor", "Ongoing") + "</span>" : "") + "</td></tr>";
      }).join("\n") + "\n        ";
    },
    personal: function (L, d) {
      return "\n" + d.about.personal.map(function (r) {
        var x = r[L] || r.tr;
        var val = esc(x[1]);
        if (r.field === "location" && place(L, d)) val = esc(place(L, d));
        if (r.field === "email" || r.mail) { var m = prof(d).email || x[1]; val = '<a href="mailto:' + esc(m) + '">' + esc(m) + "</a>"; }
        return '          <tr><th scope="row">' + esc(x[0]) + "</th><td>" + val + "</td></tr>";
      }).join("\n") + "\n        ";
    },
    skills: function (L, d) {
      return "\n    " + d.about.skills.map(function (s) {
        var v = Math.max(0, Math.min(100, +s.value || 0));
        return '<li><span class="name">' + esc(s.name) + "<small>" + esc(s[L] || s.tr) + '</small></span><span class="meter" aria-hidden="true" style="--v:' + v + '%"><i></i><b></b></span><span class="val">' + v + '<span class="sr-only"> / 100</span></span></li>';
      }).join("\n    ") + "\n  ";
    },
    interests: function (L, d) {
      return "\n    " + d.about.interests.map(function (it, i) {
        var x = it[L] || it.tr;
        return '<li class="glass tilt"><span class="glare" aria-hidden="true"></span><span class="no">I-' + num(i + 1) + "</span>" + u(it.unit) + "<h3>" + esc(x.title) + "</h3><p>" + x.html + "</p></li>";
      }).join("\n    ") + "\n  ";
    }
  };

  /* ---------- contact + footer (profile driven) ---------- */
  R.footContact = function (L, d) {
    var p = prof(d), ph = (p.phones || [])[0];
    return (p.email ? '<li><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></li>" : "") +
      (ph ? '<li><a href="' + esc(tel(ph)) + '">' + esc(ph) + "</a></li>" : "") +
      "<li>" + esc(place(L, d)) + "</li>";
  };
  R.footSocial = function (L, d) {
    var p = prof(d);
    return (p.instagram ? '<a class="sq" href="' + linkUrl(p.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + SOCIAL.ig + "</a>" : "") +
      (p.linkedin ? '<a class="sq" href="' + linkUrl(p.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + SOCIAL.li + "</a>" : "");
  };
  R.contactList = function (L, d) {
    var p = prof(d);
    var cards = (p.instagram ? '\n            <a class="s-card ig tilt" href="' + linkUrl(p.instagram) + '" target="_blank" rel="noopener"><span class="glare" aria-hidden="true"></span><span class="s-ic">' + SOCIAL.ig + '</span><span class="s-txt"><b>Instagram</b><small>' + esc(igHandle(p.instagram)) + '</small></span><span class="s-arrow">' + SOCIAL.next + "</span></a>" : "") +
      (p.linkedin ? '\n            <a class="s-card li tilt" href="' + linkUrl(p.linkedin) + '" target="_blank" rel="noopener"><span class="glare" aria-hidden="true"></span><span class="s-ic">' + SOCIAL.li + '</span><span class="s-txt"><b>LinkedIn</b><small>Yunus Emre Ersoy</small></span><span class="s-arrow">' + SOCIAL.next + "</span></a>" : "");
    return "\n        " + [
      '<li><span class="ic">' + u("diamond") + '</span><div><span class="label">' + T(L, "Adres", "Address") + '</span><span class="val">' + esc(place(L, d)) + "</span></div></li>",
      '<li><span class="ic">' + u("cross") + '</span><div><span class="label">' + T(L, "Telefon", "Phone") + "</span>" + (p.phones || []).filter(Boolean).map(function (ph) { return '<a href="' + esc(tel(ph)) + '">' + esc(ph) + "</a>"; }).join("") + "</div></li>",
      '<li><span class="ic">' + u("knot") + '</span><div><span class="label">' + T(L, "E-posta", "Email") + '</span><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a></div></li>",
      '<li><span class="ic">' + u("star") + '</span><div><span class="label">' + T(L, "Sosyal medya", "Social") + '</span>\n          <div class="social-cards">' + cards + "\n          </div>\n        </div></li>"
    ].join("\n        ") + "\n      ";
  };
  R.mapSrc = function (L, d) { return "https://maps.google.com/maps?q=" + mapQ(d) + "&z=13&output=embed"; };
  R.mapCaption = function (L, d) {
    return "<span>" + T(L, "Konum", "Location") + " · " + esc(place(L, d)) + '</span><a href="https://www.google.com/maps/search/?api=1&amp;query=' + mapQ(d) + '" target="_blank" rel="noopener">' + T(L, "Google Haritalar'da aç", "Open in Google Maps") + "</a>";
  };
  R.mapTitle = function (L, d) { return T(L, "Harita: ", "Map: ") + (prof(d).mapQuery || place(L, d)); };

  g.SiteRender = { R: R, u: u, fx: fx, bigIcon: bigIcon, esc: esc, safeUrl: safeUrl, num: num, T: T, units: Object.keys(U) };
})(typeof window !== "undefined" ? window : globalThis);

/* CONTROLLER · admin
   Admin panel for the client-side CMS (models/store.js). Vanilla JS, no backend.
   - Login: SHA-256 hash comparison + lockout after repeated failures.
     This is a convenience lock for a static site, not real security: the hash
     ships with the page and edits only live in this browser's localStorage.
   - Full CRUD for projects, blog posts and gallery photos, a profile/about
     editor, the contact-form inbox, live search and summary cards. */
(function () {
  "use strict";
  var CMS = window.CMS, SR = window.SiteRender;
  if (!CMS || !SR) return;

  /* sha256("yemre:" + password) */
  var LOGIN_HASH = "e16531e33183b1134f7aa483178b471825fae79b51a5767ca93a901ca11c6288";
  var SESSION = "yee-admin-session-v2";
  var FAILS = "yee-admin-fails";
  var MAX_FAILS = 5, LOCK_MS = 30000;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = SR.esc;
  var KINDS = ["projects", "blog", "gallery"];

  var data = null;
  var dirty = false;
  var editing = { projects: null, blog: null, gallery: null };
  var openMsg = null;

  /* ---------- SHA-256 (pure JS, works on file:// and http alike) ---------- */
  var sha256 = function (str) {
    var rr = function (v, a) { return (v >>> a) | (v << (32 - a)); };
    var msg = unescape(encodeURIComponent(str));
    var H = [], K = [], n = 0, c = 2;
    var prime = function (x) { for (var f = 2; f * f <= x; f++) if (x % f === 0) return false; return true; };
    var frac = function (x) { return ((x - Math.floor(x)) * 4294967296) | 0; };
    while (n < 64) { if (prime(c)) { if (n < 8) H[n] = frac(Math.pow(c, 1 / 2)); K[n] = frac(Math.pow(c, 1 / 3)); n++; } c++; }
    var bitLen = msg.length * 8, w = [], i, j;
    msg += "\x80";
    while (msg.length % 64 !== 56) msg += "\x00";
    for (i = 0; i < msg.length; i++) w[i >> 2] |= msg.charCodeAt(i) << ((3 - (i % 4)) * 8);
    w.push((bitLen / 4294967296) | 0, bitLen | 0);
    for (j = 0; j < w.length; j += 16) {
      var W = w.slice(j, j + 16), a = H.slice(0);
      for (i = 0; i < 64; i++) {
        if (i >= 16) {
          var x = W[i - 15], y = W[i - 2];
          W[i] = (W[i - 16] + (rr(x, 7) ^ rr(x, 18) ^ (x >>> 3)) + W[i - 7] + (rr(y, 17) ^ rr(y, 19) ^ (y >>> 10))) | 0;
        }
        var e = a[4];
        var t1 = (a[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & a[5]) ^ (~e & a[6])) + K[i] + W[i]) | 0;
        var t2 = ((rr(a[0], 2) ^ rr(a[0], 13) ^ rr(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2]))) | 0;
        a = [(t1 + t2) | 0, a[0], a[1], a[2], (a[3] + t1) | 0, a[4], a[5], a[6]];
      }
      for (i = 0; i < 8; i++) H[i] = (H[i] + a[i]) | 0;
    }
    return H.map(function (h) { return ("00000000" + (h >>> 0).toString(16)).slice(-8); }).join("");
  };

  /* ---------- small helpers ---------- */
  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    del: function (k) { try { window.sessionStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };
  var toastEl = $(".adm-toast"), toastT;
  var toast = function (msg, bad) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.toggle("bad", !!bad);
    toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.hidden = true; }, 3400);
  };
  var norm = function (s) { return String(s || "").toLocaleLowerCase("tr-TR"); };
  var slug = function (s) {
    var map = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };
    return norm(s).normalize("NFD").replace(/[̇]/g, "").replace(/[çğıöşüâîû]/g, function (ch) { return map[ch] || ch; })
      .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "icerik";
  };
  var uniqueId = function (base) {
    var ids = {};
    data.projects.concat(data.gallery, data.blog).forEach(function (x) { ids[x.id] = 1; });
    var id = base, n = 2;
    while (ids[id] || /^(main|lightbox|contact-form|yetenekler|pr-title|sc-title|gal-title|hero-title)$/.test(id)) id = base + "-" + n++;
    return id;
  };
  var tags = function (s) {
    return String(s || "").split(",").map(function (t) { return t.trim().replace(/\s+/g, ""); })
      .filter(Boolean).map(function (t) { return t.charAt(0) === "#" ? t : "#" + t; });
  };
  var untag = function (list) { return (list || []).map(function (t) { return String(t).replace(/^#/, ""); }).join(", "); };
  var plain = function (html) { return new DOMParser().parseFromString("<body>" + (html || "") + "</body>", "text/html").body.textContent || ""; };
  var readTime = function (html, L) {
    var words = plain(html).trim().split(/\s+/).filter(Boolean).length;
    var m = Math.max(1, Math.round(words / 200));
    return L === "tr" ? m + " dk okuma" : m + " min read";
  };
  var urlOk = function (s) {
    s = String(s || "").trim();
    return /^https?:\/\/\S+$/i.test(s) || /^(\.\/|\/)?assets\/\S+$/i.test(s) || /^data:image\/(png|jpe?g|gif|webp|avif);base64,/i.test(s);
  };
  var webOk = function (s) { s = String(s || "").trim(); return !s || /^https?:\/\/\S+$/i.test(s); };
  var mailOk = function (s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim()); };
  var today = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var when = function (iso) {
    var d = new Date(iso);
    return isNaN(d) ? "" : d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) + " · " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  };
  var paras = function (s) { return String(s || "").replace(/\r/g, "").split(/\n\s*\n/).map(function (p) { return p.replace(/\s*\n\s*/g, " ").trim(); }).filter(Boolean); };

  /* Markdown-lite → HTML. Everything is escaped first; only a few constructs are allowed back. */
  var inline = function (s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (m, t, u) { return '<a href="' + u + '" target="_blank" rel="noopener">' + t + "</a>"; });
  };
  var md = function (text) {
    return String(text || "").replace(/\r/g, "").split(/\n\s*\n/).map(function (block) {
      var lines = block.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
      if (!lines.length) return "";
      if (/^#{2,3}\s/.test(lines[0]) && lines.length === 1) return "<h2>" + inline(lines[0].replace(/^#+\s*/, "")) + "</h2>";
      if (lines.every(function (l) { return /^[-*]\s+/.test(l); })) return "<ul>\n" + lines.map(function (l) { return "  <li>" + inline(l.replace(/^[-*]\s+/, "")) + "</li>"; }).join("\n") + "\n</ul>";
      if (lines.every(function (l) { return /^\d+[.)]\s+/.test(l); })) return "<ol>\n" + lines.map(function (l) { return "  <li>" + inline(l.replace(/^\d+[.)]\s+/, "")) + "</li>"; }).join("\n") + "\n</ol>";
      if (lines.every(function (l) { return /^>\s?/.test(l); })) return "<blockquote><p>" + lines.map(function (l) { return inline(l.replace(/^>\s?/, "")); }).join("<br>") + "</p></blockquote>";
      return "<p>" + lines.map(inline).join("<br>") + "</p>";
    }).filter(Boolean).join("\n");
  };
  /* HTML input (used when editing the original articles) is reduced to a safe allow-list */
  var ALLOWED = { P: 1, H2: 1, H3: 1, UL: 1, OL: 1, LI: 1, STRONG: 1, EM: 1, B: 1, I: 1, CODE: 1, PRE: 1, BLOCKQUOTE: 1, A: 1, BR: 1 };
  var DROP = { SCRIPT: 1, STYLE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, TEMPLATE: 1, NOSCRIPT: 1, SVG: 1, MATH: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1, IMG: 1, VIDEO: 1, AUDIO: 1 };
  var sanitize = function (html) {
    var doc = new DOMParser().parseFromString("<body>" + html + "</body>", "text/html");
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 8) { ch.remove(); return; }
        if (ch.nodeType !== 1) return;
        var tag = ch.tagName.toUpperCase();
        if (DROP[tag]) { ch.remove(); return; }
        walk(ch);
        if (!ALLOWED[tag]) { while (ch.firstChild) node.insertBefore(ch.firstChild, ch); ch.remove(); return; }
        var href = tag === "A" ? String(ch.getAttribute("href") || "").trim() : "";
        Array.prototype.slice.call(ch.attributes).forEach(function (at) { ch.removeAttribute(at.name); });
        if (tag === "A" && /^(https?:|mailto:|#)/i.test(href)) {
          ch.setAttribute("href", href);
          if (/^https?:/i.test(href)) { ch.setAttribute("target", "_blank"); ch.setAttribute("rel", "noopener"); }
        }
      });
    };
    walk(doc.body);
    return doc.body.innerHTML.trim();
  };
  var toHtml = function (text) { return /^\s*</.test(text) ? sanitize(text) : md(text); };

  var download = function (name, text, type) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  var on = function (sel, fn) { var el = $(sel); if (el) el.addEventListener("click", fn); };

  /* ---------- status + dashboard ---------- */
  var setDirty = function (v) { dirty = v; status(); };
  var status = function () {
    if (!data) return;
    var el = $("[data-status]");
    if (el) {
      var at = CMS.savedAt();
      var base = CMS.isCustom()
        ? "Tarayıcıda kayıtlı özel içerik · son kayıt " + new Date(at).toLocaleString("tr-TR")
        : "Varsayılan içerik (content.js) kullanılıyor";
      el.innerHTML = esc(base) + (dirty ? ' <b class="adm-dirty">● Kaydedilmemiş değişiklikler var</b>' : "");
    }
    KINDS.forEach(function (k) {
      var c = $('[data-count-of="' + k + '"]');
      if (c) c.textContent = "(" + data[k].length + ")";
    });
    var inbox = CMS.inbox.list(), unread = inbox.filter(function (m) { return !m.read; }).length;
    var feat = data.projects.filter(function (p) { return +p.featured > 0; }).length;
    var code = data.projects.filter(function (p) { return p.cat === "code"; }).length;
    var en = data.blog.filter(function (b) { return b.en && b.en.title; }).length;
    var lastPost = data.blog.map(function (b) { return b.date; }).sort().pop();
    var setStat = function (key, n, sub) {
      var card = $('[data-stat="' + key + '"]');
      if (!card) return;
      $("[data-stat-n]", card).textContent = n;
      $("[data-stat-sub]", card).textContent = sub;
    };
    setStat("projects", data.projects.length, feat + " öne çıkan · " + (data.projects.length - code) + " tasarım · " + code + " yazılım");
    setStat("blog", data.blog.length, en + " yazının İngilizcesi var" + (lastPost ? " · son: " + lastPost : ""));
    setStat("gallery", data.gallery.length, Math.min(4, data.gallery.length) + " tanesi anasayfada");
    setStat("inbox", unread, "toplam " + inbox.length + " mesaj");
    var ic = $('[data-stat="inbox"]');
    if (ic) ic.classList.toggle("has-unread", unread > 0);
    var pill = $("[data-unread]");
    if (pill) { pill.hidden = !unread; pill.textContent = unread; }
  };

  /* ---------- lists (+ live search) ---------- */
  var title = function (x) { return (x.tr && x.tr.title) || x.id; };
  var searchText = function (kind, x) {
    if (kind === "inbox") return [x.name, x.email, x.subject, x.message].join(" ");
    var parts = [x.id, x.tools, x.cat, x.date];
    ["tr", "en"].forEach(function (L) { var o = x[L] || {}; parts.push(o.title, o.desc, o.caption, o.tag, o.cat, (o.tags || []).join(" ")); });
    return parts.join(" ");
  };
  var applySearch = function (kind) {
    var input = $('[data-search="' + kind + '"]'), ol = $('[data-list="' + kind + '"]');
    if (!input || !ol) return;
    var q = norm(input.value.trim());
    var items = $$(".adm-item", ol), shown = 0;
    items.forEach(function (li) {
      var hit = !q || li.getAttribute("data-text").indexOf(q) > -1;
      li.hidden = !hit;
      if (hit) shown++;
    });
    var none = $(".adm-noresult", ol);
    if (q && !shown && items.length) {
      if (!none) { none = document.createElement("li"); none.className = "adm-empty adm-noresult"; ol.appendChild(none); }
      none.textContent = "“" + input.value.trim() + "” için sonuç yok.";
    } else if (none) none.remove();
    var cnt = $('[data-search-count="' + kind + '"]');
    if (cnt) cnt.textContent = q ? shown + " / " + items.length : "";
  };
  $$("[data-search]").forEach(function (input) {
    input.addEventListener("input", function () { applySearch(input.getAttribute("data-search")); });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; applySearch(input.getAttribute("data-search")); } });
  });

  var iconBtn = function (act, label, glyph, extra) {
    return '<button type="button" class="adm-icon' + (extra || "") + '" data-act="' + act + '" title="' + label + '">' + glyph + '<span class="sr-only"> ' + label + "</span></button>";
  };
  var renderList = function (kind) {
    var ol = $('[data-list="' + kind + '"]');
    if (!ol) return;
    var items = data[kind];
    if (!items.length) { ol.innerHTML = '<li class="adm-empty">Henüz içerik yok.</li>'; applySearch(kind); return; }
    ol.innerHTML = items.map(function (x, i) {
      var meta, thumb = "";
      if (kind === "projects") { meta = (x.cat === "code" ? "Yazılım" : "Tasarım") + (x.tools ? " · " + x.tools : ""); thumb = x.img; }
      else if (kind === "gallery") { meta = (x.tr && x.tr.tag) || "Galeri"; thumb = x.img; }
      else meta = x.date + " · " + ((x.tr && x.tr.cat) || "") + " · " + ((x.tr && x.tr.tags) || []).join(" ");
      var feat = kind === "projects"
        ? '<button type="button" class="adm-icon' + (+x.featured > 0 ? " on" : "") + '" data-act="feature" aria-pressed="' + (+x.featured > 0) + '" title="Anasayfada öne çıkar">★<span class="sr-only"> Öne çıkar: ' + esc(title(x)) + "</span></button>"
        : "";
      return '<li class="adm-item' + (editing[kind] === x.id ? " is-editing" : "") + '" data-i="' + i + '" data-text="' + esc(norm(searchText(kind, x))) + '">' +
        (thumb ? '<img src="' + SR.safeUrl(thumb) + '" alt="" loading="lazy">' : '<span class="adm-thumb">' + SR.u(x.unit || "diamond") + "</span>") +
        '<div class="adm-item-txt"><b>' + esc(title(x)) + "</b><small>" + esc(meta) + "</small></div>" +
        '<div class="adm-item-act">' + feat +
        iconBtn("edit", "Düzenle: " + esc(title(x)), "✎", " edit") +
        '<button type="button" class="adm-icon" data-act="up" title="Yukarı taşı"' + (i === 0 ? " disabled" : "") + '>↑<span class="sr-only"> Yukarı taşı</span></button>' +
        '<button type="button" class="adm-icon" data-act="down" title="Aşağı taşı"' + (i === items.length - 1 ? " disabled" : "") + '>↓<span class="sr-only"> Aşağı taşı</span></button>' +
        iconBtn("delete", "Sil: " + esc(title(x)), "✕", " del") +
        "</div></li>";
    }).join("");
    applySearch(kind);
  };

  /* ---------- inbox ---------- */
  var renderInbox = function () {
    var ol = $('[data-list="inbox"]');
    if (!ol) return;
    var list = CMS.inbox.list();
    if (!list.length) {
      ol.innerHTML = '<li class="adm-empty">Henüz mesaj yok. İletişim sayfasındaki form gönderildiğinde mesajlar burada listelenir.</li>';
      applySearch("inbox");
      status();
      return;
    }
    ol.innerHTML = list.map(function (m) {
      var reply = "mailto:" + esc(m.email) + "?subject=" + encodeURIComponent("Re: " + (m.subject || ""));
      return '<li class="adm-item adm-msg' + (m.read ? "" : " unread") + '" data-id="' + esc(m.id) + '" data-text="' + esc(norm(searchText("inbox", m))) + '">' +
        "<details" + (openMsg === m.id ? " open" : "") + "><summary>" +
        '<span class="adm-dot" aria-hidden="true"></span>' +
        '<span class="adm-msg-from"><b>' + esc(m.name || "İsimsiz") + "</b><small>" + esc(m.subject || "(konu yok)") + "</small></span>" +
        '<time datetime="' + esc(m.date) + '">' + esc(when(m.date)) + "</time>" +
        '<span class="sr-only">' + (m.read ? " (okundu)" : " (okunmadı)") + "</span></summary>" +
        '<div class="adm-msg-body">' +
        '<p class="adm-msg-meta"><a href="' + reply + '">' + esc(m.email) + "</a> · " + (m.lang === "en" ? "İngilizce sayfadan" : "Türkçe sayfadan") + "</p>" +
        '<p class="adm-msg-text">' + esc(m.message) + "</p>" +
        '<div class="adm-msg-act">' +
        '<a class="adm-btn ghost" href="' + reply + '">Yanıtla</a>' +
        '<button type="button" class="adm-btn ghost" data-msg="toggle">' + (m.read ? "Okunmadı işaretle" : "Okundu işaretle") + "</button>" +
        '<button type="button" class="adm-btn ghost danger" data-msg="delete">Sil</button>' +
        "</div></div></details></li>";
    }).join("");
    applySearch("inbox");
    status();
  };
  var updateMsg = function (id, fn) {
    var list = CMS.inbox.list();
    var i = list.map(function (m) { return m.id; }).indexOf(id);
    if (i < 0) return;
    fn(list, i);
    CMS.inbox.save(list);
  };
  var inboxOl = $('[data-list="inbox"]');
  if (inboxOl) {
    inboxOl.addEventListener("toggle", function (e) {
      var det = e.target;
      if (!det || det.tagName !== "DETAILS") return;
      var li = det.closest(".adm-msg"), id = li.getAttribute("data-id");
      if (!det.open) { if (openMsg === id) openMsg = null; return; }
      openMsg = id;
      if (li.classList.contains("unread")) {
        updateMsg(id, function (list, i) { list[i].read = true; });
        li.classList.remove("unread");
        var t = $('[data-msg="toggle"]', li);
        if (t) t.textContent = "Okunmadı işaretle";
        status();
      }
    }, true);
    inboxOl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-msg]");
      if (!b) return;
      var id = b.closest(".adm-msg").getAttribute("data-id");
      if (b.getAttribute("data-msg") === "delete") {
        if (!window.confirm("Bu mesaj kalıcı olarak silinsin mi?")) return;
        updateMsg(id, function (list, i) { list.splice(i, 1); });
        if (openMsg === id) openMsg = null;
        toast("Mesaj silindi.");
      } else {
        updateMsg(id, function (list, i) { list[i].read = !list[i].read; });
      }
      renderInbox();
    });
  }
  on("[data-inbox-readall]", function () {
    var list = CMS.inbox.list();
    if (!list.length) return;
    list.forEach(function (m) { m.read = true; });
    CMS.inbox.save(list);
    renderInbox();
    toast("Tüm mesajlar okundu olarak işaretlendi.");
  });
  on("[data-inbox-clear]", function () {
    if (!CMS.inbox.list().length) return;
    if (!window.confirm("Tüm mesajlar kalıcı olarak silinsin mi?")) return;
    CMS.inbox.save([]);
    openMsg = null;
    renderInbox();
    toast("Gelen kutusu boşaltıldı.");
  });

  var setFeatured = function (idx, want) {
    var p = data.projects[idx];
    var isOn = +p.featured > 0;
    if (want === undefined) want = !isOn;
    if (want === isOn) return;
    if (!want) p.featured = 0;
    else {
      data.projects.forEach(function (x) { if (+x.featured > 0) x.featured = +x.featured + 1; });
      p.featured = 1;
    }
    data.projects.filter(function (x) { return +x.featured > 0; })
      .sort(function (a, b) { return a.featured - b.featured; })
      .forEach(function (x, k) { x.featured = k < 3 ? k + 1 : 0; });
  };

  /* ---------- forms: add + edit ---------- */
  var formOf = function (kind) { return $('[data-form="' + kind + '"]'); };
  var val = function (form, name) { var el = form.elements[name]; return el ? String(el.value || "").trim() : ""; };
  var setVal = function (form, name, v) {
    var el = form.elements[name];
    if (!el) return;
    el.value = v == null ? "" : v;
    if (el.hasAttribute("data-preview")) el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  var formStatus = function (form, msg, ok) {
    var s = $(".form-foot .status", form);
    if (s) { s.textContent = msg; s.className = "status " + (ok ? "ok" : "bad"); }
  };
  var markField = function (el, bad) {
    var field = el.closest(".field");
    if (field) field.classList.toggle("invalid", bad);
    el.setAttribute("aria-invalid", String(bad));
  };
  var check = function (form) {
    var first = null, why = "";
    $$("input, textarea, select", form).forEach(function (el) {
      if (!el.name || el.type === "checkbox" || el.type === "file") return;
      var v = String(el.value || "").trim(), bad = false, msg = "";
      if (el.required && !v) { bad = true; msg = "Yıldızlı (*) alanları doldurun."; }
      else if (v && el.hasAttribute("data-preview") && !urlOk(v)) { bad = true; msg = "Görsel bağlantısı https:// ile ya da assets/ ile başlamalı."; }
      else if (v && el.type === "email" && !mailOk(v)) { bad = true; msg = "Geçerli bir e-posta adresi yazın."; }
      else if (v && el.type === "url" && !webOk(v)) { bad = true; msg = "Bağlantı https:// ile başlamalı."; }
      else if (el.type === "number" && v !== "" && (isNaN(+v) || +v < 0 || +v > 100)) { bad = true; msg = "Değer 0 ile 100 arasında olmalı."; }
      markField(el, bad);
      if (bad && !first) { first = el; why = msg; }
    });
    if (first) { first.focus(); formStatus(form, why, false); return false; }
    return true;
  };
  var resetForm = function (form) {
    form.reset();
    $$(".adm-preview", form).forEach(function (p) { p.hidden = true; });
    $$(".field.invalid", form).forEach(function (f) { f.classList.remove("invalid"); });
    if (form.elements.date) form.elements.date.value = today();
  };
  var setMode = function (kind, id) {
    var form = formOf(kind);
    editing[kind] = id;
    var t = $("[data-form-title]", form);
    if (t) t.textContent = id ? t.getAttribute("data-edit-title") : t.getAttribute("data-add-title");
    var lab = $("[data-submit-label]", form);
    if (lab) {
      if (!lab.hasAttribute("data-add")) lab.setAttribute("data-add", lab.textContent);
      lab.textContent = id ? "Değişiklikleri güncelle" : lab.getAttribute("data-add");
    }
    var cancel = $("[data-cancel]", form);
    if (cancel) cancel.hidden = !id;
    form.classList.toggle("is-editing", !!id);
    renderList(kind);
  };

  var keepDims = function (old, img, key) { return old && old.img === img ? old[key] : undefined; };
  var BUILD = {
    projects: function (form, old) {
      var img = val(form, "img");
      return {
        id: old ? old.id : uniqueId(slug(val(form, "titleTr"))),
        cat: val(form, "cat") === "code" ? "code" : "design",
        img: img, tools: val(form, "tools"),
        featured: old ? (+old.featured || 0) : 0,
        w: keepDims(old, img, "w"), h: keepDims(old, img, "h"),
        tr: { title: val(form, "titleTr"), desc: val(form, "descTr"), alt: val(form, "altTr") || val(form, "titleTr") },
        en: { title: val(form, "titleEn"), desc: val(form, "descEn"), alt: val(form, "altEn") || val(form, "titleEn") }
      };
    },
    blog: function (form, old) {
      var bodyTr = val(form, "bodyTr"), bodyEn = val(form, "bodyEn");
      var tr = { title: val(form, "titleTr"), cat: val(form, "catTr"), tags: tags(val(form, "tagsTr")), excerpt: val(form, "excerptTr"), body: toHtml(bodyTr) };
      var en = { title: val(form, "titleEn"), cat: val(form, "catEn"), tags: tags(val(form, "tagsEn")), excerpt: val(form, "excerptEn"), body: bodyEn ? toHtml(bodyEn) : "" };
      tr.read = readTime(tr.body, "tr");
      en.read = readTime(en.body || tr.body, "en");
      if (!/^\s*</.test(bodyTr)) tr.src = bodyTr;
      if (bodyEn && !/^\s*</.test(bodyEn)) en.src = bodyEn;
      return {
        id: old ? old.id : uniqueId(slug(val(form, "titleTr"))),
        date: val(form, "date") || today(),
        unit: SR.units.indexOf(val(form, "unit")) > -1 ? val(form, "unit") : "diamond",
        tr: tr, en: en
      };
    },
    gallery: function (form, old) {
      var img = val(form, "img");
      return {
        id: old ? old.id : uniqueId(slug(val(form, "titleTr"))),
        img: img,
        w: keepDims(old, img, "w"), h: keepDims(old, img, "h"),
        tr: { title: val(form, "titleTr"), caption: val(form, "captionTr"), tag: val(form, "tagTr"), alt: val(form, "altTr") || val(form, "titleTr") },
        en: { title: val(form, "titleEn"), caption: val(form, "captionEn"), tag: val(form, "tagEn"), alt: val(form, "altEn") || val(form, "titleEn") }
      };
    }
  };
  var FILL = {
    projects: function (form, x) {
      var tr = x.tr || {}, en = x.en || {};
      setVal(form, "titleTr", tr.title); setVal(form, "titleEn", en.title);
      setVal(form, "descTr", tr.desc); setVal(form, "descEn", en.desc);
      setVal(form, "cat", x.cat === "code" ? "code" : "design"); setVal(form, "tools", x.tools);
      setVal(form, "img", x.img); setVal(form, "altTr", tr.alt); setVal(form, "altEn", en.alt);
      form.elements.featured.checked = +x.featured > 0;
    },
    blog: function (form, x) {
      var tr = x.tr || {}, en = x.en || {};
      setVal(form, "titleTr", tr.title); setVal(form, "titleEn", en.title);
      setVal(form, "catTr", tr.cat); setVal(form, "catEn", en.cat);
      setVal(form, "tagsTr", untag(tr.tags)); setVal(form, "tagsEn", untag(en.tags));
      setVal(form, "excerptTr", tr.excerpt); setVal(form, "excerptEn", en.excerpt);
      setVal(form, "bodyTr", tr.src || tr.body); setVal(form, "bodyEn", en.src || en.body);
      setVal(form, "date", x.date); setVal(form, "unit", x.unit || "diamond");
    },
    gallery: function (form, x) {
      var tr = x.tr || {}, en = x.en || {};
      setVal(form, "img", x.img);
      setVal(form, "titleTr", tr.title); setVal(form, "titleEn", en.title);
      setVal(form, "captionTr", tr.caption); setVal(form, "captionEn", en.caption);
      setVal(form, "tagTr", tr.tag); setVal(form, "tagEn", en.tag);
      setVal(form, "altTr", tr.alt); setVal(form, "altEn", en.alt);
    }
  };
  var MSG = {
    projects: ["Proje eklendi.", "Proje güncellendi."],
    blog: ["Yazı listenin başına eklendi.", "Yazı güncellendi."],
    gallery: ["Fotoğraf eklendi.", "Fotoğraf güncellendi."]
  };
  var startEdit = function (kind, i) {
    var form = formOf(kind), x = data[kind][i];
    if (!form || !x) return;
    resetForm(form);
    FILL[kind](form, x);
    formStatus(form, "", true);
    setMode(kind, x.id);
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    var first = $("input:not([type=checkbox]), textarea", form);
    if (first) first.focus({ preventScroll: true });
  };
  KINDS.forEach(function (kind) {
    var form = formOf(kind);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check(form)) return;
      var list = data[kind], id = editing[kind];
      var idx = id ? list.map(function (x) { return x.id; }).indexOf(id) : -1;
      var old = idx > -1 ? list[idx] : null;
      var item = BUILD[kind](form, old);
      Object.keys(item).forEach(function (k) { if (item[k] === undefined) delete item[k]; });
      var at;
      if (old) { list[idx] = item; at = idx; }
      else if (kind === "blog") { list.unshift(item); at = 0; }
      else { list.push(item); at = list.length - 1; }
      if (kind === "projects") setFeatured(at, !!form.elements.featured.checked);
      var msg = MSG[kind][old ? 1 : 0] + " Kalıcı olması için Kaydet’e basın.";
      resetForm(form);
      setMode(kind, null);
      setDirty(true);
      formStatus(form, msg, true);
      toast(msg);
    });
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field.invalid");
      if (f && String(e.target.value || "").trim()) f.classList.remove("invalid");
    });
    var cancel = $("[data-cancel]", form);
    if (cancel) cancel.addEventListener("click", function () {
      resetForm(form);
      setMode(kind, null);
      formStatus(form, "Düzenleme iptal edildi.", true);
    });
  });
  var dateEl = $("#b-date");
  if (dateEl) dateEl.value = today();

  /* list actions */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var li = b.closest(".adm-item"), ol = b.closest("[data-list]");
    if (!li || !ol) return;
    var kind = ol.getAttribute("data-list"), i = +li.getAttribute("data-i"), list = data[kind];
    var act = b.getAttribute("data-act");
    if (act === "edit") { startEdit(kind, i); return; }
    if (act === "delete") {
      if (!window.confirm("“" + title(list[i]) + "” silinsin mi? (Kaydet’e basana kadar kalıcı olmaz.)")) return;
      if (editing[kind] === list[i].id) { resetForm(formOf(kind)); editing[kind] = null; setMode(kind, null); }
      list.splice(i, 1);
      toast("Silindi. Kalıcı olması için Kaydet’e basın.");
    } else if (act === "up" && i > 0) {
      list.splice(i - 1, 0, list.splice(i, 1)[0]);
    } else if (act === "down" && i < list.length - 1) {
      list.splice(i + 1, 0, list.splice(i, 1)[0]);
    } else if (act === "feature") {
      setFeatured(i);
    }
    setDirty(true);
    renderList(kind);
  });

  /* live image preview */
  $$("[data-preview]").forEach(function (input) {
    var box = document.getElementById(input.getAttribute("data-preview"));
    var note = $("span", box), t;
    var img = document.createElement("img");
    img.alt = "";
    img.hidden = true;
    box.insertBefore(img, note);
    input.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var v = input.value.trim();
        if (!v) { box.hidden = true; return; }
        box.hidden = false;
        if (!urlOk(v)) { img.hidden = true; img.removeAttribute("src"); note.textContent = "Bağlantı https:// ya da assets/ ile başlamalı."; return; }
        note.textContent = "Önizleme yükleniyor…";
        img.onload = function () { img.hidden = false; note.textContent = img.naturalWidth + " × " + img.naturalHeight + " px"; };
        img.onerror = function () { img.hidden = true; note.textContent = "Görsel yüklenemedi; bağlantıyı kontrol edin."; };
        img.src = SR.resolve ? SR.resolve(v) : v;
      }, 300);
    });
  });

  /* ---------- profile / about ---------- */
  var pForm = formOf("profile");
  var skillsBox = $("[data-skills]");
  var skillSeq = 0;
  /* Competency areas (About page): title, one-line text and a comma list per language, no levels */
  var unitChoices = ["star", "knot", "diamond", "eye", "hook", "cross"];
  var skillRow = function (c) {
    c = c || { unit: "diamond", tr: { title: "", text: "", items: [] }, en: { title: "", text: "", items: [] } };
    var tr = c.tr || {}, en = c.en || {};
    var id = "sk" + (skillSeq++) + "-";
    var fld = function (key, label, val, req) {
      return '<div class="field"><label for="' + id + key + '">' + label + (req ? " *" : "") + '</label><input id="' + id + key + '" name="' + key + '" type="text"' + (req ? " required" : "") + ' value="' + esc(val || "") + '"></div>';
    };
    return '<div class="adm-skill adm-comp" data-skill>' +
      fld("cTitleTr", "Alan adı (TR)", tr.title, true) +
      fld("cTitleEn", "Alan adı (EN)", en.title) +
      fld("cTextTr", "Kısa açıklama (TR)", tr.text) +
      fld("cTextEn", "Kısa açıklama (EN)", en.text) +
      fld("cItemsTr", "Öğeler (TR, virgülle)", (tr.items || []).join(", "), true) +
      fld("cItemsEn", "Öğeler (EN, virgülle)", (en.items || []).join(", ")) +
      '<div class="field"><label for="' + id + 'u">İkon</label><select id="' + id + 'u" name="cUnit">' +
        unitChoices.map(function (k) { return '<option value="' + k + '"' + (k === c.unit ? " selected" : "") + ">" + k + "</option>"; }).join("") + "</select></div>" +
      '<button type="button" class="adm-icon del" data-del-skill title="Alanı sil">✕<span class="sr-only"> Alanı sil</span></button>' +
      "</div>";
  };
  var fillProfile = function () {
    if (!pForm) return;
    var a = data.about, p = data.profile || {};
    setVal(pForm, "summaryTr", a.summary.tr); setVal(pForm, "summaryEn", a.summary.en);
    setVal(pForm, "bioTr", (a.bio.tr || []).join("\n\n")); setVal(pForm, "bioEn", (a.bio.en || []).join("\n\n"));
    var loc = p.location || {};
    setVal(pForm, "locTr", loc.tr); setVal(pForm, "locEn", loc.en);
    setVal(pForm, "mapQuery", p.mapQuery); setVal(pForm, "email", p.email);
    setVal(pForm, "phone1", (p.phones || [])[0]); setVal(pForm, "phone2", (p.phones || [])[1]);
    setVal(pForm, "instagram", p.instagram); setVal(pForm, "linkedin", p.linkedin);
    skillsBox.innerHTML = (a.competencies || []).map(function (c) { return skillRow(c); }).join("");
    $$(".field.invalid", pForm).forEach(function (f) { f.classList.remove("invalid"); });
    var st = $(".form-foot .status", pForm);
    if (st) st.textContent = "";
  };
  if (pForm) {
    var pCancel = $("[data-cancel]", pForm);
    if (pCancel) pCancel.remove();
    on("[data-add-skill]", function () {
      skillsBox.insertAdjacentHTML("beforeend", skillRow(null));
      var rows = $$("[data-skill]", skillsBox);
      $("input", rows[rows.length - 1]).focus();
    });
    skillsBox.addEventListener("click", function (e) {
      var b = e.target.closest("[data-del-skill]");
      if (b) b.closest("[data-skill]").remove();
    });
    pForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check(pForm)) return;
      var bioTr = paras(val(pForm, "bioTr")), bioEn = paras(val(pForm, "bioEn"));
      data.about.summary = { tr: val(pForm, "summaryTr"), en: val(pForm, "summaryEn") || val(pForm, "summaryTr") };
      data.about.bio = { tr: bioTr, en: bioEn.length ? bioEn : bioTr };
      var list = function (v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); };
      data.about.competencies = $$("[data-skill]", skillsBox).map(function (row) {
        var g = function (n) { var el = row.querySelector('[name="' + n + '"]'); return String(el ? el.value : "").trim(); };
        var itemsTr = list(g("cItemsTr")), itemsEn = list(g("cItemsEn"));
        return {
          unit: g("cUnit") || "diamond",
          tr: { title: g("cTitleTr"), text: g("cTextTr"), items: itemsTr },
          en: { title: g("cTitleEn") || g("cTitleTr"), text: g("cTextEn") || g("cTextTr"), items: itemsEn.length ? itemsEn : itemsTr }
        };
      });
      if (data.about.skills) data.about.skills = undefined;
      data.profile = {
        location: { tr: val(pForm, "locTr"), en: val(pForm, "locEn") || val(pForm, "locTr") },
        email: val(pForm, "email"),
        phones: [val(pForm, "phone1"), val(pForm, "phone2")].filter(Boolean),
        instagram: val(pForm, "instagram"),
        linkedin: val(pForm, "linkedin"),
        mapQuery: val(pForm, "mapQuery")
      };
      setDirty(true);
      var msg = "Profil güncellendi. Kalıcı olması için Kaydet’e basın.";
      formStatus(pForm, msg, true);
      toast(msg);
    });
    pForm.addEventListener("input", function (e) {
      var f = e.target.closest(".field.invalid");
      if (f && String(e.target.value || "").trim()) f.classList.remove("invalid");
    });
  }

  var renderAll = function () { KINDS.forEach(renderList); renderInbox(); fillProfile(); status(); };

  /* ---------- tabs ---------- */
  var tabs = $$('[role="tab"]');
  var selectTab = function (tab) {
    tabs.forEach(function (t) {
      var sel = t === tab;
      t.setAttribute("aria-selected", String(sel));
      t.tabIndex = sel ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !sel;
    });
    store.set("yee-admin-tab", tab.id);
  };
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!k) return;
      var n = tabs[(i + k + tabs.length) % tabs.length];
      selectTab(n); n.focus();
    });
  });
  $$("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = document.getElementById(b.getAttribute("data-goto"));
      if (t) { selectTab(t); t.focus(); }
    });
  });

  /* ---------- toolbar ---------- */
  on("[data-save]", function () {
    try { CMS.save(data); setDirty(false); toast("Kaydedildi. Site sayfaları artık bu içeriği gösteriyor."); }
    catch (e) { toast("Kaydedilemedi: tarayıcı hafızası dolu ya da kapalı olabilir.", true); }
  });
  on("[data-export-json]", function () {
    download("site-icerik-" + today() + ".json", JSON.stringify(data, null, 2), "application/json");
    toast("JSON dosyası indirildi.");
  });
  on("[data-export-js]", function () {
    var head = "/* Yunus Emre Ersoy · site content (exported from admin/index.html on " + today() + ").\n   Replace app/models/content.js with this file, run `node tools/build.mjs .` and redeploy. */\n";
    download("content.js", head + "globalThis.SITE_DEFAULTS = " + JSON.stringify(data, null, 2) + ";\n", "text/javascript");
    toast("content.js indirildi. app/models/content.js yerine koyun.");
  });
  var importEl = $("#import-file");
  if (importEl) importEl.addEventListener("change", function () {
    var file = importEl.files && importEl.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (parsed && parsed.data && CMS.valid(parsed.data)) parsed = parsed.data;
        if (!CMS.valid(parsed)) throw new Error("shape");
        if (!window.confirm("Mevcut içerik bu dosyadakiyle değiştirilsin mi? (Kaydet’e basana kadar kalıcı olmaz.)")) return;
        /* blog bodies from a file are untrusted: run them through the allow-list */
        parsed.blog.forEach(function (b) { ["tr", "en"].forEach(function (L) { if (b[L] && b[L].body) b[L].body = sanitize(String(b[L].body)); }); });
        parsed.about = parsed.about || data.about;
        parsed.profile = parsed.profile || data.profile;
        data = parsed;
        KINDS.forEach(function (k) { editing[k] = null; });
        setDirty(true);
        renderAll();
        toast("İçe aktarıldı. Kalıcı olması için Kaydet’e basın.");
      } catch (e) { toast("Dosya okunamadı: geçerli bir site içeriği JSON’u değil.", true); }
      importEl.value = "";
    };
    reader.readAsText(file);
  });
  on("[data-reset]", function () {
    if (!window.confirm("Tüm içerik (projeler, yazılar, fotoğraflar, profil) content.js’teki varsayılanlara dönsün mü? Bu tarayıcıdaki kayıtlı değişiklikler silinir. Gelen mesajlar korunur.")) return;
    CMS.reset();
    data = CMS.get();
    KINDS.forEach(function (k) { var f = formOf(k); if (f) { resetForm(f); editing[k] = null; setMode(k, null); } });
    setDirty(false);
    renderAll();
    toast("Varsayılan içeriğe dönüldü.");
  });
  window.addEventListener("beforeunload", function (e) {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = "";
  });
  /* another tab wrote a message or saved content */
  window.addEventListener("storage", function (e) {
    if (!data) return;
    if (e.key === CMS.inbox.KEY) { renderInbox(); toast("Gelen kutusu güncellendi."); }
    if (e.key === CMS.KEY && !dirty) { data = CMS.get(); renderAll(); }
  });

  /* ---------- login ---------- */
  var loginSec = $("#login"), panel = $("#panel"), logout = $("[data-logout]");
  var open = function () {
    data = CMS.get();
    loginSec.hidden = true;
    panel.hidden = false;
    if (logout) logout.hidden = false;
    renderAll();
    var saved = store.get("yee-admin-tab");
    var t = saved && document.getElementById(saved);
    if (t && t.getAttribute("role") === "tab") selectTab(t);
  };
  var loginForm = $("#login-form"), lockT;
  var fails = function () { try { return JSON.parse(store.get(FAILS) || '{"n":0,"until":0}'); } catch (e) { return { n: 0, until: 0 }; } };
  var lockMsg = function () {
    var msg = $("[data-login-msg]"), f = fails(), left = Math.ceil((f.until - Date.now()) / 1000);
    var btn = $('button[type="submit"]', loginForm);
    if (left > 0) {
      msg.textContent = "Çok fazla hatalı deneme. " + left + " saniye sonra tekrar deneyin.";
      btn.disabled = true;
      clearTimeout(lockT);
      lockT = setTimeout(lockMsg, 1000);
      return true;
    }
    btn.disabled = false;
    if (f.until) { store.set(FAILS, JSON.stringify({ n: 0, until: 0 })); msg.textContent = ""; }
    return false;
  };
  if (loginForm) {
    lockMsg();
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (lockMsg()) return;
      var msg = $("[data-login-msg]");
      var user = val(loginForm, "user"), pass = loginForm.elements.pass.value;
      if (sha256(user + ":" + pass) === LOGIN_HASH) {
        store.set(SESSION, "1");
        store.del(FAILS);
        msg.textContent = "";
        open();
        var h = $("#panel-title");
        if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); window.scrollTo(0, 0); }
      } else {
        var f = fails();
        f.n += 1;
        if (f.n >= MAX_FAILS) { f.until = Date.now() + LOCK_MS; f.n = 0; }
        store.set(FAILS, JSON.stringify(f));
        loginForm.elements.pass.value = "";
        if (!lockMsg()) {
          msg.textContent = "Kullanıcı adı veya şifre hatalı. (" + (MAX_FAILS - f.n) + " deneme hakkı kaldı)";
          loginForm.elements.pass.focus();
        }
      }
    });
  }
  if (logout) logout.addEventListener("click", function () {
    if (dirty && !window.confirm("Kaydedilmemiş değişiklikler kaybolacak. Çıkılsın mı?")) return;
    dirty = false;
    store.del(SESSION);
    window.location.reload();
  });
  if (store.get(SESSION) === "1") open();
})();

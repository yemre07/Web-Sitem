/* Admin panel for the client-side CMS (cms.js). Vanilla JS, no backend.
   NOTE: the login is a convenience lock for a static site, not real security —
   anyone can read these values in the page source. Edits live in localStorage
   of this browser only; publish them by exporting data.js. */
(function () {
  "use strict";
  var CMS = window.CMS, SR = window.SiteRender;
  if (!CMS || !SR) return;

  var USER = "admin", PASS = "1234";
  var SESSION = "yee-admin-session";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = SR.esc;

  var data = null;
  var dirty = false;

  /* ---------- helpers ---------- */
  var toastEl = $(".adm-toast"), toastT;
  var toast = function (msg, bad) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.toggle("bad", !!bad);
    toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.hidden = true; }, 3200);
  };
  var slug = function (s) {
    var map = { "ç": "c", "ğ": "g", "ı": "i", "İ": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };
    return String(s || "").toLowerCase().replace(/[çğıİöşüâîû]/g, function (c) { return map[c] || c; })
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "icerik";
  };
  var uniqueId = function (base, list) {
    var ids = {};
    data.projects.concat(data.gallery, data.blog).forEach(function (x) { ids[x.id] = 1; });
    var id = base, n = 2;
    /* ids must also not collide with fixed page anchors */
    while (ids[id] || document.getElementById(id) || /^(main|lightbox|contact-form|yetenekler)$/.test(id)) id = base + "-" + n++;
    return id;
  };
  var tags = function (s) {
    return String(s || "").split(",").map(function (t) { return t.trim().replace(/\s+/g, ""); })
      .filter(Boolean).map(function (t) { return t.charAt(0) === "#" ? t : "#" + t; });
  };
  var readTime = function (text, L) {
    var words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
    var m = Math.max(1, Math.round(words / 200));
    return L === "tr" ? m + " dk okuma" : m + " min read";
  };
  var urlOk = function (s) {
    s = String(s || "").trim();
    return /^https?:\/\/\S+$/i.test(s) || /^(\.\/|\/)?assets\/\S+$/i.test(s) || /^data:image\/(png|jpe?g|gif|webp|avif);base64,/i.test(s);
  };
  var today = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };

  /* Tiny Markdown-like converter: escapes everything, then allows a few safe constructs */
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

  var download = function (name, text, type) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---------- state + status ---------- */
  var setDirty = function (v) { dirty = v; status(); };
  var status = function () {
    var el = $("[data-status]");
    if (!el) return;
    var at = CMS.savedAt();
    var base = CMS.isCustom()
      ? "Tarayıcıda kayıtlı özel içerik · son kayıt " + new Date(at).toLocaleString("tr-TR")
      : "Varsayılan içerik (data.js) kullanılıyor";
    el.innerHTML = esc(base) + (dirty ? ' <b class="adm-dirty">● Kaydedilmemiş değişiklikler var</b>' : "");
    ["projects", "blog", "gallery"].forEach(function (k) {
      var c = $('[data-count-of="' + k + '"]');
      if (c) c.textContent = "(" + data[k].length + ")";
    });
  };

  /* ---------- lists ---------- */
  var title = function (x) { return (x.tr && x.tr.title) || x.id; };
  var renderList = function (kind) {
    var ol = $('[data-list="' + kind + '"]');
    if (!ol) return;
    var items = data[kind];
    if (!items.length) { ol.innerHTML = '<li class="adm-empty">Henüz içerik yok.</li>'; return; }
    ol.innerHTML = items.map(function (x, i) {
      var meta, thumb = "";
      if (kind === "projects") {
        meta = (x.cat === "code" ? "Yazılım" : "Tasarım") + (x.tools ? " · " + x.tools : "");
        thumb = x.img;
      } else if (kind === "gallery") {
        meta = (x.tr && x.tr.tag) || "Galeri";
        thumb = x.img;
      } else {
        meta = x.date + " · " + ((x.tr && x.tr.cat) || "") + " · " + ((x.tr && x.tr.tags) || []).join(" ");
      }
      var feat = kind === "projects"
        ? '<button type="button" class="adm-icon' + (+x.featured > 0 ? " on" : "") + '" data-act="feature" aria-pressed="' + (+x.featured > 0) + '" title="Anasayfada öne çıkar">★<span class="sr-only"> Öne çıkar: ' + esc(title(x)) + "</span></button>"
        : "";
      return '<li class="adm-item" data-i="' + i + '">' +
        (thumb ? '<img src="' + SR.safeUrl(thumb) + '" alt="" loading="lazy">' : '<span class="adm-thumb">' + SR.u(x.unit || "diamond") + "</span>") +
        '<div class="adm-item-txt"><b>' + esc(title(x)) + "</b><small>" + esc(meta) + "</small></div>" +
        '<div class="adm-item-act">' + feat +
        '<button type="button" class="adm-icon" data-act="up" title="Yukarı taşı"' + (i === 0 ? " disabled" : "") + '>↑<span class="sr-only"> Yukarı taşı</span></button>' +
        '<button type="button" class="adm-icon" data-act="down" title="Aşağı taşı"' + (i === items.length - 1 ? " disabled" : "") + '>↓<span class="sr-only"> Aşağı taşı</span></button>' +
        '<button type="button" class="adm-icon del" data-act="delete" title="Sil">✕<span class="sr-only"> Sil: ' + esc(title(x)) + "</span></button>" +
        "</div></li>";
    }).join("");
  };
  var renderAll = function () { ["projects", "blog", "gallery"].forEach(renderList); status(); };

  var setFeatured = function (idx) {
    var p = data.projects[idx];
    if (+p.featured > 0) { p.featured = 0; }
    else {
      data.projects.forEach(function (x) { if (+x.featured > 0) x.featured = +x.featured + 1; });
      p.featured = 1;
    }
    /* keep ranks 1..3 compact; the home page shows three */
    data.projects.filter(function (x) { return +x.featured > 0; })
      .sort(function (a, b) { return a.featured - b.featured; })
      .forEach(function (x, k) { x.featured = k < 3 ? k + 1 : 0; });
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var li = b.closest(".adm-item"), ol = b.closest("[data-list]");
    if (!li || !ol) return;
    var kind = ol.getAttribute("data-list"), i = +li.getAttribute("data-i"), list = data[kind];
    var act = b.getAttribute("data-act");
    if (act === "delete") {
      if (!window.confirm("“" + title(list[i]) + "” silinsin mi? (Kaydet’e basana kadar kalıcı olmaz.)")) return;
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

  /* ---------- add forms ---------- */
  var val = function (form, name) { var el = form.elements[name]; return el ? String(el.value || "").trim() : ""; };
  var formStatus = function (form, msg, ok) {
    var s = $(".status", form);
    if (s) { s.textContent = msg; s.className = "status " + (ok ? "ok" : "bad"); }
  };
  var check = function (form) {
    var first = null;
    $$("[required]", form).forEach(function (el) {
      var field = el.closest(".field");
      var bad = !String(el.value || "").trim();
      if (!bad && el.hasAttribute("data-preview") && !urlOk(el.value)) bad = true;
      if (field) field.classList.toggle("invalid", bad);
      el.setAttribute("aria-invalid", String(bad));
      if (bad && !first) first = el;
    });
    if (first) {
      first.focus();
      formStatus(form, first.hasAttribute("data-preview") && first.value.trim()
        ? "Görsel bağlantısı https:// ile ya da assets/ ile başlamalı."
        : "Yıldızlı (*) alanları doldurun.", false);
      return false;
    }
    return true;
  };
  var after = function (form, kind, msg) {
    form.reset();
    $$(".adm-preview", form).forEach(function (p) { p.hidden = true; });
    $$(".field.invalid", form).forEach(function (f) { f.classList.remove("invalid"); });
    if (form.elements.date) form.elements.date.value = today();
    setDirty(true);
    renderList(kind);
    formStatus(form, msg, true);
    toast(msg);
  };

  var ADD = {
    projects: function (form) {
      var id = uniqueId(slug(val(form, "titleTr")));
      var p = {
        id: id, cat: val(form, "cat") === "code" ? "code" : "design", img: val(form, "img"), tools: val(form, "tools"), featured: 0,
        tr: { title: val(form, "titleTr"), desc: val(form, "descTr"), alt: val(form, "altTr") || val(form, "titleTr") },
        en: { title: val(form, "titleEn"), desc: val(form, "descEn"), alt: val(form, "altEn") || val(form, "titleEn") }
      };
      data.projects.push(p);
      if (form.elements.featured && form.elements.featured.checked) setFeatured(data.projects.length - 1);
      after(form, "projects", "Proje eklendi. Yayına almak için Kaydet’e basın.");
    },
    blog: function (form) {
      var bodyTr = val(form, "bodyTr"), bodyEn = val(form, "bodyEn");
      var post = {
        id: uniqueId(slug(val(form, "titleTr"))),
        date: val(form, "date") || today(),
        unit: SR.units.indexOf(val(form, "unit")) > -1 ? val(form, "unit") : "diamond",
        tr: { title: val(form, "titleTr"), cat: val(form, "catTr"), tags: tags(val(form, "tagsTr")), read: readTime(bodyTr, "tr"), excerpt: val(form, "excerptTr"), body: md(bodyTr) },
        en: { title: val(form, "titleEn"), cat: val(form, "catEn"), tags: tags(val(form, "tagsEn")), read: readTime(bodyEn || bodyTr, "en"), excerpt: val(form, "excerptEn"), body: bodyEn ? md(bodyEn) : "" }
      };
      data.blog.unshift(post);
      after(form, "blog", "Yazı listenin başına eklendi. Yayına almak için Kaydet’e basın.");
    },
    gallery: function (form) {
      data.gallery.push({
        id: uniqueId(slug(val(form, "titleTr"))),
        img: val(form, "img"),
        tr: { title: val(form, "titleTr"), caption: val(form, "captionTr"), tag: val(form, "tagTr"), alt: val(form, "altTr") || val(form, "titleTr") },
        en: { title: val(form, "titleEn"), caption: val(form, "captionEn"), tag: val(form, "tagEn"), alt: val(form, "altEn") || val(form, "titleEn") }
      });
      after(form, "gallery", "Fotoğraf eklendi. Yayına almak için Kaydet’e basın.");
    }
  };
  $$("[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check(form)) return;
      ADD[form.getAttribute("data-form")](form);
    });
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field.invalid");
      if (f && String(e.target.value || "").trim()) f.classList.remove("invalid");
    });
  });
  var dateEl = $("#b-date");
  if (dateEl) dateEl.value = today();

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
        img.src = v;
      }, 350);
    });
  });

  /* ---------- tabs ---------- */
  var tabs = $$('[role="tab"]');
  var selectTab = function (tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
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

  /* ---------- toolbar ---------- */
  var on = function (sel, fn) { var el = $(sel); if (el) el.addEventListener("click", fn); };
  on("[data-save]", function () {
    try { CMS.save(data); setDirty(false); toast("Kaydedildi. Site sayfaları artık bu içeriği gösteriyor."); }
    catch (e) { toast("Kaydedilemedi: tarayıcı hafızası dolu ya da kapalı olabilir.", true); }
  });
  var stamp = function () { return today(); };
  on("[data-export-json]", function () {
    download("site-icerik-" + stamp() + ".json", JSON.stringify(data, null, 2), "application/json");
    toast("JSON dosyası indirildi.");
  });
  on("[data-export-js]", function () {
    var head = "/* Yunus Emre Ersoy · site content (exported from admin.html on " + stamp() + ").\n   Replace assets/js/data.js with this file and redeploy to publish for every visitor. */\n";
    download("data.js", head + "globalThis.SITE_DEFAULTS = " + JSON.stringify(data, null, 2) + ";\n", "text/javascript");
    toast("data.js indirildi. assets/js/data.js yerine koyun.");
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
        parsed.about = parsed.about || data.about;
        data = parsed;
        setDirty(true);
        renderAll();
        toast("İçe aktarıldı. Kalıcı olması için Kaydet’e basın.");
      } catch (e) { toast("Dosya okunamadı: geçerli bir site içeriği JSON’u değil.", true); }
      importEl.value = "";
    };
    reader.readAsText(file);
  });
  on("[data-reset]", function () {
    if (!window.confirm("Tüm projeler, yazılar ve fotoğraflar data.js’teki varsayılanlara dönsün mü? Bu tarayıcıdaki kayıtlı değişiklikler silinir.")) return;
    CMS.reset();
    data = CMS.get();
    setDirty(false);
    renderAll();
    toast("Varsayılan içeriğe dönüldü.");
  });
  window.addEventListener("beforeunload", function (e) {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = "";
  });

  /* ---------- login ---------- */
  var loginSec = $("#login"), panel = $("#panel"), logout = $("[data-logout]");
  var open = function () {
    data = CMS.get();
    loginSec.hidden = true;
    panel.hidden = false;
    if (logout) logout.hidden = false;
    renderAll();
  };
  var loginForm = $("#login-form");
  if (loginForm) loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("[data-login-msg]");
    if (val(loginForm, "user") === USER && val(loginForm, "pass") === PASS) {
      try { window.sessionStorage.setItem(SESSION, "1"); } catch (err) { /* private mode */ }
      msg.textContent = "";
      open();
      var h = $("#panel-title"); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); window.scrollTo(0, 0); }
    } else {
      msg.textContent = "Kullanıcı adı veya şifre hatalı.";
      loginForm.elements.pass.value = "";
      loginForm.elements.pass.focus();
    }
  });
  if (logout) logout.addEventListener("click", function () {
    if (dirty && !window.confirm("Kaydedilmemiş değişiklikler kaybolacak. Çıkılsın mı?")) return;
    dirty = false;
    try { window.sessionStorage.removeItem(SESSION); } catch (err) { /* ignore */ }
    window.location.reload();
  });
  var session = false;
  try { session = window.sessionStorage.getItem(SESSION) === "1"; } catch (err) { /* ignore */ }
  if (session) open();
})();

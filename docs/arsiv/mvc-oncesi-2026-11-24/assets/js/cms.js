/* Lightweight client-side CMS.
   Content = data.js defaults, optionally overridden by a copy saved in
   localStorage by admin.html. Every element with data-cms="<section>" is
   (re)rendered from that content before site.js wires up the interactions.
   No backend: works on any static host (Vercel, GitHub Pages, file://). */
(function () {
  "use strict";
  var KEY = "yee-cms-v1";
  var DEFAULTS = window.SITE_DEFAULTS;
  var SR = window.SiteRender;
  if (!DEFAULTS || !SR) return;

  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var valid = function (d) {
    return !!d && Array.isArray(d.projects) && Array.isArray(d.gallery) && Array.isArray(d.blog);
  };
  var isObj = function (o) { return !!o && typeof o === "object" && !Array.isArray(o); };
  var readStored = function () {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      return o && valid(o.data) ? o : null;
    } catch (e) { return null; }
  };
  /* Sections the panel does not edit (about) always fall back to defaults */
  var complete = function (d) {
    var out = clone(d);
    out.about = out.about || clone(DEFAULTS.about);
    ["facts", "summary", "bio", "education", "personal", "skills", "interests"].forEach(function (k) {
      if (!out.about[k]) out.about[k] = clone(DEFAULTS.about[k]);
    });
    /* saves made before the profile existed still get contact data */
    out.profile = isObj(out.profile) ? out.profile : clone(DEFAULTS.profile || {});
    Object.keys(DEFAULTS.profile || {}).forEach(function (k) {
      if (out.profile[k] == null) out.profile[k] = clone(DEFAULTS.profile[k]);
    });
    return out;
  };

  var CMS = {
    KEY: KEY,
    valid: valid,
    defaults: function () { return clone(DEFAULTS); },
    get: function () { var s = readStored(); return complete(s ? s.data : DEFAULTS); },
    isCustom: function () { return !!readStored(); },
    savedAt: function () { var s = readStored(); return s ? s.savedAt : null; },
    save: function (data) {
      if (!valid(data)) throw new Error("invalid data");
      window.localStorage.setItem(KEY, JSON.stringify({ version: DEFAULTS.version || 1, savedAt: new Date().toISOString(), data: data }));
    },
    reset: function () { window.localStorage.removeItem(KEY); },
    render: function (root, L, data) {
      root = root || document;
      L = L || ((document.documentElement.getAttribute("lang") || "tr").slice(0, 2) === "en" ? "en" : "tr");
      data = data || CMS.get();
      root.querySelectorAll("[data-cms]").forEach(function (el) {
        var fn = SR.R[el.getAttribute("data-cms")];
        if (!fn) return;
        try { el.innerHTML = fn(L, data); }
        catch (e) { if (window.console) console.warn("CMS: could not render", el.getAttribute("data-cms"), e); }
      });
      var pc = root.querySelector("[data-project-count]");
      if (pc) pc.textContent = SR.R.projectCount(L, data);
      /* map: only touch the iframe when the location really changed (avoids a reload) */
      var map = root.querySelector("iframe[data-cms-map]");
      if (map) {
        var src = SR.R.mapSrc(L, data);
        if (map.getAttribute("src") !== src) map.setAttribute("src", src);
        map.setAttribute("title", SR.R.mapTitle(L, data));
      }
      document.documentElement.setAttribute("data-content", CMS.isCustom() ? "local" : "default");
    }
  };
  /* Contact form inbox: messages written on contact.html / iletisim.html,
     read in admin.html. Lives in this browser's localStorage only. */
  var INBOX = "yee-cms-inbox-v1";
  var clip = function (v, n) { return String(v == null ? "" : v).trim().slice(0, n); };
  CMS.inbox = {
    KEY: INBOX,
    list: function () {
      try {
        var a = JSON.parse(window.localStorage.getItem(INBOX) || "[]");
        return Array.isArray(a) ? a.filter(function (m) { return m && m.id; }) : [];
      } catch (e) { return []; }
    },
    save: function (list) { window.localStorage.setItem(INBOX, JSON.stringify(list.slice(0, 300))); },
    add: function (m) {
      var list = CMS.inbox.list();
      var item = {
        id: "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: clip(m.name, 120), email: clip(m.email, 200), subject: clip(m.subject, 200), message: clip(m.message, 5000),
        lang: m.lang === "en" ? "en" : "tr", date: new Date().toISOString(), read: false
      };
      list.unshift(item);
      CMS.inbox.save(list);
      return item;
    },
    unread: function () { return CMS.inbox.list().filter(function (m) { return !m.read; }).length; }
  };
  window.CMS = CMS;

  /* Public pages: render now (synchronously, before site.js binds events) */
  if (!document.body || document.body.getAttribute("data-page") !== "admin") {
    CMS.render();
    /* Panel saved in another tab: reload so every effect re-binds cleanly */
    window.addEventListener("storage", function (e) { if (e.key === KEY) window.location.reload(); });
  }
})();

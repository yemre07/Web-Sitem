/* MODEL · store
   Persistence layer of the client-side CMS. Content = models/content.js
   defaults, optionally overridden by a copy saved in localStorage by the admin
   panel. Also holds the contact-form inbox. No DOM work happens here.
   No backend: works on any static host (Vercel, GitHub Pages, file://). */
(function () {
  "use strict";
  var KEY = "yee-cms-v1";
  var INBOX = "yee-cms-inbox-v1";
  var DEFAULTS = window.SITE_DEFAULTS;
  if (!DEFAULTS) return;

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
  /* Sections missing from an older save fall back to the defaults */
  var complete = function (d) {
    var out = clone(d);
    out.about = out.about || clone(DEFAULTS.about);
    ["facts", "summary", "bio", "education", "personal", "competencies", "interests"].forEach(function (k) {
      if (!out.about[k]) out.about[k] = clone(DEFAULTS.about[k]);
    });
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
    reset: function () { window.localStorage.removeItem(KEY); }
  };

  /* Contact form inbox: written on en/contact.html / tr/iletisim.html, read in admin/index.html.
     Lives in this browser's localStorage only. */
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
})();

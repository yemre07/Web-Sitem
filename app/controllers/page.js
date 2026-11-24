/* CONTROLLER · page
   Asks the model (CMS store) for the current content and hands it to the view
   (SiteRender templates): every element with data-cms="<section>" is
   (re)rendered before site.js wires up the interactions. */
(function () {
  "use strict";
  var CMS = window.CMS, SR = window.SiteRender;
  if (!CMS || !SR) return;

  var render = function (root, L, data) {
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
  };
  CMS.render = render;

  /* Public pages: render now (synchronously, before site.js binds events) */
  if (!document.body || document.body.getAttribute("data-page") !== "admin") {
    render();
    /* Panel saved in another tab: reload so every effect re-binds cleanly */
    window.addEventListener("storage", function (e) { if (e.key === CMS.KEY) window.location.reload(); });
  }
})();

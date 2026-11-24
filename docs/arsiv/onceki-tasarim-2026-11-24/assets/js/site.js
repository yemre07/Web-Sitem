(function () {
  "use strict";
  var doc = document.documentElement;
  var lang = (doc.getAttribute("lang") || "tr").slice(0, 2);

  /* Mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobileNav.hidden) {
        mobileNav.hidden = true;
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* Language switch keeps the open article / section */
  document.querySelectorAll("a[data-lang-switch]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (location.hash) a.setAttribute("href", a.getAttribute("href").split("#")[0] + location.hash);
    });
  });

  /* Project filters */
  var pf = document.querySelector("[data-filter-group='projects']");
  if (pf) {
    var units = document.querySelectorAll(".grid-units .unit");
    var countEl = document.querySelector("[data-project-count]");
    pf.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      pf.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var f = b.getAttribute("data-filter");
      var n = 0;
      units.forEach(function (u) {
        var show = f === "all" || u.getAttribute("data-cat") === f;
        u.hidden = !show;
        if (show) n++;
      });
      if (countEl) countEl.textContent = countEl.getAttribute("data-template").replace("{n}", n);
    });
  }

  /* Blog: tag + category filters, article open state */
  var blog = document.querySelector(".blog");
  if (blog) {
    var cards = blog.querySelectorAll(".post-card");
    var note = blog.querySelector(".filter-note");
    var active = null;
    var applyFilter = function (val) {
      active = active === val ? null : val;
      var n = 0;
      cards.forEach(function (c) {
        var keys = (c.getAttribute("data-keys") || "").split("|");
        var show = !active || keys.indexOf(active) > -1;
        c.hidden = !show;
        if (show) n++;
      });
      blog.querySelectorAll(".post-list [data-key]").forEach(function (t) {
        if (t.tagName === "BUTTON") t.setAttribute("aria-pressed", String(t.getAttribute("data-key") === active));
      });
      if (note) {
        if (active) {
          var label = active.charAt(0) === "#" ? active : active;
          note.innerHTML = (lang === "tr" ? "Filtre: <b>" + label + "</b> · " + n + " yazı · " : "Filter: <b>" + label + "</b> · " + n + " article(s) · ") +
            '<button type="button" data-clear>' + (lang === "tr" ? "Filtreyi kaldır" : "Clear filter") + "</button>";
        } else note.textContent = "";
      }
    };
    blog.addEventListener("click", function (e) {
      var clr = e.target.closest("[data-clear]");
      if (clr) { active = null; applyFilter(null); active = null; return; }
      var t = e.target.closest(".post-list button[data-key]");
      if (t) { applyFilter(t.getAttribute("data-key")); }
      var inPost = e.target.closest(".post button[data-key]");
      if (inPost) {
        var key = inPost.getAttribute("data-key");
        history.pushState("", document.title, location.pathname + location.search);
        syncPost();
        active = null;
        applyFilter(key);
        var list = blog.querySelector(".post-list");
        if (list) list.scrollIntoView();
      }
    });
    var syncPost = function () {
      var id = location.hash.slice(1);
      var target = id ? document.getElementById(id) : null;
      var isPost = target && target.classList.contains("post");
      blog.classList.toggle("reading", !!isPost);
      blog.querySelectorAll(".post").forEach(function (p) { p.classList.toggle("is-open", p === target); });
      if (isPost) {
        var h = target.querySelector("h1");
        if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", syncPost);
    syncPost();
  }

  /* Gallery lightbox */
  var lb = document.getElementById("lightbox");
  var photos = Array.prototype.slice.call(document.querySelectorAll("[data-photo]"));
  if (lb && photos.length && typeof lb.showModal === "function") {
    var img = lb.querySelector("img");
    var title = lb.querySelector("h2");
    var text = lb.querySelector(".lb-cap p");
    var idx = lb.querySelector("[data-idx]");
    var cur = 0;
    var show = function (i) {
      cur = (i + photos.length) % photos.length;
      var b = photos[cur];
      var fig = b.closest("figure");
      img.src = b.querySelector("img").getAttribute("src");
      img.alt = b.querySelector("img").getAttribute("alt");
      title.textContent = fig.querySelector("h2, h3").textContent;
      text.textContent = fig.querySelector("p").textContent;
      idx.textContent = String(cur + 1).padStart(2, "0") + " / " + String(photos.length).padStart(2, "0");
      img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    };
    photos.forEach(function (b, i) {
      b.addEventListener("click", function () { show(i); lb.showModal(); });
    });
    lb.querySelector("[data-prev]").addEventListener("click", function () { show(cur - 1); });
    lb.querySelector("[data-next]").addEventListener("click", function () { show(cur + 1); });
    lb.querySelector("[data-close]").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) lb.close(); });
    lb.addEventListener("close", function () { var b = photos[cur]; if (b) b.focus(); });
  }

  /* Contact form: compose an email in the visitor's mail app */
  var form = document.getElementById("contact-form");
  if (form) {
    var msgs = {
      tr: { req: "Bu alan boş bırakılamaz.", mail: "Geçerli bir e-posta adresi yazın (ör. ad@ornek.com).", short: "Mesaj en az 10 karakter olmalı.", ok: "E-posta uygulamanız açılıyor. Mesaj hazır, yalnızca “Gönder” e basın.", bad: "Lütfen işaretli alanları düzeltin." },
      en: { req: "This field can't be empty.", mail: "Enter a valid email address (e.g. name@example.com).", short: "The message needs at least 10 characters.", ok: "Your email app is opening with the message ready. Just press “Send”.", bad: "Please fix the highlighted fields." }
    }[lang];
    var status = form.querySelector(".status");
    var check = function (field) {
      var input = field.querySelector("input, textarea");
      var err = field.querySelector(".err");
      var v = input.value.trim();
      var m = "";
      if (!v) m = msgs.req;
      else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = msgs.mail;
      else if (input.tagName === "TEXTAREA" && v.length < 10) m = msgs.short;
      field.classList.toggle("invalid", !!m);
      input.setAttribute("aria-invalid", String(!!m));
      err.textContent = m;
      return !m;
    };
    form.querySelectorAll(".field").forEach(function (f) {
      var input = f.querySelector("input, textarea");
      input.addEventListener("blur", function () { if (input.value) check(f); });
      input.addEventListener("input", function () { if (f.classList.contains("invalid")) check(f); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll(".field").forEach(function (f) { if (!check(f)) { ok = false; first = first || f.querySelector("input, textarea"); } });
      if (!ok) { status.textContent = msgs.bad; status.className = "status bad"; first.focus(); return; }
      var d = new FormData(form);
      var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
      var href = "mailto:yeersoy.0715@gmail.com?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
      status.textContent = msgs.ok;
      status.className = "status ok";
      window.location.href = href;
    });
  }
})();

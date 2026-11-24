/* CONTROLLER · site
   UI behaviour for every public page: menu, filters, blog routing, lightbox,
   contact form → inbox, and the visual layer (canvas, cursor, tilt, reveal). */
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
      var grid = document.querySelector(".grid-units");
      if (grid) grid.classList.toggle("is-filtered", f !== "all");
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
      tr: { req: "Bu alan boş bırakılamaz.", mail: "Geçerli bir e-posta adresi yazın (ör. ad@ornek.com).", short: "Mesaj en az 10 karakter olmalı.", ok: "E-posta uygulamanız açılıyor. Mesaj hazır, yalnızca “Gönder” e basın.", saved: "Teşekkürler, mesajınız kaydedildi. E-posta uygulamanız da hazır mesajla açılıyor.", bad: "Lütfen işaretli alanları düzeltin." },
      en: { req: "This field can't be empty.", mail: "Enter a valid email address (e.g. name@example.com).", short: "The message needs at least 10 characters.", ok: "Your email app is opening with the message ready. Just press “Send”.", saved: "Thank you, your message has been saved. Your email app is also opening with it ready.", bad: "Please fix the highlighted fields." }
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
      /* 1) record it in the CMS inbox (read in admin/index.html → Gelen Mesajlar) */
      var saved = false;
      if (window.CMS && window.CMS.inbox) {
        try {
          window.CMS.inbox.add({ name: d.get("name"), email: d.get("email"), subject: d.get("subject"), message: d.get("message"), lang: lang });
          saved = true;
        } catch (err) { saved = false; }
      }
      /* 2) hand it to the visitor's mail app as before */
      var to = (window.CMS && window.CMS.get().profile && window.CMS.get().profile.email) || "yeersoy.0715@gmail.com";
      var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
      var href = "mailto:" + to + "?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
      status.textContent = saved ? msgs.saved : msgs.ok;
      status.className = "status ok";
      form.reset();
      window.location.href = href;
    });
  }

  /* =========================================================
     VISUAL LAYER — pure vanilla JS, no libraries
     ========================================================= */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var pointer = { x: -9999, y: -9999, on: false };
  window.addEventListener("pointermove", function (e) { pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true; }, { passive: true });
  document.addEventListener("pointerleave", function () { pointer.on = false; });
  document.documentElement.addEventListener("mouseleave", function () { pointer.on = false; });

  /* 1. Interactive constellation network (background canvas) */
(function () {
    var c = document.getElementById("net");
    if (!c || !c.getContext) return;
    var ctx = c.getContext("2d");
    var W = 0, H = 0, nodes = [];
    var LINK = 140, LINK2 = LINK * LINK, R = 190;
    var make = function () {
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.3 + .7, ox: 0, oy: 0, g: 0 };
    };
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = window.innerWidth; H = window.innerHeight;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.round(Math.min(110, Math.max(26, (W * H) / 14000)));
      if (W < 700) target = Math.min(target, 40);
      while (nodes.length < target) nodes.push(make());
      nodes.length = target;
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      var i, j, n, m, dx, dy, d2, d, f, a;
      var mx = pointer.x, my = pointer.y, act = pointer.on && fine;
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
          if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
        }
        dx = n.x - mx; dy = n.y - my;
        d = act ? Math.sqrt(dx * dx + dy * dy) : 1e9;
        if (d < R) {
          f = 1 - d / R;
          n.g += (f - n.g) * .14;
          n.ox += ((dx / (d || 1)) * f * 22 - n.ox) * .08;
          n.oy += ((dy / (d || 1)) * f * 22 - n.oy) * .08;
        } else { n.g *= .93; n.ox *= .94; n.oy *= .94; }
        n.px = n.x + n.ox; n.py = n.y + n.oy;
      }
      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          m = nodes[j];
          dx = n.px - m.px; if (dx > LINK || dx < -LINK) continue;
          dy = n.py - m.py; if (dy > LINK || dy < -LINK) continue;
          d2 = dx * dx + dy * dy; if (d2 > LINK2) continue;
          f = 1 - Math.sqrt(d2) / LINK;
          var glow = (n.g + m.g) * .5;
          a = f * (.13 + glow * .55);
          ctx.strokeStyle = glow > .04 ? "rgba(255,190,140," + a.toFixed(3) + ")" : "rgba(165,175,235," + a.toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(m.px, m.py); ctx.stroke();
        }
        if (n.g > .05) {
          ctx.strokeStyle = "rgba(255,184,107," + (n.g * .32).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(mx, my); ctx.stroke();
        }
      }
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        if (n.g > .05) {
          ctx.fillStyle = "rgba(255,170,110," + (n.g * .18).toFixed(3) + ")";
          ctx.beginPath(); ctx.arc(n.px, n.py, n.r + 3 + n.g * 7, 0, 6.283); ctx.fill();
          ctx.fillStyle = "rgba(255,226,196," + (.55 + n.g * .45).toFixed(3) + ")";
        } else ctx.fillStyle = "rgba(215,220,255,.5)";
        ctx.beginPath(); ctx.arc(n.px, n.py, n.r + n.g * 1.6, 0, 6.283); ctx.fill();
      }
    };
    var loop = function () { draw(); requestAnimationFrame(loop); };
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { size(); if (reduce) draw(); }, 120); });
    size();
    if (reduce) draw(); else requestAnimationFrame(loop);
  })();

  /* 2. Cursor glow + ring */
  if (fine && !reduce) {
    var glowEl = document.querySelector(".cursor-glow");
    var ringEl = document.querySelector(".cursor-ring");
    if (glowEl && ringEl) {
      var gx = -999, gy = -999, rx = -999, ry = -999, started = false;
      var follow = function () {
        rx += (pointer.x - rx) * .24; ry += (pointer.y - ry) * .24;
        gx += (pointer.x - gx) * .08; gy += (pointer.y - gy) * .08;
        ringEl.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
        glowEl.style.transform = "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0)";
        requestAnimationFrame(follow);
      };
      window.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        if (!started) { started = true; rx = gx = e.clientX; ry = gy = e.clientY; requestAnimationFrame(follow); }
        doc.classList.add("has-cursor");
      }, { passive: true });
      document.documentElement.addEventListener("mouseleave", function () { doc.classList.remove("has-cursor"); });
      document.addEventListener("mouseover", function (e) {
        ringEl.classList.toggle("is-hover", !!e.target.closest("a, button, input, textarea, select, label, [data-photo], .tilt"));
      });
      document.addEventListener("mousedown", function () { ringEl.classList.add("is-down"); });
      document.addEventListener("mouseup", function () { ringEl.classList.remove("is-down"); });
    }
  }

  /* 3. 3D tilt + glare + pattern spotlight */
  if (fine && !reduce) {
    document.querySelectorAll(".tilt").forEach(function (el) {
      var max = el.classList.contains("soft") ? 3.5 : el.classList.contains("s-card") ? 10 : 8;
      var raf = 0, last = null;
      el.addEventListener("pointerenter", function () { el.classList.add("is-tilting"); });
      el.addEventListener("pointermove", function (e) {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = el.getBoundingClientRect();
          var px = (last.clientX - r.left) / r.width, py = (last.clientY - r.top) / r.height;
          el.style.setProperty("--ry", ((px - .5) * 2 * max).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-(py - .5) * 2 * max).toFixed(2) + "deg");
          el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
          el.style.setProperty("--ty", "-4px");
        });
      });
      el.addEventListener("pointerleave", function () {
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--ty", "0px");
      });
    });
  }

  /* 4. Scroll reveal (staggered) */
  var revealSel = [
    ".hero-copy > *", ".hero-visual", ".marquee-duo", ".sc-head > *", ".home-about .pr-about", ".sec-head", ".strip > .photo",
    ".plate-head .ph-copy > *", ".ph-orbit", ".about-intro > *", ".about-intro .prose > *", ".two > *", ".comp-grid > .comp", ".comp-tags > li", ".ruled > li",
    ".bento > .unit", ".gallery > .photo", ".post-card", ".post-head", ".post .article", ".contact-grid > *", ".c-list > li",
    ".form .field", ".form-foot", ".map", ".foot-mark", ".foot-inner > *"
  ].join(",");
  var targets = Array.prototype.slice.call(document.querySelectorAll(revealSel));
  if ("IntersectionObserver" in window && !reduce) {
    targets.forEach(function (el) {
      var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", Math.min(sib, 6) * 80 + "ms");
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: .08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  /* 5. Count-up numbers in the hero */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, end = +el.getAttribute("data-count"), t0 = null;
        var step = function (t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1400, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        el.textContent = "0";
        requestAnimationFrame(step);
      });
    }, { threshold: .6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* 6. Home showcase: on wide screens the vertical scroll drives the project
        track sideways (the section is made tall and its inner frame sticks).
        Elsewhere it stays a native swipe/scroll-snap row. Each panel gets --p,
        its closeness to the centre (0..1), which CSS turns into focus. */
  (function () {
    var sec = document.querySelector(".showcase");
    if (!sec) return;
    var vp = sec.querySelector(".sc-viewport"), track = sec.querySelector(".sc-track"), bar = sec.querySelector(".sc-bar i");
    if (!vp || !track) return;
    var panels = Array.prototype.slice.call(track.children);
    var wide = window.matchMedia("(min-width: 900px)");
    var pinned = false, dist = 0, ticking = false;
    var update = function () {
      ticking = false;
      var p;
      if (pinned) {
        p = dist ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / dist)) : 0;
        track.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
      } else {
        var max = vp.scrollWidth - vp.clientWidth;
        p = max > 0 ? vp.scrollLeft / max : 0;
      }
      if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      if (reduce) return;
      var w = window.innerWidth, cx = w / 2;
      panels.forEach(function (el) {
        var b = el.getBoundingClientRect();
        var d = Math.abs(b.left + b.width / 2 - cx) / (w * .62);
        el.style.setProperty("--p", Math.max(0, 1 - d).toFixed(3));
      });
    };
    var request = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    var measure = function () {
      pinned = wide.matches && !reduce;
      sec.classList.toggle("is-pinned", pinned);
      if (pinned) {
        track.style.transform = "";
        dist = Math.max(0, track.scrollWidth - window.innerWidth);
        sec.style.height = (sec.querySelector(".sc-pin").offsetHeight + dist) + "px";
      } else {
        sec.style.height = "";
        track.style.transform = "";
      }
      update();
    };
    window.addEventListener("scroll", request, { passive: true });
    vp.addEventListener("scroll", request, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(measure, 120); });
    if (wide.addEventListener) wide.addEventListener("change", measure);
    window.addEventListener("load", measure);
    /* keyboard: tabbing into a panel scrolls the page to where that panel is centred */
    track.addEventListener("focusin", function (e) {
      if (!pinned) return;
      var el = e.target.closest(".sc-panel");
      if (!el) return;
      var i = panels.indexOf(el), top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + dist * (i / Math.max(1, panels.length - 1)));
    });
    measure();
  })();

  /* 7. Navbar state + scroll progress */
  var navbar = document.querySelector(".navbar");
  var prog = document.querySelector(".progress");
  var ticking = false;
  var onScroll = function () {
    ticking = false;
    var y = window.scrollY || 0;
    if (navbar) navbar.classList.toggle("scrolled", y > 24);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.setProperty("--p", h > 0 ? (y / h).toFixed(4) : "0");
    }
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();

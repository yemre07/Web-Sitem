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
    var units = document.querySelectorAll(".grid-units .work-card");
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
      tr: { req: "Bu alan boş bırakılamaz.", mail: "Geçerli bir e-posta adresi yazın (ör. ad@ornek.com).", short: "Mesaj en az 10 karakter olmalı.", ok: "Mesajınız e-posta uygulamanızda hazır.", saved: "Teşekkürler, mesajınız alındı ve e-posta uygulamanızda hazır.", bad: "Lütfen işaretli alanları düzeltin." },
      en: { req: "This field can't be empty.", mail: "Enter a valid email address (e.g. name@example.com).", short: "The message needs at least 10 characters.", ok: "Your message is ready in your email app.", saved: "Thank you, your message was received and is ready in your email app.", bad: "Please fix the highlighted fields." }
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

  /* 1. Interactive constellation (background canvas)
        Stars sit on a jittered grid and are wired once to their nearest
        neighbours, so edges persist and stretch instead of popping in/out.
        Near the cursor a star is pulled toward it by a damped spring
        (max ~30px, hard stop at 35px); its edges stretch with it and a weak
        edge coupling lets neighbours follow a little. Pointer is read from
        window (canvas layer is pointer-events:none), one rAF loop. */
  (function () {
    var c = document.getElementById("net");
    if (!c || !c.getContext) return;
    var ctx = c.getContext("2d");
    var CFG = {
      hoverRadius: 170,   /* px: cursor influence radius */
      maxOffset: 30,      /* px: how far a star is pulled toward the cursor */
      hardLimit: 35,      /* px: absolute cap from its home position */
      stiffness: .075,    /* spring strength toward the target offset */
      damping: .80,       /* velocity kept per frame (lower = calmer) */
      coupling: .016,     /* how much an edge drags its neighbour along */
      neighbours: 3,      /* edges per star (k nearest) */
      linkMax: 170        /* px: no edge longer than this at rest */
    };
    var R2 = CFG.hoverRadius * CFG.hoverRadius;
    var W = 0, H = 0, nodes = [], edges = [], last = 0;
    var COOL = "165,175,235", WARM = "255,190,140";

    var build = function () {
      var cell = Math.max(96, Math.sqrt((W * H) / 150));
      var cols = Math.ceil(W / cell) + 1, rows = Math.ceil(H / cell) + 1;
      nodes = [];
      for (var r = 0; r < rows; r++) for (var q = 0; q < cols; q++) {
        if (Math.random() > .8) continue;
        var hx = (q - .5 + .15 + Math.random() * .7) * cell, hy = (r - .5 + .15 + Math.random() * .7) * cell;
        nodes.push({ hx: hx, hy: hy, x: hx, y: hy, ox: 0, oy: 0, vx: 0, vy: 0, g: 0,
          r: Math.random() * 1.2 + .7, ph: Math.random() * 6.283, amp: 2 + Math.random() * 4, sp: .00018 + Math.random() * .00022 });
      }
      edges = [];
      var seen = {}, i, j, list, dx, dy;
      for (i = 0; i < nodes.length; i++) {
        list = [];
        for (j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          dx = nodes[i].hx - nodes[j].hx; dy = nodes[i].hy - nodes[j].hy;
          var d2 = dx * dx + dy * dy;
          if (d2 < CFG.linkMax * CFG.linkMax) list.push([j, d2]);
        }
        list.sort(function (a, b) { return a[1] - b[1]; });
        for (j = 0; j < Math.min(CFG.neighbours, list.length); j++) {
          var a = Math.min(i, list[j][0]), b = Math.max(i, list[j][0]), key = a * 4096 + b;
          if (seen[key]) continue;
          seen[key] = 1;
          edges.push({ a: nodes[a], b: nodes[b], rest: Math.sqrt(list[j][1]) });
        }
      }
    };
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = window.innerWidth; H = window.innerHeight;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    var step = function (now, dt) {
      var act = pointer.on && fine && !reduce, mx = pointer.x, my = pointer.y;
      var i, n, e, dx, dy, d2, d, f, pull, tx, ty, kx, ky;
      /* neighbour coupling: each edge nudges its two ends toward a shared offset */
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        kx = (e.a.ox - e.b.ox) * CFG.coupling; ky = (e.a.oy - e.b.oy) * CFG.coupling;
        e.a.vx -= kx * dt; e.a.vy -= ky * dt; e.b.vx += kx * dt; e.b.vy += ky * dt;
      }
      var keep = Math.pow(CFG.damping, dt);
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        /* home position with a slow idle drift */
        var bx = n.hx, by = n.hy;
        if (!reduce) { var t = now * n.sp + n.ph; bx += Math.cos(t) * n.amp; by += Math.sin(t * 1.3) * n.amp; }
        tx = 0; ty = 0; f = 0;
        if (act) {
          dx = mx - bx; dy = my - by; d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            d = Math.sqrt(d2) || 1;
            f = 1 - d / CFG.hoverRadius; f = f * f * (3 - 2 * f);          /* smoothstep falloff */
            pull = Math.min(d, CFG.maxOffset) * Math.max(f, d < CFG.maxOffset ? 1 : 0);
            tx = (dx / d) * pull; ty = (dy / d) * pull;
          }
        }
        /* damped spring toward the target offset (0,0 when the cursor is away) */
        n.vx = (n.vx + (tx - n.ox) * CFG.stiffness * dt) * keep;
        n.vy = (n.vy + (ty - n.oy) * CFG.stiffness * dt) * keep;
        n.ox += n.vx * dt; n.oy += n.vy * dt;
        d2 = n.ox * n.ox + n.oy * n.oy;
        if (d2 > CFG.hardLimit * CFG.hardLimit) {
          d = Math.sqrt(d2); n.ox *= CFG.hardLimit / d; n.oy *= CFG.hardLimit / d; n.vx *= .5; n.vy *= .5;
        }
        n.g += (f - n.g) * Math.min(1, .12 * dt);
        n.x = bx + n.ox; n.y = by + n.oy;
      }
    };

    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      var i, e, a, dx, dy, len, heat, stretch;
      ctx.lineWidth = 1;
      /* resting edges: one batched path */
      ctx.strokeStyle = "rgba(" + COOL + ",.11)";
      ctx.beginPath();
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        if (e.a.g > .03 || e.b.g > .03) continue;
        ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y);
      }
      ctx.stroke();
      /* active edges: brighten with proximity and with how far they are stretched */
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        heat = Math.max(e.a.g, e.b.g);
        if (heat <= .03) continue;
        dx = e.a.x - e.b.x; dy = e.a.y - e.b.y; len = Math.sqrt(dx * dx + dy * dy);
        stretch = Math.min(1, Math.abs(len - e.rest) / 30);
        a = .11 + heat * .38 + stretch * .18;
        ctx.strokeStyle = "rgba(" + WARM + "," + a.toFixed(3) + ")";
        ctx.lineWidth = 1 + stretch * .4;
        ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke();
      }
      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.g > .05) {
          ctx.fillStyle = "rgba(255,170,110," + (n.g * .18).toFixed(3) + ")";
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 3 + n.g * 6, 0, 6.283); ctx.fill();
          ctx.fillStyle = "rgba(255,226,196," + (.55 + n.g * .45).toFixed(3) + ")";
        } else ctx.fillStyle = "rgba(215,220,255,.5)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.g * 1.4, 0, 6.283); ctx.fill();
      }
    };

    var loop = function (now) {
      var dt = last ? Math.min(3, (now - last) / 16.667) : 1; /* frame-rate independent */
      last = now;
      step(now, dt); draw();
      requestAnimationFrame(loop);
    };
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduce) { step(0, 1); draw(); } }, 120); });
    document.addEventListener("visibilitychange", function () { last = 0; });
    size();
    if (reduce) { step(0, 1); draw(); } else requestAnimationFrame(loop);
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
    ".hero-copy > *", ".hero-visual", ".marquee-duo", ".works-grid > .work-card", ".home-about .pr-about", ".sec-head", ".strip > .photo",
    ".plate-head .ph-copy > *", ".ph-orbit", ".about-intro > *", ".about-intro .prose > *", ".two > *", ".comp-grid > .comp", ".comp-tags > li", ".ruled > li",
    ".gallery > .photo", ".post-card", ".post-head", ".post .article", ".contact-grid > *", ".c-list > li",
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

  /* 6. Navbar state + scroll progress */
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

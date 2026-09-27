// Material de Construção Coragem — interações do site
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5521981691223";
  var root = document.documentElement;
  // Must match the selectors hidden under html.reveal in style.css.
  var REVEAL_SELECTOR = ".grid > *, .feature-strip > *, .review-banner, .cta-band";
  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  function waLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // ---- Smooth scroll (Lenis) ----
  // One instance, driven by exactly one loop: GSAP's ticker when GSAP is
  // present (so ScrollTrigger and Lenis read the same frame), otherwise a
  // plain rAF loop. Driving it from two loops at once — each with its own
  // clock — is what made the old scroll speed up and stall.
  function initSmoothScroll() {
    if (prefersReducedMotion || typeof window.Lenis !== "function") return null;
    try {
      var lenis = new window.Lenis({
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        anchors: { offset: -96 },
        autoRaf: false,
      });
      if (window.gsap) {
        window.gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        var raf = function (time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
      return lenis;
    } catch (err) {
      return null;
    }
  }

  // ---- Mobile nav ----
  function initMobileNav(lenis) {
    var toggle = document.querySelector("[data-nav-toggle]");
    var close = document.querySelector("[data-nav-close]");
    var drawer = document.querySelector("[data-mobile-nav]");
    if (!toggle || !drawer) return;

    function open() {
      drawer.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      if (close) close.focus();
    }
    function shut() {
      if (!drawer.classList.contains("open")) return;
      drawer.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", function () {
      shut();
      toggle.focus();
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", shut);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
    });
  }

  // ---- Compact header once the page moves ----
  // Only touches the DOM when the state actually flips.
  function initHeaderScroll() {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;
    var scrolled = null;
    function onScroll() {
      var next = window.scrollY > 24;
      if (next === scrolled) return;
      scrolled = next;
      header.classList.toggle("is-scrolled", next);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Quote form -> WhatsApp ----
  function initQuoteForm() {
    var form = document.querySelector("[data-quote-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = (form.querySelector("#f-nome") || {}).value || "";
      var bairro = (form.querySelector("#f-bairro") || {}).value || "";
      var entrega = form.querySelector('input[name="entrega"]:checked');
      var entregaVal = entrega ? entrega.value : "";
      var detalhes = (form.querySelector("#f-detalhes") || {}).value || "";

      var categorias = [];
      form.querySelectorAll('input[name="categoria"]:checked').forEach(function (el) {
        categorias.push(el.value);
      });

      var linhas = [];
      linhas.push("Olá! Vim pelo site e gostaria de um orçamento.");
      if (nome.trim()) linhas.push("Nome: " + nome.trim());
      if (bairro.trim()) linhas.push("Bairro: " + bairro.trim());
      if (categorias.length) linhas.push("Preciso de: " + categorias.join(", "));
      if (detalhes.trim()) linhas.push("Detalhes: " + detalhes.trim());
      if (entregaVal) linhas.push("Prefiro: " + entregaVal);

      var msg = linhas.join("\n");
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  // ---- Generic WhatsApp buttons with data-wa-message ----
  function initWaButtons() {
    document.querySelectorAll("[data-wa-message]").forEach(function (btn) {
      var msg = btn.getAttribute("data-wa-message");
      btn.setAttribute("href", waLink(msg));
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
    });
  }

  // ---- Active nav link ----
  function initActiveLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    if (path.indexOf(".") === -1) path += ".html"; // Vercel cleanUrls
    document.querySelectorAll("[data-nav-link]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === path);
    });
  }

  // ---- Map facade ----
  // The Google Maps embed is ~450 KiB and swallows wheel events, so it only
  // loads when someone asks for it.
  function initMapFacade() {
    document.querySelectorAll("[data-map-src]").forEach(function (wrap) {
      var btn = wrap.querySelector("[data-map-load]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var iframe = document.createElement("iframe");
        iframe.src = wrap.getAttribute("data-map-src");
        iframe.title = wrap.getAttribute("data-map-title") || "Mapa";
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
        // Keep wheel events inside the map now that the person chose it.
        wrap.setAttribute("data-lenis-prevent", "");
        wrap.classList.add("is-live");
        wrap.appendChild(iframe);
        iframe.addEventListener("load", function () {
          wrap.querySelectorAll(".map-cover").forEach(function (el) { el.remove(); });
        });
      });
    });
  }

  // ---- FAQ: animate the height of <details> ----
  function initFaq() {
    var animate = window.Motion && window.Motion.animate;
    if (!animate || prefersReducedMotion) return;
    document.querySelectorAll("details.faq-item").forEach(function (el) {
      var summary = el.querySelector("summary");
      if (!summary) return;
      var running = null;
      summary.addEventListener("click", function (e) {
        e.preventDefault();
        if (running) running.stop();
        var start = el.offsetHeight;
        var opening = !el.classList.contains("is-open"); // el.open stays true until a close finishes
        if (opening) el.open = true;
        el.classList.toggle("is-open", opening);
        var closedH = summary.offsetHeight + parseFloat(getComputedStyle(el).paddingTop) * 2 + 2;
        var end = opening ? el.scrollHeight + 2 : closedH;
        el.style.overflow = "hidden";
        running = animate(el, { height: [start + "px", end + "px"] }, { duration: 0.32, ease: [0.22, 1, 0.36, 1] });
        var self = running;
        // Motion 11 controls are thenable; there's no .finished.
        self.then(function () {
          if (running !== self) return; // superseded by a newer click
          if (!opening) el.open = false;
          el.style.height = "";
          el.style.overflow = "";
          running = null;
        });
      });
    });
  }

  // ---- Scroll reveals (GSAP + ScrollTrigger) ----
  // Initial hidden state lives in CSS under html.reveal (set in <head>), so
  // nothing flashes in and back out. If GSAP never arrives, the class is
  // dropped and everything is simply visible.
  function initScrollReveal() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST || prefersReducedMotion) {
      root.classList.remove("reveal");
      return;
    }
    root.classList.add("reveal-live");
    ST.batch(REVEAL_SELECTOR, {
      start: "top 92%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, overwrite: true,
          // Hand control back to CSS so hover transforms keep working.
          onComplete: function () {
            batch.forEach(function (el) { el.classList.add("is-in"); });
            gsap.set(batch, { clearProps: "opacity,transform" });
          },
        });
      },
    });
  }

  // ---- Delivery truck scene (entrega) ----
  // Pure SVG transforms scrubbed by scroll: one timeline, one trigger.
  function initTruckScene() {
    var scene = document.querySelector("[data-truck-scene]");
    var gsap = window.gsap;
    if (!scene || !gsap || !window.ScrollTrigger) return;
    var q = gsap.utils.selector(scene);
    var truck = q(".tr-truck")[0];
    var bed = q(".tr-bed")[0];
    var load = q(".tr-load")[0];
    var wheels = q(".tr-wheel");
    var sand = q(".tr-sand-drop");
    var stones = q(".tr-stone");
    var pile = q(".tr-pile")[0];
    var roadDash = q(".tr-dashes")[0];
    var hills = q(".tr-hills")[0];
    var drive = q(".tr-dust-drive");
    var land = q(".tr-dust-land");
    if (!truck || !bed) return;

    var loadStones = q(".tr-bed > g");
    // Scene geometry (SVG units): the truck parks at x=0, the rear wheel
    // sits at x=520 and the bed hinges on its rear-bottom corner.
    var DRIVE = 5, START_X = -900, REAR_WHEEL_X = 520, HINGE = "470 236";

    // Pin every pivot up front. Setting an origin mid-timeline makes GSAP's
    // smoothOrigin add a compensating translate, which shoves parts around.
    gsap.set(wheels, { transformOrigin: "50% 50%" });
    gsap.set(bed, { svgOrigin: HINGE });
    gsap.set(load, { svgOrigin: "470 176" });
    gsap.set(pile, { svgOrigin: "426 292" });
    gsap.set(drive.concat(land), { transformOrigin: "50% 100%" });

    var tl = gsap.timeline({ defaults: { ease: "none" } });
    // 0 → 5: drive in, decelerating to a stop.
    tl.fromTo(truck, { x: START_X }, { x: 0, duration: DRIVE, ease: "power2.out" }, 0)
      // ~6.5 turns for 900 units on a r=22 wheel.
      .fromTo(wheels, { rotation: -2340 }, { rotation: 0, duration: DRIVE, ease: "power2.out" }, 0)
      .fromTo(roadDash, { x: 0 }, { x: -160, duration: DRIVE, ease: "power2.out" }, 0)
      .fromTo(hills, { x: 60 }, { x: 0, duration: DRIVE, ease: "power2.out" }, 0)
      // Settle on the suspension.
      .to(truck, { y: 2, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1 }, DRIVE);
    // Dust puffs fire when the rear wheel actually passes them. With
    // power2.out, x(p) = START_X * (1 - p)^2, so solve for p.
    drive.forEach(function (d) {
      var x = parseFloat(d.getAttribute("data-x")) + 30;
      var p = 1 - Math.sqrt((REAR_WHEEL_X - x) / -START_X);
      var t = Math.max(0, p * DRIVE);
      tl.fromTo(d, { opacity: 0, scale: 0.4 },
        { opacity: 0.5, scale: 1, duration: 0.25 }, t)
        .to(d, { opacity: 0, scale: 1.8, x: -36, y: -12, duration: 0.9 }, t + 0.25);
    });
    // 5.5 → 8: tip the bed, the load slides out into a pile.
    tl.fromTo(bed, { rotation: 0 }, { rotation: -24, duration: 1.4, ease: "power1.inOut" }, 5.5)
      .fromTo(load, { scaleY: 1 }, { scaleY: 0.12, duration: 1.3 }, 6)
      .fromTo(loadStones, { opacity: 1 }, { opacity: 0, duration: 0.4 }, 6.2)
      .fromTo(sand, { opacity: 0, y: -8 }, { opacity: 1, y: 44, duration: 0.7, stagger: 0.07, ease: "power2.in" }, 6.1)
      .to(sand, { opacity: 0, duration: 0.15, stagger: 0.07 }, 6.75)
      .fromTo(pile, { scaleY: 0.02, scaleX: 0.5 }, { scaleY: 1, scaleX: 1, duration: 1.4, ease: "power1.out" }, 6.3)
      // Stones tumble off the back and stack, bottom row first.
      .fromTo(stones, { opacity: 0, x: 100, y: -80 }, { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.11, ease: "bounce.out" }, 6.5)
      .fromTo(land, { opacity: 0, scale: 0.3 }, { opacity: 0.45, scale: 1, duration: 0.45, stagger: 0.12 }, 6.7)
      .to(land, { opacity: 0, scale: 1.9, y: -26, duration: 1, stagger: 0.12 }, 7.15)
      // Bed comes back down.
      .to(bed, { rotation: 0, duration: 1, ease: "power1.inOut" }, 8);

    if (prefersReducedMotion) {
      tl.progress(1).pause();
      return;
    }
    tl.pause();
    window.ScrollTrigger.create({
      trigger: scene,
      start: "top 85%",
      end: "bottom 50%",
      scrub: 0.6,
      animation: tl,
    });
  }

  // ---- Rating badge: small star pop with Motion ----
  function initHeroPop() {
    var animate = window.Motion && window.Motion.animate;
    if (!animate || prefersReducedMotion) return;
    var stars = document.querySelectorAll(".hero-rating .stars svg");
    if (!stars.length) return;
    try {
      animate(stars, { opacity: [0, 1], scale: [0.5, 1] }, {
        duration: 0.35,
        delay: window.Motion.stagger ? window.Motion.stagger(0.05, { startDelay: 0.2 }) : 0.2,
        ease: [0.34, 1.56, 0.64, 1],
      });
    } catch (err) {
      // Cosmetic only.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    var lenis = initSmoothScroll();
    if (lenis && window.ScrollTrigger) lenis.on("scroll", window.ScrollTrigger.update);
    initMobileNav(lenis);
    initHeaderScroll();
    initQuoteForm();
    initWaButtons();
    initActiveLink();
    initMapFacade();
    initFaq();
    initScrollReveal();
    initTruckScene();
    initHeroPop();
  });
})();

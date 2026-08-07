/* ============================================================
   bhaigroww.co — Animations (GSAP + ScrollTrigger)
   Everything degrades gracefully if the GSAP CDN is unreachable.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Nav scroll state ---------------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobile-menu");
  const toggleMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });

  /* ---------------- Progress bar ---------------- */
  if (hasGSAP) {
    gsap.to(".progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  }

  /* ---------------- Hero entrance timeline ---------------- */
  if (hasGSAP) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.5 })
      .from(".hero h1 .line", { y: "110%", duration: 0.8, stagger: 0.14 }, "-=0.25")
      .from(".hero .sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
      .from(".hero .cta-row", { y: 24, opacity: 0, duration: 0.7 }, "-=0.55")
      .from(".hero .micro-trust", { y: 16, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(".hero .fun-quote", { y: 14, opacity: 0, duration: 0.6 }, "-=0.35");
  }

  /* ---------------- Scroll reveals ---------------- */
  if (hasGSAP) {
    // Elements inside a [data-stagger] group are handled by their group.
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      if (el.closest("[data-stagger]")) return;
      gsap.from(el, {
        y: 44, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // Staggered groups: animate direct children one by one.
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const items = group.querySelectorAll(":scope > *");
      if (!items.length) return;
      gsap.from(items, {
        y: 44, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: group, start: "top 85%" },
      });
    });
  }

  /* ---------------- Animated counters ---------------- */
  if (hasGSAP) {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
      });
    });
  }

  /* ---------------- Tilt cards ---------------- */
  if (hasGSAP) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10, rotateX: -y * 10,
          transformPerspective: 700, duration: 0.4, ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
      });
    });
  }

  /* ---------------- Interactive 3D particle ring ---------------- */
  const hero = document.querySelector(".hero");
  const canvas = document.getElementById("particles");
  if (canvas && hero) {
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const color = "120, 118, 110"; // warm gray

    let W = 0, H = 0, cx = 0, cy = 0, offLeft = 0, offTop = 0;
    let torusR = 150, torusT = 26, PERSP = 520, ZMAX = 180;

    const kinds = [
      { w: 16, h: 7 },  // bar
      { w: 9, h: 9 },   // small square
      { w: 26, h: 2 },  // thin line
      { w: 6, h: 6 },   // dot
      { w: 20, h: 9 },  // bar
    ];

    const particles = [];

    // Rebuild the 3D point cloud around the current ring size.
    function build() {
      particles.length = 0;
      const count = Math.round(90 + Math.min(W, 1600) * 0.07);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const kind = kinds[Math.floor(Math.random() * kinds.length)];
        // ~78% sit on the revolving torus ring; the rest float inside for depth.
        if (i < count * 0.78) {
          const phi = Math.random() * Math.PI * 2;
          const rTube = Math.pow(Math.random(), 0.7) * torusT;
          const r = torusR + Math.cos(phi) * rTube;
          particles.push({
            x: Math.cos(theta) * r,
            y: Math.sin(theta) * r,
            z: Math.sin(phi) * rTube,
            theta, kind, size: 0.7 + Math.random() * 0.9, ring: true,
          });
        } else {
          const r = Math.pow(Math.random(), 0.5) * torusR * 0.6;
          const a = Math.random() * Math.PI * 2;
          const b = Math.acos(2 * Math.random() - 1);
          particles.push({
            x: r * Math.sin(b) * Math.cos(a),
            y: r * Math.sin(b) * Math.sin(a),
            z: r * Math.cos(b),
            theta, kind, size: 0.7 + Math.random() * 0.8, ring: false,
          });
        }
      }
    }

    // Apply yaw then pitch rotation to a 3D point.
    function applyRot(p, ax, ay) {
      const cy = Math.cos(ay), sy = Math.sin(ay);
      const cxr = Math.cos(ax), sxr = Math.sin(ax);
      const x = p.x * cy + p.z * sy;
      let z = -p.x * sy + p.z * cy;
      const y = p.y * cxr - z * sxr;
      z = p.y * sxr + z * cxr;
      return { x, y, z };
    }

    // Perspective projection — z closer to viewer → bigger.
    function proj(pt) {
      const s = PERSP / (PERSP - pt.z);
      return { x: cx + pt.x * s, y: cy + pt.y * s, s };
    }

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2;
      cy = H * 0.46; // sit slightly above centre, behind the headline
      const r = hero.getBoundingClientRect();
      offLeft = r.left;
      offTop = r.top;
      torusR = Math.max(90, Math.min(Math.min(W * 0.30, H * 0.42), 320));
      torusT = torusR * 0.17;
      ZMAX = torusR + torusT + 20;
      PERSP = Math.max(380, torusR * 3.2);
      build();
    }

    let angleX = 0.5, angleY = 0;   // current (smoothed) view angles
    let targetX = 0.5, targetY = 0; // interaction targets
    const BASE_X = 0.5;
    let auto = 0;                   // continuous revolution

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Ease the view towards whatever the pointer/touch is asking for.
      angleX += (targetX - angleX) * 0.05;
      angleY += (targetY - angleY) * 0.05;
      auto += 0.004;

      // Transform every particle, depth-sort, then paint far → near.
      const list = [];
      for (const p of particles) {
        const sp = applyRot({ x: p.x, y: p.y, z: p.z }, angleX, angleY + auto);
        const pr = proj(sp);
        const t = (sp.z + ZMAX) / (ZMAX * 2); // 0 = back, 1 = front
        let rot = 0;
        if (p.ring) {
          // Rotate the ring's tangent so bars/lines wrap around it.
          const len = 13 * p.size;
          const tv = applyRot(
            { x: -Math.sin(p.theta) * len, y: Math.cos(p.theta) * len, z: 0 },
            angleX, angleY + auto
          );
          const ep = proj({ x: sp.x + tv.x, y: sp.y + tv.y, z: sp.z + tv.z });
          rot = Math.atan2(ep.y - pr.y, ep.x - pr.x);
        }
        list.push({ p, pr, rot, alpha: 0.08 + t * 0.30, size: p.size * pr.s, z: sp.z });
      }
      list.sort((a, b) => a.z - b.z);

      for (const it of list) {
        const w = it.p.kind.w * it.size;
        const h = it.p.kind.h * it.size;
        ctx.save();
        ctx.translate(it.pr.x, it.pr.y);
        ctx.rotate(it.rot);
        ctx.fillStyle = `rgba(${color}, ${it.alpha.toFixed(3)})`;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }

    // Interaction — mouse on desktop, touch on mobile.
    function onPointerMove(e) {
      const nx = (e.clientX - offLeft - cx) / W;
      const ny = (e.clientY - offTop - cy) / H;
      targetY = Math.max(-1.4, Math.min(1.4, nx * 1.5));
      targetX = Math.max(-1.0, Math.min(1.4, BASE_X - ny * 1.2));
    }
    function onPointerEnd() {
      targetX = BASE_X;
      targetY = 0;
    }
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerdown", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerEnd, { passive: true });
    hero.addEventListener("pointerup", onPointerEnd, { passive: true });
    hero.addEventListener("pointercancel", onPointerEnd, { passive: true });

    if (!reduced) {
      resize();
      draw();
      window.addEventListener("resize", resize, { passive: true });
    }
  }

  /* ---------------- Custom cursor ---------------- */
  if (hasGSAP && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add("has-cursor");
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    });

    const hoverables = document.querySelectorAll("a, button, [data-tilt]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
    });
  }
});

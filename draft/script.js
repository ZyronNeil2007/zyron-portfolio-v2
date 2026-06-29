// script.js — Neil's Portfolio (Redesigned)

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. THEME TOGGLE ── */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');
  const body        = document.body;

  const savedTheme  = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default is dark — only apply light if saved or system preference
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    body.classList.remove('dark');
    body.classList.add('light');
    themeIcon.className = 'ph ph-sun';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light');
    if (isLight) {
      body.classList.remove('light');
      body.classList.add('dark');
      themeIcon.className = 'ph ph-moon';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      themeIcon.className = 'ph ph-sun';
      localStorage.setItem('theme', 'light');
    }
  });

  /* ── 2. TYPEWRITER ── */
  const line1El = document.getElementById('type-line1');
  const line2El = document.getElementById('type-line2');
  const line3El = document.getElementById('type-line3');

  const L1 = "Hi, I'm Zyron ";
  const L2 = "I blend code with ";
  const L3 = "design.";
  const total = L1.length + L2.length + L3.length;
  let charCount = 0;

  function makeCursor(blink = false) {
    const c = document.createElement('span');
    c.className = 'typing-cursor' + (blink ? ' blinking' : '');
    return c;
  }

  function typeWriter() {
    if (charCount <= L1.length) {
      line1El.textContent = L1.substring(0, charCount);
      if (charCount < L1.length) line1El.appendChild(makeCursor());
      line2El.innerHTML = '';
      line3El.innerHTML = '';
    } else if (charCount <= L1.length + L2.length) {
      line1El.textContent = L1;
      line2El.textContent = L2.substring(0, charCount - L1.length);
      if (charCount < L1.length + L2.length) line2El.appendChild(makeCursor());
      line3El.innerHTML = '';
    } else {
      line1El.textContent = L1;
      line2El.textContent = L2;
      line3El.textContent = L3.substring(0, charCount - L1.length - L2.length);
      if (charCount === total) line3El.appendChild(makeCursor(true));
    }
    if (charCount < total) { charCount++; setTimeout(typeWriter, 50); }
  }

  setTimeout(() => { charCount = 1; typeWriter(); }, 600);

  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.scroll-reveal');
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  // Trigger skills bar fill when card is visible
  const skillsCard = document.querySelector('.card-skills');
  if (skillsCard) {
    const skillsObs = new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      skillsCard.classList.add('visible');
      document.querySelectorAll('.bar-fill').forEach(fill => {
        const w = fill.dataset.w;
        if (w) fill.style.width = w + '%';
      });
      obs.unobserve(skillsCard);
    }, { threshold: 0.2 });
    skillsObs.observe(skillsCard);
  }

  /* ── 4. TIMELINE ITEMS ── */
  const tlItems = document.querySelectorAll('.tl-item');
  const tlObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  tlItems.forEach(el => tlObs.observe(el));

  /* ── 5. SCROLL SPY (rAF-throttled) ── */
  const mNavLinks = document.querySelectorAll('.m-nav-link');
  const spySections = ['home', 'about', 'projects', 'contact'];
  const spyEls = spySections.map(id => document.getElementById(id));
  let rafId = null;

  function onScroll() {
    const half = window.innerHeight / 2;
    let current = 'home';
    spyEls.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= half) current = spySections[i];
    });
    mNavLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === current);
    });
    rafId = null;
  }

  window.addEventListener('scroll', () => {
    if (!rafId) rafId = requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* ── 6. FOOTER YEAR ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 7. PROJECT FILTERS ── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projCards   = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projCards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        }
      });
    });
  });

  /* ── 8. GALLERY LIGHTBOX ── */
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.querySelector('.lb-close');

  document.querySelectorAll('.masonry-item img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  /* ── 9. PROJECT MODAL ── */
  const modal      = document.getElementById('proj-modal');
  const modalBody  = document.getElementById('modal-body');
  const modalClose = document.querySelector('.proj-modal-close');

  document.querySelectorAll('.proj-inner').forEach(inner => {
    inner.style.cursor = 'pointer';
    inner.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const card  = inner.closest('.proj-card');
      const title = card.querySelector('h3').textContent;
      const desc  = card.querySelector('p').innerHTML;
      const tags  = [...card.querySelectorAll('.proj-tech span')].map(s => `<span>${s.textContent}</span>`).join('');
      const badge = card.querySelector('.proj-tag').outerHTML;

      modalBody.innerHTML = `
        <div style="margin-bottom:.75rem">${badge}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="proj-tech" style="margin-top:1rem">${tags}</div>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  /* ── 10. KEYBOARD SHORTCUTS ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); closeModal(); }
  });

  /* ── 11. 3D TILT (desktop) ── */
  function initTilt() {
    if (window.innerWidth < 768) return;
    document.querySelectorAll('.about-card, .proj-inner, .tl-card').forEach(el => {
      el.classList.add('tilt-el');

      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width  - .5;
        const yPct = (e.clientY - rect.top)  / rect.height - .5;
        el.style.transform = `perspective(800px) rotateX(${yPct * -8}deg) rotateY(${xPct * 8}deg) scale3d(1.01,1.01,1.01)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  initTilt();
  window.addEventListener('resize', () => {
    clearTimeout(window._tiltTimer);
    window._tiltTimer = setTimeout(initTilt, 150);
  });

  /* ── 12. MATTER.JS EASTER EGG (logo triple-click) ── */
  const brand = document.querySelector('.brand');
  let brandClicks = 0, brandTimer;

  if (brand) {
    brand.addEventListener('click', () => {
      brandClicks++;
      clearTimeout(brandTimer);
      if (brandClicks === 3) {
        triggerAntiGravity();
        brandClicks = 0;
      } else {
        brandTimer = setTimeout(() => { brandClicks = 0; }, 600);
      }
    });
  }

  function triggerAntiGravity() {
    if (window._gravityActive || typeof Matter === 'undefined') return;
    window._gravityActive = true;
    document.body.style.overflow = 'hidden';

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
    const engine = Engine.create();
    engine.gravity.y = -0.5;
    const W = window.innerWidth, H = window.innerHeight;
    const wOpts = { isStatic: true, render: { visible: false } };

    Composite.add(engine.world, [
      Bodies.rectangle(W/2, H+50, W*2, 100, wOpts),
      Bodies.rectangle(W/2, -50, W*2, 100, wOpts),
      Bodies.rectangle(-50, H/2, 100, H*2, wOpts),
      Bodies.rectangle(W+50, H/2, 100, H*2, wOpts),
    ]);

    const container = document.createElement('div');
    Object.assign(container.style, {
      position:'fixed', inset:'0', pointerEvents:'none', zIndex:'9000'
    });
    document.body.appendChild(container);

    const map = [];
    document.querySelectorAll('.about-card, .proj-inner, .tl-card').forEach(el => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const clone = el.cloneNode(true);
      Object.assign(clone.style, {
        position:'absolute', left:'0', top:'0',
        width:`${r.width}px`, height:`${r.height}px`,
        margin:'0', pointerEvents:'auto', transition:'none'
      });
      container.appendChild(clone);
      el.style.opacity = '0';

      const body = Bodies.rectangle(r.left+r.width/2, r.top+r.height/2, r.width, r.height, {
        restitution:.6, friction:.1, frictionAir:.02
      });
      Composite.add(engine.world, body);
      map.push({ dom: clone, body, w: r.width, h: r.height });
    });

    const mc = MouseConstraint.create(engine, {
      mouse: Mouse.create(document.body),
      constraint: { stiffness: .2, render: { visible: false } }
    });
    Composite.add(engine.world, mc);

    Events.on(engine, 'afterUpdate', () => {
      map.forEach(({ dom, body, w, h }) => {
        const { x, y } = body.position;
        dom.style.transform = `translate(${x - w/2}px, ${y - h/2}px) rotate(${body.angle}rad)`;
      });
    });

    Runner.run(Runner.create(), engine);

    // Shift ambient glows for fun
    document.querySelectorAll('.bg-orb').forEach(o => {
      o.style.filter = 'hue-rotate(120deg)';
      o.style.transition = 'filter .5s';
    });
  }

});

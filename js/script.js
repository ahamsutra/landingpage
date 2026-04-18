(function () {

  /* ── CUSTOM CURSOR ─────────────────────── */
  const dot = document.getElementById('cd');
  const ring = document.getElementById('cr');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function trackRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(trackRing);
  })();

  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '12px';
      dot.style.height = '12px';
      ring.style.width = '64px';
      ring.style.height = '64px';
      ring.style.opacity = '.3';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '8px';
      dot.style.height = '8px';
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.opacity = '.5';
    });
  });

  /* ── SCROLL PROGRESS ──────────────────── */
  const spbar = document.getElementById('sp');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    spbar.style.width = (pct * 100) + '%';
  }, { passive: true });

  /* ── NAVIGATION SCROLL ────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });



  /* ── SPLASH ANIMATION ─────────────────── */
  const splash = document.getElementById('splash');

  const tl = gsap.timeline({
    onComplete: () => {
      splash.style.display = 'none';
      document.body.classList.remove('noscroll');
      revealHero();
    }
  });

  // Set initial scale for the smooth zooming effect
  tl.set('.sp-logo svg', { scale: 0.95 });

  // Staggered animated entrance for the SVG logo paths
  tl.to('.sp-logo', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .fromTo('.sp-logo .cls-1, .sp-logo .cls-2, .sp-logo .cls-3',
      { opacity: 0, scale: 0.9, transformOrigin: 'center' },
      { opacity: 1, scale: 1, duration: 2, stagger: { from: "random", amount: 1.5 }, ease: "power3.out" },
      "-=0.2"
    )
    // Animate the entire logo group to scale up seamlessly
    .to('.sp-logo svg', {
      scale: 1.02,
      duration: 3,
      ease: 'power1.out'
    }, "-=2.5")
    // Hold briefly
    .to({}, { duration: 1.0 })
    // Splash exits upward
    .to(splash, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
    // Nav slides down
    .to(nav, { opacity: 1, y: 0, duration: .7, ease: 'power2.out' }, '-=.45');

  /* ── HERO POEM REVEAL ─────────────────── */
  function revealHero() {
    const label = document.getElementById('hero-label');
    label.classList.add('vis');

    const lines = document.querySelectorAll('#poem .lr');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('vis');
      }, i * 130);
    });

    setTimeout(() => {
      document.getElementById('scroll-ind')?.classList.add('vis');
    }, lines.length * 130 + 300);
  }

  /* ── SCROLL REVEAL (IntersectionObserver) ── */
  const ioOptions = { threshold: 0.13, rootMargin: '0px 0px -40px 0px' };

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        revealObserver.unobserve(e.target);
      }
    });
  }, ioOptions);

  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

  // Pillar top-border animation
  const pillarObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        pillarObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.pillar').forEach(el => pillarObserver.observe(el));

  // Marquee pause on hover
  document.querySelectorAll('.mqb').forEach(band => {
    const track = band.querySelector('.mqt');
    band.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    band.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

  /* ── DYNAMIC SMOOTH SCROLL (LENIS) ────── */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Modal logic is handled by contact-form/script.js (initContactModal)
  // and contact form/script.js (initJoinModal), loaded in index.html.

})();
(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* Page entrance */
  const finishLoading = () => {
    window.setTimeout(() => body.classList.add('is-loaded'), reduceMotion ? 0 : 220);
  };

  if (doc.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
  window.setTimeout(finishLoading, 1800);

  /* Bilingual content */
  const languageButton = doc.querySelector('.language-toggle');
  const languageNodes = [...doc.querySelectorAll('[data-zh][data-en]')];
  const descriptions = {
    zh: '王城昊（Chenghao Wang / Caelan）的个人网站：产品、AI Agent、AI 硬件、机器人与跨学科创新实践。',
    en: 'The portfolio of Chenghao Wang (Caelan): product, AI agents, intelligent hardware, robotics and interdisciplinary ventures.'
  };

  const getInitialLanguage = () => {
    const query = new URLSearchParams(window.location.search).get('lang');
    if (query === 'en' || query === 'zh') return query;
    try {
      const saved = window.localStorage.getItem('cw-language');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (_) {}
    return 'zh';
  };

  const setLanguage = (language, updateUrl = true) => {
    const lang = language === 'en' ? 'en' : 'zh';
    root.lang = lang === 'en' ? 'en' : 'zh-CN';
    root.dataset.language = lang;

    languageNodes.forEach((node) => {
      node.innerHTML = node.dataset[lang];
    });

    if (languageButton) {
      languageButton.textContent = lang === 'zh' ? 'EN' : '中文';
      languageButton.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    }

    const description = doc.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', descriptions[lang]);
    doc.title = lang === 'zh'
      ? '王城昊 Chenghao Wang — 产品、AI 与机器人'
      : 'Chenghao Wang — Product, AI & Robotics';

    try { window.localStorage.setItem('cw-language', lang); } catch (_) {}

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  };

  setLanguage(getInitialLanguage(), false);
  languageButton?.addEventListener('click', () => {
    setLanguage(root.dataset.language === 'en' ? 'zh' : 'en');
  });

  /* Mobile navigation */
  const menuButton = doc.querySelector('.menu-toggle');
  const mobileMenu = doc.querySelector('.mobile-menu');

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  /* Header, reading progress and active section */
  const header = doc.querySelector('.site-header');
  const progress = doc.querySelector('.scroll-progress i');
  let scrollTicking = false;

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const scrollRange = Math.max(doc.documentElement.scrollHeight - window.innerHeight, 1);
    header?.classList.toggle('is-scrolled', scrollTop > 24);
    if (progress) progress.style.transform = `scaleY(${Math.min(scrollTop / scrollRange, 1)})`;
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScroll();

  const desktopLinks = [...doc.querySelectorAll('.desktop-nav a')];
  const sections = [...doc.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        desktopLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-28% 0px -64%', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* Reveal choreography */
  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -9%', threshold: 0.08 });
    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
      revealObserver.observe(item);
    });
  }

  /* Count-up moments */
  const countNodes = [...doc.querySelectorAll('[data-count]')];
  const animateCount = (node) => {
    const target = Number(node.dataset.count || 0);
    const suffix = node.dataset.suffix || '';
    if (reduceMotion) {
      node.textContent = `${target.toLocaleString()}${suffix}`;
      return;
    }
    const startTime = performance.now();
    const duration = 1150;
    const step = (time) => {
      const progressValue = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 4);
      node.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
      if (progressValue < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.7 });
    countNodes.forEach((node) => countObserver.observe(node));
  } else {
    countNodes.forEach(animateCount);
  }

  /* Pointer details: cursor, magnetic controls and depth */
  if (finePointer && !reduceMotion) {
    const cursorDot = doc.querySelector('.cursor-dot');
    const cursorRing = doc.querySelector('.cursor-ring');
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      body.classList.add('cursor-active');
      if (cursorDot) cursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    const renderCursor = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      if (cursorRing) cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      window.requestAnimationFrame(renderCursor);
    };
    renderCursor();

    doc.querySelectorAll('a, button, [data-tilt]').forEach((element) => {
      element.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
      element.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
    });

    doc.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate3d(${x * 0.13}px, ${y * 0.13}px, 0)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });

    doc.querySelectorAll('[data-tilt]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--tilt-x', `${(-y * 1.2).toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${(x * 1.5).toFixed(2)}deg`);
        element.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
      element.addEventListener('pointerleave', () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });

    const parallaxRoot = doc.querySelector('[data-parallax-root]');
    parallaxRoot?.addEventListener('pointermove', (event) => {
      const rect = parallaxRoot.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      parallaxRoot.querySelectorAll('[data-depth]').forEach((node) => {
        const depth = Number(node.dataset.depth || 10);
        node.style.setProperty('--parallax-x', `${x * depth}px`);
        node.style.setProperty('--parallax-y', `${y * depth}px`);
      });
    });
    parallaxRoot?.addEventListener('pointerleave', () => {
      parallaxRoot.querySelectorAll('[data-depth]').forEach((node) => {
        node.style.setProperty('--parallax-x', '0px');
        node.style.setProperty('--parallax-y', '0px');
      });
    });

    doc.querySelectorAll('.project-row').forEach((row) => {
      const preview = row.querySelector('.project-preview');
      if (!preview) return;
      row.addEventListener('pointermove', (event) => {
        const previewWidth = 210;
        const x = Math.min(event.clientX + 24, window.innerWidth - previewWidth - 18);
        const y = Math.min(event.clientY - 115, window.innerHeight - 265);
        preview.style.transform = `translate3d(${Math.max(18, x)}px, ${Math.max(18, y)}px, 0) rotate(2deg)`;
      });
    });
  } else {
    body.classList.add('no-custom-cursor');
  }

  /* Ambient constellation */
  const canvas = doc.getElementById('constellation');
  const context = canvas?.getContext('2d');
  if (canvas && context && !reduceMotion) {
    let width = 0;
    let height = 0;
    let points = [];
    const pointer = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(62, Math.max(28, Math.floor(width / 25)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.2 + 0.35
      }));
    };

    window.addEventListener('pointermove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -10) point.x = width + 10;
        if (point.x > width + 10) point.x = -10;
        if (point.y < -10) point.y = height + 10;
        if (point.y > height + 10) point.y = -10;

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(118, 255, 211, 0.28)';
        context.fill();

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 105) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(89, 243, 197, ${(1 - distance / 105) * 0.1})`;
            context.stroke();
          }
        }

        const pointerDistance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        if (pointerDistance < 150) {
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(pointer.x, pointer.y);
          context.strokeStyle = `rgba(108, 226, 255, ${(1 - pointerDistance / 150) * 0.22})`;
          context.stroke();
        }
      });
      window.requestAnimationFrame(draw);
    };
    draw();
  }
})();

(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const finishLoading = () => window.setTimeout(() => body.classList.add('is-loaded'), reduceMotion ? 0 : 180);
  if (doc.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
  window.setTimeout(finishLoading, 1800);

  const getLanguage = () => root.dataset.language === 'en' ? 'en' : 'zh';
  const languageButton = doc.querySelector('.language-toggle');
  const getInitialLanguage = () => {
    const query = new URLSearchParams(window.location.search).get('lang');
    if (query === 'en' || query === 'zh') return query;
    try {
      const saved = window.localStorage.getItem('cw-language-2026');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (_) {}
    return 'zh';
  };

  const toggleText = () => {
    const lang = getLanguage();
    doc.querySelectorAll('.venture-record').forEach((record) => {
      const span = record.querySelector('.inline-toggle span');
      if (!span) return;
      span.textContent = record.classList.contains('is-open')
        ? (lang === 'zh' ? '收起详情' : 'Close case')
        : (lang === 'zh' ? '展开详情' : 'Open case');
    });
    doc.querySelectorAll('.project-record').forEach((record) => {
      const span = record.querySelector('.project-toggle span');
      if (!span) return;
      span.textContent = record.classList.contains('is-open')
        ? (lang === 'zh' ? '收起项目详情' : 'Close project details')
        : (lang === 'zh' ? '展开项目详情' : 'Open project details');
    });
  };

  const setLanguage = (language, updateUrl = true) => {
    const lang = language === 'en' ? 'en' : 'zh';
    root.dataset.language = lang;
    root.lang = lang === 'en' ? 'en' : 'zh-CN';
    doc.querySelectorAll('[data-zh][data-en]').forEach((node) => {
      node.innerHTML = node.dataset[lang];
    });
    if (languageButton) {
      languageButton.textContent = lang === 'zh' ? 'EN' : '中文';
      languageButton.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    }
    doc.title = lang === 'zh'
      ? '王城昊 Chenghao Wang — AI Product Builder'
      : 'Chenghao Wang — AI Product Builder';
    const description = doc.querySelector('meta[name="description"]');
    description?.setAttribute('content', lang === 'zh'
      ? '王城昊 Chenghao Wang：AI 产品经理、连续创业者与跨学科产品创造者。'
      : 'Chenghao Wang: AI product manager, entrepreneur and interdisciplinary builder.');
    try { window.localStorage.setItem('cw-language-2026', lang); } catch (_) {}
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
    toggleText();
    renderCapability(doc.querySelector('.cap-node.active')?.dataset.cap || 'ai');
  };

  languageButton?.addEventListener('click', () => setLanguage(getLanguage() === 'zh' ? 'en' : 'zh'));

  const menuButton = doc.querySelector('.menu-toggle');
  const mobileMenu = doc.querySelector('.mobile-menu');
  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const header = doc.querySelector('.site-header');
  const progress = doc.querySelector('.scroll-progress i');
  let scrollTicking = false;
  const updateScroll = () => {
    const y = window.scrollY;
    const range = Math.max(doc.documentElement.scrollHeight - window.innerHeight, 1);
    header?.classList.toggle('is-scrolled', y > 20);
    if (progress) progress.style.transform = `scaleY(${Math.min(y / range, 1)})`;
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScroll();

  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach((item) => item.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8%', threshold: .06 });
    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 65}ms`);
      revealObserver.observe(item);
    });
  }

  const desktopLinks = [...doc.querySelectorAll('.desktop-nav a')];
  const mainSections = [...doc.querySelectorAll('main > section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        desktopLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-30% 0px -62%', threshold: 0 });
    mainSections.forEach((section) => sectionObserver.observe(section));
  }

  doc.querySelectorAll('.journey-summary').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.journey-card');
      const willOpen = !card.classList.contains('is-open');
      doc.querySelectorAll('.journey-card').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.journey-summary')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        card.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  doc.querySelectorAll('.inline-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const record = button.closest('.venture-record');
      const open = !record.classList.contains('is-open');
      record.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      toggleText();
    });
  });

  doc.querySelectorAll('.project-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const record = button.closest('.project-record');
      const open = !record.classList.contains('is-open');
      record.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      toggleText();
    });
  });

  const projectLinks = [...doc.querySelectorAll('.project-rail a')];
  const projectRecords = [...doc.querySelectorAll('.project-record')];
  if ('IntersectionObserver' in window) {
    const projectObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      projectLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${active.target.id}`));
    }, { rootMargin: '-18% 0px -58%', threshold: [0, .1, .35] });
    projectRecords.forEach((record) => projectObserver.observe(record));
  }

  const capabilities = {
    ai: {
      index: '01 / 06',
      zh: { title: 'AI 产品系统', body: '从客户访谈与问题拆解开始，定义 Agent / Skill 项目，用评测与 bad case 治理闭环，再推进到真实业务消费。', proof: 'Alibaba Accio Work · AI 英语内容引擎 · SkinPilot' },
      en: { title: 'AI Product Systems', body: 'Start with customer interviews and problem decomposition, define Agent and Skill initiatives, close the loop through evaluation and bad-case governance, then drive real adoption.', proof: 'Alibaba Accio Work · AI English Studio · SkinPilot' },
      tags: ['NEED DISCOVERY', 'AGENT / SKILL PRD', 'EVALUATION', 'BAD-CASE GOVERNANCE', 'ADOPTION']
    },
    data: {
      index: '02 / 06',
      zh: { title: '应用 AI 与数据', body: '把大模型、数据管线与业务规则组合成可重复运行的工作流，并用测试集、场景评测和指标判断它是否真的有效。', proof: 'LLM 应用 · Python 自动化 · 数据分析 · 模型评测' },
      en: { title: 'Applied AI & Data', body: 'Combine language models, data pipelines and business rules into repeatable workflows, then judge effectiveness through test sets, scenario evaluation and metrics.', proof: 'LLM apps · Python automation · Data analysis · Model evaluation' },
      tags: ['LLM APPLICATION', 'PYTHON', 'DATA PIPELINE', 'TEST CASES', 'METRICS']
    },
    robotics: {
      index: '03 / 06',
      zh: { title: '机器人与硬件', body: '从传感器标定、嵌入式系统到 ROS 2 感知与坐标转换，能把算法放进真实物理环境，并处理误差、延迟与故障。', proof: 'TangWen · ROS 2 Delivery · X-WBT · GottaGo' },
      en: { title: 'Robotics & Hardware', body: 'From sensor calibration and embedded systems to ROS 2 perception and coordinate transformation, I bring algorithms into physical environments and work through error, latency and failure.', proof: 'TangWen · ROS 2 Delivery · X-WBT · GottaGo' },
      tags: ['ROS 2', 'YOLOV8', 'SENSORS', 'EMBEDDED', '3D PRINT']
    },
    prototype: {
      index: '04 / 06',
      zh: { title: '原型与交互', body: '用交互原型快速验证假设：从 React / TypeScript 到对话 UX、实体交互、激光切割与 3D 打印，在正确的保真度上回答问题。', proof: 'Visual Diary · Frame Flow · SkinPilot · GottaGo' },
      en: { title: 'Prototype & Interaction', body: 'Validate assumptions through the right fidelity—from React and TypeScript to conversational UX, physical interaction, laser cutting and 3D printing.', proof: 'Visual Diary · Frame Flow · SkinPilot · GottaGo' },
      tags: ['REACT / TS', 'UX FLOW', 'CONVERSATIONAL UX', 'PHYSICAL PROTOTYPE', 'USABILITY']
    },
    venture: {
      index: '05 / 06',
      zh: { title: '0→1 创业推进', body: '在没有标准答案时定义定位、MVP 与路线图，协调团队、供应链和合作方，并用路演、融资、营收与用户反馈推进验证。', proof: '汤问 $300K 融资 · K老师 10W+ 营收 · HerOS' },
      en: { title: '0→1 Venture Building', body: 'Define positioning, MVP and roadmap without a preset answer; align teams, supply chain and partners; validate through pitching, funding, revenue and user feedback.', proof: 'TangWen $300K seed · K Teacher 100K+ revenue · HerOS' },
      tags: ['POSITIONING', 'MVP', 'ROADMAP', 'FUNDRAISING', 'COMMERCIAL VALIDATION']
    },
    system: {
      index: '06 / 06',
      zh: { title: '空间与系统设计', body: '建筑学训练让我从关系、尺度与结构理解复杂系统；再用研究、可视化与叙事，把多方约束组织为清晰可行动的整体。', proof: 'Hyper Student City · Monolith · Bubble-Verse' },
      en: { title: 'Spatial & System Design', body: 'Architecture trained me to read complex systems through relationships, scale and structure, then organize constraints into a clear, actionable whole through research, visualization and narrative.', proof: 'Hyper Student City · Monolith · Bubble-Verse' },
      tags: ['SYSTEM THINKING', 'SPATIAL DESIGN', 'RESEARCH', 'VISUAL STORYTELLING', 'FUTURES']
    }
  };

  function renderCapability(key) {
    const data = capabilities[key] || capabilities.ai;
    const lang = getLanguage();
    const readout = doc.querySelector('.capability-readout');
    if (!readout) return;
    const topIndex = readout.querySelector('.readout-top i');
    const title = readout.querySelector('h3');
    const bodyText = readout.querySelector(':scope > p');
    const tags = readout.querySelector('.readout-tags');
    const proof = readout.querySelector('.readout-proof p');
    if (topIndex) topIndex.textContent = data.index;
    if (title) title.textContent = data[lang].title;
    if (bodyText) bodyText.textContent = data[lang].body;
    if (tags) tags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
    if (proof) proof.textContent = data[lang].proof;
  }

  doc.querySelectorAll('.cap-node').forEach((button) => {
    const activate = () => {
      doc.querySelectorAll('.cap-node').forEach((node) => node.classList.toggle('active', node === button));
      renderCapability(button.dataset.cap);
    };
    button.addEventListener('click', activate);
    if (finePointer) button.addEventListener('pointerenter', activate);
  });

  const copyButton = doc.querySelector('.copy-contact');
  copyButton?.addEventListener('click', async () => {
    const value = copyButton.dataset.copy || '';
    try { await navigator.clipboard.writeText(value); }
    catch (_) {
      const input = doc.createElement('textarea');
      input.value = value;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      body.appendChild(input);
      input.select();
      doc.execCommand('copy');
      input.remove();
    }
    const indicator = copyButton.querySelector('i');
    if (!indicator) return;
    indicator.textContent = getLanguage() === 'zh' ? '已复制' : 'COPIED';
    window.setTimeout(() => { indicator.textContent = getLanguage() === 'zh' ? '复制' : 'COPY'; }, 1500);
  });

  if (finePointer && !reduceMotion) {
    const dot = doc.querySelector('.cursor-dot');
    const ring = doc.querySelector('.cursor-ring');
    let px = window.innerWidth / 2, py = window.innerHeight / 2, rx = px, ry = py;
    window.addEventListener('pointermove', (event) => {
      px = event.clientX; py = event.clientY;
      body.classList.add('cursor-active');
      if (dot) dot.style.transform = `translate3d(${px}px,${py}px,0) translate(-50%,-50%)`;
    }, { passive: true });
    const animateCursor = () => {
      rx += (px - rx) * .15; ry += (py - ry) * .15;
      if (ring) ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      window.requestAnimationFrame(animateCursor);
    };
    animateCursor();
    doc.querySelectorAll('a, button').forEach((node) => {
      node.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
      node.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
    });
    doc.querySelectorAll('.magnetic').forEach((node) => {
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        node.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) * .1}px,${(event.clientY - rect.top - rect.height / 2) * .1}px,0)`;
      });
      node.addEventListener('pointerleave', () => { node.style.transform = ''; });
    });
    const parallaxRoot = doc.querySelector('[data-parallax-root]');
    parallaxRoot?.addEventListener('pointermove', (event) => {
      const rect = parallaxRoot.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      parallaxRoot.querySelectorAll('[data-depth]').forEach((node) => {
        const depth = Number(node.dataset.depth || 10);
        node.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });
    parallaxRoot?.addEventListener('pointerleave', () => parallaxRoot.querySelectorAll('[data-depth]').forEach((node) => { node.style.translate = ''; }));
  }

  const canvas = doc.querySelector('.capability-canvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1, animationFrame = 0;
    const points = Array.from({ length: 54 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00018, vy: (Math.random() - .5) * .00018, r: Math.random() * 1.6 + .4 }));
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point) => {
        point.x += point.vx; point.y += point.vy;
        if (point.x < 0 || point.x > 1) point.vx *= -1;
        if (point.y < 0 || point.y > 1) point.vy *= -1;
      });
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const dx = (a.x - b.x) * width, dy = (a.y - b.y) * height;
          const distance = Math.hypot(dx, dy);
          if (distance > 130) continue;
          context.strokeStyle = `rgba(200,255,36,${(1 - distance / 130) * .14})`;
          context.lineWidth = .7;
          context.beginPath(); context.moveTo(a.x * width, a.y * height); context.lineTo(b.x * width, b.y * height); context.stroke();
        }
        context.fillStyle = i % 5 === 0 ? 'rgba(200,255,36,.72)' : 'rgba(255,255,255,.36)';
        context.beginPath(); context.arc(a.x * width, a.y * height, a.r, 0, Math.PI * 2); context.fill();
      }
      if (!reduceMotion) animationFrame = window.requestAnimationFrame(draw);
    };
    resizeCanvas(); draw();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pagehide', () => window.cancelAnimationFrame(animationFrame), { once: true });
  }

  setLanguage(getInitialLanguage(), false);
  toggleText();
})();

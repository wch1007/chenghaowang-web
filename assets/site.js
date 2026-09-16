(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('js');
  const motionButton = doc.querySelector('.motion-toggle');
  let paused = reduced.matches;
  const motionAllowed = () => !paused && !reduced.matches;
  function setMotion(value) {
    paused = value;
    body.classList.toggle('motion-paused', value);
    motionButton.setAttribute('aria-pressed', String(value));
    motionButton.textContent = value ? '▷' : 'Ⅱ';
    motionButton.setAttribute('aria-label', value ? '播放动态效果 / Play motion' : '暂停动态效果 / Pause motion');
  }
  setMotion(paused);
  motionButton.addEventListener('click', () => setMotion(!paused));
  reduced.addEventListener('change', () => setMotion(reduced.matches));

  const languageButton = doc.querySelector('.language-toggle');
  const lang = () => root.dataset.language === 'en' ? 'en' : 'zh';
  function translateControls() {
    doc.querySelectorAll('.inline-toggle, .project-toggle').forEach(button => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.querySelector('span').textContent = lang() === 'zh'
        ? (open ? '收起详情' : '展开详情')
        : (open ? 'Close details' : 'Explore details');
    });
  }
  function setLanguage(value, updateUrl = true) {
    root.dataset.language = value;
    root.lang = value === 'en' ? 'en' : 'zh-CN';
    doc.title = value === 'en' ? 'Chenghao Wang — AI Product Builder' : '王城昊 Chenghao Wang — AI Product Builder';
    doc.querySelectorAll('[data-zh][data-en]').forEach(node => { node.innerHTML = node.dataset[value]; });
    languageButton.textContent = value === 'en' ? '中文' : 'EN';
    languageButton.setAttribute('aria-label', value === 'en' ? '切换中文' : 'Switch to English');
    try { localStorage.setItem('cw-language-2026', value); } catch (_) {}
    if (updateUrl) {
      const url = new URL(location.href);
      if (value === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
    translateControls();
    renderSkill(selectedSkill, false);
  }
  languageButton.addEventListener('click', () => setLanguage(lang() === 'en' ? 'zh' : 'en'));

  const menuButton = doc.querySelector('.menu-toggle');
  const menu = doc.querySelector('.mobile-menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
  }
  setMenu(false);
  menuButton.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  doc.addEventListener('keydown', event => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuButton.focus(); }
    if (event.key === 'Tab' && body.classList.contains('menu-open')) {
      const focusable = [menuButton, ...menu.querySelectorAll('a')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  const header = doc.querySelector('.site-header');
  const progress = doc.querySelector('.scroll-progress i');
  let framePending = false;
  function updateScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 15);
    progress.style.transform = 'scaleY(' + Math.min(window.scrollY / Math.max(root.scrollHeight - innerHeight, 1), 1) + ')';
    framePending = false;
  }
  window.addEventListener('scroll', () => {
    if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();
  const revealTargets = doc.querySelectorAll('.reveal, .honor-row');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .09, rootMargin: '0px 0px -35px' });
    revealTargets.forEach(node => observer.observe(node));
  } else revealTargets.forEach(node => node.classList.add('is-visible'));
  if ('IntersectionObserver' in window) {
    const navLinks = [...doc.querySelectorAll('.desktop-nav a')];
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
      });
    }, { rootMargin: '-20% 0px -65%', threshold: 0 });
    doc.querySelectorAll('main > section[id]').forEach(section => navObserver.observe(section));
  }

  const journeyCards = [...doc.querySelectorAll('.journey-card')];
  journeyCards.forEach((card, i) => {
    const button = card.querySelector('.journey-summary');
    const panel = card.querySelector('.journey-detail');
    const open = i === 0;
    card.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    panel.inert = !open;
    button.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      journeyCards.forEach(other => {
        const active = other === card && willOpen;
        other.classList.toggle('is-open', active);
        other.querySelector('.journey-summary').setAttribute('aria-expanded', String(active));
        other.querySelector('.journey-detail').inert = !active;
      });
      // Keep the selected chapter below the header when an earlier one collapses.
      if (willOpen) {
        setTimeout(() => {
          const top = button.getBoundingClientRect().top;
          if (top < 90) window.scrollBy({ top: top - 100, behavior: motionAllowed() ? 'smooth' : 'instant' });
        }, motionAllowed() ? 670 : 0);
      }
    });
  });
  doc.querySelectorAll('.venture-record').forEach((record, i) => {
    const button = record.querySelector('.inline-toggle');
    const panel = record.querySelector('.venture-detail');
    panel.id = 'venture-details-' + i;
    panel.inert = !record.classList.contains('is-open');
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-expanded', String(!panel.inert));
    button.addEventListener('click', () => {
      const open = !record.classList.contains('is-open');
      record.classList.toggle('is-open', open);
      panel.inert = !open;
      button.setAttribute('aria-expanded', String(open));
      translateControls();
    });
  });

  // A single local case-study stage, controlled by a continuous, snapping dial.
  const projects = [...doc.querySelectorAll('.project-record')];
  const dial = doc.querySelector('.project-dial');
  const dialButtons = [...doc.querySelectorAll('.dial-item')];
  const rotor = doc.querySelector('.dial-rotor');
  const count = projects.length;
  let selected = 0, rotation = 0, suppressClickUntil = 0;
  const announcement = doc.createElement('span');
  announcement.className = 'sr-only';
  announcement.setAttribute('aria-live', 'polite');
  doc.querySelector('.project-rail').append(announcement);
  function selectProject(index, options = {}) {
    const next = ((index % count) + count) % count;
    const old = selected;
    const desired = -next * 45;
    if (options.rotation !== undefined) rotation = options.rotation;
    rotation = desired + Math.round((rotation - desired) / 360) * 360;
    dial.style.setProperty('--rotation', rotation + 'deg');
    selected = next;
    projects.forEach((record, i) => {
      record.hidden = i !== selected;
      record.classList.toggle('is-selected', i === selected);
      if (i !== old || selected !== old) {
        record.classList.remove('is-open');
        record.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
        record.querySelector('.project-detail').inert = true;
      }
      dialButtons[i].classList.toggle('active', i === selected);
      dialButtons[i].setAttribute('aria-pressed', String(i === selected));
    });
    doc.querySelector('.project-counter').textContent = String(selected + 1).padStart(2, '0') + ' / 08';
    announcement.textContent = projects[selected].querySelector('h3').textContent;
    if (motionAllowed() && old !== selected) projects[selected].animate(
      [{ opacity: 0, transform: 'translateY(15px)' }, { opacity: 1, transform: 'none' }],
      { duration: 420, easing: 'cubic-bezier(.22,.75,.18,1)' }
    );
    translateControls();
  }
  dialButtons.forEach((button, index) => button.addEventListener('click', () => {
    if (performance.now() < suppressClickUntil) return;
    selectProject(index);
  }));
  doc.querySelector('.project-prev').addEventListener('click', () => selectProject(selected - 1));
  doc.querySelector('.project-next').addEventListener('click', () => selectProject(selected + 1));
  dial.addEventListener('keydown', event => {
    if (['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key)) {
      event.preventDefault();
      selectProject(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 :
        selected + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1));
    }
  });
  let wheelAmount = 0, lastWheel = 0;
  dial.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    event.preventDefault();
    if (performance.now() - lastWheel < 250) return;
    wheelAmount += event.deltaY || event.deltaX;
    if (Math.abs(wheelAmount) > 28) {
      selectProject(selected + Math.sign(wheelAmount));
      wheelAmount = 0;
      lastWheel = performance.now();
    }
  }, { passive: false });
  let drag = null;
  const angleAt = event => {
    const rect = dial.getBoundingClientRect();
    const centerX = innerWidth <= 640 ? rect.left + rect.width / 2 : rect.left + 35;
    return Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - centerX) * 180 / Math.PI;
  };
  dial.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = { id: event.pointerId, angle: angleAt(event), total: 0, base: rotation, x: event.clientX, y: event.clientY, moved: false };
  });
  dial.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8) {
      drag.moved = true;
      dial.classList.add('is-dragging');
      dial.setPointerCapture(event.pointerId);
      rotor.style.transition = 'none';
    }
    if (!drag.moved) return;
    const angle = angleAt(event);
    let delta = angle - drag.angle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    drag.total += delta;
    drag.angle = angle;
    dial.style.setProperty('--rotation', (drag.base + drag.total) + 'deg');
  });
  const finishDrag = () => {
    if (!drag) return;
    const previous = drag;
    drag = null;
    dial.classList.remove('is-dragging');
    rotor.style.transition = '';
    if (previous.moved) {
      suppressClickUntil = performance.now() + 150;
      const turned = previous.base + previous.total;
      selectProject(Math.round(-turned / 45), { rotation: turned });
    }
  };
  dial.addEventListener('pointerup', finishDrag);
  dial.addEventListener('pointercancel', finishDrag);
  window.addEventListener('pointerup', finishDrag);

  projects.forEach(record => {
    const button = record.querySelector('.project-toggle');
    const panel = record.querySelector('.project-detail');
    button.addEventListener('click', () => {
      const pageY = innerWidth > 640
        ? doc.querySelector('#projects').getBoundingClientRect().top + window.scrollY - 90
        : record.parentElement.getBoundingClientRect().top + window.scrollY - 90;
      const animated = [record.querySelector('.project-image'), record.querySelector('.project-copy')];
      animated.forEach(node => node.getAnimations().forEach(animation => animation.cancel()));
      const before = animated.map(node => node.getBoundingClientRect());
      const open = !record.classList.contains('is-open');
      record.classList.toggle('is-open', open);
      panel.inert = !open;
      panel.scrollTop = 0;
      button.setAttribute('aria-expanded', String(open));
      translateControls();
      window.scrollTo({ top: pageY, behavior: 'instant' });
      requestAnimationFrame(() => window.scrollTo({ top: pageY, behavior: 'instant' }));
      if (!motionAllowed()) return;
      animated.forEach((node, i) => {
        const after = node.getBoundingClientRect();
        const start = before[i];
        if (!after.width || !after.height) return;
        node.animate([
          { transformOrigin: 'top left', transform: 'translate(' + (start.left - after.left) + 'px,' + (start.top - after.top) + 'px) scale(' + start.width / after.width + ',' + start.height / after.height + ')' },
          { transformOrigin: 'top left', transform: 'none' }
        ], { duration: 650, easing: 'cubic-bezier(.22,.75,.18,1)' });
      });
      if (open) panel.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 550, delay: 170, fill: 'backwards' });
    });
  });
  function selectFromHash() {
    const match = projects.findIndex(record => '#' + record.id === location.hash);
    if (match >= 0) selectProject(match);
  }
  selectFromHash();
  window.addEventListener('hashchange', selectFromHash);

  const lightbox = doc.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.innerHTML = '<button type="button" aria-label="关闭大图">×</button><img alt="">';
  body.appendChild(lightbox);
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  doc.querySelectorAll('.project-gallery img').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', img.alt + '，查看大图');
    const open = () => {
      lightbox.querySelector('img').src = img.src;
      lightbox.querySelector('img').alt = img.alt;
      lightbox.showModal();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });

  const capabilities = [["design","设计与人机交互","Design & HCI","把人、场景和系统组织成可用的体验。","Turn people, context and systems into usable experiences.",["用户研究","UX Flow","Persona / IP","对话交互","可用性测试","Rhino / Revit","参数化设计"],"Visual Diary Cloud · SkinPilot · HRI 2024"],["venture","路演与创业创新","Pitching & Ventures","定义机会，协调团队，把原型推向市场。","Define opportunities, align teams and take prototypes to market.",["商业计划","产品定位","MVP 验证","投资人路演","融资对接","跨职能协作","供应链沟通"],"汤问 / TangWen · 奇绩创坛 $300K · K老师 10W+"],["ai","AI应用与产品","AI Applications & Product","把需求拆成 Agent 与 Skill，用评测推动迭代。","Translate needs into Agents and Skills, then iterate through evaluation.",["Agent / Skill","PRD","需求优先级","LLM 工作流","Bad Case 治理","功能 / 回归测试","竞品分析"],"Accio Work · K Teacher · SkinPilot"],["data","数据分析与编程","Data & Programming","从数据与模型，到可以实际运行的应用。","From data and models to working applications.",["Python","React / TypeScript","Next.js","MongoDB","统计机器学习","D3 可视化","API / JSON","数据管线"],"Visual Diary Cloud · Frame Flow · AI 英语内容引擎"],["hardware","机器人与硬件","Robotics & Hardware","在真实环境中连接感知、交互和动作。","Connect perception, interaction and action in the physical world.",["ROS 2","YOLOv8 / OpenCV","OAK-D / ArUco","ESP32 / RP2040","传感器标定","3D 打印","激光切割"],"汤问 · HerOS · ROS 2 Delivery · X-WBT"],["commerce","跨境电商B2B","Cross-border B2B Commerce","理解商家的经营问题，让 AI 能力被持续使用。","Understand merchant operations and help AI become part of daily work.",["商家访谈","国际站经营","业务痛点拆解","商业化场景","市场调研","商家消费链路","工作流提效"],"Alibaba.com · Accio Work"]];
  let selectedSkill = 'design';
  function renderSkill(key, animate = true) {
    selectedSkill = key;
    const data = capabilities.find(item => item[0] === key) || capabilities[0];
    const description = doc.querySelector('.skill-description');
    const proof = doc.querySelector('.skill-proof');
    description.textContent = lang() === 'zh' ? data[3] : data[4];
    proof.textContent = data[6];
    doc.querySelectorAll('.skill-select').forEach(button => {
      const active = button.dataset.cap === key;
      button.setAttribute('aria-pressed', String(active));
      button.closest('.skill-cluster').classList.toggle('active', active);
    });
    doc.querySelector('.skill-project-link').href = ['venture','ai','commerce'].includes(key) ? '#ventures' : '#projects';
    if (animate && motionAllowed()) description.parentElement.animate([{ opacity: .2, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 320 });
  }
  doc.querySelectorAll('.skill-select').forEach(button => button.addEventListener('click', () => renderSkill(button.dataset.cap)));

  const film = doc.querySelector('.life-film');
  doc.querySelectorAll('[data-life-direction]').forEach(button => button.addEventListener('click', () => {
    film.scrollBy({ left: Number(button.dataset.lifeDirection) * (film.querySelector('figure').offsetWidth + 24), behavior: motionAllowed() ? 'smooth' : 'instant' });
  }));
  const copyButton = doc.querySelector('.copy-contact');
  copyButton.addEventListener('click', async () => {
    const indicator = copyButton.querySelector('i');
    let success = false;
    try { await navigator.clipboard.writeText(copyButton.dataset.copy); success = true; }
    catch (_) {
      const input = doc.createElement('textarea');
      input.value = copyButton.dataset.copy;
      input.style.cssText = 'position:fixed;top:0;left:-9999px';
      body.appendChild(input);
      input.select();
      try { success = doc.execCommand('copy'); } catch (_) {}
      input.remove();
      copyButton.focus();
    }
    indicator.textContent = lang() === 'zh' ? (success ? '已复制' : '请手动复制') : (success ? 'COPIED' : 'COPY MANUALLY');
    setTimeout(() => { indicator.textContent = lang() === 'zh' ? '复制' : 'COPY'; }, 2200);
  });

  let initial = new URLSearchParams(location.search).get('lang');
  if (initial !== 'en' && initial !== 'zh') {
    try { initial = localStorage.getItem('cw-language-2026'); } catch (_) {}
  }
  setLanguage(initial === 'en' ? 'en' : 'zh', false);
})();

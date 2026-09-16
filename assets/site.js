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
    doc.title = value === 'en' ? 'Caelen · Chenghao Wang — AI Product Builder' : '王城昊 Caelen — AI Product Builder';
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
      const willOpen = true;
      journeyCards.forEach(other => {
        const active = other === card && willOpen;
        other.classList.toggle('is-open', active);
        other.querySelector('.journey-summary').setAttribute('aria-expanded', String(active));
        other.querySelector('.journey-detail').inert = !active;
      });
      panel.scrollTop = 0;
    });
  });
  const ventures = [...doc.querySelectorAll('.venture-record')];
  const ventureButtons = [...doc.querySelectorAll('[data-venture]')];
  let ventureIndex = 0;
  function selectVenture(index, animate = true) {
    const previous = ventureIndex;
    ventureIndex = ((index % ventures.length) + ventures.length) % ventures.length;
    ventures.forEach((record, i) => {
      record.hidden = i !== ventureIndex;
      record.inert = i !== ventureIndex;
      record.classList.add('is-open');
      record.querySelector('.venture-detail').inert = false;
      ventureButtons[i].setAttribute('aria-pressed', String(i === ventureIndex));
    });
    const current = ventures[ventureIndex];
    current.scrollTop = 0;
    current.querySelector('.venture-copy').scrollTop = 0;
    doc.querySelector('.venture-counter').textContent = String(ventureIndex + 1).padStart(2,'0') + ' / 05';
    if (animate && previous !== ventureIndex && motionAllowed()) {
      const direction = Math.sign(index - previous) || 1;
      current.getAnimations().forEach(a => a.cancel());
      current.animate([{ opacity:0, transform:'translateX(' + direction * 50 + 'px)' }, { opacity:1, transform:'none' }], { duration:600, easing:'cubic-bezier(.22,.75,.18,1)' });
    }
  }
  ventureButtons.forEach((button,i) => button.addEventListener('click', () => selectVenture(i)));
  doc.querySelectorAll('[data-venture-direction]').forEach(button => button.addEventListener('click', () => selectVenture(ventureIndex + Number(button.dataset.ventureDirection))));
  doc.querySelector('.venture-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    selectVenture(event.key === 'Home' ? 0 : event.key === 'End' ? ventures.length - 1 : ventureIndex + (event.key === 'ArrowRight' ? 1 : -1));
    ventureButtons[ventureIndex].focus();
  });
  let ventureTouch = null;
  const ventureList = doc.querySelector('.venture-list');
  ventureList.addEventListener('touchstart', e => { const t=e.touches[0]; ventureTouch={x:t.clientX,y:t.clientY}; }, {passive:true});
  ventureList.addEventListener('touchend', e => {
    if (!ventureTouch) return;
    const t=e.changedTouches[0], dx=t.clientX-ventureTouch.x, dy=t.clientY-ventureTouch.y;
    if (Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5) selectVenture(ventureIndex + (dx<0 ? 1 : -1));
    ventureTouch=null;
  }, {passive:true});
  selectVenture(0, false);

  // A single local case-study stage, controlled by a continuous, snapping dial.
  const projects = [...doc.querySelectorAll('.project-record')];
  const dial = doc.querySelector('.project-dial');
  const dialButtons = [...doc.querySelectorAll('.dial-item')];
  const rotor = doc.querySelector('.dial-rotor');
  const count = projects.length;
  const step = 360 / count;
  let selected = 0, rotation = 0, suppressClickUntil = 0;
  const announcement = doc.createElement('span');
  announcement.className = 'sr-only';
  announcement.setAttribute('aria-live', 'polite');
  doc.querySelector('.project-rail').append(announcement);
  function selectProject(index, options = {}) {
    const next = ((index % count) + count) % count;
    const old = selected;
    const desired = -next * step;
    if (options.rotation !== undefined) rotation = options.rotation;
    rotation = desired + Math.round((rotation - desired) / 360) * 360;
    dial.style.setProperty('--rotation', rotation + 'deg');
    selected = next;
    projects.forEach((record, i) => {
      record.hidden = i !== selected;
      record.classList.toggle('is-selected', i === selected);
      if (i !== selected) record.querySelectorAll('video').forEach(video => { if (!video.paused) video.pause(); });
      if (i !== old || selected !== old) {
        record.classList.remove('is-open');
        record.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
        record.querySelector('.project-detail').inert = true;
      }
      dialButtons[i].classList.toggle('active', i === selected);
      dialButtons[i].setAttribute('aria-pressed', String(i === selected));
    });
    doc.querySelector('.project-counter').textContent = String(selected + 1).padStart(2, '0') + ' / ' + String(count).padStart(2, '0');
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
      dialButtons[selected].focus();
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
    const centerX = innerWidth <= 760 ? rect.left + rect.width / 2 : rect.left + 35;
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
      selectProject(Math.round(-turned / step), { rotation: turned });
    }
  };
  dial.addEventListener('pointerup', finishDrag);
  dial.addEventListener('pointercancel', finishDrag);
  window.addEventListener('pointerup', finishDrag);

  projects.forEach(record => {
    const button = record.querySelector('.project-toggle');
    const panel = record.querySelector('.project-detail');
    button.addEventListener('click', () => {
      const pageY = window.scrollY;
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

  // Endless, readable carousels. No wheel interception: honors never trap page scrolling.
  const honorWindow = doc.querySelector('.honor-window');
  const honorBelt = doc.querySelector('.honor-belt');
  const honorList = doc.querySelector('.honors-list');
  const honorClone = honorList.cloneNode(true);
  honorClone.setAttribute('aria-hidden','true');
  honorClone.dataset.loopClone = 'true';
  honorBelt.append(honorClone);
  const film = doc.querySelector('.life-film');
  const originalFrames = [...film.children];
  originalFrames.forEach(frame => {
    const clone=frame.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    clone.dataset.loopClone='true';
    film.append(clone);
  });
  let honorOffset=0, lifeOffset=0, honorPeriod=1, lifePeriod=1;
  const loopState = { honor:{visible:false,hover:false,focus:false,paused:false}, life:{visible:false,hover:false,focus:false,paused:false} };
  function measureLoops() {
    honorPeriod = Math.max(1, honorList.getBoundingClientRect().height);
    lifePeriod = Math.max(1, film.children[originalFrames.length].offsetLeft - film.children[0].offsetLeft);
  }
  const modulo=(n,d)=>((n%d)+d)%d;
  function renderHonor() { honorOffset=modulo(honorOffset,honorPeriod); honorBelt.style.transform='translateY(-'+honorOffset+'px)'; }
  function renderLife() { lifeOffset=modulo(lifeOffset,lifePeriod); film.scrollLeft=lifeOffset; }
  const loopObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    loopState[entry.target===honorWindow?'honor':'life'].visible=entry.isIntersecting;
  }), {threshold:.01});
  [[honorWindow,'honor'],[film,'life']].forEach(([element,key]) => {
    loopObserver.observe(element);
    element.addEventListener('mouseenter',()=>{loopState[key].hover=true;});
    element.addEventListener('mouseleave',()=>{loopState[key].hover=false;});
    element.addEventListener('focusin',()=>{loopState[key].focus=true;});
    element.addEventListener('focusout',event=>{if(!element.contains(event.relatedTarget))loopState[key].focus=false;});
  });
  let lifeManualUntil=0;
  const manualLife=()=>{ lifeManualUntil=performance.now()+4000; };
  ['wheel','touchstart','pointerdown','keydown'].forEach(type=>film.addEventListener(type,manualLife,{passive:true}));
  film.addEventListener('scroll',()=>{
    if(performance.now()<lifeManualUntil) lifeOffset=film.scrollLeft;
  },{passive:true});
  function pauseLoop(key,button) {
    loopState[key].paused=!loopState[key].paused;
    button.setAttribute('aria-pressed',String(loopState[key].paused));
    button.textContent=loopState[key].paused?'▷':'Ⅱ';
    button.setAttribute('aria-label',loopState[key].paused?'继续轮播 / Resume carousel':'暂停轮播 / Pause carousel');
  }
  const honorPause=doc.querySelector('.honor-pause'), lifePause=doc.querySelector('.life-pause');
  honorPause.addEventListener('click',()=>pauseLoop('honor',honorPause));
  lifePause.addEventListener('click',()=>pauseLoop('life',lifePause));
  function stepHonor(direction) {
    loopState.honor.paused=true;
    honorPause.setAttribute('aria-pressed','true'); honorPause.textContent='▷';
    honorPause.setAttribute('aria-label','继续轮播 / Resume carousel');
    const rowHeight=honorList.firstElementChild.getBoundingClientRect().height;
    honorOffset+=direction*rowHeight; renderHonor();
  }
  doc.querySelectorAll('[data-honor-direction]').forEach(button=>button.addEventListener('click',()=>stepHonor(Number(button.dataset.honorDirection))));
  honorWindow.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp') {event.preventDefault();stepHonor(event.key==='ArrowDown'?1:-1);}
    if(event.key==='Home') {event.preventDefault();honorOffset=0;renderHonor();}
  });
  doc.querySelectorAll('[data-life-direction]').forEach(button=>button.addEventListener('click',()=>{
    lifeManualUntil=0;
    lifeOffset=film.scrollLeft+Number(button.dataset.lifeDirection)*(originalFrames[0].offsetWidth+24);
    renderLife();
  }));
  new ResizeObserver(measureLoops).observe(honorList);
  new ResizeObserver(measureLoops).observe(film);
  measureLoops();
  let loopTime=0;
  function animateLoops(now) {
    const elapsed=Math.min(now-loopTime,40); loopTime=now;
    if(motionAllowed()&&!doc.hidden) {
      const canPlay=state=>state.visible&&!state.hover&&!state.focus&&!state.paused;
      if(canPlay(loopState.honor)) {honorOffset+=elapsed*.021;renderHonor();}
      if(canPlay(loopState.life)&&now>=lifeManualUntil) {lifeOffset+=elapsed*.032;renderLife();}
    }
    requestAnimationFrame(animateLoops);
  }
  requestAnimationFrame(animateLoops);
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

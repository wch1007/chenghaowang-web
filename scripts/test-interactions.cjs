/* Run after installing jsdom into tmp/qa (test-only; no site dependency). */
const assert = require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {JSDOM}=require('../tmp/qa/node_modules/jsdom');
const path=require('node:path');
const base=path.resolve(__dirname,'..');
const html=readFileSync(path.join(base,'index.html'),'utf8');
const js=readFileSync(path.join(base,'assets/site.js'),'utf8');
function fixture(reduced=false) {
  const dom=new JSDOM(html,{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;
  w.matchMedia=()=>({matches:reduced,addEventListener(){}});
  w.IntersectionObserver=class {constructor(cb){this.cb=cb;}observe(el){this.cb([{target:el,isIntersecting:true}]);}unobserve(){}};
  w.ResizeObserver=class {constructor(cb){this.cb=cb;}observe(){this.cb();}};
  w.requestAnimationFrame=()=>0;
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.getAnimations=()=>[];
  w.HTMLElement.prototype.animate=()=>({cancel(){}});
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  w.eval(js);
  return dom;
}
for(const reduced of [false,true]) {
  const dom=fixture(reduced),w=dom.window,d=w.document;
  const q=s=>d.querySelector(s),qa=s=>[...d.querySelectorAll(s)];
  const click=s=>q(s).click();
  const key=(selector,value)=>q(selector).dispatchEvent(new w.KeyboardEvent('keydown',{key:value,bubbles:true,cancelable:true}));
  assert.equal(qa('.journey-card.is-open').length,1);
  assert(q('.journey-now').classList.contains('is-open'));
  click('.journey-card:nth-child(4) .journey-summary');
  assert.equal(qa('.journey-card.is-open').length,1);
  assert.equal(q('#journey-detail-3').inert,false);
  assert.equal(q('#journey-detail-0').inert,true);
  click('.journey-card:nth-child(4) .journey-summary');
  assert.equal(qa('.journey-card.is-open').length,1,'One journey always stays open');
  for(let i=0;i<5;i++) {
    click(`[data-venture="${i}"]`);
    assert.equal(qa('.venture-record').filter(x=>!x.hidden).length,1);
    assert.equal(qa('.venture-record')[i].hidden,false);
    assert.equal(qa('.venture-record')[i].querySelector('.venture-detail').inert,false);
  }
  click('[data-venture-direction="1"]');
  assert.equal(q('.venture-counter').textContent,'01 / 05');
  key('.venture-tabs','ArrowLeft');
  assert.equal(q('.venture-counter').textContent,'05 / 05');
  assert.equal(d.activeElement.dataset.venture,'4');
  for(let i=0;i<9;i++) {
    qa('.dial-item')[i].click();
    const record=qa('.project-record')[i];
    assert.equal(qa('.project-record').filter(x=>!x.hidden).length,1);
    record.querySelector('.project-toggle').click();
    assert(record.classList.contains('is-open'));
    assert.equal(record.querySelector('.project-detail').inert,false);
    record.querySelector('.project-toggle').click();
    assert(!record.classList.contains('is-open'));
  }
  click('.project-next');
  assert.equal(q('.project-counter').textContent,'01 / 09');
  for(const b of qa('.skill-select')){b.click();assert.equal(b.getAttribute('aria-pressed'),'true');}
  assert.equal(qa('.honors-list').length,2);
  assert.equal(qa('.honors-list')[1].getAttribute('aria-hidden'),'true');
  assert.equal(qa('.life-frame').length,38);
  assert.equal(qa('.life-frame[data-loop-clone]').length,19);
  click('[data-honor-direction="1"]');
  assert.equal(q('.honor-pause').getAttribute('aria-pressed'),'true');
  click('.honor-pause');
  assert.equal(q('.honor-pause').getAttribute('aria-pressed'),'false');
  click('.life-pause');
  assert.equal(q('.life-pause').getAttribute('aria-pressed'),'true');
  click('.language-toggle');
  assert.equal(d.documentElement.lang,'en');
  assert(q('.about-intro').textContent.includes('Caelen'));
  click('.language-toggle');
  assert.equal(d.documentElement.lang,'zh-CN');
  click('.menu-toggle');assert.equal(q('.mobile-menu').inert,false);
  key('body','Escape');assert.equal(q('.mobile-menu').inert,true);
  assert.equal(q('.motion-toggle').getAttribute('aria-pressed'),String(reduced));
  dom.window.close();
}
console.log('PASS: journey, 5-case carousel, wraparound and keyboard, 9 project disclosures, capability selection, loop clones, pause, languages, mobile menu, reduced motion.');

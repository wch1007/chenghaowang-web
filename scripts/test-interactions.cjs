/* Run after installing jsdom into tmp/qa (test-only; no site dependency). */
const assert = require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {JSDOM}=require('../tmp/qa/node_modules/jsdom');
const path=require('node:path');
const base=path.resolve(__dirname,'..');
const html=readFileSync(path.join(base,'index.html'),'utf8');
const js=readFileSync(path.join(base,'assets/site.js'),'utf8');
function fixture(reduced=false, animate=false) {
  const dom=new JSDOM(html,{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;
  w.matchMedia=()=>({matches:reduced,addEventListener(){}});
  w.IntersectionObserver=class {constructor(cb){this.cb=cb;}observe(el){this.cb([{target:el,isIntersecting:true}]);}unobserve(){}};
  w.ResizeObserver=class {constructor(cb){this.cb=cb;}observe(){this.cb();}};
  const frames=[];
  w.requestAnimationFrame=callback=>{if(animate)frames.push(callback);return frames.length;};
  w.tick=time=>{const callbacks=frames.splice(0);callbacks.forEach(callback=>callback(time));};
  w.HTMLElement.prototype.getBoundingClientRect=function(){return {top:100,left:0,width:100,height:this.classList.contains('honors-list') ? 2200 : 100};};
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
  assert.equal(qa('.journey-card.is-open').length,0,'Restored accordion supports closing the selected entry');
  for(let i=0;i<6;i++) {
    click(`[data-venture="${i}"]`);
    assert.equal(qa('.venture-record').filter(x=>!x.hidden).length,1);
    assert.equal(qa('.venture-record')[i].hidden,false);
    assert.equal(qa('.venture-record')[i].querySelector('.venture-detail').inert,false);
  }
  click('[data-venture-direction="1"]');
  assert.equal(q('.venture-counter').textContent,'01 / 06');
  key('.venture-tabs','ArrowLeft');
  assert.equal(q('.venture-counter').textContent,'06 / 06');
  assert.equal(d.activeElement.dataset.venture,'5');
  const player=q('#venture-pyroscope video');
  let videoPaused=false;
  Object.defineProperty(player,'paused',{get:()=>false});
  player.pause=()=>{videoPaused=true;};
  click('[data-venture="0"]');
  assert(videoPaused,'Switching projects stops the previous demo');
  click('[data-venture="2"]');
  key('.english-list','Enter');
  assert(q('.image-lightbox').open,'English product directory opens with keyboard');
  assert(q('.image-lightbox img').src.endsWith('/assets/images/english-list.webp'));
  click('.image-lightbox button');
  assert(!q('.image-lightbox').open);
  click('[data-venture="0"]');
  for(let i=0;i<11;i++) {
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
  assert.equal(q('.project-counter').textContent,'01 / 11');
  for(const b of qa('.skill-select')){b.click();assert.equal(b.getAttribute('aria-pressed'),'true');}
  assert.equal(qa('.honors-list').length,2);
  assert.equal(qa('.honors-list')[1].getAttribute('aria-hidden'),'true');
  assert.equal(qa('.life-frame').length,40);
  assert.equal(qa('.life-frame[data-loop-clone]').length,20);
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
// Measure the carousel's real frame integration: slow start, 63px/s cruise,
// explicit pause, wraparound, and no autoplay under a reduced-motion preference.
for(const reduced of [false,true]) {
  const dom=fixture(reduced,true), w=dom.window, d=w.document;
  const belt=d.querySelector('.honor-belt');
  const offset=()=>Number(belt.style.transform.match(/translateY\(-([\d.]+)px\)/)?.[1] || 0);
  let time=0;
  const advance=milliseconds=>{for(let i=0;i<milliseconds/40;i++){time+=40;w.tick(time);}};
  advance(240);
  assert(offset()<2,'Initial carousel speed ramps up gently');
  advance(3760);
  const before=offset();advance(1000);
  assert(Math.abs(offset()-before-(reduced ? 0 : 63))<.001,'Cruise speed is three times the former 21px/s');
  d.querySelector('.honor-pause').click();
  const pausedOffset=offset();advance(1000);
  assert.equal(offset(),pausedOffset,'Paused carousel stays in place');
  d.querySelector('.honor-pause').click();advance(48000);
  assert(offset()>=0&&offset()<2200,'Long playback wraps within a single content period');
  dom.window.close();
}
console.log('PASS: restored accordion, 6-case carousel, wraparound and keyboard, 11 project disclosures, capability selection, loop clones, pause, languages, mobile menu, reduced motion.');

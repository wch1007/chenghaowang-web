import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'assets/styles.css'), 'utf8');
const section = id => html.match(new RegExp(`<section\\b[^>]*id="${id}"[\\s\\S]*?<\\/section>`))?.[0] || '';
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate element IDs');
for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Missing target: ${value}`);
  else if (!/^(https?:|mailto:|data:)/.test(value)) {
    assert(existsSync(resolve(root, value.split('?')[0])), `Missing local asset: ${value}`);
  }
}
const projects = section('projects');
assert.equal((projects.match(/class="project-record/g) || []).length, 9);
assert.equal((projects.match(/class="dial-item/g) || []).length, 18); // button and inner label
assert.equal((projects.match(/class="project-record[^>]* hidden/g) || []).length, 8);
assert.equal((projects.match(/class="project-gallery"/g) || []).length, 9);
assert(!projects.includes('href="https://flowus.cn'), 'Case studies must stay local');
const journey = section('journey');
const chronological = ['NOW', '2023—2026', '2019—2023', '2013—2019'].map(year => journey.indexOf(year));
assert(chronological.every((value, i) => value >= 0 && (!i || value > chronological[i - 1])));
assert(journey.includes('journey-now reveal is-open'));
assert.equal((section('ventures').match(/class="venture-record/g) || []).length, 5);
assert(!section('ventures').includes('inline-toggle'), 'Practice details are always open');
assert(section('ventures').includes('HerOS（SkinPilot）'));
assert(section('ventures').includes('高原智卫'));
assert.equal((section('honors').match(/class="honor-row"/g) || []).length, 22);
assert(section('honors').includes('HRI 2026'));
assert(section('honors').includes('1:30:31'));
assert(section('honors').includes('<time>2019</time><h3 data-zh="北京八中'));
assert(!section('contact').includes('about-timeline'), 'About should map experiences to capabilities');
assert(section('contact').includes('linkedin.com/in/chenghao-wang-caelen/'));
assert(!html.includes('Caelan') && !html.includes('CAELAN'));
assert.equal((section('contact').match(/class="life-frame"/g) || []).length, 19);
for (const id of ['journey','ventures','projects','capabilities','honors']) {
  assert(section(id).split('>')[0].includes('chapter'));
}
assert(!section('honors').includes('<h2'), 'Honors have no oversized headline');
for (const title of ['设计与人机交互','路演与创业创新','AI应用与产品','数据分析与编程','机器人与硬件','跨境电商B2B']) {
  assert(section('capabilities').includes(title));
}
const ticker = [...html.matchAll(/<div class="marquee-group"[^>]*>([\s\S]*?)<\/div>/g)];
assert.equal(ticker.length, 2);
assert.equal(ticker[0][1], ticker[1][1], 'Infinite ticker halves must match exactly');
assert(section('contact').includes('Think as a poet.'));
assert(section('contact').includes('18501284401'));
assert(css.includes('--bg:#050807') && css.includes('--mint:#59f3c5'), 'Preserve the Accio palette');
assert(css.includes('prefers-reduced-motion'));
console.log('PASS: assets, anchors, five full-screen chapters, 9 local projects and galleries, 5 ventures, 22 honors, 19 life photos, contact and Accio palette.');

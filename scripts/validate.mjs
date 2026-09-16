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
assert.equal((projects.match(/class="project-record/g) || []).length, 11);
assert.equal((projects.match(/class="dial-item/g) || []).length, 22); // button and inner label
assert.equal((projects.match(/class="project-record[^>]* hidden/g) || []).length, 10);
assert.equal((projects.match(/class="project-gallery"/g) || []).length, 11);
assert(!projects.includes('href="https://flowus.cn'), 'Case studies must stay local');
const journey = section('journey');
const chronological = ['NOW', '2023—2026', '2019—2023', '2013—2019'].map(year => journey.indexOf(year));
assert(chronological.every((value, i) => value >= 0 && (!i || value > chronological[i - 1])));
assert(journey.includes('journey-now reveal is-open'));
assert.equal((section('ventures').match(/class="venture-record/g) || []).length, 6);
assert(!section('ventures').includes('inline-toggle'), 'Practice details are always open');
assert(section('ventures').includes('HerOS（SkinPilot）'));
assert(section('ventures').includes('高原智卫'));
assert(section('ventures').includes('Pyroscope'));
for (const evidence of ['2026年7月—至今','12.5%','40 个百分点','317 个 MCP','200+ OpenAPI','Accio for U Skill','全量 100% 开放']) {
  assert(section('ventures').includes(evidence), `Missing Accio Work evidence: ${evidence}`);
}
assert(section('ventures').includes('assets/images/english-list.webp'));
assert(html.includes('汤问致新') && html.includes('TechWend'));
assert(!html.includes('TangWen'));
assert(projects.includes('从多元探索中一路走来'));
assert(projects.includes('HOW MASTER') && projects.includes('Foodio'));
for (const url of ['https://github.com/wch1007/Ros-Perception','https://happier-let-913626.framer.app/','https://mp.weixin.qq.com/s/szKht0ga1rDsQSkKegMVPQ','https://github.com/wch1007/TECHIN-516']) {
  assert(projects.includes(url), `Missing project evidence: ${url}`);
}
assert.equal((section('honors').match(/class="honor-row"/g) || []).length, 22);
assert(section('honors').includes('HRI 2026'));
assert(section('honors').includes('1:30:31'));
assert(section('honors').includes('<time>2019</time><h3 data-zh="北京八中'));
assert(!section('contact').includes('about-timeline'), 'About should map experiences to capabilities');
assert(section('contact').includes('linkedin.com/in/chenghao-wang-caelen/'));
assert(!html.includes('Caelan') && !html.includes('CAELAN'));
assert.equal((section('contact').match(/class="life-frame"/g) || []).length, 20);
assert(section('contact').includes('海南骑行 · 1000km / 10天'));
assert(section('contact').includes('如果你和你的团队正在做 AI 产品、智能硬件、跨境电商或一件尚未被定义的事，欢迎来聊。'));
for (const id of ['ventures','projects','capabilities','honors']) {
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
console.log('PASS: assets, anchors, restored journey, 11 local projects, 6 detailed ventures, Accio metrics, TechWend naming, project links, 22 honors, 20 life photos, contact and Accio palette.');

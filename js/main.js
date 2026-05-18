'use strict';
// Dharma Studio — shared SVG components + site utilities

const NS = 'http://www.w3.org/2000/svg';
const TAU = Math.PI * 2;

function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}
function svgEl(vb, w, h, extra = {}) {
  return el('svg', { viewBox: vb, width: w, height: h, fill: 'none', ...extra });
}

// ── SVG Components ────────────────────────────────────────────────────────────

function skullFrontal(size = 200, color = '#e8e3d8', stroke = 1.2) {
  const s = svgEl('0 0 200 240', size, size * 1.2, {
    stroke: color, 'stroke-width': stroke, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
  });
  const a = (t, at) => el(t, at, s);
  a('path', { d: 'M100 12 C58 12 28 44 28 92 C28 118 38 138 50 152 L52 178 C52 188 60 196 70 196 L82 196 L82 214 L92 214 L92 200 L108 200 L108 214 L118 214 L118 196 L130 196 C140 196 148 188 148 178 L150 152 C162 138 172 118 172 92 C172 44 142 12 100 12 Z' });
  a('ellipse', { cx: 68, cy: 108, rx: 20, ry: 24, fill: color });
  a('ellipse', { cx: 132, cy: 108, rx: 20, ry: 24, fill: color });
  a('path', { d: 'M100 130 L92 158 L100 166 L108 158 Z', fill: color });
  [[80,196],[90,200],[100,200],[110,200],[120,196]].forEach(([x,y2]) => a('line', { x1:x, y1:178, x2:x, y2 }));
  a('path', { d: 'M40 132 C32 138 30 148 36 156' });
  a('path', { d: 'M160 132 C168 138 170 148 164 156' });
  a('path', { d: 'M60 36 Q80 30 100 32 Q120 30 140 36', opacity: 0.6 });
  a('circle', { cx: 100, cy: 72, r: 10, opacity: 0.7 });
  a('line', { x1:100, y1:62, x2:100, y2:82, opacity: 0.7 });
  a('line', { x1:90,  y1:72, x2:110, y2:72, opacity: 0.7 });
  a('line', { x1:93,  y1:65, x2:107, y2:79, opacity: 0.7 });
  a('line', { x1:107, y1:65, x2:93,  y2:79, opacity: 0.7 });
  return s;
}

function skullGlyph(size = 28, color = '#7a1018') {
  const s = svgEl('0 0 40 48', size, size * 1.2, { fill: color });
  el('path', { d: 'M20 2 C10 2 4 10 4 22 C4 28 6 32 9 35 L9 40 C9 42 11 44 13 44 L15 44 L15 47 L18 47 L18 44 L22 44 L22 47 L25 47 L25 44 L27 44 C29 44 31 42 31 40 L31 35 C34 32 36 28 36 22 C36 10 30 2 20 2 Z M13 22 A4 5 0 0 1 19 22 A4 5 0 0 1 13 22 M21 22 A4 5 0 0 1 27 22 A4 5 0 0 1 21 22 M20 28 L17 36 L20 38 L23 36 Z' }, s);
  return s;
}

function dharmaWheel(size = 22, color = '#e8e3d8', stroke = 1.2) {
  const s = svgEl('0 0 100 100', size, size, { stroke: color, 'stroke-width': stroke });
  const a = (t, at) => el(t, at, s);
  a('circle', { cx:50, cy:50, r:46 });
  a('circle', { cx:50, cy:50, r:34 });
  a('circle', { cx:50, cy:50, r:8  });
  for (let i = 0; i < 8; i++) {
    const ang = (i/8)*TAU;
    a('line', { x1:50+Math.cos(ang)*8,  y1:50+Math.sin(ang)*8,
                x2:50+Math.cos(ang)*34, y2:50+Math.sin(ang)*34 });
  }
  for (let i = 0; i < 8; i++) {
    const ang = (i/8)*TAU + Math.PI/8;
    a('line', { x1:50+Math.cos(ang)*34, y1:50+Math.sin(ang)*34,
                x2:50+Math.cos(ang)*46, y2:50+Math.sin(ang)*46, opacity:0.5 });
  }
  return s;
}

function flowerOfLife(size = 520, color = '#7a1018', stroke = 0.4, opacity = 0.18) {
  const s = svgEl('0 0 200 200', size, size, { stroke:color, 'stroke-width':stroke, style:`opacity:${opacity}` });
  const r = 22, cx = 100, cy = 100;
  const seeds = [
    [0,0],[r*2,0],[-r*2,0],[r,r*1.732],[-r,r*1.732],[r,-r*1.732],[-r,-r*1.732],
    [r*3,r*1.732],[-r*3,r*1.732],[r*3,-r*1.732],[-r*3,-r*1.732],
    [0,r*3.464],[0,-r*3.464],[r*2,r*3.464],[-r*2,r*3.464],[r*2,-r*3.464],[-r*2,-r*3.464],[r*4,0],[-r*4,0],
  ];
  el('circle', { cx, cy, r:r*4+4 }, s);
  seeds.forEach(([dx,dy]) => el('circle', { cx:cx+dx, cy:cy+dy, r }, s));
  return s;
}

function mandala(size = 180, color = '#e8e3d8', stroke = 0.4, opacity = 0.4) {
  const s = svgEl('0 0 300 300', size, size, { stroke:color, 'stroke-width':stroke, style:`opacity:${opacity}` });
  const cx = 150, cy = 150;
  [40,70,100,130].forEach(r => el('circle', { cx, cy, r }, s));
  for (let i = 0; i < 16; i++) {
    const a = (i/16)*TAU;
    el('line', { x1:cx, y1:cy, x2:cx+Math.cos(a)*140, y2:cy+Math.sin(a)*140 }, s);
  }
  for (let i = 0; i < 8; i++) {
    const a = (i/8)*TAU, x = cx+Math.cos(a)*70, y = cy+Math.sin(a)*70;
    const e = el('ellipse', { cx:x, cy:y, rx:14, ry:36 }, s);
    e.setAttribute('transform', `rotate(${(i/8)*360+90} ${x} ${y})`);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i/16)*TAU+Math.PI/16, x = cx+Math.cos(a)*115, y = cy+Math.sin(a)*115;
    const e = el('ellipse', { cx:x, cy:y, rx:6, ry:18 }, s);
    e.setAttribute('transform', `rotate(${(i/16)*360+90+11.25} ${x} ${y})`);
  }
  return s;
}

function eyeOfDharma(size = 140, color = '#e8e3d8', stroke = 1, opacity = 0.4) {
  const s = svgEl('0 0 120 120', size, size, { stroke:color, 'stroke-width':stroke, style:`opacity:${opacity}` });
  const a = (t, at) => el(t, at, s);
  a('path', { d:'M60 8 L114 100 L6 100 Z' });
  a('path', { d:'M22 80 Q60 50 98 80 Q60 110 22 80 Z', 'stroke-width':stroke*0.8 });
  a('circle', { cx:60, cy:80, r:9 });
  a('circle', { cx:60, cy:80, r:3.5, fill:color });
  a('line', { x1:60, y1:100, x2:60, y2:116, 'stroke-width':stroke*0.5 });
  return s;
}

function serpent(w = 180, h = 60, color = '#e8e3d8', stroke = 1, opacity = 0.4) {
  const s = svgEl('0 0 200 60', w, h, { stroke:color, 'stroke-width':stroke, 'stroke-linecap':'round', style:`opacity:${opacity}` });
  const a = (t, at) => el(t, at, s);
  a('path', { d:'M4 30 Q 30 4, 56 30 T 108 30 T 160 30 Q 178 30 184 22 Q 192 14 188 6' });
  a('path', { d:'M188 6 L184 10 M188 6 L192 10', 'stroke-width':stroke*0.7 });
  ['M14 30 Q20 25 26 30','M40 30 Q46 35 52 30','M66 30 Q72 25 78 30',
   'M92 30 Q98 35 104 30','M118 30 Q124 25 130 30','M144 30 Q150 35 156 30']
    .forEach(d => a('path', { d, opacity:0.5 }));
  return s;
}

function skullAnatomical(size = 280, color = '#7a1018', glow = '#a8252e', opacity = 0.85) {
  const s = svgEl('0 0 300 360', size, size*1.2, { style:`opacity:${opacity}` });
  const defs = el('defs', {}, s);
  const rg = el('radialGradient', { id:'skGA', cx:'50%', cy:'40%', r:'60%' }, defs);
  el('stop', { offset:'0%',   'stop-color':glow,  'stop-opacity':0.4 }, rg);
  el('stop', { offset:'100%', 'stop-color':glow,  'stop-opacity':0   }, rg);
  const lg = el('linearGradient', { id:'bGA', x1:0, y1:0, x2:0, y2:1 }, defs);
  el('stop', { offset:0, 'stop-color':color, 'stop-opacity':0.95 }, lg);
  el('stop', { offset:1, 'stop-color':color, 'stop-opacity':0.5  }, lg);
  const a = (t, at) => el(t, at, s);
  a('circle', { cx:150, cy:160, r:170, fill:'url(#skGA)' });
  const g = el('g', { stroke:color, 'stroke-width':0.5, opacity:0.35, fill:'none' }, s);
  [150,130,110].forEach(r => el('circle', { cx:150, cy:160, r }, g));
  for (let i = 0; i < 24; i++) {
    const ang = (i/24)*TAU;
    el('line', { x1:150, y1:160, x2:150+Math.cos(ang)*160, y2:160+Math.sin(ang)*160 }, g);
  }
  a('path', {
    d:'M150 28 C100 28 68 60 64 110 C62 138 70 158 80 172 L82 210 C82 224 92 234 106 234 L114 234 L114 256 L128 256 L128 240 L148 240 L148 256 L160 256 L160 240 L176 240 L176 256 L190 256 L190 234 L196 234 C210 234 220 224 220 210 L222 172 C232 158 240 138 238 110 C234 60 200 28 150 28 Z',
    fill:'url(#bGA)', stroke:color, 'stroke-width':1.4,
  });
  a('ellipse', { cx:112, cy:132, rx:22, ry:28, fill:'#0a0508' });
  a('ellipse', { cx:186, cy:132, rx:22, ry:28, fill:'#0a0508' });
  a('circle',  { cx:112, cy:132, r:4,  fill:glow, opacity:0.9 });
  a('circle',  { cx:186, cy:132, r:4,  fill:glow, opacity:0.9 });
  a('path',    { d:'M138 88 Q150 76 162 88 Q150 100 138 88 Z', fill:glow, opacity:0.8 });
  a('circle',  { cx:150, cy:88, r:3, fill:'#fff' });
  a('path',    { d:'M150 158 L140 190 L150 200 L160 190 Z', fill:'#0a0508' });
  const tg = el('g', { stroke:color, 'stroke-width':1, fill:'#0a0508' }, s);
  [[118,22],[130,24],[142,24],[154,24],[166,24],[178,22]].forEach(([x,h]) =>
    el('rect', { x, y:210, width:10, height:h }, tg));
  a('path', { d:'M80 60 Q120 40 150 48 Q180 40 220 60', stroke:color, 'stroke-width':0.7, opacity:0.6 });
  a('path', { d:'M150 28 L150 78', stroke:color, 'stroke-width':0.7, opacity:0.6 });
  return s;
}

// ── Cursor ────────────────────────────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  let mx = -100, my = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
  document.querySelectorAll('a, button, .gallery-cell, .service-row').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  (function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 5 * 80) + 'ms';
    io.observe(el);
  });
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn    = document.getElementById('menu-btn');
  const drawer = document.getElementById('mobile-menu');
  if (!btn || !drawer) return;
  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.classList.toggle('active', open);
  });
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      btn.classList.remove('active');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      drawer.classList.remove('open');
      btn.classList.remove('active');
    }
  });
}

// ── Exports ───────────────────────────────────────────────────────────────────
window.DS = {
  skullFrontal, skullGlyph, dharmaWheel,
  flowerOfLife, mandala, eyeOfDharma, serpent, skullAnatomical,
  initCursor, initReveal, initMobileMenu,
};

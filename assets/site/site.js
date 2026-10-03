/* INFINIT© — site behaviour.
   Production port of the design handoff (shared.js, kit.js, kit2.js + page scripts).
   Content is server-rendered; this file only adds motion and interaction.
   Timings and easings are identical to the prototype. */
(() => {
'use strict';
const d = document, de = d.documentElement, body = d.body;
const T = window.T || {};
const lang = de.lang || 'en', page = de.dataset.page; // home | studio | work
const mq = q => matchMedia(q).matches;
const RM = mq('(prefers-reduced-motion: reduce)');
const coarse = mq('(pointer: coarse)');
const fine = mq('(hover: hover) and (pointer: fine)');
const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const escH = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = { get: (s, k) => { try { return s.getItem(k); } catch (_) { return null; } }, set: (s, k, v) => { try { s.setItem(k, v); } catch (_) {} } };

/* ---------- one scroll handler per frame ---------- */
const onScroll = [];
let sRaf = 0;
const flush = () => { sRaf = 0; for (const f of onScroll) f(); };
addEventListener('scroll', () => { if (!sRaf) sRaf = requestAnimationFrame(flush); }, { passive: true });
let lastW = innerWidth;
addEventListener('resize', () => { flush(); });

/* ---------- wordmark: INFINIT© letter by letter, canvas-measured (Geist 900) ---------- */
const HUES = [165, 255, 285, 30, 88], GAP = .035;
let cvx;
function wm(el, size) {
  cvx = cvx || d.createElement('canvas').getContext('2d');
  cvx.font = `900 ${size}px Geist`;
  el.textContent = ''; el.style.fontSize = size + 'px';
  [...'INFINIT'].forEach((ch, i) => {
    const m = cvx.measureText(ch), s = d.createElement('span');
    s.textContent = ch; s.style.display = 'inline-block';
    s.style.width = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) + 'px';
    s.style.textIndent = m.actualBoundingBoxLeft + 'px';
    s.style.marginLeft = i ? GAP * size + 'px' : '0';
    el.appendChild(s);
  });
  const r = d.createElement('span'); r.className = 'r'; r.textContent = '©'; r.style.fontSize = (size > 80 ? .2 : .42) + 'em';
  el.appendChild(r);
}
function mount() {
  $$('[data-wm]').forEach(el => {
    const v = el.dataset.wm;
    if (v === 'fit') {
      wm(el, 100);
      const p = el.parentElement, cs = getComputedStyle(p);
      const W = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      // Canvas metrics are pixel-rounded at small sizes, so the first estimate runs ~3% wide:
      // a second pass at the real size corrects it.
      if (el.offsetWidth) { const s = 100 * W / el.offsetWidth; wm(el, s); if (el.offsetWidth) wm(el, s * W / el.offsetWidth * .998); }
    } else wm(el, +v);
  });
}

/* ---------- Barcelona clock ---------- */
function clock() {
  const t = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid' }) + ' BCN';
  $$('[data-clock]').forEach(e => e.textContent = t);
}

/* ---------- roll hover: label duplicated, rolls up on hover (copy hidden from AT) ---------- */
function roll(root = d) {
  $$('.roll:not([data-r])', root).forEach(el => {
    el.dataset.r = 1;
    const t = escH(el.textContent);
    el.innerHTML = `<span class="rw"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
  });
}

/* ---------- magnetic ---------- */
function mag() {
  if (!fine || RM) return;
  $$('.mag').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });
}

/* ---------- custom cursor (desktop only) ---------- */
function cursor() {
  if (!fine || RM) return;
  const c = d.createElement('div'); c.className = 'cur'; c.setAttribute('aria-hidden', 'true'); c.innerHTML = '<span></span>'; body.appendChild(c);
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    const t = e.target.closest && e.target.closest('[data-cur]');
    c.classList.toggle('big', !!t); if (t) c.firstChild.textContent = t.dataset.cur;
  });
  (function f() { x = lerp(x, tx, .2); y = lerp(y, ty, .2); c.style.transform = `translate3d(${x}px,${y}px,0)`; requestAnimationFrame(f); })();
}

/* ---------- ambient colour: [data-h] at screen centre (or [data-hh] under the pointer) tints the page ---------- */
function setH(h) { const r = de.style; if (h === 'n' || h == null) r.setProperty('--ac', '.002'); else { r.setProperty('--h', h); r.setProperty('--ac', '.011'); } }
function ambient() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setH(e.target.dataset.h); }), { rootMargin: '-48% 0px -48% 0px' });
  $$('[data-h]').forEach(el => io.observe(el));
  $$('[data-hh]').forEach(el => el.addEventListener('pointerenter', () => setH(el.dataset.hh)));
}

/* ---------- reveals ---------- */
function reveal() {
  if (RM) { $$('.rv').forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv:not(.in)').forEach(el => io.observe(el));
}
// Clip wipe: checked on scroll (more reliable than IntersectionObserver with clip-path).
const clipChk = () => $$('.clip:not(.in)').forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight * .92 && r.bottom > 0) el.classList.add('in'); });
function clip() { if (RM) { $$('.clip').forEach(el => el.classList.add('in')); return; } requestAnimationFrame(clipChk); setTimeout(clipChk, 400); }
onScroll.push(clipChk);

// Text that rises line by line from a mask.
let lio;
function lines() {
  if (RM) { $$('[data-lines]').forEach(el => el.classList.add('lin', 'ls')); return; }
  lio = lio || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target._in = 1; e.target.classList.add('lin'); lio.unobserve(e.target); } }), { threshold: .2 });
  $$('[data-lines]').forEach(el => {
    if (!el._src) el._src = el.innerHTML;
    el.innerHTML = el._src;
    const tk = [];
    el.childNodes.forEach(n => {
      const parts = n.textContent.split(/(\s+)/);
      parts.forEach(w => tk.push(n.nodeType === 3 ? { w } : { w, tag: n.tagName.toLowerCase(), cls: n.className || '' }));
    });
    // Each word remembers whether a space follows, so none is added before punctuation.
    const ws = [];
    tk.forEach(t => { if (/^\s+$/.test(t.w)) { if (ws.length) ws[ws.length - 1].sp = 1; } else if (t.w) ws.push(t); });
    el.innerHTML = ws.map((t, i) => (t.tag ? `<${t.tag} class="lw ${t.cls}" data-k="${i}">${escH(t.w)}</${t.tag}>` : `<span class="lw" data-k="${i}">${escH(t.w)}</span>`) + (t.sp ? ' ' : '')).join('');
    const L = []; let top = null;
    el.querySelectorAll('.lw').forEach(w => { const y = w.offsetTop; if (top === null || Math.abs(y - top) > 4) { L.push([]); top = y; } const t = ws[+w.dataset.k]; L[L.length - 1].push(w.outerHTML + (t.sp ? ' ' : '')); });
    el.innerHTML = L.map((l, i) => `<span class="lm"><span class="li" style="transition-delay:${i * .09}s">${l.join('').trim()}</span></span>`).join('');
    el.classList.add('ls');
    if (el._in) el.classList.add('lin'); else lio.observe(el);
  });
}

/* ---------- smooth wheel scroll (desktop; native scroll kept so sticky works) ---------- */
let scrollToY = y => scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
function smooth() {
  if (coarse || RM) return;
  de.classList.add('sm');
  let cur = scrollY, tgt = scrollY, raf = 0;
  const max = () => de.scrollHeight - innerHeight;
  const step = () => { cur = lerp(cur, tgt, .085); if (Math.abs(tgt - cur) < .4) cur = tgt; scrollTo(0, cur); raf = cur !== tgt ? requestAnimationFrame(step) : 0; };
  addEventListener('wheel', e => {
    if (e.ctrlKey || body.classList.contains('lock') || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    tgt = clamp(tgt + e.deltaY * (e.deltaMode === 1 ? 40 : 1), 0, max());
    if (!raf) raf = requestAnimationFrame(step);
  }, { passive: false });
  addEventListener('scroll', () => { if (Math.abs(scrollY - cur) > 3) cur = tgt = scrollY; }, { passive: true });
  scrollToY = y => { tgt = clamp(y, 0, max()); if (!raf) raf = requestAnimationFrame(step); };
}

/* ---------- in-page anchors: smooth scroll, close overlays, move focus ---------- */
function anchors() {
  d.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'), t = id === '#top' ? null : d.querySelector(id);
    if (id !== '#top' && !t) return;
    e.preventDefault();
    setMenu(false);
    const y = t ? t.getBoundingClientRect().top + scrollY : 0;
    scrollToY(y);
    const f = t || $('#top');
    if (f) { if (!f.hasAttribute('tabindex')) f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  });
}

/* ---------- toast + copy email ---------- */
function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.innerHTML = `<i aria-hidden="true"></i>${escH(msg)}`; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2200);
}
function copy() {
  d.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-copy]'); if (!b) return;
    e.preventDefault();
    const v = b.dataset.copy;
    const ok = () => { toast(T.copyToast); const m = b.querySelector('.mt'); if (m && !m._o) { m._o = m.textContent; m.textContent = T.copied; setTimeout(() => { m.textContent = m._o; m._o = null; }, 1500); } };
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(ok).catch(() => {
      const ta = d.createElement('textarea'); ta.value = v; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; body.appendChild(ta); ta.select();
      try { d.execCommand('copy'); ok(); } catch (_) { location.href = 'mailto:' + v; }
      ta.remove();
    });
  });
}

/* ---------- segmented control (indicator slides under the active item) ---------- */
function seg(el, onChange) {
  const ind = el.querySelector(':scope > i'), items = $$(':scope > button, :scope > a', el);
  const place = i => { const b = items[i]; if (!b || !b.offsetWidth) return; ind.style.left = b.offsetLeft + 'px'; ind.style.width = b.offsetWidth + 'px'; };
  const set = (i, fire = true) => {
    items.forEach((b, k) => { b.classList.toggle('on', k === i); if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', k === i); });
    place(i); if (fire && onChange) onChange(i);
  };
  const cur = () => Math.max(0, items.findIndex(b => b.classList.contains('on')));
  requestAnimationFrame(() => place(cur()));
  d.fonts && d.fonts.ready.then(() => place(cur()));
  addEventListener('resize', () => place(cur()));
  el._place = () => place(cur());
  return { items, set, cur };
}

/* ---------- language: persist the choice; the menu control animates before leaving ---------- */
function langs() {
  $$('a[data-lang]').forEach(a => a.addEventListener('click', e => {
    store.set(localStorage, 'inf-lang', a.dataset.lang);
    const s = a.closest('[data-langseg]');
    if (s && !a.classList.contains('on') && !RM) {
      e.preventDefault();
      s._seg && s._seg.set(s._seg.items.indexOf(a), false);
      setTimeout(() => { location.href = a.href; }, 350);
    }
  }));
  $$('[data-langseg]').forEach(s => { s._seg = seg(s); });
}

/* ---------- overlays: inert background + focus trap ---------- */
const focusables = root => $$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])', root).filter(el => el.offsetParent !== null || el === d.activeElement);
function trap(e, roots) {
  if (e.key !== 'Tab') return;
  const f = roots.flatMap(focusables); if (!f.length) return;
  const i = f.indexOf(d.activeElement);
  if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && (i === -1 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
}
const setInert = (els, on) => els.forEach(el => { if (el) on ? el.setAttribute('inert', '') : el.removeAttribute('inert'); });

/* ---------- dock: auto-contrast, hide at the footer, "where am I" ---------- */
let dockChk = () => {};
function dock() {
  const dk = $('.dock'); if (!dk) return;
  const ft = $('#ft');
  dockChk = () => {
    if (body.classList.contains('menu-open')) { dk.classList.add('dk'); return; }
    dk.style.visibility = 'hidden';
    const el = d.elementFromPoint(innerWidth / 2, innerHeight - 40);
    dk.style.visibility = '';
    dk.classList.toggle('dk', !!(el && el.closest('.dark')));
  };
  let ly = scrollY;
  const hid = () => {
    const y = scrollY, up = y < ly - 2, dn = y > ly + 2, nb = ft ? ft.getBoundingClientRect().top < innerHeight - 60 : false;
    if (body.classList.contains('menu-open')) dk.classList.remove('hid');
    else if (up || !nb) dk.classList.remove('hid');
    else if (dn && nb) dk.classList.add('hid');
    ly = y;
  };
  onScroll.push(dockChk, hid);
  setTimeout(dockChk, 60);
  // Scrollspy: active link follows the section crossing 45% of the viewport (Home); fixed on inner pages.
  const key = a => { const h = a.getAttribute('href') || ''; return /#work$/.test(h) ? 'work' : /#services$/.test(h) ? 'services' : /\/studio\/$/.test(h) ? 'studio' : /#contact$/.test(h) ? 'contact' : ''; };
  const pg = page === 'studio' ? 'studio' : page === 'work' ? 'work' : '';
  const links = $$('.dock .dl, .menu-l a');
  const spy = () => {
    let k = pg;
    if (!k) { const y = innerHeight * .45; for (const id of ['work', 'services', 'contact']) { const s = d.getElementById(id); if (!s) continue; const r = s.getBoundingClientRect(); if (r.top < y && r.bottom > y) k = id; } }
    links.forEach(a => a.classList.toggle('on', !!k && key(a) === k));
  };
  onScroll.push(spy); setTimeout(spy, 300);
}

/* ---------- fullscreen menu (mobile burger) ---------- */
let setMenu = () => {};
function menu() {
  const b = $('#mb'), m = $('#menu'); if (!b || !m) return;
  let back = null;
  setMenu = o => {
    if (o === body.classList.contains('menu-open')) return;
    body.classList.toggle('menu-open', o);
    body.classList.toggle('lock', o || body.classList.contains('qk-open'));
    b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? T.closeMenu : T.openMenu);
    $$('.rw>span', b).forEach(s => s.textContent = o ? T.close : T.menu);
    setInert([$('#main'), $('#ft')], o);
    $$('.dock > :not(#mb)').forEach(el => o ? el.setAttribute('tabindex', '-1') : el.removeAttribute('tabindex'));
    dockChk();
    if (o) { back = d.activeElement; requestAnimationFrame(() => { const s = m.querySelector('[data-langseg]'); s && s._place && s._place(); mount(); const f = $('.menu-l a', m); f && f.focus({ preventScroll: true }); }); }
    else if (back && m.contains(d.activeElement)) b.focus({ preventScroll: true });
  };
  b.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  addEventListener('keydown', e => {
    if (!body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') { setMenu(false); b.focus(); }
    trap(e, [b, m]);
  });
}

/* ---------- Quick look (Home) ---------- */
function quick() {
  const q = $('#qk'); if (!q) return;
  const qlb = $('#qlb'), qlm = $('#qlm');
  let back = null;
  const open = () => body.classList.contains('qk-open');
  const set = o => {
    if (o === open()) return;
    body.classList.toggle('qk-open', o); body.classList.toggle('lock', o);
    q.setAttribute('aria-hidden', !o);
    [qlb, qlm].forEach(x => x && x.setAttribute('aria-expanded', o));
    setInert([$('#main'), $('#ft'), $('.dock'), $('#menu')], o);
    if (o) { back = d.activeElement; setTimeout(() => $('.qk-x', q).focus({ preventScroll: true }), 60); }
    else if (back && back.isConnected && back.offsetParent) back.focus({ preventScroll: true });
  };
  qlb && qlb.addEventListener('click', e => { e.preventDefault(); set(true); });
  qlm && qlm.addEventListener('click', () => { setMenu(false); setTimeout(() => set(true), 350); });
  $('.qk-x', q).addEventListener('click', () => set(false));
  q.addEventListener('click', e => { if (e.target === q || e.target.classList.contains('qk-g')) set(false); });
  $$('a', q).forEach(a => a.addEventListener('click', () => { back = null; set(false); }));
  addEventListener('keydown', e => { if (!open()) return; if (e.key === 'Escape') set(false); trap(e, [q]); });
}

/* ---------- preloader (Home, first visit of the session) ---------- */
function pre(key) {
  return new Promise(res => {
    if (RM || store.get(sessionStorage, 'inf-pre-' + key)) return res();
    store.set(sessionStorage, 'inf-pre-' + key, 1);
    const p = d.createElement('div'); p.className = 'pre2'; p.setAttribute('aria-hidden', 'true');
    p.innerHTML = `<div class="pre2-m"><span class="wm" data-wm="fit"></span></div><div class="pre2-b"><span class="lbl">${escH(T.firm)} — ${escH(T.loc)}</span><span class="pre2-n">000</span></div><div class="pre2-l"><i></i></div>`;
    body.appendChild(p); body.classList.add('lock'); mount();
    const n = $('.pre2-n', p), l = $('.pre2-l i', p), t0 = performance.now(), D = 1700;
    const done = () => { if (p.classList.contains('out')) return; p.classList.add('out'); body.classList.remove('lock'); setTimeout(res, 350); setTimeout(() => p.remove(), 1300); };
    p.onclick = done;
    (function f(t) { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); n.textContent = String(Math.round(e * 100)).padStart(3, '0'); l.style.transform = `scaleX(${e})`; if (k < 1) requestAnimationFrame(f); else setTimeout(done, 250); })(t0);
  });
}

/* ---------- visibility helper (pause work off-screen) ---------- */
function whenVisible(el, cb, margin = '0px') {
  const io = new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { rootMargin: margin });
  io.observe(el); return io;
}

/* ---------- marquees + footer rainbow line ---------- */
function marquees() {
  $$('.mq, .xp-r').forEach(m => whenVisible(m, v => m.classList.toggle('off', !v)));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .5 });
  $$('.ft-hl').forEach(e => io.observe(e));
}

/* ---------- videos: load near the viewport, play on screen, pause off it, poster fallback ---------- */
function videos() {
  $$('.vd video').forEach(v => {
    const fallback = () => { if (v._sw) return; v._sw = 1; const i = d.createElement('img'); i.src = v.poster; i.alt = v.getAttribute('aria-label') || ''; v.replaceWith(i); };
    v.addEventListener('error', fallback);
    whenVisible(v, vis => {
      if (v._sw) return;
      if (vis && !v.src) {
        v.src = v.dataset.src;
        v.addEventListener('error', fallback, { once: true });
        setTimeout(() => { if (!v._sw && v.readyState < 2) fallback(); }, 6000);
      }
      if (RM) return;
      if (vis) { const p = v.play(); p && p.catch(() => {}); } else v.pause();
    }, '200px');
  });
}

/* ---------- infinite drag carousel (content is tripled; the middle set is the real one) ---------- */
function carousel(el, { drift = -.6, skew = 8, scale = 0 } = {}) {
  const t = el.querySelector('.car-t');
  const auto = RM ? 0 : drift;
  let x = 0, v = auto, drag = false, lx = 0, moved = 0, run = false, focused = false, visible = true;
  const W = () => t.scrollWidth / 3;
  el.addEventListener('pointerdown', e => { drag = true; lx = e.clientX; moved = 0; v = 0; });
  el.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - lx; lx = e.clientX; x += dx; v = dx; moved += Math.abs(dx);
    if (moved > 6 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
    if (!run) frame();
  });
  const up = () => { drag = false; };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  // Keyboard: bring the focused card into view and hold the drift.
  el.addEventListener('focusin', e => {
    focused = true; el.scrollLeft = 0;
    const c = e.target.closest('.pj, .img'); if (!c) return;
    x -= c.getBoundingClientRect().left - el.getBoundingClientRect().left - 20; v = 0; frame();
  });
  el.addEventListener('focusout', () => { focused = false; });
  const ims = $$('.img', t);
  function frame() {
    run = true;
    if (!drag && !focused) { v = lerp(v, auto, .03); x += v; }
    const w = W();
    if (w) { if (x < -w * 2) x += w; if (x > -w) x -= w; }
    t.style.transform = `translate3d(${x}px,0,0)`;
    if (!RM && skew) { const sk = clamp(v * .4, -skew, skew); ims.forEach(i => i.style.transform = `skewX(${-sk}deg)${scale ? ` scale(${1 + Math.abs(sk) * scale})` : ''}`); }
    if (visible && el.offsetParent && (auto || drag || Math.abs(v) > .05)) requestAnimationFrame(frame); else run = false;
  }
  whenVisible(el, vis => { visible = vis; if (vis && !run) frame(); });
  requestAnimationFrame(() => { x = -W(); frame(); });
  return { kick: () => { if (!run) { x = -W(); frame(); } } };
}

/* ---------- hover gallery cycling ---------- */
function cyc(root = d) {
  if (!fine) return;
  $$('[data-cyc]', root).forEach(a => {
    let list; try { list = JSON.parse(a.dataset.cyc); } catch (_) { return; }
    const im = $('.img img', a); if (!im || list.length < 2) return;
    let t, j = 0;
    a.addEventListener('pointerenter', () => { clearInterval(t); t = setInterval(() => { im.src = list[++j % list.length]; }, 700); });
    a.addEventListener('pointerleave', () => { clearInterval(t); j = 0; im.src = list[0]; });
  });
}

/* ================= Home ================= */
function homePage() {
  // Hero: background images cross-fade (1.6s) with a slow zoom; images load one step ahead.
  const hbs = $$('#hbg .img');
  const load = i => { const im = $('img', hbs[i]); if (im && im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); } };
  let hb = 0, heroVis = true;
  if (hbs.length > 1 && !RM) {
    load(1);
    whenVisible($('.hx'), v => { heroVis = v; });
    setInterval(() => {
      if (!heroVis || d.hidden) return;
      hbs[hb % hbs.length].classList.remove('on');
      hb++; hbs[hb % hbs.length].classList.add('on');
      load((hb + 1) % hbs.length);
    }, 3400);
  }

  // Work: drag carousel ⇄ editorial grid.
  const wv = $('#wv'), vCar = $('.wv-car', wv), vGr = $('.wv-gr', wv);
  const car = carousel($('#car'), { drift: -.7, skew: 9, scale: .004 });
  const sg = seg($('#seg'), i => {
    wv.classList.add('sw');
    setTimeout(() => {
      vCar.hidden = i !== 0; vGr.hidden = i !== 1;
      if (i === 0) car.kick(); else clip();
      wv.classList.remove('sw');
    }, RM ? 0 : 300);
  });
  $$('#seg > button').forEach((b, i) => b.addEventListener('click', () => { if (!b.classList.contains('on')) sg.set(i); }));
  // Work-in-progress cards are not links: tapping shows their status.
  wv.addEventListener('click', e => { const s = e.target.closest('.pj.soon'); if (s) toast(s.dataset.soon); });
  cyc(wv);

  // Approach: scroll-scrubbed clip-path image transitions + three statements.
  const sec = $('.show'), sis = $$('#si .si'), sps = $$('.st p'), pgs = $$('#pg b');
  const sImgs = sis.map(s => $('img', s));
  const show = () => {
    const r = sec.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const q = clamp(-r.top / (r.height - innerHeight), 0, 1), n = sis.length, f = q * (n - 1);
    sis.forEach((s, i) => {
      const k = clamp(f - (i - 1), 0, 1);
      if (i) s.style.clipPath = `inset(${(1 - k) * 100}% 0 0 0)`;
      if (!RM && sImgs[i]) sImgs[i].style.transform = `scale(${1.18 - .18 * clamp(f - i + 1, 0, 1)})`;
    });
    const st = Math.min(2, Math.floor(q * 3));
    sps.forEach((p, i) => p.classList.toggle('on', i === st));
    pgs.forEach((b, i) => b.style.transform = `scaleX(${clamp(f - i + 1, 0, 1)})`);
  };
  onScroll.push(show); show();

  // Services: flip on hover (desktop), on tap (touch), on focus (keyboard, via CSS).
  $$('#svc .fc').forEach(c => {
    c.addEventListener('click', () => { if (coarse) c.classList.toggle('on'); });
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('on'); } });
  });

  quick();
}

/* ================= Studio ================= */
function studioPage() {
  // Manifesto: words light up as you scroll.
  const mf = $('.mf'), mw = $$('#mfp span');
  // Values: horizontal track driven by vertical scroll.
  const vh = $('#vh'), vht = $('#vht'), bs = $$('#bars b');
  const VH = $$('.vp', vht).map(v => v.dataset.hh);
  const tick = () => {
    const vH = innerHeight;
    let r = mf.getBoundingClientRect(), q = clamp(-r.top / (r.height - vH), 0, 1);
    const n = RM ? mw.length : Math.round(q * 1.15 * mw.length);
    mw.forEach((w, i) => w.classList.toggle('on', i < n));
    r = vh.getBoundingClientRect(); q = clamp(-r.top / (r.height - vH), 0, 1);
    if (r.bottom > 0 && r.top < vH) {
      vht.style.transform = `translate3d(${-q * (vht.scrollWidth - innerWidth)}px,0,0)`;
      bs.forEach((b, i) => b.style.transform = `scaleX(${clamp(q * 3 - i, 0, 1)})`);
      if (r.top < vH * .5 && r.bottom > vH * .5) setH(VH[Math.min(2, Math.floor(q * 2.999))]);
    }
  };
  onScroll.push(tick); tick();

  // Figures count up when they enter the screen.
  const comma = lang !== 'en';
  const fm = {
    eur: v => comma ? `0 € → ${v.toFixed(1).replace('.', ',')} M€` : `€0 → €${v.toFixed(1)}M`,
    pct: v => `+${Math.round(v)}%`, x: v => `×${Math.round(v)}`,
  };
  if (!RM) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, to = +el.dataset.cnt, f = fm[el.dataset.fmt], t0 = performance.now();
      (function s(t) { const k = Math.min(1, (t - t0) / 1400), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = f(v); if (k < 1) requestAnimationFrame(s); })(t0);
    }), { threshold: .6 });
    $$('[data-cnt]').forEach(el => { el.textContent = fm[el.dataset.fmt](0); io.observe(el); });
  }
}

/* ================= Cases ================= */
function casePage() {
  const art = $('#art'); if (art) carousel(art, { drift: -.6, skew: 8 });
  // Tap gallery: each click goes to the next image.
  const tap = $('#tap');
  if (tap) {
    const ims = $$('.tp', tap), n = $('[data-n]', tap); let i = 0;
    const set = k => { i = (k + ims.length) % ims.length; ims.forEach((m, j) => { m.classList.toggle('on', j === i); m.setAttribute('aria-hidden', j !== i); }); if (n) n.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(ims.length).padStart(2, '0'); };
    $('[data-prev]', tap).addEventListener('click', e => { e.stopPropagation(); set(i - 1); });
    $('[data-next]', tap).addEventListener('click', e => { e.stopPropagation(); set(i + 1); });
    tap.addEventListener('click', () => set(i + 1));
    set(0);
  }
}

/* ================= init ================= */
de.style.setProperty('--ln', 'linear-gradient(90deg,' + HUES.map(h => `oklch(.72 .05 ${h})`).join(',') + ')');
roll(); mag(); cursor(); ambient(); smooth(); anchors(); copy(); dock(); menu(); langs(); marquees(); videos();
if (page === 'home') homePage(); else if (page === 'studio') studioPage(); else if (page === 'work') casePage();
clock(); setInterval(clock, 1000);
mount();
const fontsReady = d.fonts ? d.fonts.ready : Promise.resolve();
if (d.fonts) d.fonts.load('900 100px Geist').then(mount, () => {});
fontsReady.then(mount);
addEventListener('resize', () => {
  mount();
  if (innerWidth !== lastW) { lastW = innerWidth; clearTimeout(lines._t); lines._t = setTimeout(lines, 250); }
});
(page === 'home' ? pre('home') : Promise.resolve()).then(() => fontsReady).then(() => { lines(); clip(); reveal(); });
})();

/* INFINIT© — site behaviour.
   Production port of the design handoff (shared.js, kit.js, kit2.js + page scripts).
   Content is server-rendered; this file only adds motion and interaction.
   Timings and easings are identical to the prototype. */
(() => {
'use strict';
const d = document, de = d.documentElement, body = d.body;
const T = window.T || {};
const lang = de.lang || 'en', page = de.dataset.page; // home | studio | work | sector | workidx | journal | article
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
  let raf = 0;
  const f = () => { x = lerp(x, tx, .2); y = lerp(y, ty, .2); if (Math.abs(tx - x) < .1 && Math.abs(ty - y) < .1) { x = tx; y = ty; } c.style.transform = `translate3d(${x}px,${y}px,0)`; raf = x !== tx || y !== ty ? requestAnimationFrame(f) : 0; };
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    const t = e.target.closest && e.target.closest('[data-cur]');
    c.classList.toggle('big', !!t && !t.classList.contains('cp')); if (t && c.firstChild.textContent !== t.dataset.cur) c.firstChild.textContent = t.dataset.cur;
    if (!raf) raf = requestAnimationFrame(f);
  });
  f();
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

/* ---------- desktop: native scroll (v3) with a soft stop at [data-stop] ----------
   A downward wheel gesture that would cross the section top stops there; trackpad inertia is
   swallowed until a new gesture (a pause > 220ms) or an upward scroll. Other wheel input stays native. */
let navT = 0; // last in-page jump started by the site (the touch brake leaves those alone)
let scrollToY = y => scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
function smooth() {
  const stops = $$('[data-stop]'); if (coarse || RM || !stops.length) return;
  let gate = 0, lastW = 0;
  addEventListener('wheel', e => {
    if (e.ctrlKey || body.classList.contains('lock') || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const now = performance.now(), gap = now - lastW; lastW = now;
    if (gate) { if (e.deltaY < 0 || gap > 220) gate = 0; else { e.preventDefault(); return; } }
    if (e.deltaY <= 0) return;
    const y = scrollY, dy = e.deltaY * (e.deltaMode === 1 ? 40 : 1);
    for (const st of stops) {
      const top = Math.round(st.getBoundingClientRect().top + y);
      if (y < top - 1 && y + dy >= top) { e.preventDefault(); gate = 1; navT = performance.now(); scrollToY(top); return; }
    }
  }, { passive: false });
}

/* ---------- touch: soft stop at [data-stop] ----------
   No scroll-snap (on the root it made all of iOS scrolling feel sticky). Only a flick that is coasting
   after the finger has lifted is stopped, right where the section starts; dragging with the finger
   never is, and the next swipe carries on. Momentum is cut by hiding <html> overflow for two frames. */
function brake() {
  const stops = $$('[data-stop]'); if (!coarse || RM || !stops.length) return;
  let down = 0, held = 0, armed = 0, ly = scrollY, lt = performance.now();
  addEventListener('touchstart', () => { down = 1; armed = 1; }, { passive: true });
  addEventListener('touchend', () => { down = 0; }, { passive: true });
  addEventListener('touchcancel', () => { down = 0; }, { passive: true });
  addEventListener('scroll', () => {
    const y = scrollY, t = performance.now(), v = (y - ly) / Math.max(8, t - lt); // px/ms
    if (armed && !down && !held && v > .05 && performance.now() - navT > 1500 && !body.classList.contains('lock')) {
      for (const st of stops) {
        const top = Math.round(st.getBoundingClientRect().top + y);
        if (ly < top - 1 && y + v * 20 >= top) { // crossing now or within the next frame
          held = 1; de.style.overflow = 'hidden'; scrollTo(0, top);
          requestAnimationFrame(() => requestAnimationFrame(() => { de.style.overflow = ''; held = 0; }));
          break;
        }
      }
    }
    ly = y; lt = t;
  }, { passive: true });
}

/* ---------- in-page anchors: smooth scroll, close overlays, move focus ---------- */
function anchors() {
  d.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'), t = id === '#top' ? null : d.querySelector(id);
    if (id !== '#top' && !t) return;
    e.preventDefault(); navT = performance.now();
    closeNav();
    scrollToY(t ? t.getBoundingClientRect().top + scrollY : 0);
    const f = t || $('#top');
    if (f) { if (!f.hasAttribute('tabindex')) f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  });
}

// Overlay images wait (data-src) until the overlay first opens.
const loadIn = root => root && $$('img[data-src]', root).forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); });

/* ---------- toast + copy email ---------- */
// quiet: screen readers only (the copy button already shows "Copied ✓" in place, no pop-up).
function toast(msg, quiet) {
  const t = $('#toast'); if (!t) return;
  t.innerHTML = `<i aria-hidden="true"></i>${escH(msg)}`; if (quiet) return;
  t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2200);
}
function copy() {
  d.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-copy]'); if (!b) return;
    e.preventDefault();
    const v = b.dataset.copy;
    const ok = () => {
      toast(T.copyToast, true); if (navigator.vibrate) navigator.vibrate(12);
      const m = b.querySelector('.mt'); if (!m) return;
      // First copy: split the address and "Copied ✓" into letters (staggered by --i in base.css).
      if (!b._s) {
        const sp = (s, f) => [...s].map((c, i) => `<span style="--i:${i}"${f && f(c) ? ' class="ok"' : ''}>${escH(c)}</span>`).join('');
        m.innerHTML = sp(m.textContent);
        m.insertAdjacentHTML('afterend', `<span class="mok" aria-hidden="true"><span class="mw">${sp(T.copied, c => c === '✓')}</span></span>`);
        b._s = 1;
      }
      b.classList.add('cp'); $('.cur') && $('.cur').classList.remove('big'); // the cursor bubble steps aside so "Copied ✓" shows
      clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('cp'), 1900);
    };
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
const FOC = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
const focusables = root => [root, ...$$(FOC, root)].filter(el => el.matches(FOC) && (el.offsetParent !== null || el === d.activeElement));
function trap(e, roots) {
  if (e.key !== 'Tab') return;
  const f = roots.flatMap(focusables); if (!f.length) return;
  const i = f.indexOf(d.activeElement);
  if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && (i === -1 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
}
const setInert = (els, on) => els.forEach(el => { if (el) on ? el.setAttribute('inert', '') : el.removeAttribute('inert'); });

/* Is there a dark section at viewport height y? Geometry only — the previous elementFromPoint
   approach hid/showed the dock every scroll frame, which could swallow taps on iOS. */
let darkEls = null;
const darkAt = y => (darkEls = darkEls || $$('#main .dark, #main .full, #ft')).some(el => { const r = el.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });

/* ---------- navigation (v3): © mark turning with the scroll + glass pill + menu card ----------
   Auto-contrast over dark sections, hides at the footer (any upward scroll brings it back). The menu card
   closes with the button, Esc, a click outside, any link, focus leaving it or scrolling > 90px; no scroll lock. */
let closeNav = () => {};
function nav() {
  const nv = $('#nv'); if (!nv) return;
  const btn = $('.nv-b', nv), card = $('#nvc'), mA = $('.nv-mk', nv), mk = $('svg', mA), ft = $('#ft');
  let open = false, oy = 0, ly = scrollY;
  const chk = () => { nv.classList.toggle('dk', !open && darkAt(innerHeight - 48)); };
  const hid = () => {
    const y = scrollY, nb = ft ? ft.getBoundingClientRect().top < innerHeight - 60 : false;
    if (open || y < ly - 2 || !nb) nv.classList.remove('hid'); else if (y > ly + 2) nv.classList.add('hid');
    ly = y;
  };
  // The mark: target angle = scrollY × 0.2° (+180° while the menu is open), eased each frame; upright on hover / focus.
  let rot = scrollY * .2, spin = 0, up = null, raf = 0;
  const tick = () => {
    const tg = up !== null ? up : scrollY * .2 + spin;
    rot += (tg - rot) * (up !== null ? .16 : .09);
    if (Math.abs(tg - rot) < .05) rot = tg;
    mk.style.transform = `rotate(${rot.toFixed(2)}deg)`;
    raf = rot !== tg ? requestAnimationFrame(tick) : 0;
  };
  const turn = () => { if (!RM && !raf) raf = requestAnimationFrame(tick); };
  if (!RM) {
    mk.style.transform = `rotate(${rot.toFixed(2)}deg)`;
    const st = () => { up = Math.round(rot / 360) * 360; turn(); }, go = () => { up = null; turn(); };
    mA.addEventListener('pointerenter', st); mA.addEventListener('pointerleave', go);
    mA.addEventListener('focus', st); mA.addEventListener('blur', go);
  }
  // kb: opened from the keyboard → focus the first link; by touch / mouse → focus the card itself (no ring:
  // Safari draws the keyboard focus ring on a link focused by script after a tap).
  const set = (o, kb) => {
    if (o === open) return;
    open = o; spin += o ? 180 : -180; oy = scrollY;
    nv.classList.toggle('open', o); body.classList.toggle('nv-open', o);
    btn.setAttribute('aria-expanded', o); card.inert = !o;
    chk(); hid(); turn();
    if (o) setTimeout(() => { if (!open) return; (kb ? $('a', card) : card).focus({ preventScroll: true }); }, 320);
  };
  closeNav = () => set(false);
  btn.addEventListener('click', e => set(!open, e.detail === 0));
  addEventListener('keydown', e => { if (e.key === 'Escape' && open) { set(false); btn.focus(); } });
  d.addEventListener('pointerdown', e => { if (open && !nv.contains(e.target)) set(false); });
  card.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  nv.addEventListener('focusout', e => { if (open && e.relatedTarget && !nv.contains(e.relatedTarget)) set(false); });
  onScroll.push(() => { hid(); chk(); turn(); if (open && Math.abs(scrollY - oy) > 90) set(false); });
  addEventListener('resize', chk);
  setTimeout(chk, 60); d.fonts && d.fonts.ready.then(chk);
}

/* ---------- preloader (Home, first visit of the session) ---------- */
function pre(key) {
  return new Promise(res => {
    if (RM || store.get(sessionStorage, 'inf-pre-' + key)) return res();
    store.set(sessionStorage, 'inf-pre-' + key, 1);
    const p = d.createElement('div'); p.className = 'pre2'; p.setAttribute('aria-hidden', 'true');
    p.innerHTML = `<div class="pre2-m"></div><div class="pre2-b"><span class="lbl">${escH(T.firm)} — ${escH(T.loc)}</span><span class="pre2-n">000</span></div><div class="pre2-l"><i></i></div>`;
    const w = $('.mid .wm'); if (w) $('.pre2-m', p).appendChild(w.cloneNode(true));
    body.appendChild(p); body.classList.add('lock');
    const n = $('.pre2-n', p), l = $('.pre2-l i', p), t0 = performance.now(), D = 1000;
    const done = () => { if (p.classList.contains('out')) return; p.classList.add('out'); body.classList.remove('lock'); setTimeout(res, 350); setTimeout(() => p.remove(), 1300); };
    p.onclick = done;
    (function f(t) { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); n.textContent = String(Math.round(e * 100)).padStart(3, '0'); l.style.transform = `scaleX(${e})`; if (k < 1) requestAnimationFrame(f); else setTimeout(done, 250); })(t0);
  });
}

/* ---------- inner heroes: the Ken Burns starts once the image is decoded (no stall on entering a page) ---------- */
function heroes() {
  $$('.ch-bg').forEach(b => { const i = $('img', b), ok = () => b.classList.add('ok'); if (!i) return ok(); (i.decode ? i.decode() : Promise.resolve()).then(ok, ok); setTimeout(ok, 1500); });
}

/* ---------- visibility helper (pause work off-screen) ---------- */
function whenVisible(el, cb, margin = '0px') {
  const io = new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { rootMargin: margin });
  io.observe(el); return io;
}

/* ---------- marquees + colour line draw-in ---------- */
function marquees() {
  $$('.mq, .xp-r').forEach(m => whenVisible(m, v => m.classList.toggle('off', !v)));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .5 });
  $$('.ft-hl').forEach(e => io.observe(e));
}

/* ---------- videos: load near the viewport, play on screen, pause off it, poster fallback ---------- */
function videos() {
  $$('.vd video').forEach(v => {
    const vd = v.closest('.vd');
    const fallback = () => { if (v._sw) return; v._sw = 1; const i = d.createElement('img'); i.src = v.poster || v.dataset.poster; i.alt = v.dataset.label || ''; v.replaceWith(i); vd && $$('.vd-snd, .vd-play', vd).forEach(x => x.remove()); };
    // Videos with sound: toggle button for audio; clicking the video pauses / resumes it (v._up = paused by the user).
    if (vd && vd.hasAttribute('data-sound')) {
      const snd = $('.vd-snd', vd);
      const upd = () => { vd.classList.toggle('paused', v.paused); v.setAttribute('aria-label', v.paused ? T.vPlay : T.vPause); v.dataset.cur = v.paused ? T.cPlay : T.cPause; const c = $('.cur'); if (c && v.matches(':hover')) c.firstChild.textContent = v.dataset.cur; };
      const go = () => { if (!v.src) v.src = v.dataset.src; const p = v.play(); p && p.catch(() => {}); };
      const toggle = () => { if (v.paused) { v._up = false; go(); } else { v._up = true; v.pause(); } };
      v.addEventListener('play', upd); v.addEventListener('pause', upd);
      v.addEventListener('click', toggle);
      v.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      snd.addEventListener('click', e => {
        e.stopPropagation();
        v.muted = !v.muted;
        snd.setAttribute('aria-pressed', !v.muted); snd.setAttribute('aria-label', v.muted ? T.soundOn : T.soundOff);
        if (!v.muted && v.paused) { v._up = false; go(); }
      });
    }
    v.addEventListener('error', fallback);
    if (v.dataset.poster) { const pio = whenVisible(v, vis => { if (vis) { v.poster = v.dataset.poster; pio.disconnect(); } }, '900px'); }
    whenVisible(v, vis => {
      if (v._sw) return;
      if (vis && !v.src) {
        v.src = v.dataset.src;
        v.addEventListener('error', fallback, { once: true });
        setTimeout(() => { if (!v._sw && v.readyState < 1 && (v.networkState === 3 || !(RM || v._up))) fallback(); }, 6000);
      }
      if (!vis) { v.pause(); return; }
      if (RM || v._up) { vd && vd.classList.toggle('paused', v.paused); return; }
      const p = v.play(); p && p.catch(() => {});
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
  el.addEventListener('click', e => { if (moved > 6 && e.detail) { e.preventDefault(); e.stopPropagation(); } }, true);
  // Keyboard: bring the focused card into view and hold the drift.
  el.addEventListener('focusin', e => {
    focused = true; el.scrollLeft = 0;
    const c = e.target.closest('.pj, .img'); if (!c) return;
    x -= c.getBoundingClientRect().left - el.getBoundingClientRect().left - 20; v = 0; if (!run) frame();
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

/* ---------- hover gallery: slow crossfade (1.8s per image, 1.1s fade) on two stacked layers.
   Images preload on first hover and are decoded before they show, so the page never stalls. ---------- */
function cyc(root = d) {
  if (!fine || RM) return;
  $$('[data-cyc]', root).forEach(a => {
    let list; try { list = JSON.parse(a.dataset.cyc); } catch (_) { return; }
    const base = $('.img img', a); if (!base || list.length < 2) return;
    const box = base.parentElement;
    const L = [0, 1].map(() => { const i = d.createElement('img'); i.alt = ''; i.className = 'cy-ov'; i.decoding = 'async'; box.appendChild(i); return i; });
    let t = 0, j = 0, cur = -1, z = 1, on = false, pre = null;
    const preload = () => pre || (pre = list.slice(1).map(src => { const i = new Image(); i.decoding = 'async'; i.src = src; return i.decode().catch(() => {}); }));
    const tick = async () => {
      j = (j + 1) % list.length;
      if (j === 0) { L.forEach(l => l.classList.remove('in')); cur = -1; return; }
      const n = cur === 0 ? 1 : 0, el = L[n];
      el.src = list[j];
      try { await el.decode(); } catch (_) {}
      if (!on) return;
      el.style.zIndex = ++z; el.classList.add('in');
      const o = L[1 - n]; setTimeout(() => { if (cur === n) o.classList.remove('in'); }, 1200);
      cur = n;
    };
    a.addEventListener('pointerenter', () => { on = true; preload(); clearInterval(t); t = setInterval(tick, 1800); });
    a.addEventListener('pointerleave', () => { on = false; clearInterval(t); j = 0; cur = -1; L.forEach(l => l.classList.remove('in')); });
  });
}

/* ---------- cookie consent ---------- */
// Stored as 'accepted' | 'declined'. Anything that sets cookies (e.g. analytics) must wait for
// window.INF_CONSENT === 'accepted' or listen to the 'inf:consent' event.
function cookies(delay) {
  const el = $('#ck'); if (!el) return;
  const KEY = 'ck-consent-v2';
  const saved = store.get(localStorage, KEY);
  if (saved) { window.INF_CONSENT = saved; return; }
  // Auto-contrast like the dock: dark glass over .dark sections.
  const chk = () => {
    if (el.hidden) return;
    const r = el.getBoundingClientRect();
    el.classList.toggle('dk', darkAt(r.top + r.height / 2));
  };
  onScroll.push(chk);
  setTimeout(() => { el.hidden = false; chk(); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on'))); }, delay);
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-ck]'); if (!b) return;
    const v = b.dataset.ck; store.set(localStorage, KEY, v); window.INF_CONSENT = v;
    dispatchEvent(new CustomEvent('inf:consent', { detail: v }));
    el.classList.remove('on'); setTimeout(() => { el.hidden = true; }, RM ? 0 : 600);
  });
}

/* ================= Home ================= */
function homePage() {
  // Intro: pinned while its words light up with scroll (same as the Studio manifesto).
  const ins = $('#intro'), iw = $$('#inp span');
  const itick = () => {
    const r = ins.getBoundingClientRect(), q = clamp(-r.top / (r.height - innerHeight), 0, 1);
    const n = RM ? iw.length : Math.round(q * 1.15 * iw.length);
    iw.forEach((w, i) => w.classList.toggle('on', i < n));
  };
  onScroll.push(itick); itick();

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

  // Work: drag carousel ⇄ editorial grid. The projects are in the HTML once (SEO); the editorial grid
  // (data-g = "column aspect") and the carousel's loop copies (hidden from AT, out of the tab order) are built here.
  const wv = $('#wv'), vCar = $('.wv-car', wv), vGr = $('.wv-gr', wv), ct = $('#ct'), real = $$('.pj', ct);
  real.forEach(c => {
    const g = c.cloneNode(true), [col, ar] = (c.dataset.g || '').split(' '), im = $('.img', g);
    g.style.gridColumn = col; im.classList.add('clip'); im.style.aspectRatio = ar;
    $('.gr', vGr).appendChild(g);
  });
  const loop = c => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); k.tabIndex = -1; $$('img', k).forEach(i => { i.alt = ''; }); return k; };
  ct.prepend(...real.map(loop)); ct.append(...real.map(loop));
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
    c.addEventListener('focusout', e => { if (!coarse && !c.contains(e.relatedTarget)) c.classList.remove('on'); });
  });

}

/* ================= Studio ================= */
function studioPage() {
  // Manifesto: words light up as you scroll.
  const mf = $('.mf'), mw = $$('#mfp span');
  // Values: horizontal track driven by vertical scroll.
  const vh = $('#vh'), vht = $('#vht'), bs = $$('#bars b');
  const tick = () => {
    const vH = innerHeight;
    let r = mf.getBoundingClientRect(), q = clamp(-r.top / (r.height - vH), 0, 1);
    const n = RM ? mw.length : Math.round(q * 1.15 * mw.length);
    mw.forEach((w, i) => w.classList.toggle('on', i < n));
    r = vh.getBoundingClientRect(); q = clamp(-r.top / (r.height - vH), 0, 1);
    if (r.bottom > 0 && r.top < vH) {
      vht.style.transform = `translate3d(${-q * (vht.scrollWidth - innerWidth)}px,0,0)`;
      bs.forEach((b, i) => b.style.transform = `scaleX(${clamp(q * 3 - i, 0, 1)})`);
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

/* ================= SEO pages: sector pricing, Work / Journal filters, article contents ================= */
function seoPages() {
  // Segmented control → callback with the button's data attribute; aria-pressed kept in sync by seg().
  const wire = (el, fn) => { if (!el) return; const sg = seg(el, i => fn(sg.items[i])); sg.items.forEach((b, i) => b.addEventListener('click', () => { if (!b.classList.contains('on')) sg.set(i); })); };
  // Pricing: highlight one revenue column (phones show only that one).
  const pt = $('.pt'); wire($('[data-pz]'), b => { pt.dataset.col = b.dataset.c; });
  // Work index: filter rows by service, live count.
  const wl = $('#wl'), wc = $('#wcount');
  wire($('#wfs'), b => {
    const k = b.dataset.k; let n = 0;
    $$(':scope > *', wl).forEach(r => { const on = k === 'all' || r.dataset.sv.split(' ').includes(k); r.classList.toggle('hide', !on); n += on; });
    if (wc) wc.textContent = wc.dataset.fmt.replace('#', n);
  });
  // Journal: filter by cluster.
  const jl = $('#jl'); wire($('#jf'), b => { const k = b.dataset.k; $$('li', jl).forEach(li => { li.hidden = k !== 'all' && li.dataset.c !== k; }); });
  // Article: table-of-contents scrollspy (the active item has a 2px ink border).
  const toc = $('#toc');
  if (toc) {
    const T2 = $$('a', toc), H = T2.map(a => d.getElementById(a.getAttribute('href').slice(1)));
    const spy = () => { let n = 0; H.forEach((h, i) => { if (h && h.getBoundingClientRect().top < innerHeight * .35) n = i; }); T2.forEach((a, i) => a.classList.toggle('on', i === n)); };
    onScroll.push(spy); spy();
  }
}

/* ================= init ================= */
roll(); mag(); cursor(); smooth(); brake(); anchors(); copy(); nav(); langs(); marquees(); videos(); heroes();
if (page === 'home') homePage(); else if (page === 'studio') studioPage(); else if (page === 'work') casePage(); else seoPages();
clock(); setInterval(clock, 1000);
// Line splitting needs the real font; if it is slow, split now and again once it arrives.
let fontLate = 0;
const fontsReady = d.fonts ? Promise.race([d.fonts.ready, new Promise(r => setTimeout(() => { fontLate = 1; r(); }, 1200))]) : Promise.resolve();
d.fonts && d.fonts.ready.then(() => { if (fontLate) lines(); });
addEventListener('resize', () => {
  if (innerWidth !== lastW) { lastW = innerWidth; clearTimeout(lines._t); lines._t = setTimeout(lines, 250); }
});
(page === 'home' ? pre('home') : Promise.resolve()).then(() => fontsReady).then(() => { lines(); clip(); reveal(); roll($('#ck') || d); cookies(1200); });
})();

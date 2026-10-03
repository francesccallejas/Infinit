// Case-study building blocks (template from prototype/pages/case-*.html + case.css).
import { url, esc, A, strong } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { svc, P, src } from '../data.mjs';
import { heroLine, ftLine } from '../layout.mjs';

// Case chips call the brand service "Identity" (as in the prototype).
const ID = { en: 'Identity', ca: 'Identitat', es: 'Identidad' };
export const chip = (k, lang) => `<span class="chip"><i style="background:${strong(svc(k).h)}" aria-hidden="true"></i>${esc(k === 'brand' ? ID[lang] : svc(k).n[lang])}</span>`;

export function caseHero(ctx, { img, logo, logoStyle = '', name, h1, chips }) {
  const t = T[ctx.lang];
  return `<section class="ch dark" id="top" data-h="n"><div class="ch-bg"><div class="img"><img src="${A(img)}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(ctx.lang, 'home')}#work"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.allWork)}</span></a></div>
<div class="ch-m"><img class="ch-logo" src="${A(logo)}" alt="${esc(name)}"${logoStyle}><h1 data-lines>${h1}</h1></div>
<div class="ch-b"><div class="chips">${chips}</div><a class="scd" href="#case">${esc(t.scroll)}<i></i></a></div>
${heroLine}</section>`;
}

export const meta = rows => `<section class="meta" id="case">${rows.map(([k, v]) => `<div><span class="lbl">${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</section>`;

export const about = ({ whoL, who, defL, quote }) => `<section class="blk g12 ab" data-h="n"><div class="who rv"><span class="lbl">${esc(whoL)}</span><p>${esc(who)}</p></div>
<div class="q"><span class="lbl">${esc(defL)}</span><blockquote class="em" data-lines>${quote}</blockquote></div></section>`;

// Autoplaying muted video, lazy: site.js sets src when it nears the viewport, pauses it off-screen,
// and falls back to the poster image if the video fails.
export const video = ({ file, poster, label = '', cls = '', delay = '', alt = '' }) => `<div class="vd rv${cls ? ' ' + cls : ''}"${delay ? ` style="transition-delay:${delay}"` : ''}><video data-src="${A(file)}" poster="${A(poster)}" muted loop playsinline preload="none" aria-label="${esc(alt || label)}"></video>${label ? `<span class="chip">${esc(label)}</span>` : ''}</div>`;

export function nextCase(ctx, key) {
  const t = T[ctx.lang], p = P.find(x => x.page === key);
  return `<a class="nx dark" href="${url(ctx.lang, key)}" data-cur="${esc(t.cNext)}" style="margin-top:clamp(90px,11vw,170px)">${ftLine}<div class="img"><img src="${src(p.img)}" alt="" loading="lazy"></div><span class="lbl">${esc(t.nextCase)}</span><b>${esc(p.n)}</b><span class="lbl" style="margin-top:14px;display:block">${esc(p.d[ctx.lang])} ↗</span></a>`;
}

export const swatches = (list, n) => `<div class="sw rv"${n ? ` style="--n:${n}"` : ''}>${list.map(([name, hex, fg, border]) => `<div style="background:${hex}${fg ? ';color:' + fg : ''}${border ? ';box-shadow:inset 0 0 0 1px var(--l1)' : ''}">${esc(name)}<span>${hex}</span></div>`).join('')}</div>`;

// Case-study building blocks (template from prototype/pages/case-*.html + case.css).
import { url, esc, A } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { svc, P, src } from '../data.mjs';
import { ftLine } from '../layout.mjs';

// Case chips call the brand service "Identity" (as in the prototype).
const ID = { en: 'Identity', ca: 'Identitat', es: 'Identidad' };
export const chip = (k, lang) => `<span class="chip">${esc(k === 'brand' ? ID[lang] : svc(k).n[lang])}</span>`;

export function caseHero(ctx, { img, logo, logoStyle = '', name, h1, chips, after = '' }) {
  const t = T[ctx.lang];
  return `<section class="ch dark" id="top"><div class="ch-bg"><div class="img"><img src="${A(img)}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(ctx.lang, 'workidx')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.allWork)}</span></a></div>
<div class="ch-m"><img class="ch-logo" src="${A(logo)}" alt="${esc(name)}"${logoStyle}><h1 class="hin">${h1}</h1>${after}</div>
<div class="ch-b"><div class="chips">${chips}</div><a class="scd" href="#case">${esc(t.scroll)}<i></i></a></div>
</section>`;
}

// Meta bar; a row may carry a link to its sector page: [label, value, [href, text]].
export const meta = rows => `<section class="meta" id="case">${rows.map(([k, v, l]) => `<div><span class="lbl">${esc(k)}</span><b>${esc(v)}</b>${l ? `<a class="mlk" href="${l[0]}">${esc(l[1])} ↗</a>` : ''}</div>`).join('')}</section>`;

export const about = ({ whoL, who, defL, quote }) => `<section class="blk g12 ab"><div class="who rv"><span class="lbl">${esc(whoL)}</span><p>${esc(who)}</p></div>
<div class="q"><span class="lbl">${esc(defL)}</span><blockquote class="em" data-lines>${quote}</blockquote></div></section>`;

// Autoplaying muted video, lazy: site.js sets src when it nears the viewport, pauses it off-screen,
// and falls back to the poster image if the video fails. (The poster, too, is set only as the video nears the screen.)
// `sound`: the file has an audio track → sound toggle button + click on the video pauses / resumes it.
const SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/>';
const sndBtn = lang => `<button type="button" class="vd-snd" aria-pressed="false" aria-label="${esc(T[lang].soundOn)}">${SPK}<path class="off" d="m16 9 5 6m0-6-5 6"/><path class="on" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg></button><span class="vd-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></span>`;
export const video = ({ file, poster, label = '', cls = '', delay = '', alt = '', sound = false, lang = 'en' }) => `<div class="vd rv${cls ? ' ' + cls : ''}"${sound ? ' data-sound' : ''}${delay ? ` style="transition-delay:${delay}"` : ''}><video data-src="${A(file)}" data-poster="${A(poster)}" muted loop playsinline preload="none" data-label="${esc(alt || label)}"${sound ? ` role="button" tabindex="0" aria-label="${esc(T[lang].vPause)}" data-cur="${esc(T[lang].cPause)}"` : ' aria-hidden="true"'}></video>${label ? `<span class="chip">${esc(label)}</span>` : ''}${sound ? sndBtn(lang) : ''}</div>`;

export function nextCase(ctx, key) {
  const t = T[ctx.lang], p = P.find(x => x.page === key);
  return `<a class="nx dark" href="${url(ctx.lang, key)}" data-cur="${esc(t.cNext)}" style="margin-top:clamp(90px,11vw,170px)">${ftLine}<div class="img"><img src="${src(p.img)}" alt="" loading="lazy"></div><span class="lbl">${esc(t.nextCase)}</span><b>${esc(p.n)}</b><span class="lbl" style="margin-top:14px;display:block">${esc(p.d[ctx.lang])} ↗</span></a>`;
}

export const swatches = (list, n) => `<div class="sw rv"${n ? ` style="--n:${n}"` : ''}>${list.map(([name, hex, fg, border]) => `<div style="background:${hex}${fg ? ';color:' + fg : ''}${border ? ';box-shadow:inset 0 0 0 1px var(--l1)' : ''}">${esc(name)}<span>${hex}</span></div>`).join('')}</div>`;

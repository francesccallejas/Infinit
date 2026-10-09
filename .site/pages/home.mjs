// Home — port of prototype/pages/home.html, rendered server-side (content in HTML, behaviour in site.js).
import { EMAIL, url, esc, A, wm, pngDim } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { S, P, svc, src, CH, HS } from '../data.mjs';
import { head, end, ftLine } from '../layout.mjs';

// Editorial grid: [grid-column, aspect-ratio] per project.
const L = [['1/8', '16/10'], ['9/13', '4/5'], ['1/6', '4/5'], ['7/13', '16/10'], ['2/8', '16/10'], ['9/13', '1/1']];

export function home(ctx) {
  const { lang } = ctx, t = T[lang];
  const tags = p => `<div class="tgs">${p.t.map(k => `<span>${esc(svc(k).n[lang])}</span>`).join('')}</div>`;
  const status = p => p.s === 'nda' ? t.nda : t.wip;
  const cyc = p => p.all.length > 1 ? ` data-cyc="${esc(JSON.stringify(p.all.map(src)))}"` : '';

  // One project card. The projects are in the HTML once (the carousel); site.js builds the loop copies
  // (aria-hidden, out of the tab order) and the editorial grid from them — data-g carries the grid slot.
  const card = (p, i) => {
    const live = !!p.page;
    const alt = `${p.n} — ${p.d[lang]}`;
    const inner = `<div class="cw"><div class="img"><img src="${src(p.img)}" alt="${esc(alt)}" loading="lazy" draggable="false"></div><span class="chip vc">${live ? esc(t.viewCase) + ' ↗' : esc(status(p))}</span>${p.rec ? `<span class="chip rc">${esc(p.rec[lang])}</span>` : ''}</div><div class="cap"><b>${esc(p.n)}</b><span class="ds">${esc(p.d[lang])}</span></div>${tags(p)}`;
    const common = `${cyc(p)} data-g="${L[i][0]} ${L[i][1]}"`;
    return live
      ? `<a class="pj" href="${url(lang, p.page)}" draggable="false" data-cur="${esc(t.cView)}"${common}>${inner}</a>`
      : `<div class="pj soon" data-cur="${esc(t.cSoon)}" data-soon="${esc(p.n + ' — ' + status(p))}"${common}>${inner}</div>`;
  };

  const hero = `<section class="hx dark" id="top"><div class="hx-bg" id="hbg">${HS.map((s, i) => `<div class="img${i ? '' : ' on'}"${i ? ' aria-hidden="true"' : ''}><img ${i ? 'data-src' : 'src'}="${src(s)}" alt="${i ? '' : esc(t.heroAlt)}"${i ? '' : ' fetchpriority="high"'}></div>`).join('')}</div>
<h1 class="sr">${esc(t.h1)}</h1>
<div class="top"></div>
<div class="mid" aria-hidden="true"><span class="t em">${esc(t.hero1)}</span>${wm('fit')}<span class="t t2 em"><b>${esc(t.hero2)}</b></span></div>
<div class="hb" style="justify-content:flex-end"><a class="scd" href="#work" aria-label="${esc(t.scrollDown)}"><span>${esc(t.scroll)}</span><i></i></a></div>
</section>`;

  // Intro: words start pale and fill in while the section is pinned (same as the Studio manifesto); <b> words end in full ink.
  const fill = s => s.split(/(<b>.*?<\/b>)/).flatMap(seg => {
    const k = seg.startsWith('<b>');
    return (k ? seg.slice(3, -4) : seg).split(/\s+/).filter(Boolean).map(w => ({ w, k }));
  }).map(({ w, k }, i) => (i && !/^[.,;:!?]/.test(w) ? ' ' : '') + `<span${k ? ' class="k"' : ''}>${w}</span>`).join('');
  const intro = `<section class="intro" id="intro"><div class="intro-s"><div class="intro-c"><span class="lbl">INFINIT©</span><p id="inp">${fill(t.intro)}</p></div></div></section>`;

  const work = `<section id="work" data-stop><div class="sh"><h2 class="h2 em" data-lines>${t.workH}</h2><div class="seg" id="seg" role="group" aria-label="${esc(t.viewsLabel)}"><i></i><button type="button" class="on" aria-pressed="true">${esc(t.segDrag)}</button><button type="button" aria-pressed="false">${esc(t.segGrid)}</button></div></div>
<div id="wv"><div class="wv-car"><div class="car" id="car" data-cur="${esc(t.cDrag)}"><div class="car-t" id="ct">${P.map(card).join('')}</div></div><div class="hint lbl"><span>${esc(t.hintL)}</span><span>${esc(t.hintR)}</span></div></div>
<div class="wv-gr" hidden><div class="gr"></div></div></div></section>`;

  const SH = HS.slice(0, 5);
  const approach = `<section class="show dark" id="approach" aria-label="${esc(t.approach)}"><div class="show-s"><div id="si" aria-hidden="true">${SH.map((s, i) => `<div class="si" style="z-index:${i}"><div class="img"><img src="${src(s)}" alt="" loading="lazy"></div></div>`).join('')}</div>
<div class="show-o"><span class="lbl">${esc(t.approach)}</span><div class="st">${t.st.map((s, i) => `<p${i ? '' : ' class="on"'}>${esc(s)}</p>`).join('')}</div><div class="show-b"><span class="pg" id="pg" aria-hidden="true">${SH.map(() => '<i><b></b></i>').join('')}</span></div></div></div></section>`;

  const services = `<section class="acc" id="services"><div class="sh"><h2 class="h2" data-lines>${t.svcH}</h2><span class="lbl">${esc(t.capabilities)}</span></div>
<div class="svc" id="svc">${S.map((s, i) => `<article class="fc rv" tabindex="0" style="transition-delay:${(i * .06).toFixed(2)}s"><div class="fc-i"><div class="fc-f"><div class="n"><span class="lbl">0${i + 1}</span></div><h3>${esc(s.n[lang])}</h3></div><div class="fc-b"><span class="lbl">0${i + 1} — ${esc(s.n[lang])}</span><ul>${s.t[lang].map(c => `<li>${esc(c)}</li>`).join('')}</ul></div></div></article>`).join('')}</div></section>`;

  const logos = Object.keys(CH).map(n => `<img src="${A('project/assets/clients/' + n + '.png')}" alt=""${pngDim('project/assets/clients/' + n + '.png', CH[n])} loading="lazy" style="height:${CH[n]}px">`).join('');
  const contact = `<section class="dark ct" id="contact">${ftLine}<div class="ct-h"><span class="lbl">${esc(t.exp)}</span><span class="sr">${esc(t.clientsSr)}</span></div><div class="mq on-d" aria-hidden="true"><div class="mq-t">${logos}${logos}</div></div>
<div class="end"><h2 data-lines>${esc(t.talk)}</h2><button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div>
<div class="endw" aria-hidden="true">${wm('fit')}</div></section>`;

  return head(ctx, { title: t.homeTitle, desc: t.homeDesc, og: '/assets/site/og/home.jpg', css: ['home'] }) +
    `\n<main id="main">\n${hero}\n${intro}\n${work}\n${approach}\n${services}\n${contact}\n</main>\n` + end(ctx);
}

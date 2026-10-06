// Studio — port of prototype/pages/studio.html.
import { url, esc, A } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, ending } from '../layout.mjs';
import { HUB, INDUSTRIES, sectorRows } from './sectors.mjs';

const VIMG = ['project/assets/imagery/eye-dark.webp', 'project/assets/images/Bunnker Final.webp', 'project/assets/imagery/Almirall.webp'];
const XP = [['Almirall', 'Desigual', 'Casa Tarradellas', 'Mercadona', 'Santander', 'MartiDerm'], ['Girbau', 'Seidor', 'Repsol', 'SAP', 'Glovo']];
// Stats: initial text is the final value (no-JS); site.js counts up to it.
const STATS = { en: ['€0 → €1.7M', '+50%', '×10'], ca: ['0 € → 1,7 M€', '+50%', '×10'], es: ['0 € → 1,7 M€', '+50%', '×10'] };

export function studio(ctx) {
  const { lang } = ctx, t = T[lang];
  const words = (s, k) => s.split(' ').map(w => `<span${k ? ' class="k"' : ''}>${esc(w)}</span>`).join(' ');

  const hero = `<section class="ch dark" id="top"><div class="ch-bg"><div class="img"><img src="${A('project/assets/imagery/studio-hero.webp')}" alt="${esc(t.stHeroAlt)}" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a><span class="lbl">${esc(t.stLabel)}</span></div>
<div class="ch-m"><h1 class="hin">${t.stH1}</h1></div>
<div class="ch-b" style="justify-content:flex-end"><a class="scd" href="#mf">${esc(t.scroll)}<i></i></a></div>
</section>`;

  const mf = `<section class="mf" id="mf"><div class="mf-s"><span class="lbl">INFINIT©</span><p id="mfp">${words(t.mf[0])} ${words(t.mf[1], true)}</p></div></section>`;

  const vh = `<section class="vh" id="vh" aria-label="${esc(t.believe)}"><div class="vh-s"><div class="vh-p"><h2 class="lbl">${esc(t.believe)}</h2><span class="bars" id="bars" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i></span></div><div class="vh-t" id="vht">${t.values.map((v, i) => `<div class="vp"><div class="img"><img src="${A(VIMG[i])}" alt="" loading="lazy"></div><div class="tx"><span class="lbl">0${i + 1} / 03</span><h3>${esc(v[0])}</h3><p>${esc(v[1])}</p></div></div>`).join('')}</div></div></section>`;

  const fmts = ['eur', 'pct', 'x'], cnt = ['1.7', '50', '10'];
  const founder = `<section class="blk" id="founder"><div class="fd2">
<div class="img"><img src="${A('project/assets/imagery/francesc.webp')}" alt="${esc(t.founderAlt)}" loading="lazy"></div>
<div class="tx"><span class="lbl">${esc(t.founderLbl)}</span><p class="em" data-lines>${t.founderP}</p>
<div class="stt">${t.stats.map((s, i) => `<div><span class="lbl">${esc(s)}</span><b data-cnt="${cnt[i]}" data-fmt="${fmts[i]}">${esc(STATS[lang][i])}</b></div>`).join('')}</div>
<a class="gbtn" href="https://www.linkedin.com/in/francesc-callejas-%E2%98%81%EF%B8%8F%E2%98%98%EF%B8%8F-99416a90/" target="_blank" rel="noopener" style="align-self:flex-start"><span class="roll">LinkedIn</span><span class="ar" aria-hidden="true">↗</span></a></div></div></section>`;

  // Sectors (v3): the nine sectors + a link to every sector & service.
  const sectors = `<section class="sx" id="sectors"><div class="sx-h"><div><span class="lbl">${esc(t.ftSecL)}</span><h2 class="em" data-lines>${HUB[lang].h1}</h2></div><a class="gbtn" href="${url(lang, 'sectors')}"><span class="roll">${esc(t.ftAll.replace(/\s*[→↗]$/, ''))}</span><span class="ar" aria-hidden="true">↗</span></a></div>
${sectorRows(Object.keys(INDUSTRIES), lang)}</section>`;

  // Ending: "Experience across" (client names, moving) + Let’s talk + email + wordmark.
  const xp = `<div style="padding:0 var(--pad) 30px"><span class="lbl">${esc(t.exp)}</span><span class="sr">${esc(XP.flat().join(', '))}</span></div><div id="xp" aria-hidden="true">${XP.map(r => `<div class="xp-r"><div class="xp-t">${[...r, ...r, ...r, ...r].map(n => `<span>${esc(n)}</span>`).join('')}</div></div>`).join('')}</div>`;

  return head(ctx, { title: t.stTitle, desc: t.stDesc, og: '/assets/site/og/studio.jpg', css: ['inner', 'studio'] }) +
    `\n<main id="main">\n${hero}\n${mf}\n${vh}\n${founder}\n${sectors}\n${ending(ctx, { before: xp, cls: 'xp' })}\n</main>\n` + end(ctx);
}

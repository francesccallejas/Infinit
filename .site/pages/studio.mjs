// Studio — port of prototype/pages/studio.html.
import { EMAIL, url, esc, A } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, heroLine, ftLine } from '../layout.mjs';

const VIMG = ['project/assets/imagery/eye-dark.webp', 'project/assets/images/Bunnker Final.webp', 'project/assets/imagery/Almirall.webp'];
const VH = [165, 255, 30];
const XP = [['Almirall', 'Desigual', 'Casa Tarradellas', 'Mercadona', 'Santander', 'MartiDerm'], ['Girbau', 'Seidor', 'Repsol', 'SAP', 'Glovo']];
const HUES = [165, 255, 285, 30, 88];
// Stats: initial text is the final value (no-JS); site.js counts up to it.
const STATS = { en: ['€0 → €1.7M', '+50%', '×10'], ca: ['0 € → 1,7 M€', '+50%', '×10'], es: ['0 € → 1,7 M€', '+50%', '×10'] };

export function studio(ctx) {
  const { lang } = ctx, t = T[lang];
  const words = (s, k) => s.split(' ').map(w => `<span${k ? ' class="k"' : ''}>${esc(w)}</span>`).join(' ');

  const hero = `<section class="ch dark" id="top" data-h="n"><div class="ch-bg"><div class="img"><img src="${A('project/assets/imagery/mountains-tekapo.webp')}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a><span class="lbl">${esc(t.stLabel)}</span></div>
<div class="ch-m"><h1 data-lines>${t.stH1}</h1></div>
<div class="ch-b"><a class="fcd" href="#founder" data-cur="${esc(t.cMeet)}"><span class="img"><img src="${A('project/assets/imagery/francesc.webp')}" alt=""></span><span>Cesc Callejas<small>${esc(t.fcdSub)}</small></span></a><a class="scd" href="#mf">${esc(t.scroll)}<i></i></a></div>
${heroLine}</section>`;

  const mf = `<section class="mf" id="mf" data-h="n"><div class="mf-s"><span class="lbl">INFINIT©</span><p id="mfp">${words(t.mf[0])} ${words(t.mf[1], true)}</p></div></section>`;

  const vh = `<section class="vh" id="vh" aria-label="${esc(t.believe)}"><div class="vh-s"><div class="vh-p"><h2 class="lbl">${esc(t.believe)}</h2><span class="bars" id="bars" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i></span></div><div class="vh-t" id="vht">${t.values.map((v, i) => `<div class="vp" data-hh="${VH[i]}"><div class="img"><img src="${A(VIMG[i])}" alt="" loading="lazy"></div><div class="tx"><span class="lbl">0${i + 1} / 03</span><h3>${esc(v[0])}<i style="background:oklch(.72 .07 ${VH[i]})" aria-hidden="true"></i></h3><p>${esc(v[1])}</p></div></div>`).join('')}</div></div></section>`;

  const fmts = ['eur', 'pct', 'x'], cnt = ['1.7', '50', '10'];
  const founder = `<section class="blk" id="founder" data-h="165"><div class="fd2">
<div class="img"><img src="${A('project/assets/imagery/francesc.webp')}" alt="${esc(t.founderAlt)}" loading="lazy"></div>
<div class="tx"><span class="lbl">${esc(t.founderLbl)}</span><p class="em" data-lines>${t.founderP}</p>
<div class="stt">${t.stats.map((s, i) => `<div><span class="lbl">${esc(s)}</span><b data-cnt="${cnt[i]}" data-fmt="${fmts[i]}">${esc(STATS[lang][i])}</b></div>`).join('')}</div>
<a class="gbtn" href="https://www.linkedin.com/in/francesc-callejas-%E2%98%81%EF%B8%8F%E2%98%98%EF%B8%8F-99416a90/" target="_blank" rel="noopener" style="--bh:255;align-self:flex-start"><span class="roll">LinkedIn</span><span class="ar" aria-hidden="true">↗</span></a></div></div></section>`;

  // Who we work with: sectors (linked when they have a page or a case) + the moments that change a brand.
  const sectors = `<section class="blk" id="sectors" data-h="285"><div class="sh"><div><span class="lbl">${esc(t.secL)}</span><h2 class="h2 em" data-lines>${t.secH}</h2></div></div>
<ul class="sxl">${t.secs.map(([k, n, d], i) => {
    const inner = `<h3>${esc(n)}</h3><p>${esc(d)}</p><span class="ar" aria-hidden="true">${k ? '↗' : ''}</span>`;
    return `<li class="rv" style="transition-delay:${(i * .04).toFixed(2)}s">${k ? `<a href="${url(lang, k)}">${inner}</a>` : `<div>${inner}</div>`}</li>`;
  }).join('')}</ul>
<div class="sx-exp"><span class="lbl">${esc(t.momL)}</span><p>${esc(t.mom)}</p><a class="gbtn" href="${url(lang, 'family')}" style="--bh:88;align-self:flex-start"><span class="roll">${esc(t.famLink)}</span><span class="ar" aria-hidden="true">↗</span></a><a class="gbtn" href="${url(lang, 'international')}" style="--bh:255;align-self:flex-start"><span class="roll">${esc(t.intLink)}</span><span class="ar" aria-hidden="true">↗</span></a><a class="gbtn" href="${url(lang, 'sectors')}" style="--bh:165;align-self:flex-start"><span class="roll">${esc(t.ftAll)}</span></a></div></section>`;

  const xp = `<section class="dark xp" id="contact" data-h="n" style="margin-top:clamp(90px,11vw,170px)">${ftLine}<div style="padding:0 var(--pad) 30px"><span class="lbl">${esc(t.exp)}</span><span class="sr">${esc(XP.flat().join(', '))}</span></div><div id="xp" aria-hidden="true">${XP.map((r, k) => `<div class="xp-r"><div class="xp-t">${[...r, ...r, ...r, ...r].map((n, i) => `<span style="--c:oklch(.75 .08 ${HUES[(i + k) % 5]})">${esc(n)}<i></i></span>`).join('')}</div></div>`).join('')}</div>
<div class="cta2"><h2 class="em" data-lines>${t.stCta}</h2>
<button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div></section>`;

  return head(ctx, { title: t.stTitle, desc: t.stDesc, og: '/assets/site/og/studio.jpg', css: ['inner', 'studio'] }) +
    `\n<main id="main">\n${hero}\n${mf}\n${vh}\n${founder}\n${sectors}\n${xp}\n</main>\n` + end(ctx);
}

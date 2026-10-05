// Sectors hub (/sectors/): every sector page and every "moment" / service page in one list.
// Names and one-liners come from each page's own copy (lbl + its third meta row), so the hub never drifts.
import { EMAIL, url, esc, A } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, heroLine, ftLine } from '../layout.mjs';
import { SHARED } from './sector.mjs';
import { C as industrial } from './industrial.mjs';
import { C as automotive } from './automotive.mjs';
import { C as food } from './food.mjs';
import { C as pharma } from './pharma.mjs';
import { C as realestate } from './realestate.mjs';
import { C as tech } from './tech.mjs';
import { C as fashion } from './fashion.mjs';
import { C as energy } from './energy.mjs';
import { C as leisure } from './leisure.mjs';
import { C as family } from './family.mjs';
import { C as international } from './international.mjs';
import { C as mergers } from './mergers.mjs';
import { C as launch } from './launch.mjs';
import { C as employer } from './employer.mjs';
import { C as website } from './website.mjs';
import { C as geo } from './geo.mjs';
import { C as cmo } from './cmo.mjs';

export const INDUSTRIES = { industrial, automotive, food, pharma, realestate, tech, fashion, energy, leisure };
export const MOMENTS = { family, international, mergers, launch, employer, website, geo, cmo };

export const HUB = {
  en: { title: 'Sectors & services — Branding studio | INFINIT©', desc: 'Every sector INFINIT© works in — industrial, automotive, food, pharma, real estate, tech and more — plus rebranding, launches, websites, GEO and CMO.', lbl: 'Who we work with', h1: 'Sectors and moments we know <b>from the inside.</b>', indL: 'Sectors', momL: 'Moments & services', name: 'Sectors' },
  ca: { title: 'Sectors i serveis — Estudi de branding | INFINIT©', desc: 'Tots els sectors on treballa INFINIT© — industrial, automoció, alimentació, farma, immobiliari, tecnologia… — i rebranding, webs, GEO i CMO fraccional.', lbl: 'Amb qui treballem', h1: 'Sectors i moments que coneixem <b>des de dins.</b>', indL: 'Sectors', momL: 'Moments i serveis', name: 'Sectors' },
  es: { title: 'Sectores y servicios — Estudio de branding | INFINIT©', desc: 'Todos los sectores en los que trabaja INFINIT© — industrial, automoción, alimentación, farma, inmobiliario, tecnología… — y rebranding, webs, GEO y CMO.', lbl: 'Con quién trabajamos', h1: 'Sectores y momentos que conocemos <b>desde dentro.</b>', indL: 'Sectores', momL: 'Momentos y servicios', name: 'Sectores' },
};

export function sectors(ctx) {
  const { lang } = ctx, t = T[lang], h = HUB[lang], sh = SHARED[lang];
  const rows = (group, delay = 0) => `<ul class="sxl">${Object.entries(group).map(([k, C], i) => `<li class="rv" style="transition-delay:${((i + delay) * .03).toFixed(2)}s"><a href="${url(lang, k)}"><h3>${esc(C[lang].lbl)}</h3><p>${esc(C[lang].meta[2][1])}</p><span class="ar" aria-hidden="true">↗</span></a></li>`).join('')}</ul>`;

  const hero = `<section class="ch dark" id="top" data-h="n"><div class="ch-bg"><div class="img"><img src="${A('project/assets/imagery/mountains-tekapo.webp')}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a></div>
<div class="ch-m"><span class="lbl sx-l">${esc(h.lbl)}</span><h1 class="hin">${h.h1}</h1></div>
<div class="ch-b"><span></span><a class="scd" href="#hub">${esc(t.scroll)}<i></i></a></div>
${heroLine}</section>`;

  const list = `<section class="blk" id="hub" data-h="255"><div class="sh"><div><span class="lbl">${esc(h.indL)}</span></div></div>${rows(INDUSTRIES)}</section>
<section class="blk" data-h="88"><div class="sh"><div><span class="lbl">${esc(h.momL)}</span></div></div>${rows(MOMENTS)}</section>`;

  const cta = `<section class="dark xp" id="contact" data-h="n" style="margin-top:clamp(90px,11vw,170px)">${ftLine}
<div class="cta2"><h2 class="em" data-lines>${sh.ctaH}</h2><p class="sx-cp">${esc(sh.ctaP)}</p>
<button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div></section>`;

  return head(ctx, { title: h.title, desc: h.desc, og: '/assets/site/og/home.jpg', css: ['inner', 'studio'], ld: { hub: true, name: h.name } }) +
    `\n<main id="main">\n${hero}\n${list}\n${cta}\n</main>\n` + end(ctx);
}

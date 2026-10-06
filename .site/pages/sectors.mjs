// Sectors hub (/sectors/): every sector page and every "moment" / service page in one list.
// Names and one-liners come from each page's own copy (lbl + its third meta row), so the hub never drifts.
import { url, esc } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, ending } from '../layout.mjs';
import { REG } from './sector.mjs';
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

// Short sector names (lists, pills). Moments and services use their page label.
const NAMES = {
  industrial: { en: 'Industrial & B2B', ca: 'Industrial i B2B', es: 'Industrial y B2B' },
  automotive: { en: 'Automotive & mobility', ca: 'Automoció i mobilitat', es: 'Automoción y movilidad' },
  food: { en: 'Food & beverage', ca: 'Alimentació i gran consum', es: 'Alimentación y gran consumo' },
  pharma: { en: 'Pharma, health & dermocosmetics', ca: 'Farma, salut i dermocosmètica', es: 'Farma, salud y dermocosmética' },
  realestate: { en: 'Real estate & proptech', ca: 'Immobiliari i proptech', es: 'Inmobiliario y proptech' },
  tech: { en: 'Tech, startups & scaleups', ca: 'Tecnologia, startups i scaleups', es: 'Tecnología, startups y scaleups' },
  fashion: { en: 'Fashion & retail', ca: 'Moda i retail', es: 'Moda y retail' },
  energy: { en: 'Energy & renewables', ca: 'Energia i renovables', es: 'Energía y renovables' },
  leisure: { en: 'Outdoor, leisure & sport', ca: 'Outdoor, oci i esport', es: 'Outdoor, ocio y deporte' },
};
const ALL = { ...INDUSTRIES, ...MOMENTS };
export const sectorName = (k, lang) => (NAMES[k] || {})[lang] || ALL[k][lang].lbl;
// One row of a sector list: name + descriptor (the page's "Sectors" fact) + ↗; the Sand fill rises on hover.
export const sectorRows = (keys, lang) => `<ul class="sx-l">${keys.map(k => `<li><a href="${url(lang, k)}"><b>${esc(sectorName(k, lang))}</b><span>${esc(ALL[k][lang].meta[2][1])}</span><i aria-hidden="true">↗</i></a></li>`).join('')}</ul>`;

export const HUB = {
  en: { title: 'Sectors & services — Branding studio | INFINIT©', desc: 'Every sector INFINIT© works in — industrial, automotive, food, pharma, real estate, tech and more — plus rebranding, launches, websites, GEO and CMO.', lbl: 'Who we work with', h1: 'Sectors and moments we know <b>from the inside.</b>', indL: 'Sectors', momL: 'Moments & services', name: 'Sectors' },
  ca: { title: 'Sectors i serveis — Estudi de branding | INFINIT©', desc: 'Tots els sectors on treballa INFINIT© — industrial, automoció, alimentació, farma, immobiliari, tecnologia… — i rebranding, webs, GEO i CMO fraccional.', lbl: 'Amb qui treballem', h1: 'Sectors i moments que coneixem <b>des de dins.</b>', indL: 'Sectors', momL: 'Moments i serveis', name: 'Sectors' },
  es: { title: 'Sectores y servicios — Estudio de branding | INFINIT©', desc: 'Todos los sectores en los que trabaja INFINIT© — industrial, automoción, alimentación, farma, inmobiliario, tecnología… — y rebranding, webs, GEO y CMO.', lbl: 'Con quién trabajamos', h1: 'Sectores y momentos que conocemos <b>desde dentro.</b>', indL: 'Sectores', momL: 'Momentos y servicios', name: 'Sectores' },
};

export function sectors(ctx) {
  const { lang } = ctx, t = T[lang], h = HUB[lang];
  const header = `<header class="lt" id="top"><div class="lt-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a><span class="lbl">${esc(h.lbl)}</span></div>
<h1 class="em hin">${h.h1}</h1></header>`;
  const list = `<section class="blk" id="hub"><div class="sh"><div><span class="lbl">${esc(h.indL)}</span></div></div>${sectorRows(Object.keys(INDUSTRIES), lang)}</section>
<section class="blk"><div class="sh"><div><span class="lbl">${esc(h.momL)}</span></div></div>${sectorRows(Object.keys(MOMENTS), lang)}</section>`;
  return head(ctx, { title: h.title, desc: h.desc, og: '/assets/site/og/home.jpg', css: ['inner', 'studio', 'seo'], ld: { hub: true, name: h.name } }) +
    `\n<main id="main">\n${header}\n${list}\n${ending(ctx)}\n</main>\n` + end(ctx);
}

// The sector template reads the lists through this registry (importing this module from sector.mjs would be circular).
Object.assign(REG, { sectorName, sectorRows, industries: Object.keys(INDUSTRIES), moments: Object.keys(MOMENTS) });
